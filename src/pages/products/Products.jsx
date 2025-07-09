import React, { useState } from 'react';
import './Products.css';
import ProductCard from '../../components/productCard/ProductCard';
import { products } from '../../data';
import Header from '../../components/header/Header';
import Modal from '../../components/modal/Modal';
import '../../components/modal/modal.css';
import Footer from '../../components/footer/Footer';
import { motion } from 'framer-motion';
import './Products.css'
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom';
const PRODUCTS_PER_PAGE = 8;


function CategorySection({ product, onProductClick }) {
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);
  const showMore = () => setVisibleCount((c) => Math.min(c + PRODUCTS_PER_PAGE, product.images.length));
  return (
    <section className="category-section">

      <h2 className="category-title">{product.size} {product.title}</h2>
      <div className="product-grid">
        {product.images.slice(0, visibleCount).map((img, idx) => (
          <div key={idx} onClick={() => onProductClick({
            image: img,
            title: product.title,
            price: product.price?.current || product.price || undefined,
            oldPrice: product.price?.old,
            isOnSale: !!product.price?.old,
            description: product.description,
            size: product.size,
            categoryKey: product.key,
            idx,
          })} style={{ cursor: 'pointer' }}>
            <ProductCard
              image={img}
              title={product.title}
              price={product.price?.current || product.price || undefined}
              oldPrice={product.price?.old}
              isOnSale={!!product.price?.old}
            />
          </div>
        ))}
      </div>
      {visibleCount < product.images.length && (
        <button className="show-more-btn" onClick={showMore}>عرض المزيد</button>
      )}
    </section>
  );
}

const Products = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleProductClick = (product) => {
    navigate(`/products/${product.categoryKey}/${product.idx}`);
  };

  return (
    <div>
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />

      {filteredProducts.map((product, idx) => (
        <motion.div
          key={product.key}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: idx * 0.18 }}
        >
          <Marquee speed={90} className='marquee'>
            {product.images.slice(0, 20).map((img, i) => (
              <img
                key={i}
                src={img}
                alt={product.title + ' ' + (i + 1)}
                style={{
                  height: '48px',
                  width: 'auto',
                  margin: '0 18px',
                  borderRadius: '6px',
                  boxShadow: '0 1px 6px rgba(30,34,60,0.10)',
                  objectFit: 'cover',
                  background: '#fff',
                  border: '1px solid #e3e6f0',
                }}
              />
            ))}
          </Marquee>
          <CategorySection product={product} onProductClick={handleProductClick} />
        </motion.div>
      ))}
      <Footer />
      <Modal isOpen={false} onClose={() => { }}>
        {/* Modal content removed as per edit hint */}
      </Modal>
      {/* Fullscreen image overlay removed as per edit hint */}
    </div>
  );
};

export default Products;

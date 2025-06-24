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
const PRODUCTS_PER_PAGE = 6;


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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [fullscreenImg, setFullscreenImg] = useState(false);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleProductClick = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalProduct(null);
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
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalProduct && (
          <div style={{ textAlign: 'center' }}>
            <img
              src={modalProduct.image}
              alt={modalProduct.title}
              style={{ maxWidth: '100%', maxHeight: 300, marginBottom: 16, cursor: 'zoom-in' }}
              onClick={() => setFullscreenImg(true)}
            />
            <h2>{modalProduct.title}</h2>
            <div style={{ fontSize: 20, margin: '8px 0' }}>{modalProduct.price}  {modalProduct.oldPrice && <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>{modalProduct.oldPrice} EGP</span>}</div>
            <p style={{ whiteSpace: 'pre-line', marginTop: 16 }}>{modalProduct.description}</p>
            {modalProduct.size && <div style={{ marginTop: 8 }}>المقاس: {modalProduct.size}</div>}
            <button
              className="product-card__add-btn"
              style={{ marginTop: 24 }}
              onClick={() => window.open('https://wa.me/+201009507136')}
            >
              Buy Now
            </button>
          </div>
        )}
      </Modal>
      {fullscreenImg && modalProduct && (
        <div className="fullscreen-image-overlay" onClick={() => setFullscreenImg(false)}>
          <img src={modalProduct.image} alt={modalProduct.title} className="fullscreen-image" />
        </div>
      )}
    </div>
  );
};

export default Products;

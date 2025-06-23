import React, { useState } from 'react';
import './Products.css';
import ProductCard from '../../components/productCard/ProductCard';
import { products } from '../../data';
import Header from '../../components/header/Header';
import Modal from '../../components/Modal';
import '../../components/modal.css';
import Footer from '../../components/footer/Footer';

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
      {filteredProducts.map((product) => (
        <CategorySection key={product.key} product={product} onProductClick={handleProductClick} />
      ))}
      <Footer />
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalProduct && (
          <div style={{ textAlign: 'center' }}>
            <img src={modalProduct.image} alt={modalProduct.title} style={{ maxWidth: '100%', maxHeight: 300, marginBottom: 16 }} />
            <h2>{modalProduct.title}</h2>
            <div style={{ fontSize: 20, margin: '8px 0' }}>{modalProduct.price}  {modalProduct.oldPrice && <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>{modalProduct.oldPrice} EGP</span>}</div>
            <p style={{ whiteSpace: 'pre-line', marginTop: 16 }}>{modalProduct.description}</p>
            {modalProduct.size && <div style={{ marginTop: 8 }}>المقاس: {modalProduct.size}</div>}
            <button
              className="product-card__add-btn"
              style={{ marginTop: 24 }}
              onClick={() => window.open('https://facebook.com')}
            >
              Buy Now
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Products;

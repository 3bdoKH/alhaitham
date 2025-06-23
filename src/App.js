import './App.css';
import Header from './components/header/Header';
import ProductCard from './components/productCard/ProductCard';
import Footer from './components/footer/Footer';
import { products } from './data';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Gallery from './components/Gallery';
import Modal from './components/Modal';
import './components/modal.css';

function getAllProducts() {
  const all = [];
  products.forEach((product) => {
    product.images.forEach((img, idx) => {
      all.push({
        image: img,
        title: product.title,
        price: product.price?.current || product.price || undefined,
        oldPrice: product.price?.old,
        isOnSale: !!product.price?.old,
        description: product.description,
        size: product.size,
        categoryKey: product.key,
        idx,
      });
    });
  });
  return all;
}

function getRandomProducts(count) {
  const all = getAllProducts();
  const shuffled = all.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function App() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState("");
  const randomProducts = getRandomProducts(6).filter(product =>
    product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchValue.toLowerCase()))
  );
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalProduct, setModalProduct] = React.useState(null);

  const handleProductClick = (product) => {
    setModalProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalProduct(null);
  };

  return (
    <div className="App">
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />
      <Gallery />
      <section className="home-products-section">
        <h2 className="category-title">منتجاتنا</h2>
        <div className="product-grid">
          {randomProducts.map((product, idx) => (
            <div key={idx} onClick={() => handleProductClick(product)} style={{ cursor: 'pointer' }}>
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
                oldPrice={product.oldPrice}
                isOnSale={product.isOnSale}
              />
            </div>
          ))}
        </div>
        <button className="show-more-btn" onClick={() => navigate('/products')}>عرض كل المنتجات</button>
      </section>
      <Footer />
      <Modal isOpen={modalOpen} onClose={handleCloseModal}>
        {modalProduct && (
          <div style={{ textAlign: 'center' }}>
            <img src={modalProduct.image} alt={modalProduct.title} style={{ maxWidth: '100%', maxHeight: 300, marginBottom: 16 }} />
            <h2>{modalProduct.title}</h2>
            {modalProduct.size && <div style={{ margin: '8px 0', fontWeight: 'bold' }}>المقاس: {modalProduct.size}</div>}
            <div style={{ fontSize: 20, margin: '8px 0' }}>
              {modalProduct.price && <span>{modalProduct.price} EGP</span>}
              {modalProduct.oldPrice && <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>{modalProduct.oldPrice} EGP</span>}
            </div>
            <p style={{ whiteSpace: 'pre-line', marginTop: 16 }}>{modalProduct.description}</p>
            <button
              className="product-card__add-btn"
              style={{ marginTop: 24 }}
              onClick={() => window.open('https://facebook.com')}
            >
              Buy Now <span className="product-card__cart-icon"><i className="fab fa-whatsapp" /></span>
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;

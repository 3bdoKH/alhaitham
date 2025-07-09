import './App.css';
import Header from './components/header/Header';
import ProductCard from './components/productCard/ProductCard';
import Footer from './components/footer/Footer';
import { products } from './data';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Gallery from './components/gallery/Gallery';
import Modal from './components/modal/Modal';
import './components/modal/modal.css';

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
  const randomProducts = getRandomProducts(8).filter(product =>
    product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleProductClick = (product) => {
    navigate(`/products/${product.categoryKey}/${product.idx}`);
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
      <Modal isOpen={false} onClose={() => { }}>
        {/* Modal content removed as per edit hint */}
      </Modal>
      {/* Fullscreen image overlay removed as per edit hint */}
    </div>
  );
}

export default App;

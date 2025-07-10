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

// Cart Context
export const CartContext = React.createContext();

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

function getCartFromStorage() {
  try {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setCartToStorage(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function CartProvider({ children }) {
  const [cart, setCart] = React.useState(getCartFromStorage());

  React.useEffect(() => {
    setCartToStorage(cart);
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      // If item with same key/idx exists, increase quantity
      const idx = prev.findIndex(i => i.key === item.key && i.idx === item.idx);
      if (idx !== -1) {
        const updated = [...prev];
        updated[idx].quantity = (updated[idx].quantity || 1) + (item.quantity || 1);
        return updated;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (key, idx) => {
    setCart(prev => prev.filter(i => !(i.key === key && i.idx === idx)));
  };

  const clearCart = () => setCart([]);

  const updateQuantity = (key, idx, quantity) => {
    setCart(prev => prev.map(i => (i.key === key && i.idx === idx) ? { ...i, quantity } : i));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

function AdvertisingBanner() {
  const [show, setShow] = React.useState(true);
  if (!show) return null;
  return (
    <div className="advertising-banner">
      <span>عند شرائك أي باب، التوصيل والتركيب مجاناً !</span>
      <button className="advertising-banner-close" onClick={() => setShow(false)} title="إغلاق">×</button>
    </div>
  );
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
    <CartProvider>
      <div className="App">
        <AdvertisingBanner />
        <Header searchValue={searchValue} onSearchChange={setSearchValue} />
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">الهيثم للأبواب والديكور</h1>
            <p className="hero-desc">أبواب مصفحة تركي أصلية، أبواب غرف، أرضيات باركيه HDF، أفضل جودة وأسرع تركيب في مصر. منتجات أصلية مستوردة، مقاومة للصوت والأتربة والحريق، مزودة بأحدث وسائل الأمان والتصميمات العصرية.</p>
            <button className="hero-cta" onClick={() => navigate('/products')}>تسوق الآن</button>
          </div>
        </section>
        {/* Enhanced Gallery with Slogan Overlay */}
        <div className="gallery-hero-wrapper">
          <Gallery />
          <div className="gallery-slogan-overlay">
            <span>جودة أصلية، أمان مضمون، تصميمات عصرية</span>
          </div>
        </div>
        {/* Products Preview Section */}
        <section className="home-products-section improved-products-section">
          <h2 className="category-title">منتجاتنا المميزة</h2>
          <p className="products-subtitle">تصفح مجموعة مختارة من أفضل منتجاتنا</p>
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
        {/* Why Choose Us Section */}
        <section className="why-choose-us-section">
          <h2>لماذا الهيثم؟</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <span className="feature-title">جودة عالية</span>
              <span className="feature-desc">منتجات أصلية مستوردة بمعايير عالمية</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span className="feature-title">أسرع تركيب</span>
              <span className="feature-desc">تركيب احترافي وسريع في جميع أنحاء مصر</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🛡️</span>
              <span className="feature-title">ضمان حقيقي</span>
              <span className="feature-desc">ضمان على جميع المنتجات وخدمة ما بعد البيع</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <span className="feature-title">أسعار منافسة</span>
              <span className="feature-desc">أفضل سعر مقابل الجودة في السوق المصري</span>
            </div>
          </div>
        </section>
        {/* CTA Strip */}
        <section className="cta-strip">
          <span>هل لديك استفسار أو تحتاج استشارة؟</span>
          <button className="cta-btn" onClick={() => window.open('https://wa.me/+201009507136')}>تواصل معنا عبر واتساب</button>
        </section>
        <Footer />
        <Modal isOpen={false} onClose={() => { }}>
          {/* Modal content removed as per edit hint */}
        </Modal>
        {/* Fullscreen image overlay removed as per edit hint */}
      </div>
    </CartProvider>
  );
}

export default App;

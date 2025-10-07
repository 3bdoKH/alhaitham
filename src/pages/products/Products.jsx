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
              productKey={product.key}
              idx={idx}
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
    <div className="products-page-bg">
      <Header searchValue={searchValue} onSearchChange={setSearchValue} />
      {/* Products Hero Section */}
      <section className="products-hero-section">
        <div className="products-hero-content">
          <h1 className="products-hero-title">كل منتجات الهيثم</h1>
          <p className="products-hero-desc">اكتشف مجموعتنا الكاملة من الأبواب المصفحة، أبواب الغرف، وأرضيات الباركيه التركي الأصلية. جودة عالية، أمان مضمون، تصميمات عصرية، وخدمة تركيب سريعة في جميع أنحاء مصر.</p>
          <button className="products-hero-cta" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>تصفح المنتجات</button>
        </div>
      </section>
      {/* Subtitle */}
      <div className="products-page-subtitle">اختر الفئة أو ابحث عن منتجك المفضل</div>
      <div className="products-main-content">
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={product.key}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: idx * 0.18 }}
          >

            <CategorySection product={product} onProductClick={handleProductClick} />
          </motion.div>
        ))}
      </div>
      {/* Why Shop With Us Section */}
      <section className="why-shop-section">
        <h2>لماذا تتسوق من الهيثم؟</h2>
        <div className="why-shop-features">
          <div className="why-shop-feature-item">
            <span className="why-shop-icon">🔒</span>
            <span className="why-shop-title">أمان مضمون</span>
            <span className="why-shop-desc">أبواب مصفحة أصلية مقاومة للصوت والأتربة والحريق</span>
          </div>
          <div className="why-shop-feature-item">
            <span className="why-shop-icon">🚚</span>
            <span className="why-shop-title">توصيل وتركيب سريع</span>
            <span className="why-shop-desc">خدمة تركيب احترافية وسريعة في جميع أنحاء مصر</span>
          </div>
          <div className="why-shop-feature-item">
            <span className="why-shop-icon">💬</span>
            <span className="why-shop-title">دعم واستشارة مجانية</span>
            <span className="why-shop-desc">فريقنا جاهز للرد على جميع استفساراتك ومساعدتك في الاختيار</span>
          </div>
          <div className="why-shop-feature-item">
            <span className="why-shop-icon">💵</span>
            <span className="why-shop-title">أسعار منافسة</span>
            <span className="why-shop-desc">أفضل سعر مقابل الجودة في السوق المصري</span>
          </div>
        </div>
      </section>
      {/* CTA Strip */}
      <section className="products-cta-strip">
        <span>هل تحتاج مساعدة في اختيار المنتج المناسب؟</span>
        <button className="products-cta-btn" onClick={() => window.open('https://wa.me/+201009507136')}>تواصل معنا عبر واتساب</button>
      </section>
      <Footer />
      <Modal isOpen={false} onClose={() => { }}>
        {/* Modal content removed as per edit hint */}
      </Modal>
      {/* Fullscreen image overlay removed as per edit hint */}
    </div>
  );
};

export default Products;

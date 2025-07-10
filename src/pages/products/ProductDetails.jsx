import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Helmet } from 'react-helmet-async';
import { useContext, useState, useEffect } from 'react';
import { CartContext } from '../../App';
import ProductCard from '../../components/productCard/ProductCard'; // Added import for ProductCard

const ProductDetails = () => {
  const { key, imgIdx } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext) || {};
  const [added, setAdded] = useState(false);
  const product = products.find(p => p.key === key);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [key, imgIdx]);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Header />
        <Helmet>
          <title>المنتج غير موجود | الهيثم</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <h1>المنتج غير موجود</h1>
        <button onClick={() => navigate('/products')}>عودة للمنتجات</button>
        <Footer />
      </div>
    );
  }

  // Determine which image to show as main
  let mainImgIdx = 0;
  if (imgIdx && !isNaN(Number(imgIdx)) && product.images[Number(imgIdx)]) {
    mainImgIdx = Number(imgIdx);
  }

  // Category-based description
  let categoryDescription = null;
  let categorySEO = '';
  switch (product.key) {
    case 'ironturkish':
    case 'ironturkishsizes-150':
    case 'ironturkishsizes-120':
      categoryDescription = (
        <div style={{background: '#e3e6f0', color: '#1a237e', borderRadius: 8, padding: '12px 18px', marginBottom: 18, fontWeight: 600, fontSize: 17}}>
          أبواب مصفحة تركي أصلية مستوردة، مقاومة للصوت والأتربة والحريق، مزودة بأحدث وسائل الأمان والتصميمات العصرية. أفضل جودة وأسرع تركيب في مصر.
        </div>
      );
      categorySEO = 'أبواب مصفحة تركي أصلية مستوردة، مقاومة للصوت والأتربة والحريق، مزودة بأحدث وسائل الأمان والتصميمات العصرية.';
      break;
    case 'sweden':
      categoryDescription = (
        <div style={{background: '#e3e6f0', color: '#1a237e', borderRadius: 8, padding: '12px 18px', marginBottom: 18, fontWeight: 600, fontSize: 17}}>
          أبواب خشب موسكي سويدي بطبقة PVC وحلق أكريليك، مقاومة للمياه والحرارة، مثالية للغرف والحمامات.
        </div>
      );
      categorySEO = 'أبواب خشب موسكي سويدي بطبقة PVC وحلق أكريليك، مقاومة للمياه والحرارة.';
      break;
    case 'barke':
      categoryDescription = (
        <div style={{background: '#e3e6f0', color: '#1a237e', borderRadius: 8, padding: '12px 18px', marginBottom: 18, fontWeight: 600, fontSize: 17}}>
          أرضيات باركيه HDF تركي عالية الجودة، متوفرة بمقاسات وتصنيفات متعددة، الوكيل الحصري لمصانع Peli - Legno في مصر.
        </div>
      );
      categorySEO = 'أرضيات باركيه HDF تركي عالية الجودة، متوفرة بمقاسات وتصنيفات متعددة.';
      break;
    default:
      categoryDescription = null;
      categorySEO = '';
  }

  // Example: Show a badge or extra info based on description keywords
  let extraInfo = null;
  if (product.description) {
    if (product.description.toLowerCase().includes('ضد الماء')) {
      extraInfo = <div style={{color: '#007bff', fontWeight: 'bold', marginBottom: 8}}>💧 هذا المنتج مقاوم للماء</div>;
    } else if (product.description.toLowerCase().includes('ضمان')) {
      extraInfo = <div style={{color: '#28a745', fontWeight: 'bold', marginBottom: 8}}>✅ يشمل ضمان</div>;
    }
  }

  // Theme colors
  const primary = '#1a237e'; // deep blue
  const accent = '#f9a825'; // gold/yellow accent
  const cardBg = '#fff';
  const shadow = '0 2px 16px rgba(30,34,60,0.10)';
  const border = '#e3e6f0';

  // SEO: title and meta description
  const pageTitle = `${product.size ? product.size + ' ' : ''}${product.title} | الهيثم للعمارة والديكور`;
  const metaDescription = `${product.title} - ${categorySEO} ${product.description ? product.description.replace(/\n/g, ' ').slice(0, 160) : ''}`;
  const canonicalUrl = typeof window !== 'undefined' ? window.location.origin + `/products/${product.key}${imgIdx ? `/${imgIdx}` : ''}` : '';
  const ogImage = product.images && product.images.length > 0 ? product.images[mainImgIdx] : '';
  const price = product.price?.current || product.price;
  const oldPrice = product.price?.old;
  const currency = 'EGP';
  const availability = price ? 'in stock' : 'out of stock';

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ key: product.key, idx: mainImgIdx, title: product.title, image: product.images[mainImgIdx], price, size: product.size });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };

  return (
    <div style={{ background: '#f4f6fa', minHeight: '100vh', direction: 'rtl' }}>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="الهيثم للعمارة والديكور" />
        <meta property="og:locale" content="ar_EG" />
        <meta property="og:url" content={canonicalUrl} />
        {/* Product meta */}
        <meta property="product:brand" content="الهيثم" />
        <meta property="product:availability" content={availability} />
        <meta property="product:condition" content="new" />
        <meta property="product:price:amount" content={price} />
        <meta property="product:price:currency" content={currency} />
        {oldPrice && <meta property="product:price:old_amount" content={oldPrice} />}
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:site" content="@souqelsafwa" />
      </Helmet>
      <Header />
      <main>
        <article style={{ maxWidth: 950, margin: '40px auto', background: cardBg, borderRadius: 16, boxShadow: shadow, padding: 32, display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-start' }}>
          {/* Product Image */}
          <figure style={{ flex: '1 1 340px', minWidth: 280, textAlign: 'center', margin: 0 }}>
            {product.images && product.images.length > 0 && (
              <img src={product.images[mainImgIdx]} alt={`${product.title} - ${product.size ? product.size : ''}`} style={{ width: '100%', maxWidth: 380, borderRadius: 12, marginBottom: 16, boxShadow: '0 2px 8px rgba(30,34,60,0.08)' }} />
            )}
          </figure>
          {/* Product Info */}
          <section style={{ flex: '2 1 340px', minWidth: 280, padding: '0 12px' }}>
            <h1 style={{ fontSize: 28, color: primary, marginBottom: 12, fontWeight: 700 }}>{product.size ? `${product.size} ` : ''}{product.title}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ fontSize: 26, color: accent, fontWeight: 700 }}>{product.price?.current || product.price} EGP</span>
              {product.price?.old && (
                <span style={{ textDecoration: 'line-through', color: '#888', fontSize: 18 }}>{product.price.old} EGP</span>
              )}
            </div>
            {extraInfo}
            {categoryDescription}
            <h2 style={{ fontSize: 20, color: primary, margin: '18px 0 8px 0', fontWeight: 600 }}>وصف المنتج</h2>
            <div style={{ fontSize: 18, color: '#222', margin: '0 0 24px 0', lineHeight: 1.7, background: '#f7f8fc', borderRadius: 8, padding: 16, border: `1px solid ${border}` }}>
              { product.key === 'barke' ? 
              <div>
                <p>باركيه</p>
                <p>الارضيات الباركيه hdf التركى</p>
                <p> الارضيات hdf التركى 8 ملى </p>
                <p>ارضيات تركى 8 ملى</p>
                <p>كلاس 21-31-32</p>
                <p>الوكيل الحصرى فى مصر لمصانع ارضيات peli - Legno</p>
              </div> :product.description}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', marginBottom: 18 }}>
              <button
                className="product-card__add-btn"
                style={{
                  background: primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  padding: '12px 32px',
                  fontSize: 20,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 1px 4px rgba(30,34,60,0.10)',
                  transition: 'background 0.2s',
                }}
                onClick={() => window.open('https://wa.me/+201009507136')}
              >
                شراء الآن
              </button>
              
              <button
                className="product-card__add-btn"
                style={{ background: '#1a237e', color: '#fff', marginTop: 8, fontSize: 18, fontWeight: 600, padding: '12px 32px' }}
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? 'تمت الإضافة!' : 'أضف إلى السلة'}
              </button>
            </div>
            {product.size && <div style={{ marginTop: 8, color: '#555', fontSize: 16 }}>المقاس: {product.size}</div>}
          </section>
        </article>
      </main>
      {/* Related Products Section */}
      <section style={{ maxWidth: 1100, margin: '0 auto 48px auto', background: '#fff', borderRadius: 16, boxShadow: shadow, padding: 24, direction: 'rtl' }}>
        <h2 style={{ fontSize: 24, color: primary, fontWeight: 700, marginBottom: 18, textAlign: 'right' }}>منتجات ذات صلة</h2>
        <div style={{ display: 'flex', gap: 24, overflowX: 'auto', paddingBottom: 8 }}>
          {products
            .filter(p => p.key !== product.key)
            .sort(() => 0.5 - Math.random())
            .slice(0, 5)
            .map((related, idx) => (
              <div key={related.key} style={{ minWidth: 260, flex: '0 0 260px', cursor: 'pointer' }}
                onClick={() => {
                  // Go to first image of related product
                  navigate(`/products/${related.key}/0`);
                }}
              >
                <ProductCard
                  image={related.images && related.images[0]}
                  title={related.size ? `${related.size} ${related.title}` : related.title}
                  price={related.price?.current || related.price}
                  oldPrice={related.price?.old}
                  isOnSale={!!related.price?.old}
                  size={related.size}
                  productKey={related.key}
                  idx={0}
                />
              </div>
            ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductDetails; 
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data';
import ProductCard from '../../components/productCard/ProductCard';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

const ProductDetails = () => {
  const { key, imgIdx } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.key === key);

  if (!product) {
    return (
      <div style={{ padding: 40, textAlign: 'center' }}>
        <Header />
        <h2>المنتج غير موجود</h2>
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

  // Example: Show a badge or extra info based on description keywords
  let extraInfo = null;
  if (product.description) {
    if (product.description.toLowerCase().includes('ضد الماء')) {
      extraInfo = <div style={{color: '#007bff', fontWeight: 'bold', marginBottom: 8}}>💧 هذا المنتج مقاوم للماء</div>;
    } else if (product.description.toLowerCase().includes('ضمان')) {
      extraInfo = <div style={{color: '#28a745', fontWeight: 'bold', marginBottom: 8}}>✅ يشمل ضمان</div>;
    }
  }

  return (
    <div>
      <Header />
      <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(30,34,60,0.08)', padding: 32 }}>
        <h2 style={{ marginBottom: 16 }}>{product.size} {product.title}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ flex: '1 1 320px', minWidth: 280 }}>
            {product.images && product.images.length > 0 && (
              <img src={product.images[mainImgIdx]} alt={product.title} style={{ width: '100%', maxWidth: 400, borderRadius: 8, marginBottom: 16 }} />
            )}
          </div>
          <div style={{ flex: '2 1 320px', minWidth: 280 }}>
            <div style={{ fontSize: 22, margin: '8px 0' }}>{product.price?.current || product.price} {product.price?.old && <span style={{ textDecoration: 'line-through', color: '#888', marginLeft: 8 }}>{product.price.old} EGP</span>}</div>
            {extraInfo}
            <p style={{ whiteSpace: 'pre-line', marginTop: 16 }}>{product.description}</p>
            {product.size && <div style={{ marginTop: 8 }}>المقاس: {product.size}</div>}
            <button
              className="product-card__add-btn"
              style={{ marginTop: 24 }}
              onClick={() => window.open('https://wa.me/+201009507136')}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetails; 
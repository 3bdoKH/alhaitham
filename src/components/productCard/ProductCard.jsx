import React from 'react'
import './productcard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useContext, useState } from 'react';
import { CartContext } from '../../App';

library.add(faWhatsapp)

const ProductCard = ({ image, title, price, oldPrice, isOnSale, size, productKey, idx = 0 }) => {
  const buyNow = () => {
    window.open("https://wa.me/+201009507136")
  }
  const { addToCart } = useContext(CartContext) || {};
  const [added, setAdded] = useState(false);
  const handleAddToCart = () => {
    if (addToCart) {
      addToCart({ key: productKey, idx, title, image, price, size });
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  };
  return (
    <div className="product-card">
      {isOnSale && <div className="product-card__badge">SALE</div>}
      <div className="product-card__shipping-badge">شحن مجاني</div>
      <div className="product-card__image-wrapper">
        <img src={image} alt={title} className="product-card__image" />
      </div>
      <div className="product-card__title">{title}</div>
      {size && <div className="product-card__size">المقاس: {size}</div>}
      <div className="product-card__prices">
        {price && <span className="product-card__price">{price} EGP</span>}
        {oldPrice && <span className="product-card__old-price">{oldPrice} EGP</span>}
      </div>
      <button className="product-card__add-btn" onClick={buyNow}>
        Buy Now <span className="product-card__cart-icon"><FontAwesomeIcon icon={faWhatsapp} /></span>
      </button>
      <button className="product-card__add-btn" style={{ background: '#1a237e', color: '#fff', marginTop: 8 }} onClick={handleAddToCart} disabled={added}>
        {added ? 'تمت الإضافة!' : 'أضف إلى السلة'}
      </button>
    </div>
  )
}

export default ProductCard

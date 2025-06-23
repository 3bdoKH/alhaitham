import React from 'react'
import './productcard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faWhatsapp)

const ProductCard = ({ image, title, price, oldPrice, isOnSale, size }) => {
  const buyNow = () => {
    window.open("https://facebook.com")
  }
  return (
    <div className="product-card">
      {isOnSale && <div className="product-card__badge">SALE</div>}
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
    </div>
  )
}

export default ProductCard

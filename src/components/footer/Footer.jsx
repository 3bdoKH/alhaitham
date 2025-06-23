import React from 'react'
import './footer.css'
import { Link } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-site-name">Elhaitham</span>
        </div>
        <div className="footer-center">
          <a href="/" className="footer-link">Home</a>
          <a href="/products" className="footer-link">Products</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>
        <div className="footer-right">
          <span>&copy; {new Date().getFullYear()} Elhaitham. All rights reserved. Designed By <a href='https://emereld.vercel.app'>EMERELD</a></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer

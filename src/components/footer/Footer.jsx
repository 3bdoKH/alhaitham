import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { navItems } from '../../data'
const Footer = () => {
  return (
    <footer className="footer new-footer-layout">
      <div className="footer-logo">
        {/* Replace src with your actual logo path if needed */}
        <img src="/logo.png" alt="Logo" className="footer-logo-img" />
      </div>
      <nav className="footer-nav">
      {navItems.map((item) => (
            <a className='footer-nav-link' key={item.name} href={item.link} >{item.name}</a>
          ))}
      </nav>
      <div className="footer-socials">
        <a className="footer-social-icon" href="https://www.facebook.com/share/1LbAFAF3RZ/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a className="footer-social-icon" href="https://wa.me/+201009507136" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faWhatsapp} />
        </a>
      </div>
      <p>@2025 Alhaitham, Developed by <a href="https://emereld.vercel.app/" >EMERELD</a></p>
    </footer>
  )
}

export default Footer

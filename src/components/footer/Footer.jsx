import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <span className="footer-site-name">Elhaitham</span>
        </div>
        <div className="footer-center">
        <a className='footer-link' href="https://www.facebook.com/share/1LbAFAF3RZ/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
        <a className='footer-link' href="https://wa.me/+201009507136" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
        </div>
        <div className="footer-right">
          <span>&copy; {new Date().getFullYear()} Elhaitham. All rights reserved. Designed By <a href='https://emereld.vercel.app'>EMERELD</a></span>
        </div>
      </div>
      
    </footer>

  )
}

export default Footer

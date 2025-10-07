import React from 'react'
import './footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { navItems } from '../../data'

const Footer = () => {
  return (
    <footer className="footer new-footer-layout">
      <div className="footer-main">
        <div className="footer-col footer-about">
          <div className="footer-brand">
            <img src="/logo.png" alt="Logo" className="footer-logo-img" />
            <span>Alhaitham Doors</span>
          </div>
          <p className="footer-about-text">
            الهيثم للعمارة والديكور - أبواب مصفحة تركي أصلية، أبواب غرف، أرضيات باركيه HDF، أفضل جودة وأسرع تركيب في مصر. منتجات أصلية مستوردة، مقاومة للصوت والأتربة والحريق، مزودة بأحدث وسائل الأمان والتصميمات العصرية.
          </p>
        </div>
        <div className="footer-col footer-links">
          <h4>روابط سريعة</h4>
          <ul>
            {navItems.map((item) => (
              <li key={item.name}><a href={item.link}>{item.name}</a></li>
            ))}
            <li><a href="/cart">سلة المشتريات</a></li>
            <li><a href="/contact">تواصل معنا</a></li>
          </ul>
        </div>
        <div className="footer-col footer-contact">
          <h4>معلومات التواصل</h4>
          <ul>
            <li>📞 <a href="tel:01009507136">01009507136</a></li>
            <li>💬 <a href="https://wa.me/201009507136" target="_blank" rel="noopener noreferrer">واتساب</a></li>
            <li>📧 <a href="mailto:haithamk280@gmail.com">haithamk280@gmail.com</a></li>
            <li>📍 Nasr City، Cairo</li>
          </ul>
          <div className="footer-cta-btns">
            <a href="https://wa.me/201009507136" target="_blank" rel="noopener noreferrer" className="footer-cta-btn whatsapp">تواصل عبر واتساب</a>
            <a href="https://www.facebook.com/share/1LbAFAF3RZ/" target="_blank" rel="noopener noreferrer" className="footer-cta-btn facebook">راسلنا على فيسبوك</a>
          </div>
        </div>
        <div className="footer-col footer-socials">
          <h4>تابعنا</h4>
          <div className="footer-social-icons">
            <a href="https://www.facebook.com/share/1LbAFAF3RZ/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
            <a href="https://wa.me/201009507136" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>@2025 Alhaitham. Developed by <a href="https://emereld-marketing.online">Adam's Agency</a></p>
        <button className="back-to-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} title="العودة للأعلى">↑</button>
      </div>
    </footer>
  )
}

export default Footer

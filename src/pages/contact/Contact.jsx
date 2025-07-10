import React from 'react'
import './Contact.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'

const Contact = () => {
    return (
        <div>
            <Header />
            {/* Hero Section */}
            <section className="contact-hero-section">
                <div className="contact-hero-content">
                    <span className="contact-hero-icon">📞</span>
                    <h1 className="contact-hero-title">تواصل معنا الآن</h1>
                    <p className="contact-hero-desc">نحن هنا للإجابة على جميع استفساراتك ومساعدتك في اختيار أفضل المنتجات لمنزلك أو شركتك.</p>
                </div>
            </section>
            {/* Contact Card & Form */}
            <div className="contact-main-wrapper">
                <div className="contact-card">
                    <h2 className="contact-title">معلومات التواصل</h2>
                    <div className="contact-info-list">
                        <div className="contact-info-item"><span className="contact-icon">📞</span><span className="contact-label">رقم الهاتف :</span><a href="tel:01009507136" className="contact-link">01009507136</a></div>
                        <div className="contact-info-item"><span className="contact-icon">💬</span><span className="contact-label">واتساب :</span><a href="https://wa.me/201009507136" target="_blank" rel="noopener noreferrer" className="contact-link">01009507136</a></div>
                        <div className="contact-info-item"><span className="contact-icon">📧</span><span className="contact-label">البريد الإلكتروني :</span><a href="mailto:haithamk280@gmail.com" className="contact-link">haithamk280@gmail.com</a></div>
                        <div className="contact-info-item"><span className="contact-icon">🌐</span><span className="contact-label">فيسبوك :</span><a href="https://www.facebook.com/share/1LbAFAF3RZ/" target="_blank" rel="noopener noreferrer" className="contact-link">alhaitham</a></div>
                        <div className="contact-info-item"><span className="contact-icon">📍</span><span className="contact-label">الموقع :</span><span className="contact-link">Nasr City، Cairo Governorate، Egypt</span></div>
                    </div>
                    <div className="contact-cta-btns">
                        <a href="https://wa.me/201009507136" target="_blank" rel="noopener noreferrer" className="contact-cta-btn whatsapp">تواصل عبر واتساب</a>
                        <a href="https://www.facebook.com/share/1LbAFAF3RZ/" target="_blank" rel="noopener noreferrer" className="contact-cta-btn facebook">راسلنا على فيسبوك</a>
                    </div>
                </div>
                <div className="contact-form-card">
                    <h2 className="contact-title">أرسل رسالة مباشرة</h2>
                    <form className="contact-form" onSubmit={e => { e.preventDefault(); alert('تم إرسال رسالتك!'); }}>
                        <input type="text" className="contact-input" placeholder="الاسم" required />
                        <input type="tel" className="contact-input" placeholder="رقم الهاتف" required />
                        <textarea className="contact-input" placeholder="رسالتك" rows={4} required />
                        <button type="submit" className="contact-send-btn">إرسال</button>
                    </form>
                </div>
            </div>
            {/* Map Section */}
            <div className="contact-map-section">
                <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.010964479836!2d31.33007631511513!3d30.05614298187606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583e1b2e2e2e2e%3A0x2e2e2e2e2e2e2e2e!2sNasr%20City%2C%20Cairo%20Governorate%2C%20Egypt!5e0!3m2!1sen!2seg!4v1680000000000!5m2!1sen!2seg"
                    width="100%"
                    height="320"
                    style={{ border: 0, borderRadius: 16 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
            <Footer />
        </div>
    )
}

export default Contact

import React from 'react'
import './Contact.css'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
const Contact = () => {
    return (
        <div>
            <Header />
            <div className="contact-container">
                <h2 className="contact-title">تواصل معنا</h2>
                <p className="contact-overview">
                    ابواب مصفحه مستوردة تركى تصفيح كامل لامان بيتك وحفظ ممتلكاتك عالية الجوده
                </p>
                <div className="contact-info-list">
                    <div className="contact-info-item">
                        <span className="contact-icon">📞</span>
                        <span className="contact-label">رقم الهاتف :</span>
                        <a href="tel:01009507136" className="contact-link">01009507136</a>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-icon">💬</span>
                        <span className="contact-label">واتساب :</span>
                        <a href="https://wa.me/201009507136" target="_blank" rel="noopener noreferrer" className="contact-link">01009507136</a>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-icon">📍</span>
                        <span className="contact-label">الموقع :</span>
                        <span className="contact-link">Nasr City، Cairo Governorate، Egypt</span>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-icon">📧</span>
                        <span className="contact-label">البريد الإلكتروني :</span>
                        <a href="mailto:haithamk280@gmail.com" className="contact-link">haithamk280@gmail.com</a>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-icon">🌐</span>
                        <span className="contact-label">فيسبوك :</span>
                        <a href="https://www.facebook.com/share/1LbAFAF3RZ/" target="_blank" rel="noopener noreferrer" className="contact-link">alhaitham</a>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Contact

import React, { useState, useRef, useEffect, useContext } from 'react'
import './header.css'
import { navItems } from '../../data'
import logo from '../../logo.png'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom';
import { CartContext } from '../../App';
import { faFacebook, faWhatsapp} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const socialLinks = [
  { icon: faWhatsapp, url: 'https://wa.me/+201009507136' },
  { icon: faFacebook, url: 'https://www.facebook.com/share/1LbAFAF3RZ/' },
];

const Header = ({ searchValue, onSearchChange }) => {
  const { cart } = useContext(CartContext) || {};
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleMenuToggle = () => setMenuOpen((open) => !open)
  const handleSearchToggle = () => setSearchOpen((open) => !open)
  const handleMobileNavToggle = () => setMobileNavOpen(open => !open);

  useEffect(() => {
    if (!searchOpen) return;
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);

  return (
    <>
      {/* Top Bar */}
      <div className="header-top-bar">
        <div className="header-social-icons">
          {socialLinks.map((s, i) => (
            <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="header-social-icon-link">
              <FontAwesomeIcon icon={s.icon} />
            </a>
          ))}
        </div>
        <div className="header-site-title">سوق الهيثم.. السوق جوا بيتك</div>
        <nav className="header-nav-links">
          <ul className="header-nav-list">
            {navItems.map((item) => (
              <li key={item.name} className="header-nav-item">
                <Link to={item.link} className="header-nav-link">{item.name}</Link>
              </li>
            ))}
          </ul>
          {/* Hamburger for mobile */}
          <button className="header-nav-hamburger" onClick={handleMobileNavToggle} aria-label="Open menu">
            <span className="header-nav-hamburger-icon" />
          </button>
          {/* Mobile Dropdown */}
          {mobileNavOpen && (
            <div className="header-nav-mobile-dropdown">
              <ul>
                {navItems.map((item) => (
                  <li key={item.name} onClick={() => setMobileNavOpen(false)}>
                    <Link to={item.link} className="header-nav-link">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
      <header className="header">
        {/* Second Row: Logo, Search, Cart/Price */}
        <div className="header-second-row">
          <div className="header-logo-box header-brand">
            <Link to="/">
              <img src={logo} alt="Logo" className="header-logo-img" />
            </Link>
            <span className="header-brand-name">Alhaitham Doors</span>
          </div>
          <div className="header-search-cart-box">
            <div className="header-search-bar">
              <input
                type="text"
                className="header__search-input"
                placeholder="ابحث عن المنتجات"
                value={searchValue}
                onChange={e => onSearchChange(e.target.value)}
                aria-label="ابحث عن منتج"
              />
              <button className="header-search-btn"><Search className='search-icon' /></button>
            </div>
            <div className="header-cart-price-box">
              <span className="header-cart-price">EGP{cart && cart.length > 0 ? cart.reduce((sum, i) => sum + (i.price * (i.quantity || 1)), 0).toFixed(2) : '0.00'}</span>
              <Link to="/cart" className="header__cart-link" style={{ position: 'relative', marginLeft: 12, display: 'flex', alignItems: 'center' }}>
                <span style={{ fontSize: 28, color: '#FFD34E' }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD34E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6"/></svg>
                </span>
                {cart && cart.length > 0 && (
                  <span style={{ position: 'absolute', top: -6, right: -6, background: '#e53935', color: '#fff', borderRadius: '50%', fontSize: 13, fontWeight: 700, padding: '2px 7px', minWidth: 22, textAlign: 'center', boxShadow: '0 1px 4px rgba(30,34,60,0.10)' }}>{cart.reduce((sum, i) => sum + (i.quantity || 1), 0)}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
        {/* ...existing nav/search/menu code can be hidden or refactored as needed... */}
      </header>
    </>
  )
}

export default Header

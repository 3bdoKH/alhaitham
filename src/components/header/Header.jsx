import React, { useState } from 'react'
import './header.css'
import { navItems } from '../../data'
import logo from '../../logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'

const Header = ({ searchValue, onSearchChange }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const handleMenuToggle = () => setMenuOpen((open) => !open)
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="header__search-container">
        <input
          type="text"
          className="header__search-input"
          placeholder="ابحث عن منتج..."
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="ابحث عن منتج"
        />
      </div>
      <button
        className="header__menu-toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="header-nav"
        onClick={handleMenuToggle}
      >
        <span className="header__menu-icon" />
      </button>
      <nav
        className={`header__nav${menuOpen ? ' header__nav--open' : ''}`}
        id="header-nav"
      >
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <a href={item.link} onClick={() => setMenuOpen(false)}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header__social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faWhatsapp} /></a>
        
      </div>
    </header>
  )
}

export default Header

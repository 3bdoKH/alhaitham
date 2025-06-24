import React, { useState, useRef, useEffect } from 'react'
import './header.css'
import { navItems } from '../../data'
import logo from '../../logo.png'
import { Search } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = ({ searchValue, onSearchChange }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef(null)

  const handleMenuToggle = () => setMenuOpen((open) => !open)
  const handleSearchToggle = () => setSearchOpen((open) => !open)

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
    <header className="header">
        <button
          className="header__menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="header-nav"
          onClick={handleMenuToggle}
        >
          <span className="header__menu-icon" />
        </button>
      <div className="header__logo">
        <Link to="/">
        <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div
        className={`header__search-container${searchOpen ? ' header__search--open' : ''}`}
        ref={searchRef}
      >
          <input
            type="text"
            className="header__search-input"
            placeholder="ابحث عن منتج..."
            value={searchValue}
            onChange={e => onSearchChange(e.target.value)}
            aria-label="ابحث عن منتج"
            style={{ display: searchOpen ? undefined : undefined }}
          />
          <Search className='search-icon' onClick={handleSearchToggle}/>
      </div>
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
    </header>
  )
}

export default Header

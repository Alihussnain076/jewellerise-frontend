import React, { useState, useEffect } from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <div className="logo-wrapper">
            <span className="logo-main">JEWELLERISE</span>
            <span className="logo-badge">LUXURY</span>
          </div>
          <div className="logo-glow"></div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/shop" className="nav-link" onClick={() => setMobileOpen(false)}>Shop</Link>
          <Link to="/about" className="nav-link" onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/services" className="nav-link" onClick={() => setMobileOpen(false)}>Services</Link>
          <Link to="/contact" className="nav-link" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link to="/faq" className="nav-link" onClick={() => setMobileOpen(false)}>FAQ</Link>
          
          {user ? (
            <div className="user-menu">
              <div className="user-avatar">
                <span>{user.name?.charAt(0).toUpperCase()}</span>
              </div>
              <div className="user-dropdown">
                <div className="user-info">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <button onClick={handleLogout} className="logout-btn">
                  <span className="logout-icon">←</span>
                  <span>Exit</span>
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="nav-link login-link" onClick={() => setMobileOpen(false)}>
              <span className="login-text">ACCESS</span>
            </Link>
          )}
          
          <Link to="/cart" className="nav-link cart-link" onClick={() => setMobileOpen(false)}>
            <span className="cart-text">CART</span>
            {cartCount > 0 && (
              <span className="cart-count-badge">
                <span className="cart-count">{cartCount}</span>
              </span>
            )}
          </Link>
          
          {/* <Link to="/admin" className="nav-link admin-link" onClick={() => setMobileOpen(false)}>
            <span className="admin-text">ADMIN</span>
          </Link> */}
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${mobileOpen ? 'active' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
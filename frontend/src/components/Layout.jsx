import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaUserCircle } from 'react-icons/fa';
import { Menu, MenuItem, IconButton } from '@mui/material';

function Layout({ children }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleProfileClose = () => setAnchorEl(null);
  return (
    <div className="page-container">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Rently Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
        </Link>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/features" className="nav-link">Features</Link>
          <Link to="/faq" className="nav-link">FAQ</Link>
        </div>
        <div className="profile-icon" style={{ marginLeft: '2rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleProfileClick} size="large">
            <FaUserCircle size={30} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleProfileClose}>
            <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
            <MenuItem onClick={handleProfileClose}>Logout</MenuItem>
          </Menu>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact</h3>
            <a href="mailto:support@rently.com">support@rently.com</a>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaFacebook /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link"><FaLinkedin /></a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <a href="/terms">Terms</a> / <a href="/privacy">Privacy</a>
          </div>
        </div>
        <div className="copyright">
          © 2025 Rently. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Layout; 
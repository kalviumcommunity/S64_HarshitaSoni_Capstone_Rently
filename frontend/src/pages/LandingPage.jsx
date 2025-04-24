import React from 'react';
import { FaHome, FaUsers, FaMoneyBillWave, FaTools, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Map from '../components/Map';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="page-container">
      <nav className="navbar">
        <a href="/" className="logo">
          <img src="/logo.png" alt="Rently Logo" style={{ height: '65px', width: 'auto', objectFit: 'contain' }} />
        </a>
        <div className="nav-links">
          <a href="/" className="nav-link">Home</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/features" className="nav-link">Features</a>
          <a href="/faq" className="nav-link">FAQ</a>
        </div>
      </nav>
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="title">Manage Rentals Effortlessly with Rently</h1>
          <p className="subtitle">
            For landlords and tenants—track rent, properties, and payments all in one place.
          </p>
          <div className="button-group">
            <a href="/signup" className="button primary">Get Started</a>
            <a href="/login" className="button secondary">Login</a>
          </div>
        </div>
        <Map />
      </section>

      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="card-content">
              <div className="feature-icon">
                <FaHome />
              </div>
              <h3 className="feature-title">Property Management</h3>
              <p className="feature-description">
                Easily manage your properties, units, and tenants all in one place.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="card-content">
              <div className="feature-icon">
                <FaUsers />
              </div>
              <h3 className="feature-title">Tenant Portal</h3>
              <p className="feature-description">
                Give tenants access to pay rent, submit maintenance requests, and view lease info.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="card-content">
              <div className="feature-icon">
                <FaMoneyBillWave />
              </div>
              <h3 className="feature-title">Rent Collection</h3>
              <p className="feature-description">
                Secure online rent payments with automatic tracking and reminders.
              </p>
            </div>
          </div>

          <div className="feature-card">
            <div className="card-content">
              <div className="feature-icon">
                <FaTools />
              </div>
              <h3 className="feature-title">Maintenance</h3>
              <p className="feature-description">
                Streamline maintenance requests and track their progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Contact Us</h3>
            <a href="mailto:support@rently.com">support@rently.com</a>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <FaLinkedin />
              </a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Legal</h3>
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
        <div className="copyright">
          © 2025 Rently. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage; 
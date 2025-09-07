import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>HomeHarmony</h3>
          <p>Organize your world, one task at a time.</p>
        </div>

        <nav className="footer-links">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </nav>

        <div className="footer-social">
          <p>Connect with us:</p>
          <div className="social-icons">
            <a href="https://facebook.com" aria-label="Facebook">🌐</a>
            <a href="https://twitter.com" aria-label="Twitter">🐦</a>
            <a href="https://instagram.com" aria-label="Instagram">📸</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} HomeHarmony. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

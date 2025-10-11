import React from 'react';
import './Header.css'; // Using Header.css for shared styles

const Footer = () => {
  // Styles are defined in Header.css to ensure visual consistency
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>HomeHarmony</h3>
            <p>Organize your world, one task at a time.</p>
          </div>

          <nav className="footer-links">
            {/* These links are now anchor links intended for the Header.jsx scroll function */}
            <a href="#home">Home</a>
            <a href="#team">Team</a>
            <a href="#project">Solution</a>
            <a href="#features">Features</a>
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
      </div>
    </footer>
  );
};

export default Footer;

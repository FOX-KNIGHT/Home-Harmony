import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {

return (
    <footer className="footer animate-on-scroll">
        <div className="container">
            <div className="footer-content">
                <div className="footer-section">
                    <h4>Models</h4>
                    <ul>
                        <li><a href="#">911</a></li>
                        <li><a href="#">Taycan</a></li>
                        <li><a href="#">Panamera</a></li>
                        <li><a href="#">Macan</a></li>
                        <li><a href="#">Cayenne</a></li>
                        <li><a href="#">718</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="#">Porsche Approved</a></li>
                        <li><a href="#">Financing</a></li>
                        <li><a href="#">Maintenance</a></li>
                        <li><a href="#">Warranty</a></li>
                        <li><a href="#">Roadside Assistance</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Experience</h4>
                    <ul>
                        <li><a href="#">Porsche Experience</a></li>
                        <li><a href="#">Motorsport</a></li>
                        <li><a href="#">Porsche Clubs</a></li>
                        <li><a href="#">Events</a></li>
                        <li><a href="#">Museum</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Porsche</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Sustainability</a></li>
                        <li><a href="#">Investor Relations</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">Cookie Settings</a>
                    <a href="#">Contact</a>
                </div>
                <div className="footer-social">
                    <a href="#" className="social-link">Facebook</a>
                    <a href="#" className="social-link">Instagram</a>
                    <a href="#" className="social-link">Twitter</a>
                    <a href="#" className="social-link">YouTube</a>
                </div>
            </div>
            <div className="footer-copyright">
                <p>&copy; 2025 Porsche Cars North America, Inc. All rights reserved.</p>
            </div>
        </div>
    </footer>
);
};

export default Footer;
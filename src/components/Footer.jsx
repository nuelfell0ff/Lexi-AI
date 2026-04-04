import React from 'react'
import './Footer.css'
import logo from '../assets/Lexi-Ai-No-bg.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Logo & Tagline Section */}
          <div className="footer-section footer-branding">
            <div className="footer-logo">
              <img src={logo} alt="Lexi AI Logo" className="footer-logo-img" />
            </div>
            <p className="footer-tagline">AI-Powered Health Assistance</p>
            <ul className="footer-features">
              <li>AI-Powered Health Assistance</li>
              <li>24/7 WhatsApp Support</li>
              <li>Smart & Personalized Care</li>
            </ul>
          </div>

          {/* Navigation Links Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#faq">FAQs</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="footer-section footer-social-section">
            <h4 className="footer-section-title">Connect With Us</h4>
            <div className="social-icons">
              <a
                href="https://wa.link/7laj6q"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="WhatsApp"
              >
                <i className="bi bi-whatsapp"></i>
              </a>
              <a
                href="https://youtube.com/@medxverse?si=2lDD-E0pcMNAOnat"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="YouTube"
              >
                <i className="bi bi-youtube"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/medxverse/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="LinkedIn"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/medxverseapp?igsh=aXlyMnllbjlpbTN3&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                title="Instagram"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-legal-links">
            <a href="https://medxverseapp.com/user-consent" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>
            <span className="divider">|</span>
            <a href="https://medxverseapp.com/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            <span className="divider">|</span>
            <a href="https://medxverseapp.com/terms-of-service" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
          </div>
          <div className="footer-copyright">
            <p>&copy; {currentYear} Lexi AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

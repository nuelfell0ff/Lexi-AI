import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import logo from '../assets/Lexi-Ai-No-bg.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer-container">
      <div className="footer-wrapper">
        {/* Logo & Branding - Top Center */}
        <div className="footer-top-branding">
          <div className="footer-logo">
            <img src={logo} alt="Lexi AI Logo" className="footer-logo-img" />
          </div>
          <p className="footer-tagline">Powered by MedxVerse Telemedicine & Virtual Care Ltd</p>
        </div>

        {/* Main Footer Content - Grid Layout */}
        <div className="footer-content">
          {/* Company Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Lexi AI</Link></li>
              <li><Link to="/about-medxverse">About MedxVerse</Link></li>
              <li><Link to="/leadership">Leadership & Team</Link></li>
              <li><Link to="/careers">Careers</Link></li>
              <li><Link to="/press">Press & Media</Link></li>
              <li><Link to="/blog">Blog / Insights</Link></li>
              <li><Link to="/newsroom">Newsroom</Link></li>
            </ul>
          </div>

          {/* Products & Solutions Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Products & Solutions</h4>
            <ul className="footer-links">
              <li><Link to="/ai-symptom-checker">AI Symptom Checker</Link></li>
              <li><Link to="/virtual-health-assistant">Virtual Health Assistant</Link></li>
              <li><Link to="/chronic-disease-management">Chronic Disease Management</Link></li>
              <li><Link to="/mental-health-support">Mental Health Support</Link></li>
              <li><Link to="/womens-health">Women's Health</Link></li>
              <li><Link to="/preventive-health-monitoring">Preventive Health Monitoring</Link></li>
              <li><Link to="/api-developer-platform">API & Developer Platform</Link></li>
            </ul>
          </div>

          {/* Partners & Enterprise Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Partners & Enterprise</h4>
            <ul className="footer-links">
              <li><Link to="/partner-with-lexi-ai">Partner with Lexi AI</Link></li>
              <li><Link to="/healthcare-providers">Healthcare Providers</Link></li>
              <li><Link to="/governments-and-public-health">Governments & Public Health</Link></li>
              <li><Link to="/ngos-and-global-health">NGOs & Global Health</Link></li>
              <li><Link to="/insurance-and-fintech">Insurance & Fintech</Link></li>
              <li><Link to="/pharmaceutical-partnerships">Pharmaceutical Partnerships</Link></li>
              <li><Link to="/corporate-wellness">Corporate Wellness</Link></li>
            </ul>
          </div>

          {/* Trust, Safety & Compliance Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Trust & Compliance</h4>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/data-protection-and-security">Data Protection & Security</Link></li>
              <li><Link to="/ai-ethics-responsible-ai">AI Ethics & Responsible AI</Link></li>
              <li><Link to="/medical-disclaimer">Medical Disclaimer</Link></li>
              <li><Link to="/regulatory-compliance">Regulatory Compliance</Link></li>
              <li><Link to="/hipaa-gdpr-alignment">HIPAA / GDPR Alignment</Link></li>
              <li><Link to="/terms-of-service">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact & Location Section with Social Media */}
          <div className="footer-section footer-contact">
            <h4 className="footer-section-title">Contact & Location</h4>
            <ul className="footer-links">
              <li><a href="mailto:chatlexi@medxverseapp.com">Email: chatlexi@medxverseapp.com</a></li>
              <li><a href="tel:+234 901 808 8712">Phone: +234 901 808 8712</a></li>
              <li>Global Offices (Coming Soon)</li>
            </ul>

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
          <div className="footer-copyright">
            <p>&copy; {currentYear} Lexi AI. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

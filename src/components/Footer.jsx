import React from 'react'
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
              <li><a href="#about-lexi">About Lexi AI</a></li>
              <li><a href="#about-medxverse">About MedxVerse</a></li>
              <li><a href="#team">Leadership & Team</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press & Media</a></li>
              <li><a href="#blog">Blog / Insights</a></li>
              <li><a href="#newsroom">Newsroom</a></li>
            </ul>
          </div>

          {/* Products & Solutions Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Products & Solutions</h4>
            <ul className="footer-links">
              <li><a href="#symptom-checker">AI Symptom Checker</a></li>
              <li><a href="#health-assistant">Virtual Health Assistant</a></li>
              <li><a href="#chronic-disease">Chronic Disease Management</a></li>
              <li><a href="#preventive">Preventive Health Monitoring</a></li>
              <li><a href="#mental-health">Mental Health Support</a></li>
              <li><a href="#womens-health">Women's Health</a></li>
              <li><a href="#api">API & Developer Platform</a></li>
            </ul>
          </div>

          {/* Partners & Enterprise Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Partners & Enterprise</h4>
            <ul className="footer-links">
              <li><a href="#partner">Partner with Lexi AI</a></li>
              <li><a href="#providers">Healthcare Providers</a></li>
              <li><a href="#government">Governments & Public Health</a></li>
              <li><a href="#ngos">NGOs & Global Health</a></li>
              <li><a href="#insurance">Insurance & Fintech</a></li>
              <li><a href="#pharma">Pharmaceutical Partnerships</a></li>
              <li><a href="#wellness">Corporate Wellness</a></li>
            </ul>
          </div>

          {/* Trust, Safety & Compliance Section */}
          <div className="footer-section">
            <h4 className="footer-section-title">Trust & Compliance</h4>
            <ul className="footer-links">
              <li><a href="https://medxverseapp.com/privacy-policy">Privacy Policy</a></li>
              <li><a href="#data-protection">Data Protection & Security</a></li>
              <li><a href="#ai-ethics">AI Ethics & Responsible AI</a></li>
              <li><a href="#disclaimer">Medical Disclaimer</a></li>
              <li><a href="#compliance">Regulatory Compliance</a></li>
              <li><a href="#hipaa-gdpr">HIPAA / GDPR Alignment</a></li>
              <li><a href="https://medxverseapp.com/terms-of-service">Terms of Service</a></li>
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

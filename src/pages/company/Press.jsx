import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './Press.css'

const Press = () => {
  return (
    <>
      <Navbar />
      <div className="press-container">
        <div className="press-wrapper">
          {/* Hero Section */}
          <section className="press-hero">
            <h1 className="press-title">Press & Media</h1>
            <p className="press-subtitle">
              MedxVerse welcomes media enquiries from journalists and researchers covering health technology and AI.
            </p>
          </section>

          {/* Main Content */}
          <section className="press-content">
            {/* Press Contact Section */}
            <div className="press-section">
              <h2 className="press-section-title">Press Contact</h2>
              <div className="press-contact-box">
                <div className="contact-item">
                  <p className="contact-label">General Enquiries:</p>
                  <p className="contact-value">
                    <a href="mailto:support@medxverseapp.com">support@medxverseapp.com</a>
                  </p>
                </div>
                <div className="contact-item">
                  <p className="contact-label">CEO Interviews:</p>
                  <p className="contact-value">
                    <a href="mailto:ceo@medxverseapp.com">ceo@medxverseapp.com</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time Section */}
            <div className="press-section">
              <h2 className="press-section-title">Response Time</h2>
              <div className="response-time-box">
                <p className="response-text">Within 24 business hours</p>
              </div>
            </div>

            {/* Key Facts Section */}
            <div className="press-section">
              <h2 className="press-section-title">Key Facts</h2>
              <div className="key-facts-grid">
                <div className="fact-card">
                  <p className="fact-label">Founded</p>
                  <p className="fact-value">2025</p>
                </div>
                <div className="fact-card">
                  <p className="fact-label">Location</p>
                  <p className="fact-value">Nigeria</p>
                </div>
                <div className="fact-card">
                  <p className="fact-label">Users</p>
                  <p className="fact-value">2,000+</p>
                </div>
                <div className="fact-card">
                  <p className="fact-label">Platform</p>
                  <p className="fact-value">Lexi AI</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Press

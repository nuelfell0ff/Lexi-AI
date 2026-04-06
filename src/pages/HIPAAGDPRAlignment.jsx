import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './HIPAAGDPRAlignment.css'

const HIPAAGDPRAlignment = () => {
  return (
    <>
      <Navbar />
      <div className="hipaa-gdpr-container">
        <div className="hipaa-gdpr-wrapper">
          {/* Hero Section */}
          <section className="hipaa-gdpr-hero">
            <h1 className="hipaa-gdpr-title">HIPAA / GDPR ALIGNMENT</h1>
            <p className="hipaa-gdpr-subtitle">
              International data protection standards and alignment
            </p>
          </section>

          {/* Main Content */}
          <section className="hipaa-gdpr-content">
            {/* Intro */}
            <div className="hipaa-gdpr-intro">
              <p>
                MedxVerse is primarily governed by NDPR but aligns with global standards.
              </p>
            </div>

            {/* GDPR Alignment */}
            <div className="alignment-section">
              <h2 className="alignment-section-title">GDPR Alignment</h2>

              <div className="alignment-box gdpr-box">
                <ul className="alignment-list">
                  <li>Lawful data processing</li>
                  <li>Data minimisation</li>
                  <li>Right to erasure</li>
                  <li>Data portability</li>
                  <li>Privacy by design</li>
                </ul>
              </div>
            </div>

            {/* HIPAA Alignment */}
            <div className="alignment-section">
              <h2 className="alignment-section-title">HIPAA Alignment</h2>

              <div className="alignment-box hipaa-box">
                <ul className="alignment-list">
                  <li>Administrative safeguards</li>
                  <li>Technical safeguards</li>
                  <li>Physical safeguards</li>
                </ul>
              </div>
            </div>

            {/* Future Expansion */}
            <div className="alignment-section">
              <div className="alignment-box footer-box">
                <p className="alignment-text">
                  Future expansion includes full compliance where required.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HIPAAGDPRAlignment

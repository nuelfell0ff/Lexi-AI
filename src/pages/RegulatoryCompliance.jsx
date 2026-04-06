import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './RegulatoryCompliance.css'

const RegulatoryCompliance = () => {
  return (
    <>
      <Navbar />
      <div className="regulatory-compliance-container">
        <div className="regulatory-compliance-wrapper">
          {/* Hero Section */}
          <section className="regulatory-compliance-hero">
            <h1 className="regulatory-compliance-title">REGULATORY COMPLIANCE</h1>
            <p className="regulatory-compliance-subtitle">
              Our legal and professional obligations
            </p>
          </section>

          {/* Main Content */}
          <section className="regulatory-compliance-content">
            {/* Intro */}
            <div className="compliance-intro">
              <p>
                MedxVerse operates under Nigerian law and international standards.
              </p>
            </div>

            {/* Nigerian Regulatory Framework */}
            <div className="compliance-section">
              <h2 className="compliance-section-title">Nigerian Regulatory Framework</h2>

              <div className="compliance-box">
                <ul className="compliance-list">
                  <li>Companies and Allied Matters Act — RC 8786663</li>
                  <li>Medical and Dental Council of Nigeria (MDCN)</li>
                  <li>National Health Act 2014</li>
                  <li>Nigeria Data Protection Regulation (NDPR)</li>
                  <li>NAFDAC (pharmaceutical compliance)</li>
                  <li>Federal Inland Revenue Service (FIRS)</li>
                  <li>Arbitration and Mediation Act 2023</li>
                </ul>
              </div>
            </div>

            {/* International Standards Alignment */}
            <div className="compliance-section">
              <h2 className="compliance-section-title">International Standards Alignment</h2>

              <div className="compliance-box international-box">
                <p className="compliance-text">MedxVerse aligns with:</p>
                <ul className="compliance-list">
                  <li>GDPR principles</li>
                  <li>WHO AI ethics guidelines</li>
                  <li>HIPAA security standards</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default RegulatoryCompliance

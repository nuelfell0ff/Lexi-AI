import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './MedicalDisclaimer.css'

const MedicalDisclaimer = () => {
  return (
    <>
      <Navbar />
      <div className="medical-disclaimer-container">
        <div className="medical-disclaimer-wrapper">
          {/* Hero Section */}
          <section className="medical-disclaimer-hero">
            <h1 className="medical-disclaimer-title">MEDICAL DISCLAIMER</h1>
            <p className="medical-disclaimer-subtitle">
              Important information about Lexi AI's role in your healthcare
            </p>
          </section>

          {/* Main Content */}
          <section className="medical-disclaimer-content">
            {/* Lexi AI Is Not a Doctor */}
            <div className="disclaimer-section">
              <h2 className="disclaimer-section-title">Lexi AI Is Not a Doctor</h2>

              <div className="disclaimer-box">
                <div className="disclaimer-subsection">
                  <h3 className="disclaimer-subsection-title">Lexi AI provides:</h3>
                  <ul className="disclaimer-list provides-list">
                    <li>Health information</li>
                    <li>Symptom assessment</li>
                    <li>Care guidance</li>
                  </ul>
                </div>

                <div className="disclaimer-subsection">
                  <h3 className="disclaimer-subsection-title">It does NOT:</h3>
                  <ul className="disclaimer-list does-not-list">
                    <li>Diagnose conditions</li>
                    <li>Prescribe medication</li>
                    <li>Replace doctors</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Virtual Consultations */}
            <div className="disclaimer-section">
              <h2 className="disclaimer-section-title">Virtual Consultations</h2>
              <div className="disclaimer-box warning-box">
                <p className="disclaimer-text">
                  Conducted by licensed doctors, but:
                </p>
                <ul className="disclaimer-list">
                  <li>Limited by lack of physical exam</li>
                  <li>May require in-person follow-up</li>
                </ul>
              </div>
            </div>

            {/* Emergency Situations */}
            <div className="disclaimer-section">
              <h2 className="disclaimer-section-title emergency-title">Emergency Situations</h2>
              <div className="disclaimer-box emergency-box">
                <p className="disclaimer-text emergency-text">
                  Lexi AI is not an emergency service.
                </p>
                <p className="disclaimer-text emergency-subtitle">If you experience:</p>
                <ul className="disclaimer-list emergency-list">
                  <li>Chest pain</li>
                  <li>Breathing difficulty</li>
                  <li>Stroke symptoms</li>
                  <li>Severe bleeding</li>
                </ul>
                <p className="emergency-action">
                  <strong>Call 112 or go to a hospital immediately.</strong>
                </p>
              </div>
            </div>

            {/* Accuracy of Health Information */}
            <div className="disclaimer-section">
              <h2 className="disclaimer-section-title">Accuracy of Health Information</h2>
              <div className="disclaimer-box">
                <p className="disclaimer-text">
                  Medical knowledge evolves. Always seek professional advice.
                </p>
              </div>
            </div>

            {/* Information, Not Advice */}
            <div className="disclaimer-section">
              <h2 className="disclaimer-section-title">Information, Not Advice</h2>
              <div className="disclaimer-box info-box">
                <p className="disclaimer-text">
                  All AI outputs are informational, not medical advice.
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

export default MedicalDisclaimer

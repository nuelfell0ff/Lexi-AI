import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './MentalHealthSupport.css'

const MentalHealthSupport = () => {
  return (
    <>
      <Navbar />
      <div className="mhs-container">
        <div className="mhs-wrapper">
          {/* Hero Section */}
          <section className="mhs-hero">
            <h1 className="mhs-title">Mental Health Support</h1>
          </section>

          {/* Main Content */}
          <section className="mhs-content">
            <div className="mhs-text-block">
              <p>
                Compassionate, evidence-based mental health guidance
              </p>

              <p>
                Mental health disorders affect an estimated 1 in 4 Africans, yet the treatment gap exceeds 90%.
              </p>

              <p>
                Lexi AI provides structured, stigma-free mental health support.
              </p>
            </div>

            {/* What Lexi AI Provides */}
            <div className="mhs-section">
              <h2 className="mhs-section-title">What Lexi AI Provides</h2>

              <ul className="mhs-features-list">
                <li>Stress and anxiety management</li>
                <li>Low mood and depression support</li>
                <li>Sleep disorder guidance</li>
                <li>Grief and emotional support</li>
              </ul>
            </div>

            {/* Clinical Safeguards */}
            <div className="mhs-section">
              <h2 className="mhs-section-title">Clinical Safeguards</h2>

              <p className="mhs-section-subheader">Mandatory escalation for:</p>

              <ul className="mhs-features-list">
                <li>Suicidal ideation</li>
                <li>Self-harm</li>
                <li>Psychotic crisis</li>
              </ul>

              <p className="mhs-important-note">
                Lexi AI does not replace psychiatric care.
              </p>
            </div>

            {/* Crisis Support */}
            <div className="mhs-section">
              <h2 className="mhs-section-title">Crisis Support</h2>

              <p>
                If you are in crisis, call Nigeria emergency services (112) or visit the nearest hospital.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MentalHealthSupport

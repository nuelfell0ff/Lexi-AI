import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './TermsOfService.css'

const TermsOfService = () => {
  return (
    <>
      <Navbar />
      <div className="terms-container">
        <div className="terms-wrapper">
          {/* Hero Section */}
          <section className="terms-hero">
            <h1 className="terms-title">TERMS OF SERVICE</h1>
            <p className="terms-subtitle">
              The agreement governing your use of Lexi AI and MedxVerse
            </p>
          </section>

          {/* Main Content */}
          <section className="terms-content">
            {/* Intro */}
            <div className="terms-intro">
              <p>
                These Terms govern your use of the platform. By using the service, you agree to them.
              </p>
            </div>

            {/* Section 1: Eligibility */}
            <div className="terms-section">
              <h2 className="terms-section-title">1. Eligibility</h2>
              <div className="terms-box">
                <ul className="terms-list">
                  <li>Must be 18+</li>
                  <li>Ages 13–17 require parental supervision</li>
                  <li>Not for children under 13</li>
                </ul>
              </div>
            </div>

            {/* Section 2: Your Account */}
            <div className="terms-section">
              <h2 className="terms-section-title">2. Your Account</h2>
              <div className="terms-box">
                <ul className="terms-list">
                  <li>You are responsible for your account</li>
                  <li>Must provide accurate information</li>
                  <li>Do not share credentials</li>
                </ul>
              </div>
            </div>

            {/* Section 3: Platform Services */}
            <div className="terms-section">
              <h2 className="terms-section-title">3. Platform Services</h2>
              <div className="terms-box">
                <p className="terms-text">Includes:</p>
                <ul className="terms-list">
                  <li>AI health guidance</li>
                  <li>Telemedicine</li>
                  <li>Pharmacy</li>
                  <li>Lab services</li>
                </ul>
                <p className="terms-text warning-text">Service availability is not guaranteed.</p>
              </div>
            </div>

            {/* Section 4: Medical Disclaimer */}
            <div className="terms-section">
              <h2 className="terms-section-title">4. Medical Disclaimer</h2>
              <div className="terms-box disclaimer-box">
                <p className="terms-text disclaimer-text">
                  Lexi AI does not replace doctors.
                </p>
              </div>
            </div>

            {/* Section 5: Prohibited Uses */}
            <div className="terms-section">
              <h2 className="terms-section-title">5. Prohibited Uses</h2>
              <div className="terms-box prohibited-box">
                <p className="terms-text">You must not:</p>
                <ul className="terms-list">
                  <li>Provide false information</li>
                  <li>Impersonate others</li>
                  <li>Violate laws</li>
                  <li>Harm users</li>
                </ul>
              </div>
            </div>

            {/* Section 6: Intellectual Property */}
            <div className="terms-section">
              <h2 className="terms-section-title">6. Intellectual Property</h2>
              <div className="terms-box">
                <p className="terms-text">
                  All platform content belongs to MedxVerse.
                </p>
              </div>
            </div>

            {/* Section 7: Governing Law */}
            <div className="terms-section">
              <h2 className="terms-section-title">7. Governing Law</h2>
              <div className="terms-box">
                <ul className="terms-list">
                  <li>Federal Republic of Nigeria</li>
                  <li>Disputes resolved via arbitration in Lagos</li>
                </ul>
              </div>
            </div>

            {/* Section 8: Contact */}
            <div className="terms-section">
              <h2 className="terms-section-title">8. Contact</h2>
              <div className="terms-box contact-box">
                <p className="terms-text contact-text">
                  <a href="mailto:admin@medxverseapp.com">admin@medxverseapp.com</a>
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

export default TermsOfService

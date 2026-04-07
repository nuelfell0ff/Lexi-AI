import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './APIDeveloperPlatform.css'

const APIDeveloperPlatform = () => {
  return (
    <>
      <Navbar />
      <div className="api-container">
        <div className="api-wrapper">
          {/* Hero Section */}
          <section className="api-hero">
            <h1 className="api-title">API & Developer Platform</h1>
          </section>

          {/* Main Content */}
          <section className="api-content">
            <div className="api-text-block">
              <p>
                Integrate Lexi AI's health intelligence into your application or system
              </p>

              <p>
                The MedxVerse API enables integration of Lexi AI into external platforms.
              </p>
            </div>

            {/* API Capabilities */}
            <div className="api-section">
              <h2 className="api-section-title">API Capabilities</h2>

              <div className="api-capabilities-grid">
                <div className="api-capability">
                  <h3 className="capability-title">Health Assessment API</h3>
                  <p>Structured AI health assessments via JSON output.</p>
                </div>

                <div className="api-capability">
                  <h3 className="capability-title">Telemedicine Scheduling API</h3>
                  <p>Doctor booking integration.</p>
                </div>

                <div className="api-capability">
                  <h3 className="capability-title">Health Records API</h3>
                  <p>Secure patient data access.</p>
                </div>

                <div className="api-capability">
                  <h3 className="capability-title">Medication & Pharmacy API</h3>
                  <p>Digital prescriptions and delivery integration.</p>
                </div>
              </div>
            </div>

            {/* Developer Resources */}
            <div className="api-section">
              <h2 className="api-section-title">Developer Resources</h2>

              <ul className="api-features-list">
                <li>REST API documentation</li>
                <li>JavaScript SDK</li>
                <li>Sandbox environment</li>
                <li>Webhooks</li>
              </ul>
            </div>

            {/* Access & Pricing */}
            <div className="api-section">
              <h2 className="api-section-title">Access & Pricing</h2>

              <p className="api-pricing-text">
                Tiered commercial pricing available.
              </p>

              <p className="api-contact">
                Contact: <a href="mailto:admin@medxverseapp.com">admin@medxverseapp.com</a>
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default APIDeveloperPlatform

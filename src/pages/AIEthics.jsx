import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './AIEthics.css'

const AIEthics = () => {
  return (
    <>
      <Navbar />
      <div className="ai-ethics-container">
        <div className="ai-ethics-wrapper">
          {/* Hero Section */}
          <section className="ai-ethics-hero">
            <h1 className="ai-ethics-title">AI ETHICS & RESPONSIBLE AI</h1>
            <p className="ai-ethics-subtitle">
              Our principles for developing and deploying AI in healthcare
            </p>
          </section>

          {/* Main Content */}
          <section className="ai-ethics-content">
            <div className="ai-ethics-intro">
              <p>
                Artificial intelligence in healthcare is one of the most consequential applications of technology in human history.
              </p>
            </div>

            {/* AI Ethics Principles */}
            <div className="ai-ethics-section">
              <h2 className="ai-ethics-section-title">Our AI Ethics Principles</h2>

              <div className="principles-grid">
                <div className="principle-card">
                  <h3 className="principle-title">Patient Safety First</h3>
                  <p className="principle-description">
                    Every decision prioritises patient safety. When uncertain, Lexi escalates to human care.
                  </p>
                </div>

                <div className="principle-card">
                  <h3 className="principle-title">Transparency</h3>
                  <p className="principle-description">
                    Users know they are interacting with AI. Outputs are guidance, not diagnosis.
                  </p>
                </div>

                <div className="principle-card">
                  <h3 className="principle-title">Non-Discrimination</h3>
                  <p className="principle-description">
                    Lexi AI is built to serve all patients equitably.
                  </p>
                </div>

                <div className="principle-card">
                  <h3 className="principle-title">Human Oversight</h3>
                  <p className="principle-description">
                    AI supports — not replaces — clinical judgement.
                  </p>
                </div>

                <div className="principle-card">
                  <h3 className="principle-title">Continuous Improvement</h3>
                  <p className="principle-description">
                    The system is continuously updated using feedback and clinical data.
                  </p>
                </div>
              </div>
            </div>

            {/* Data Ethics */}
            <div className="ai-ethics-section data-ethics-section">
              <h2 className="ai-ethics-section-title">Data Ethics</h2>
              <div className="data-ethics-box">
                <ul className="data-ethics-list">
                  <li>Patient data is private</li>
                  <li>Never sold</li>
                  <li>Never used without consent</li>
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

export default AIEthics

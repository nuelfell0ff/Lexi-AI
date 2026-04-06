import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './WomensHealth.css'

const WomensHealth = () => {
  return (
    <>
      <Navbar />
      <div className="wh-container">
        <div className="wh-wrapper">
          {/* Hero Section */}
          <section className="wh-hero">
            <h1 className="wh-title">Women's Health</h1>
          </section>

          {/* Main Content */}
          <section className="wh-content">
            <div className="wh-text-block">
              <p>
                Dedicated healthcare support for every stage of a woman's life
              </p>

              <p>
                Nigeria has one of the highest maternal mortality rates globally.
              </p>

              <p>
                Lexi AI provides targeted women's health support.
              </p>
            </div>

            {/* Maternal Health */}
            <div className="wh-section">
              <h2 className="wh-section-title">Maternal Health</h2>

              <ul className="wh-features-list">
                <li>Antenatal guidance</li>
                <li>Nutrition support</li>
                <li>Risk education</li>
              </ul>
            </div>

            {/* Reproductive Health */}
            <div className="wh-section">
              <h2 className="wh-section-title">Reproductive Health</h2>

              <ul className="wh-features-list">
                <li>Contraception</li>
                <li>Menstrual health</li>
                <li>PCOS & fertility</li>
              </ul>
            </div>

            {/* Breast & Cervical Health */}
            <div className="wh-section">
              <h2 className="wh-section-title">Breast & Cervical Health</h2>

              <ul className="wh-features-list">
                <li>Breast examination guidance</li>
                <li>Cervical cancer awareness</li>
              </ul>
            </div>

            {/* Menopause Support */}
            <div className="wh-section">
              <h2 className="wh-section-title">Menopause Support</h2>

              <ul className="wh-features-list">
                <li>Symptom management</li>
                <li>Lifestyle guidance</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default WomensHealth

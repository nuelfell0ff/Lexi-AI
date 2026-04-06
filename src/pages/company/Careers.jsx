import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './Careers.css'

const Careers = () => {
  return (
    <>
      <Navbar />
      <div className="careers-container">
        <div className="careers-wrapper">
          {/* Hero Section */}
          <section className="careers-hero">
            <h1 className="careers-title">Careers</h1>
            <p className="careers-subtitle">
              Build the healthcare infrastructure the world has been waiting for
            </p>
          </section>

          {/* Main Content */}
          <section className="careers-content">
            <div className="careers-text-block">
              <p>
                At MedxVerse, we are building a comprehensive AI-powered digital health ecosystem for Africa and the developing world.
              </p>
            </div>

            {/* Why Work Here Section */}
            <div className="careers-section">
              <h2 className="careers-section-title">Why Work Here</h2>
              <ul className="careers-list">
                <li>Mission-first</li>
                <li>Early-stage impact</li>
                <li>Real-world impact</li>
                <li>Serious, high-performance team</li>
              </ul>
            </div>

            {/* Current Opportunities Section */}
            <div className="careers-section">
              <h2 className="careers-section-title">Current Opportunities</h2>

              {/* Technology */}
              <div className="careers-department">
                <h3 className="careers-department-title">Technology</h3>
                <ul className="careers-roles-list">
                  <li>Full-Stack Engineer</li>
                  <li>Mobile Engineer</li>
                  <li>AI/ML Engineer</li>
                  <li>Backend Engineer</li>
                  <li>DevOps Engineer</li>
                </ul>
              </div>

              {/* Clinical & Health */}
              <div className="careers-department">
                <h3 className="careers-department-title">Clinical & Health</h3>
                <ul className="careers-roles-list">
                  <li>Clinical Director</li>
                  <li>Medical Content Specialist</li>
                  <li>Telemedicine Coordinator</li>
                </ul>
              </div>

              {/* Business */}
              <div className="careers-department">
                <h3 className="careers-department-title">Business</h3>
                <ul className="careers-roles-list">
                  <li>Business Development</li>
                  <li>Marketing</li>
                  <li>Customer Success</li>
                  <li>Finance</li>
                </ul>
              </div>
            </div>

            {/* How to Apply Section */}
            <div className="careers-section">
              <h2 className="careers-section-title">How to Apply</h2>
              <div className="careers-apply-box">
                <p className="apply-label">Send your CV to:</p>
                <p className="apply-email">
                  <a href="mailto:admin@medxverseapp.com">admin@medxverseapp.com</a>
                </p>
                <p className="apply-label" style={{ marginTop: '20px' }}>Subject:</p>
                <p className="apply-subject">Careers — Role Name</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Careers

import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './Leadership.css'

const Leadership = () => {
  return (
    <>
      <Navbar />
      <div className="leadership-container">
        <div className="leadership-wrapper">
          {/* Hero Section */}
          <section className="leadership-hero">
            <h1 className="leadership-title">Leadership & Team</h1>
            <p className="leadership-subtitle">
              The people building healthcare access for Africa and the world
            </p>
          </section>

          {/* Main Content */}
          <section className="leadership-content">
            <div className="leadership-text-block">
              <p>
                MedxVerse is led by a multidisciplinary founding team combining deep expertise in healthcare, technology, international business, and operations.
              </p>
            </div>

            {/* CEO Section */}
            <div className="leadership-section">
              <h2 className="leadership-section-title">Ogunsakin Timilehin Seyi Adeleke — Founder & CEO</h2>
              <div className="leadership-text-block">
                <p>
                  Ogunsakin Timilehin Seyi Adeleke is the founder and CEO of MedxVerse Telemedicine & Virtual Care Ltd, and the visionary behind Lexi AI.
                </p>

                <p>
                  A Nigerian health-technology entrepreneur and public health advocate, Adeleke founded MedxVerse with the conviction that Africa's healthcare access crisis is fundamentally an engineering and systems problem.
                </p>

                <p className="leadership-bold">Under his leadership:</p>
                <ul className="leadership-list">
                  <li>Company incorporated (Sept 2025)</li>
                  <li>2,000+ early users onboarded</li>
                  <li>Doctor network established</li>
                </ul>

                <p className="leadership-bold">He leads:</p>
                <ul className="leadership-list">
                  <li>Product strategy</li>
                  <li>Investor relations</li>
                  <li>Clinical partnerships</li>
                </ul>
              </div>
            </div>

            {/* Co-Founder Section */}
            <div className="leadership-section">
              <h2 className="leadership-section-title">Dan Walkovitz — Co-Founder</h2>
              <div className="leadership-text-block">
                <p>
                  Brings international business expertise and global expansion strategy.
                </p>
              </div>
            </div>

            {/* Operations Manager Section */}
            <div className="leadership-section">
              <h2 className="leadership-section-title">Ojo Kehinde — Operations Manager</h2>
              <div className="leadership-text-block">
                <p>Responsible for:</p>
                <ul className="leadership-list">
                  <li>Platform operations</li>
                  <li>Doctor network management</li>
                  <li>Quality assurance</li>
                </ul>
              </div>
            </div>

            {/* Team Culture Section */}
            <div className="leadership-section">
              <h2 className="leadership-section-title">Our Team Culture</h2>
              <div className="leadership-text-block leadership-culture">
                <p>
                  MedxVerse operates as a lean, mission-driven organisation where every team member understands their work directly impacts patient lives.
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

export default Leadership

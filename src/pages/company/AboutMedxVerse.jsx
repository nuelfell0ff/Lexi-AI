import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './AboutMedxVerse.css'

const AboutMedxVerse = () => {
  return (
    <>
      <Navbar />
      <div className="medxverse-container">
        <div className="medxverse-wrapper">
          {/* Hero Section */}
          <section className="medxverse-hero">
            <h1 className="medxverse-title">About MedxVerse</h1>
            <p className="medxverse-subtitle">
              The healthcare technology company behind Lexi AI
            </p>
          </section>

          {/* Main Content */}
          <section className="medxverse-content">
            <div className="medxverse-text-block">
              <p>
                MedxVerse Telemedicine & Virtual Care Ltd is a Nigerian healthcare technology company incorporated under the Companies and Allied Matters Act 2020, with Company Registration Number 8786663 and Tax Identification Number 33487688-0001. MedxVerse was founded with a clear and urgent mandate: to build the digital healthcare infrastructure that Sub-Saharan Africa — and the broader developing world — has long needed but never had.
              </p>

              <p>
                The company operates at the intersection of medicine, artificial intelligence, financial technology, and digital infrastructure, delivering integrated healthcare services to patients and healthcare professionals through its proprietary technology platforms.
              </p>
            </div>

            {/* What We Build */}
            <div className="medxverse-section">
              <h2 className="medxverse-section-title">What We Build</h2>
              <div className="medxverse-text-block">
                <p>
                  MedxVerse operates a comprehensive telemedicine ecosystem that connects patients, licensed healthcare professionals, pharmacies, and diagnostic laboratories through secure, mobile-first digital infrastructure.
                </p>

                <p>The company's platforms include:</p>
                <ul className="medxverse-list">
                  <li>The MedxVerse consumer health app</li>
                  <li>The Lexi AI health assistant</li>
                  <li>The MedxVerse doctor platform</li>
                  <li>The MedxVerse API</li>
                </ul>

                <p>
                  The company's services span the full patient journey — from AI-powered first contact and clinical triage through doctor consultation, digital prescription, medication delivery, laboratory testing, and post-discharge recovery monitoring.
                </p>
              </div>
            </div>

            {/* Registration and Regulatory Status */}
            <div className="medxverse-section">
              <h2 className="medxverse-section-title">Our Registration and Regulatory Status</h2>
              <div className="medxverse-compliance-box">
                <p><strong>Company name:</strong> MedxVerse Telemedicine & Virtual Care Ltd</p>
                <p><strong>Reg. number:</strong> RC 8786663</p>
                <p><strong>Tax ID:</strong> TIN 33487688-0001</p>
                <p><strong>Incorporated:</strong> September 3, 2025</p>
                <p><strong>Operating law:</strong> Federal Republic of Nigeria</p>
              </div>
            </div>

            {/* Vision for Healthcare */}
            <div className="medxverse-section">
              <h2 className="medxverse-section-title">Our Vision for Healthcare</h2>
              <div className="medxverse-text-block">
                <p>
                  MedxVerse's long-term vision is continental and global.
                </p>
              </div>

              <div className="vision-timeline">
                <div className="timeline-item">
                  <div className="timeline-period">2025–2027</div>
                  <div className="timeline-goal">Nigeria dominance</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-period">2027–2030</div>
                  <div className="timeline-goal">African expansion</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-period">2031–2035</div>
                  <div className="timeline-goal">Global deployment</div>
                </div>
              </div>

              <div className="medxverse-text-block" style={{ marginTop: '30px' }}>
                <p>
                  At full scale, MedxVerse aims to serve more than one million active patients.
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

export default AboutMedxVerse

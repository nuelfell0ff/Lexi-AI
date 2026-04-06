import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './PartnerWithLexiAI.css'

const PartnerWithLexiAI = () => {
  return (
    <>
      <Navbar />
      <div className="pwl-container">
        <div className="pwl-wrapper">
          {/* Hero Section */}
          <section className="pwl-hero">
            <h1 className="pwl-title">Partner with Lexi AI</h1>
          </section>

          {/* Main Content */}
          <section className="pwl-content">
            <div className="pwl-text-block">
              <p>
                Build the future of healthcare with us
              </p>

              <p>
                MedxVerse is building one of the most ambitious healthcare technology platforms in Africa — and we cannot do it alone. We are actively seeking partnerships with healthcare providers, governments, NGOs, insurance companies, pharmaceutical companies, fintech platforms, and corporate employers who share our conviction that access to quality healthcare is a fundamental human right.
              </p>

              <p>
                Our partnership model is built on a simple principle: we bring the technology, the clinical intelligence, and the platform infrastructure. You bring the institutional reach, the patient populations, the regulatory relationships, or the capital that accelerates our shared mission. Together, we can reach the patients who need us most, faster than either of us could alone.
              </p>
            </div>

            {/* Why Partner with Lexi AI */}
            <div className="pwl-section">
              <h2 className="pwl-section-title">Why Partner with Lexi AI</h2>

              <ul className="pwl-features-list">
                <li>
                  <strong>Reach:</strong> Access to a growing network of 2,000+ registered users and thousands of licensed doctors — with the platform infrastructure to scale this to millions.
                </li>
                <li>
                  <strong>Technology:</strong> A production-ready AI health platform with nine integrated services — not a prototype or pilot.
                </li>
                <li>
                  <strong>Compliance:</strong> Full regulatory registration under Nigerian law, with NDPR-compliant data infrastructure and active engagement with telemedicine regulatory frameworks.
                </li>
                <li>
                  <strong>Mission alignment:</strong> A partner who prioritises patient outcomes, not just commercial metrics.
                </li>
                <li>
                  <strong>Flexibility:</strong> API access, white-label options, co-branding agreements, and revenue sharing models tailored to your specific use case.
                </li>
              </ul>
            </div>

            {/* Start a Partnership Conversation */}
            <div className="pwl-section">
              <h2 className="pwl-section-title">Start a Partnership Conversation</h2>

              <div className="pwl-contact-block">
                <p>
                  To explore a partnership with Lexi AI and MedxVerse, email <a href="mailto:admin@medxverseapp.com?subject=PARTNERSHIP%20ENQUIRY">admin@medxverseapp.com</a> with subject line <strong>'PARTNERSHIP ENQUIRY'</strong> and a brief description of your organisation and the collaboration you have in mind. We will respond within 2 business days.
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

export default PartnerWithLexiAI

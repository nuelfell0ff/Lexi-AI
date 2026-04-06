import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './CorporateWellness.css'

const CorporateWellness = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="cw-container">
        <div className="cw-wrapper">
          <section className="cw-hero">
            <h1 className="cw-title">Corporate Wellness</h1>
          </section>
          <section className="cw-content">
            <div className="cw-intro">
              <p className="cw-text">
                Employee health benefits powered by Lexi AI
              </p>
              <p className="cw-text">
                Employer-sponsored healthcare is an important but often underutilised mechanism for extending quality health access to Nigeria's formal workforce. MedxVerse's Corporate Wellness programme offers Nigerian employers and multinationals operating in Africa a comprehensive, affordable, and genuinely useful digital health benefit that improves employee health outcomes, reduces absenteeism, and demonstrates meaningful investment in workforce wellbeing.
              </p>
            </div>

            <div className="cw-section">
              <h2 className="cw-section-title">What the Corporate Wellness Programme Includes</h2>
              <ul className="cw-features">
                <li>Unlimited Lexi AI health assistant access for all enrolled employees and immediate family members</li>
                <li>Virtual doctor consultations — a defined number of consultations per employee per month, with additional consultations available at preferential corporate rates</li>
                <li>Medication reminder and chronic disease monitoring tools for employees managing long-term conditions</li>
                <li>Mental health support and guidance, with escalation to qualified mental health professionals</li>
                <li>Health goal tracking and wellness monitoring dashboard for HR use (aggregate, anonymised data only)</li>
                <li>Dedicated corporate account management and priority customer support</li>
              </ul>
            </div>

            <div className="cw-section">
              <h2 className="cw-section-title">Pricing and Enrolment</h2>
              <p className="cw-text">
                Corporate Wellness pricing is based on the number of enrolled employees and the scope of benefits included. Discounted rates are available for organisations enrolling 50 or more employees. Government agencies and public sector employers are encouraged to apply — please reference the Government Partnership section for tailored engagement.
              </p>
              <div className="cw-contact-block">
                <p>Contact <a href="mailto:admin@medxverseapp.com?subject=CORPORATE%20WELLNESS">admin@medxverseapp.com</a> with subject line 'CORPORATE WELLNESS' for a custom quote.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CorporateWellness

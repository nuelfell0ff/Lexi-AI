import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './HealthcareProviders.css'

const HealthcareProviders = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="hp-container">
        <div className="hp-wrapper">
          <section className="hp-hero">
            <h1 className="hp-title">Healthcare Providers</h1>
          </section>
          <section className="hp-content">
            <div className="hp-intro">
              <p className="hp-text">
                Extend your clinical reach with Lexi AI
              </p>
              <p className="hp-text">
                For hospitals, clinics, primary healthcare centres, specialist practices, and health systems, MedxVerse offers a healthcare provider partnership that extends your clinical reach beyond your physical walls — enabling you to serve more patients, reduce outpatient congestion, and improve care continuity through digital infrastructure.
              </p>
            </div>

            <div className="hp-section">
              <h2 className="hp-section-title">What MedxVerse Offers Healthcare Providers</h2>
              <ul className="hp-features">
                <li>
                  <strong>Telemedicine integration:</strong> Offer your existing patients the ability to book and conduct video consultations with your clinical team through the MedxVerse platform, with clinical notes flowing directly into their patient record.
                </li>
                <li>
                  <strong>Patient referral network:</strong> Receive digital referrals from Lexi AI's AI triage system — patients who need in-person specialist care are referred to your facility through the platform.
                </li>
                <li>
                  <strong>OPD congestion reduction:</strong> Patients managed digitally for non-emergency conditions reduce your outpatient department queue by 15–25%, based on comparable telemedicine implementation data from Kenya, Ghana, and India.
                </li>
                <li>
                  <strong>E-diagnostics integration:</strong> Partner laboratories can receive digital lab referrals from MedxVerse consultations, with results returned to the patient's platform record.
                </li>
                <li>
                  <strong>Continuing medical education:</strong> MedxVerse doctors have access to the Community Hub for health education content — institutional partners can contribute CME content to the platform.
                </li>
              </ul>
            </div>

            <div className="hp-section">
              <h2 className="hp-section-title">Registration and Onboarding</h2>
              <p className="hp-text">
                Healthcare provider partnerships are managed through a formal MOU with MedxVerse. The process includes a clinical governance review, platform integration planning, staff onboarding training, and a defined go-live timeline.
              </p>
              <div className="hp-contact-block">
                <p>Contact <a href="mailto:support@medxverseapp.com?subject=HEALTHCARE%20PROVIDER%20PARTNERSHIP">support@medxverseapp.com</a> to begin the registration process.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default HealthcareProviders

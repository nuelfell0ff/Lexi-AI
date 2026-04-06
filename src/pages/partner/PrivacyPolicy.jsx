import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="pp-container">
        <div className="pp-wrapper">
          <section className="pp-hero">
            <h1 className="pp-title">Privacy Policy</h1>
          </section>
          <section className="pp-content">
            <div className="pp-intro">
              <p className="pp-text">
                How Lexi AI and MedxVerse collect, use, and protect your personal data
              </p>
              <p className="pp-text">
                This Privacy Policy describes the data practices of MedxVerse Telemedicine & Virtual Care Ltd (RC: 8786663) and its Lexi AI platform. We are committed to transparency about how we collect, use, store, and protect your personal data — and to your right to control your own information.
              </p>
              <p className="pp-text">
                This policy is effective as of March 2026 and applies to all users of the Lexi AI platform, the MedxVerse mobile application, and the MedxVerse website. It should be read alongside our Terms of Service and Data Protection & Security documentation.
              </p>
            </div>

            <div className="pp-section">
              <h2 className="pp-section-title">Data We Collect</h2>

              <div className="pp-subsection">
                <h3 className="pp-subsection-title">Account and Registration Data</h3>
                <p className="pp-text">
                  Name, email address, phone number, date of birth, gender, and state of residence — collected at registration to create and manage your MedxVerse account.
                </p>
              </div>

              <div className="pp-subsection">
                <h3 className="pp-subsection-title">Health and Clinical Data</h3>
                <p className="pp-text">
                  Symptom descriptions, medical history disclosures, consultation notes, medication records, laboratory results, vital sign logs, and health goal data — collected to provide you with health guidance, facilitate consultations, and maintain your longitudinal health record on the platform.
                </p>
              </div>

              <div className="pp-subsection">
                <h3 className="pp-subsection-title">Device and Usage Data</h3>
                <p className="pp-text">
                  Device type and operating system, app version, session duration and frequency, feature usage patterns, and IP address — collected to improve platform performance, detect and prevent fraud, and support customer service.
                </p>
              </div>

              <div className="pp-subsection">
                <h3 className="pp-subsection-title">Payment Data</h3>
                <p className="pp-text">
                  Payment transaction data — processed through our payment partners. MedxVerse does not store full card numbers or bank account details.
                </p>
              </div>
            </div>

            <div className="pp-section">
              <h2 className="pp-section-title">How We Use Your Data</h2>
              <ul className="pp-list">
                <li>To provide and improve the Lexi AI health assistant and MedxVerse services</li>
                <li>To facilitate telemedicine consultations between you and licensed MedxVerse physicians</li>
                <li>To send you medication reminders, appointment notifications, and health guidance</li>
                <li>To maintain your longitudinal health record for continuity of care</li>
                <li>To comply with our legal and regulatory obligations</li>
                <li>For anonymised, aggregate research and product improvement — never individual-level sale</li>
              </ul>
            </div>

            <div className="pp-section">
              <h2 className="pp-section-title">Data Sharing</h2>
              <p className="pp-text">
                We share your personal data only with:
              </p>
              <ul className="pp-list">
                <li>Licensed MedxVerse doctors involved in your care</li>
                <li>Pharmacy and laboratory partners</li>
                <li>Payment processors</li>
                <li>Regulatory authorities where required by law</li>
              </ul>
              <p className="pp-text">
                We do not sell your personal data.
              </p>
            </div>

            <div className="pp-section">
              <h2 className="pp-section-title">Your Rights</h2>
              <p className="pp-text">
                Under NDPR and applicable international law, you have the right to:
              </p>
              <ul className="pp-list">
                <li>Access your data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion</li>
                <li>Object to processing</li>
                <li>Withdraw consent</li>
              </ul>
              <div className="pp-contact-block">
                <p>Contact <a href="mailto:admin@medxverseapp.com?subject=DATA%20REQUEST">admin@medxverseapp.com</a> (DATA REQUEST)</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PrivacyPolicy

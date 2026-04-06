import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './DataProtectionAndSecurity.css'

const DataProtectionAndSecurity = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="dps-container">
        <div className="dps-wrapper">
          <section className="dps-hero">
            <h1 className="dps-title">Data Protection & Security</h1>
          </section>
          <section className="dps-content">
            <div className="dps-intro">
              <p className="dps-text">
                How we protect your health data
              </p>
              <p className="dps-text">
                Patient health data is among the most sensitive categories of personal information. MedxVerse treats it accordingly.
              </p>
            </div>

            <div className="dps-section">
              <h2 className="dps-section-title">Our Security Programme Aligns With</h2>
              <ul className="dps-list">
                <li>NDPR</li>
                <li>GDPR principles</li>
                <li>HIPAA safeguards</li>
                <li>ISO 27001 practices</li>
              </ul>
            </div>

            <div className="dps-section">
              <h2 className="dps-section-title">Technical Security Measures</h2>
              <ul className="dps-list">
                <li><strong>Encryption in transit:</strong> TLS 1.2+</li>
                <li><strong>Encryption at rest:</strong> AES-256</li>
                <li><strong>Access controls:</strong> restricted access</li>
                <li><strong>Authentication:</strong> Multi-factor authentication</li>
                <li><strong>Penetration testing:</strong> regular testing</li>
                <li><strong>Data minimisation:</strong> only necessary data collected</li>
              </ul>
            </div>

            <div className="dps-section">
              <h2 className="dps-section-title">Data Residency</h2>
              <p className="dps-text">
                Data is stored within infrastructure subject to Nigerian jurisdiction.
              </p>
            </div>

            <div className="dps-section">
              <h2 className="dps-section-title">Breach Notification</h2>
              <p className="dps-text">
                Users and regulators are notified in case of a data breach in accordance with legal requirements.
              </p>
            </div>

            <div className="dps-section">
              <h2 className="dps-section-title">Third-Party Processors</h2>
              <p className="dps-text">
                All vendors are bound by strict data protection agreements.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default DataProtectionAndSecurity

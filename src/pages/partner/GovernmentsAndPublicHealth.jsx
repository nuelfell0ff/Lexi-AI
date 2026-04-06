import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './GovernmentsAndPublicHealth.css'

const GovernmentsAndPublicHealth = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="gaph-container">
        <div className="gaph-wrapper">
          <section className="gaph-hero">
            <h1 className="gaph-title">Governments & Public Health</h1>
          </section>
          <section className="gaph-content">
            <div className="gaph-intro">
              <p className="gaph-text">
                Digital health infrastructure for national healthcare systems
              </p>
              <p className="gaph-text">
                Governments across Africa and the developing world face a common challenge: how to extend quality healthcare access to populations that are growing, urbanising, and increasingly digitally connected — without the capital to build sufficient physical health infrastructure fast enough to meet the demand. Digital health platforms like Lexi AI offer a cost-effective, rapidly deployable answer.
              </p>
            </div>

            <div className="gaph-section">
              <h2 className="gaph-section-title">What We Offer Government Partners</h2>
              <ul className="gaph-features">
                <li>
                  <strong>National telemedicine infrastructure:</strong> MedxVerse can serve as the telemedicine backbone for primary healthcare centre networks, enabling community health workers and PHC staff to connect patients digitally to qualified physicians without requiring new doctor postings.
                </li>
                <li>
                  <strong>Public health surveillance:</strong> Anonymised, aggregate health data from Lexi AI symptom assessments can inform early detection of disease outbreaks, geographic health needs mapping, and population health planning — with appropriate data governance frameworks.
                </li>
                <li>
                  <strong>NHIA integration:</strong> MedxVerse is actively pursuing integration with Nigeria's National Health Insurance Authority to enable NHIA-covered telemedicine consultations through the platform, extending formal health coverage to enrolled Nigerians.
                </li>
                <li>
                  <strong>Rural and underserved reach:</strong> The mobile-first architecture of Lexi AI extends health access to communities where physical facilities are sparse — requiring only a smartphone and a data connection.
                </li>
                <li>
                  <strong>Employment and economic development:</strong> MedxVerse's growth directly generates skilled employment in technology, health, and operations — contributing to national digital economy development targets.
                </li>
              </ul>
            </div>

            <div className="gaph-section">
              <h2 className="gaph-section-title">Government Engagement Process</h2>
              <p className="gaph-text">
                MedxVerse invites formal engagement from Federal and State Ministries of Health, Ministries of Communications and Digital Economy, the National Information Technology Development Agency (NITDA), the National Health Insurance Authority (NHIA), and equivalent agencies in other jurisdictions.
              </p>
              <div className="gaph-contact-block">
                <p>Please contact <a href="mailto:admin@medxverseapp.com?subject=GOVERNMENT%20PARTNERSHIP">admin@medxverseapp.com</a> with subject line 'GOVERNMENT PARTNERSHIP'.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default GovernmentsAndPublicHealth

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './NGOsAndGlobalHealth.css'

const NGOsAndGlobalHealth = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="nagh-container">
        <div className="nagh-wrapper">
          <section className="nagh-hero">
            <h1 className="nagh-title">NGOs & Global Health</h1>
          </section>
          <section className="nagh-content">
            <div className="nagh-intro">
              <p className="nagh-text">
                Deploying Lexi AI for humanitarian health programmes
              </p>
              <p className="nagh-text">
                Non-governmental organisations, multilateral agencies, global health foundations, and humanitarian organisations represent some of the most important actors in expanding healthcare access in the communities MedxVerse serves. We welcome partnerships with NGOs and global health actors whose programme goals align with our mission to extend intelligent health guidance to underserved populations.
              </p>
            </div>

            <div className="nagh-section">
              <h2 className="nagh-section-title">Programme Integration</h2>
              <p className="nagh-text">
                Lexi AI can be deployed as a health information and triage tool within existing NGO health programmes — extending the reach of your community health workers, enabling digital first contact before facility referral, and providing continuous health monitoring for beneficiary populations.
              </p>
            </div>

            <div className="nagh-section">
              <h2 className="nagh-section-title">Research and Impact Partnerships</h2>
              <p className="nagh-text">
                MedxVerse welcomes collaboration with academic institutions and research organisations studying the impact of digital health interventions on health outcomes, healthcare access, and economic productivity in Sub-Saharan Africa. We are committed to contributing to the evidence base for digital health in emerging markets and will consider data-sharing agreements under appropriate ethical and governance frameworks.
              </p>
            </div>

            <div className="nagh-section">
              <h2 className="nagh-section-title">Non-Commercial API Access</h2>
              <p className="nagh-text">
                Registered NGOs and academic institutions working in global health may apply for non-commercial API access to the Lexi AI platform. Applications are reviewed on a case-by-case basis.
              </p>
              <div className="nagh-contact-block">
                <p>Contact <a href="mailto:admin@medxverseapp.com?subject=NGO%20API%20ACCESS">admin@medxverseapp.com</a> with subject line 'NGO API ACCESS'.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default NGOsAndGlobalHealth

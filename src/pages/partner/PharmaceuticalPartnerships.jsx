import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './PharmaceuticalPartnerships.css'

const PharmaceuticalPartnerships = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="pp-container">
        <div className="pp-wrapper">
          <section className="pp-hero">
            <h1 className="pp-title">Pharmaceutical Partnerships</h1>
          </section>
          <section className="pp-content">
            <div className="pp-intro">
              <p className="pp-text">
                Connecting prescriptions to verified pharmaceutical supply
              </p>
              <p className="pp-text">
                MedxVerse's e-pharmacy integration is one of the platform's most critical service pillars — ensuring that digital prescriptions issued by MedxVerse physicians reach patients through a regulated, verified pharmaceutical supply chain that eliminates the counterfeit drug risk that is a persistent and life-threatening feature of informal drug markets across Nigeria and Africa.
              </p>
            </div>

            <div className="pp-section">
              <h2 className="pp-section-title">Partnership Offer for Pharmaceutical Companies</h2>
              <ul className="pp-features">
                <li>
                  <strong>Distribution channel integration:</strong> Registered pharmaceutical manufacturers can partner with MedxVerse to list their products within the MedxVerse pharmacy network, reaching patients via digital prescription across the platform's growing geographic footprint.
                </li>
                <li>
                  <strong>Medication adherence data:</strong> Anonymised, aggregated medication adherence data from the Lexi AI platform can provide pharmaceutical partners with insights into real-world treatment patterns — with appropriate consent and governance frameworks.
                </li>
                <li>
                  <strong>Patient education content:</strong> Partner with MedxVerse to deliver evidence-based, non-promotional health education content about disease conditions where your therapeutic portfolio operates — reaching patients in a trusted clinical context.
                </li>
                <li>
                  <strong>Clinical trial participant access:</strong> Subject to IRB approval and ethical oversight, MedxVerse may be able to support recruitment of eligible participants for clinical trials in therapeutic areas where our patient population overlaps with trial eligibility criteria.
                </li>
              </ul>
            </div>

            <div className="pp-section">
              <h2 className="pp-section-title">Supply Chain Requirements</h2>
              <p className="pp-text">
                All pharmaceutical partners must be registered with the National Agency for Food and Drug Administration and Control (NAFDAC) and must demonstrate a compliant supply chain with verifiable product provenance. MedxVerse does not partner with unregistered pharmaceutical suppliers or distributors handling unverified products.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PharmaceuticalPartnerships

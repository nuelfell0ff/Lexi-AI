import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import ScrollToTop from '../../components/ScrollToTop'
import './InsuranceAndFintech.css'

const InsuranceAndFintech = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="iaf-container">
        <div className="iaf-wrapper">
          <section className="iaf-hero">
            <h1 className="iaf-title">Insurance & Fintech</h1>
          </section>
          <section className="iaf-content">
            <div className="iaf-intro">
              <p className="iaf-text">
                Integrating digital health into financial services
              </p>
              <p className="iaf-text">
                The intersection of healthcare and financial services is one of the most powerful levers available for improving healthcare access in emerging markets. Health insurance, health savings products, microfinance health credit, and health-linked digital payment platforms all have the potential to fundamentally change the economics of healthcare access for millions of Nigerians and Africans who currently self-fund care out of pocket — at great personal and financial cost.
              </p>
            </div>

            <div className="iaf-section">
              <h2 className="iaf-section-title">Health Insurance Integration</h2>
              <p className="iaf-text">
                MedxVerse offers formal partnership to licensed health insurers and HMOs operating in Nigeria and across Africa. Integration enables insurers to offer their policyholders direct telemedicine access through the Lexi AI platform — reducing the cost of care delivery while dramatically improving policyholder convenience and engagement.
              </p>
              <p className="iaf-text">
                Digital consultation is significantly more cost-efficient than in-person care for many primary and secondary presentations, improving insurer loss ratios while improving patient experience.
              </p>
            </div>

            <div className="iaf-section">
              <h2 className="iaf-section-title">Fintech Health Payment Solutions</h2>
              <p className="iaf-text">
                For fintech platforms, MedxVerse offers API integration that embeds health payment capabilities — consultation booking and payment, medication ordering, lab test booking — directly within your existing financial services application.
              </p>
              <p className="iaf-text">
                This allows fintech platforms to add genuine health value to their product offering while directing health-related transaction volume through their payment infrastructure.
              </p>
            </div>

            <div className="iaf-section">
              <h2 className="iaf-section-title">Health Savings and Credit</h2>
              <p className="iaf-text">
                We are actively exploring partnerships with microfinance institutions and digital lending platforms to develop health credit facilities that allow patients to access care and pay over time — addressing the catastrophic out-of-pocket cost burden that currently prevents millions of Nigerians from seeking timely care.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default InsuranceAndFintech

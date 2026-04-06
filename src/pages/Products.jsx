import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Products.css'

const AISymptomChecker = () => {
  return (
    <>
      <Navbar />
      <div className="symptom-container">
        <div className="symptom-wrapper">
          {/* Hero Section */}
          <section className="symptom-hero">
            <h1 className="symptom-title">AI Symptom Checker</h1>
          </section>

          {/* Main Content */}
          <section className="symptom-content">
            <div className="symptom-text-block">
              <p>
                The Lexi AI Symptom Checker is the primary entry point for patients engaging with the MedxVerse platform. It is not a search engine for diseases. It is a clinically informed artificial intelligence engine that conducts a structured, evidence-based assessment of a patient's presenting symptoms — asking the right follow-up questions, identifying red flags, and guiding each patient toward the most appropriate level of care.
              </p>
            </div>

            {/* How It Works */}
            <div className="symptom-section">
              <h2 className="symptom-section-title">How It Works</h2>
              <div className="symptom-text-block">
                <div className="step-item">
                  <div className="step-num">1</div>
                  <p>The patient opens the Lexi AI app and describes how they feel in plain, natural language — no medical terminology required.</p>
                </div>
                <div className="step-item">
                  <div className="step-num">2</div>
                  <p>Lexi AI processes the description using natural language processing trained on clinical protocols and medical literature, identifying the key symptom clusters and their potential significance.</p>
                </div>
                <div className="step-item">
                  <div className="step-num">3</div>
                  <p>Lexi asks targeted follow-up questions — about duration, severity, associated symptoms, relevant medical history, and current medications — to refine its assessment.</p>
                </div>
                <div className="step-item">
                  <div className="step-num">4</div>
                  <p>Based on the structured clinical picture, Lexi provides an assessment of likely condition categories, urgency level, and recommended action: home care guidance, further monitoring, virtual consultation, or immediate emergency referral.</p>
                </div>
                <div className="step-item">
                  <div className="step-num">5</div>
                  <p>If a virtual consultation is recommended, Lexi connects the patient directly to a licensed MedxVerse doctor without requiring the patient to restart their history.</p>
                </div>
              </div>
            </div>

            {/* Clinical Safety Standards */}
            <div className="symptom-section">
              <h2 className="symptom-section-title">Clinical Safety Standards</h2>
              <div className="symptom-text-block">
                <p>
                  The Lexi AI Symptom Checker is built on evidence-based clinical decision support protocols consistent with international primary care standards. The system is designed with an explicit safety bias: it is calibrated to err toward recommending professional consultation rather than over-relying on AI assessment in ambiguous clinical presentations.
                </p>

                <p>
                  All AI recommendations carry clear caveats and are presented as guidance, not diagnosis.
                </p>

                <p>
                  The system includes mandatory escalation triggers for presentations consistent with medical emergencies — including acute chest pain, stroke symptoms, severe respiratory distress, acute psychiatric crisis, and obstetric emergencies. These presentations bypass AI triage and trigger immediate escalation.
                </p>
              </div>
            </div>

            {/* Important Notice */}
            <div className="symptom-section symptom-important">
              <h3 className="symptom-important-title">Important</h3>
              <p>
                The Lexi AI Symptom Checker provides health guidance — not medical diagnosis. All patients with significant, worsening, or emergency symptoms should seek in-person medical care. Lexi AI does not replace a licensed physician.
              </p>
            </div>

            {/* Key Features */}
            <div className="symptom-section">
              <h2 className="symptom-section-title">Key Features</h2>
              <div className="symptom-text-block">
                <ul className="symptom-features-list">
                  <li>Natural language input — no medical jargon required</li>
                  <li>Structured clinical questioning aligned with primary care protocols</li>
                  <li>Severity and urgency classification with clear patient-facing language</li>
                  <li>Mandatory emergency escalation protocols for red-flag presentations</li>
                  <li>Seamless handoff to MedxVerse doctor consultation when required</li>
                  <li>Consultation history retained for doctor review — no patient history repetition</li>
                  <li>Available in English — multi-language support in development</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AISymptomChecker

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './VirtualHealthAssistant.css'

const VirtualHealthAssistant = () => {
  return (
    <>
      <Navbar />
      <div className="vha-container">
        <div className="vha-wrapper">
          {/* Hero Section */}
          <section className="vha-hero">
            <h1 className="vha-title">Virtual Health Assistant</h1>
          </section>

          {/* Main Content */}
          <section className="vha-content">
            <div className="vha-text-block">
              <p>
                Lexi AI functions as a comprehensive virtual health assistant — extending far beyond symptom checking to serve as a continuous, intelligent health companion for every patient on the MedxVerse platform.
              </p>

              <p>
                Think of Lexi as the knowledgeable, always-available friend who happens to have the medical knowledge of a doctor — one who remembers your health history, reminds you to take your medication, explains your lab results in plain language, and is available at 3am when no clinic is open.
              </p>
            </div>

            {/* Full Capability Suite */}
            <div className="vha-section">
              <h2 className="vha-section-title">Full Capability Suite</h2>

              <div className="vha-capability">
                <h3 className="capability-title">Symptom Assessment & Triage</h3>
                <p>Structured clinical assessment of presenting symptoms with evidence-based urgency classification and care pathway guidance.</p>
              </div>

              <div className="vha-capability">
                <h3 className="capability-title">Appointment Management</h3>
                <p>Lexi AI handles the full lifecycle of healthcare appointments — booking, confirmation, preparation instructions, reminders, and post-consultation follow-up scheduling.</p>
              </div>

              <div className="vha-capability">
                <h3 className="capability-title">Medication Reminders & Adherence</h3>
                <p>Personalised, time-accurate medication reminder alerts that improve treatment adherence — particularly critical for patients managing chronic conditions such as hypertension, diabetes, HIV, and tuberculosis.</p>
              </div>

              <div className="vha-capability">
                <h3 className="capability-title">Health Education</h3>
                <p>Plain-language, evidence-based health information on demand — covering conditions, medications, procedures, prevention, and lifestyle.</p>
              </div>

              <div className="vha-capability">
                <h3 className="capability-title">Lab Result Explanation</h3>
                <p>When a patient receives lab results through the MedxVerse platform, Lexi explains what the results mean in plain, accessible language.</p>
              </div>

              <div className="vha-capability">
                <h3 className="capability-title">Recovery Support</h3>
                <p>For patients recently discharged from hospital, Lexi provides structured daily check-ins, monitoring reported symptoms and ensuring the post-discharge care plan is followed.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default VirtualHealthAssistant

import React, { useState } from 'react'
import './Faqs.css'

const Faqs = () => {
  const [expandedIndex, setExpandedIndex] = useState(null)

  const faqData = [
    {
      question: "What is Lexi AI?",
      answer: "Lexi AI is an intelligent health assistant that acts as your first point of contact for healthcare. It helps you understand symptoms, get guidance, and connect to the right level of care—all in one place."
    },
    {
      question: "How does Lexi AI assess my symptoms?",
      answer: "Lexi listens to how you describe your symptoms in plain language, asks smart follow-up questions, and evaluates how serious your condition may be while guiding you on what to do next."
    },
    {
      question: "Can Lexi AI connect me to a real doctor?",
      answer: "Yes. If your condition requires medical attention, Lexi seamlessly connects you to a verified, licensed MedxVerse doctor via video, voice, or chat—without restarting your conversation."
    },
    {
      question: "Can Lexi AI analyze my medical reports?",
      answer: "Absolutely. You can upload lab results, scans, or medical documents, and Lexi will analyze them and explain the results in simple, easy-to-understand language."
    },
    {
      question: "Does Lexi AI help with booking appointments?",
      answer: "Yes. Lexi can schedule, manage, and send reminders for your medical appointments so you never miss an important consultation."
    },
    {
      question: "Can Lexi remind me to take my medications?",
      answer: "Yes. Lexi sends personalized daily reminders for your medications, helping you stay consistent—especially if you're managing chronic conditions."
    },
    {
      question: "Does Lexi AI track recovery after hospital visits?",
      answer: "Yes. Lexi provides daily check-ins after hospital discharge to monitor your recovery and alert your care team if anything seems concerning."
    },
    {
      question: "Can Lexi help me track my health goals?",
      answer: "Yes. Lexi tracks metrics like blood pressure, blood sugar, and weight over time, helping you monitor progress and identify trends to discuss with your doctor."
    },
    {
      question: "Can I ask Lexi general health questions?",
      answer: "Of course. Lexi is available 24/7 to answer your health questions in simple language, helping you understand your condition, medications, and when to seek care."
    },
    {
      question: "How does Lexi decide what kind of care I need?",
      answer: "Lexi uses intelligent triage to determine whether your situation requires home care advice, a doctor consultation, or emergency attention—and directs you to the appropriate level of care instantly."
    }
  ]

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section className="faqs-section">
      <div className="faqs-container">
        <div className="faqs-header">
          <h2 className="faqs-title">Frequently Asked Questions</h2>
        </div>

        <div className="accordion">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`accordion-item ${expandedIndex === index ? 'expanded' : ''}`}
            >
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <span className="accordion-question">{faq.question}</span>
                <span className="accordion-icon">
                  <i className="fas fa-plus"></i>
                </span>
              </button>

              <div className="accordion-content">
                <p className="accordion-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faqs
import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './About.css'

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-wrapper">
          {/* Hero Section */}
          <section className="about-hero">
            <h1 className="about-title">About Lexi AI</h1>
            <p className="about-subtitle">
              The intelligent health companion built for a world that deserves better healthcare
            </p>
          </section>

          {/* Main Content */}
          <section className="about-content">
            <div className="about-text-block">
              <p>
                Lexi AI is an artificial intelligence-powered health assistant developed by MedxVerse Telemedicine & Virtual Care Ltd, a legally incorporated Nigerian healthcare technology company (RC: 8786663). Lexi is built to address one of the most persistent and consequential failures of the modern world: the inability of billions of people to access qualified medical guidance when they need it most.
              </p>

              <p>
                The World Health Organization estimates a global shortfall of 10 million health workers by 2030, with the most acute gaps concentrated in Sub-Saharan Africa, South Asia, and parts of Latin America. In Nigeria alone, there are fewer than 0.4 doctors per 1,000 people — a figure that sits far below the WHO's minimum threshold of 1.0. The consequences of this shortage are not abstract: they are measured in preventable deaths, late diagnoses, untreated chronic conditions, and the catastrophic financial burden of healthcare that forces millions of families deeper into poverty every year.
              </p>

              <p>
                Lexi AI exists to change that equation fundamentally. Not by replacing doctors — but by ensuring that every person, regardless of geography, income, or the quality of their local health system, has access to intelligent, trustworthy health guidance 24 hours a day, every day of the year.
              </p>
            </div>

            {/* What Makes Lexi Different */}
            <div className="about-section">
              <h2 className="about-section-title">What Makes Lexi Different</h2>
              <div className="about-text-block">
                <p>
                  Lexi is not a symptom search engine, nor a general-purpose chatbot repurposed for healthcare. It is a clinically informed artificial intelligence engine built specifically for health guidance, using natural language processing trained on evidence-based medical protocols. Lexi understands how real people describe how they feel — in plain language, without medical terminology — and translates those descriptions into structured clinical assessments that guide patients toward the right level of care.
                </p>

                <p>
                  When Lexi determines that a patient's presentation exceeds what AI guidance can safely address, it escalates without hesitation — connecting the patient directly to a verified, licensed MedxVerse physician for a real-time video or audio consultation. The handoff is seamless. The patient never has to start over.
                </p>
              </div>
            </div>

            {/* Our Platform */}
            <div className="about-section">
              <h2 className="about-section-title">Our Platform</h2>
              <div className="about-text-block">
                <p>
                  Lexi AI is the intelligence layer of the MedxVerse ecosystem — a comprehensive digital health platform that integrates telemedicine, e-pharmacy, e-diagnostics, health monitoring, and lifestyle support into a single, mobile-first application. The platform is accessible via the MedxVerse mobile app (iOS and Android), the web application at le-xi-ai.vercel.app, and through the MedxVerse API for institutional and developer integration.
                </p>
              </div>
            </div>

            {/* Our Founding Principle */}
            <div className="about-section">
              <h2 className="about-section-title">Our Founding Principle</h2>
              <div className="about-text-block">
                <p>
                  We believe that access to healthcare guidance is a fundamental human right — not a privilege determined by where you were born or how much money you have. Lexi AI is our commitment to that belief, expressed in code, in clinical protocol, and in the daily reality of patients across Africa and beyond who now have a knowledgeable, always-available health companion in their pocket.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="about-section">
              <h2 className="about-section-title">Our Mission</h2>
              <div className="about-text-block about-mission">
                <p>
                  To give every human being on earth access to intelligent, evidence-based health guidance — regardless of geography, income, or the capacity of their local healthcare system.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About

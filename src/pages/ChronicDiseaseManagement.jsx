import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './ChronicDiseaseManagement.css'

const ChronicDiseaseManagement = () => {
  return (
    <>
      <Navbar />
      <div className="cdm-container">
        <div className="cdm-wrapper">
          {/* Hero Section */}
          <section className="cdm-hero">
            <h1 className="cdm-title">Chronic Disease Management</h1>
          </section>

          {/* Main Content */}
          <section className="cdm-content">
            <div className="cdm-text-block">
              <p>
                Digital tools for better long-term health outcomes
              </p>

              <p>
                Non-communicable diseases — hypertension, type 2 diabetes, chronic respiratory disease, heart failure, and others — represent Africa's fastest-growing disease burden.
              </p>

              <p>
                The WHO estimates that NCDs cause over 2.4 million deaths in Africa annually, a figure that is rising as populations age and urbanise.
              </p>

              <p>
                Lexi AI's chronic disease management tools are built to deliver consistent monitoring, medication adherence, and timely clinical intervention.
              </p>
            </div>

            {/* Hypertension Management */}
            <div className="cdm-section">
              <h2 className="cdm-section-title">Hypertension Management</h2>

              <p className="cdm-section-intro">
                Hypertension affects approximately 46% of adults in sub-Saharan Africa.
              </p>

              <p className="cdm-section-subheader">Lexi AI enables:</p>

              <ul className="cdm-features-list">
                <li>Blood pressure logging</li>
                <li>Trend tracking</li>
                <li>Lifestyle guidance</li>
                <li>Escalation to doctors</li>
              </ul>
            </div>

            {/* Diabetes Management */}
            <div className="cdm-section">
              <h2 className="cdm-section-title">Diabetes Management</h2>

              <p className="cdm-section-intro">
                Africa has over 24 million people living with diabetes.
              </p>

              <p className="cdm-section-subheader">Lexi AI supports:</p>

              <ul className="cdm-features-list">
                <li>Blood glucose tracking</li>
                <li>HbA1c monitoring</li>
                <li>Dietary guidance</li>
                <li>Medication reminders</li>
              </ul>
            </div>

            {/* General NCD Monitoring */}
            <div className="cdm-section">
              <h2 className="cdm-section-title">General NCD Monitoring</h2>

              <p className="cdm-section-subheader">Patients can track:</p>

              <ul className="cdm-features-list">
                <li>Blood pressure</li>
                <li>Blood glucose</li>
                <li>Weight</li>
                <li>Peak flow</li>
              </ul>
            </div>

            {/* Medication Adherence Programme */}
            <div className="cdm-section">
              <h2 className="cdm-section-title">Medication Adherence Programme</h2>

              <p>
                Lexi AI provides personalised medication reminder systems proven to improve adherence rates by 40–60%.
              </p>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ChronicDiseaseManagement

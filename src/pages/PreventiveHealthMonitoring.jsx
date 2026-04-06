import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './PreventiveHealthMonitoring.css'

const PreventiveHealthMonitoring = () => {
  return (
    <>
      <Navbar />
      <div className="phm-container">
        <div className="phm-wrapper">
          {/* Hero Section */}
          <section className="phm-hero">
            <h1 className="phm-title">Preventive Health Monitoring</h1>
          </section>

          {/* Main Content */}
          <section className="phm-content">
            <div className="phm-text-block">
              <p>
                Catch problems before they become crises
              </p>

              <p>
                The most cost-effective healthcare intervention is one that prevents a condition from developing or progressing in the first place. Lexi AI's preventive health monitoring tools are designed to shift the healthcare engagement pattern from reactive crisis management to proactive, continuous wellness monitoring — the single most impactful change available to individuals managing their long-term health.
              </p>
            </div>

            {/* Continuous Health Tracking */}
            <div className="phm-section">
              <h2 className="phm-section-title">Continuous Health Tracking</h2>

              <div className="phm-section-content">
                <p>
                  Patients on the Lexi AI platform can track blood pressure, blood glucose, weight, and other relevant metrics on a continuous basis, building a longitudinal health record that provides clinically valuable trend data.
                </p>

                <p>
                  Unlike episodic healthcare encounters that capture only a single snapshot in time, continuous tracking enables the detection of trends — a gradually rising blood pressure, a creeping increase in fasting glucose — that signal emerging risk before it becomes acute disease.
                </p>
              </div>
            </div>

            {/* Risk Stratification */}
            <div className="phm-section">
              <h2 className="phm-section-title">Risk Stratification</h2>

              <div className="phm-section-content">
                <p>
                  Lexi AI's health monitoring algorithms identify patients showing patterns consistent with elevated risk for specific conditions and generate personalised prompts to seek clinical assessment.
                </p>

                <p>
                  This risk stratification capability — which requires no laboratory testing, only consistent self-reported data — has the potential to identify thousands of patients at risk for hypertension, diabetes, and cardiovascular disease before they experience a preventable acute event.
                </p>
              </div>
            </div>

            {/* Health Goal Setting */}
            <div className="phm-section">
              <h2 className="phm-section-title">Health Goal Setting</h2>

              <div className="phm-section-content">
                <p>
                  Lexi AI allows patients to set explicit, measurable health goals — target blood pressure ranges, target weight, target blood glucose levels — and tracks progress toward those goals over time.
                </p>

                <p>
                  Regular progress reporting, combined with Lexi's encouragement and evidence-based lifestyle guidance, improves patient motivation and long-term engagement with preventive health behaviours.
                </p>
              </div>
            </div>

            {/* Lifestyle & Nutrition Support */}
            <div className="phm-section">
              <h2 className="phm-section-title">Lifestyle & Nutrition Support</h2>

              <div className="phm-section-content">
                <p>
                  Through the MedxVerse Lifestyle & Support Services, patients receive AI-powered dietary guidance aligned to their health profile and any active medical conditions, integrated with the platform's food ordering capability to make medically appropriate nutrition choices practically accessible — not just theoretically recommended.
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

export default PreventiveHealthMonitoring

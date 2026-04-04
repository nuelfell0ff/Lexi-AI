import React from 'react'
import './Pricing.css'

const Pricing = () => {
  const plans = [
    {
      icon: 'fa-gift',
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: null,
      period: null,
      features: [
        { text: '3 symptom checks per month', available: true },
        { text: '5 health Q&A per month', available: true },
        { text: 'No document analysis', available: false },
        { text: 'No voice notes', available: false },
        { text: 'Max 1 reminder', available: true },
      ],
      recommended: false,
      buttonText: 'Get Started',
    },
    {
      icon: 'fa-star',
      name: 'Standard Plan',
      description: 'For regular users',
      price: '₦1,000',
      period: '/month or ₦10,000/year',
      features: [
        { text: '15 symptom checks per month', available: true },
        { text: '30 health Q&A per month', available: true },
        { text: '5 document analyses per month', available: true },
        { text: '5 medication reminders', available: true },
        { text: 'Voice note support', available: true },
      ],
      recommended: true,
      buttonText: 'Choose Plan',
    },
    {
      icon: 'fa-crown',
      name: 'Premium Plan',
      description: 'For power users',
      price: '₦2,000',
      period: '/month or ₦20,000/year',
      features: [
        { text: 'Unlimited symptom checks', available: true },
        { text: 'Unlimited health Q&A', available: true },
        { text: 'Unlimited document analysis', available: true },
        { text: 'PDF health reports', available: true },
        { text: 'Priority AI responses', available: true },
      ],
      recommended: false,
      buttonText: 'Choose Plan',
    },
  ]

  return (
    <section className="pricing-section">
      <div className="pricing-container">
        {/* Header */}
        <div className="pricing-header">
          <h2 className="pricing-title">The Perfect Plan for Your Needs</h2>
          <p className="pricing-subtitle">
            Our transparent pricing makes it easy to find a plan that works within your financial constraints.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div key={index} className={`pricing-card ${plan.recommended ? 'recommended' : ''}`}>
              {plan.recommended && <div className="recommended-badge">Recommended</div>}

              <div className="plan-icon">
                <i className={`fas ${plan.icon}`}></i>
              </div>
              <h3 className="plan-name">{plan.name}</h3>
              <p className="plan-description">{plan.description}</p>

              {plan.price && (
                <div className="plan-price">
                  <span className="price">{plan.price}</span>
                  <span className="period">{plan.period}</span>
                </div>
              )}

              {/* Features */}
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className={`feature ${feature.available ? 'available' : 'unavailable'}`}>
                    <i className={`fas ${feature.available ? 'fa-check-circle' : 'fa-times-circle'}`}></i>
                    <span>{feature.text}</span>
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className={`plan-button ${plan.recommended ? 'primary' : 'secondary'}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="pricing-footer">
          <button className="cta-button">Book Demo Now!</button>
        </div>
      </div>
    </section>
  )
}

export default Pricing
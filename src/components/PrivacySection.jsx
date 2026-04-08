import React from 'react';
import './PrivacySection.css';
import privacyImage from '../assets/IMG_6808.PNG';

const PrivacySection = () => {
  const features = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      title: 'End-to-End Encryption',
      description: 'Your data is securely encrypted at every stage, from input to response.',
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 12l3 3 5-5"></path>
        </svg>
      ),
      title: 'No Data Selling',
      description: 'We never sell, share, or misuse your personal or health information.',
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      ),
      title: 'Anonymous Usage',
      description: 'Use Lexi AI without revealing your identity or personal details.',
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      title: 'Secure Infrastructure',
      description: 'Built on modern, enterprise-grade systems designed for safety and reliability.',
    },
  ];

  return (
    <section className="privacy-section">
      <div className="privacy-container">
        <div className="privacy-wrapper">
          {/* Left Content */}
          <div className="privacy-content-col order-lg-1">
            <div className="privacy-content">
              <div className="privacy-label">Privacy & Security</div>
              <h2 className="privacy-heading">Your Health Data. Protected. Always.</h2>
              <p className="privacy-subtext">
                Lexi AI is built with a privacy-first approach to ensure your data remains secure, confidential, and fully under your control.
              </p>

              {/* Features Grid */}
              <div className="features-container">
                {features.map((feature) => (
                  <div key={feature.id} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-content">
                      <h3 className="feature-title">{feature.title}</h3>
                      <p className="feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="privacy-image-col order-lg-2">
            <div className="privacy-image-wrapper">
              <img
                src={privacyImage}
                alt="Privacy and Security"
                className="privacy-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacySection;

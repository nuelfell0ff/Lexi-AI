import React, { useState, useEffect } from 'react'
import './Hero.css'
import heroImage from '../assets/hero-image1.png'
import googlePlayBtn from '../assets/imgi_8_googlePlay84c90596.png'
import appStoreBtn from '../assets/imgi_9_appStore5b02addd.png'

const Hero = () => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Show modal after 1 second
    const timer = setTimeout(() => {
      setShowModal(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-heading">Revolutionizing Healthcare with AI</h1>

          <p className="hero-subheading">
            Get instant, reliable health insights powered by intelligent AI, designed to help you understand your symptoms, make informed decisions, and access support anytime, anywhere.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons">
            <a href="https://wa.link/7laj6q" target="_blank" rel="noopener noreferrer" className="btn btn-primary">Start Chat on WhatsApp</a>
            <a href="#features" className="btn btn-secondary">Learn How It Works</a>
          </div>

          {/* Trust Section */}
          <div className="hero-trust">
            <div className="avatars">
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="Patient 1" />
              </div>
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Patient 2" />
              </div>
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" alt="Patient 3" />
              </div>
              <div className="avatar">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" alt="Patient 4" />
              </div>
            </div>
            <div className="trust-text">
              <p className="rating">Rated <strong>4.8★</strong></p>
              <p className="trust-badge">Trusted by 1000+ Patients</p>
            </div>
          </div>

          {/* Download App Section */}
          <div className="hero-download-section">
            <h3 className="download-heading">Do you need a doctor now?</h3>
            <p className="download-subheading">Download MedxVerse app</p>
            <div className="download-buttons">
              <a href="https://play.google.com/store/apps/details?id=com.medxapp.app&hl=en" target="_blank" rel="noopener noreferrer" className="app-store-link">
                <img src={googlePlayBtn} alt="Google Play" className="app-store-image" />
              </a>
              <a href="https://apps.apple.com/app/medxverse" target="_blank" rel="noopener noreferrer" className="app-store-link">
                <img src={appStoreBtn} alt="App Store" className="app-store-image" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="hero-image">
          <div className="image-placeholder">
            <img src={heroImage} alt="AI Healthcare Assistant" className="ai-image" />
          </div>
        </div>
      </div>

      {/* Health Support Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowModal(false)}>×</button>

            <div className="modal-body">
              <h2 className="modal-title">Smart Health Support, Anytime You Need It</h2>

              <p className="modal-subtitle">Instant answers. Real guidance. Better health decisions.</p>

              <p className="modal-description">
                Get quick, intelligent health insights with Lexi AI — your personal AI health assistant.
                Check symptoms, understand your condition, and know your next step in seconds.
              </p>

              <div className="modal-features">
                <div className="feature-item">AI-powered symptom assessment</div>
                <div className="feature-item">Personalized health recommendations</div>
                <div className="feature-item">Instant triage (know if it's urgent or not)</div>
                <div className="feature-item">Available 24/7, anywhere in Africa</div>
              </div>

              <p className="modal-tagline">No waiting. No confusion. Just clarity.</p>

              <div className="modal-divider">⸻</div>

              <button className="modal-btn" onClick={() => setShowModal(false)}>
                Start Your Health Check
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
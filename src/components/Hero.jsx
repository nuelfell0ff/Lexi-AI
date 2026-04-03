import React from 'react'
import './Hero.css'
import heroImage from '../assets/hero-image.png'

const Hero = () => {
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
            <button className="btn btn-primary">Start Chat on WhatsApp</button>
            <button className="btn btn-secondary">Learn How It Works</button>
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
        </div>

        {/* Right Image Section */}
        <div className="hero-image">
          <div className="image-placeholder">
            <img src={heroImage} alt="AI Healthcare Assistant" className="ai-image" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
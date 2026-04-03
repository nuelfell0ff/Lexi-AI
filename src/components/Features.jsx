import React, { useState } from 'react';
import './Features.css';
import mockup1 from '../assets/IMG_5394.PNG';
import mockup2 from '../assets/IMG_5396.PNG';
import mockup3 from '../assets/IMG_5398.PNG';
import mockup4 from '../assets/IMG_5400.PNG';

const Features = () => {
  const features = [
    {
      img: mockup1,
      title: "24/7 AI Assistance",
      description: "Chat with Lexi AI anytime and get instant health guidance."
    },
    {
      img: mockup2,
      title: "Symptom Checker",
      description: "Describe your symptoms and receive quick, AI-powered insights."
    },
    {
      img: mockup3,
      title: "Personalized Advice",
      description: "Get recommendations tailored to your health needs."
    },
    {
      img: mockup4,
      title: "Instant Responses",
      description: "No waiting — get answers in seconds directly on WhatsApp."
    },
  ];

  // Duplicate features 3 times for infinite scroll
  const allSlides = [...features, ...features, ...features];

  // Start at middle copy so prev works immediately
  const [currentSlide, setCurrentSlide] = useState(features.length);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const nextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    // Reset to middle copy without visual jump
    if (currentSlide >= features.length * 2) {
      setCurrentSlide(features.length);
    } else if (currentSlide < features.length) {
      setCurrentSlide(currentSlide + features.length);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="features-section">
      <div className="features-wrapper">

        {/* Header */}
        <div className="features-header">
          <h2 className="features-title">What Lexi AI Can Do</h2>
          <p className="features-subtitle">
            Explore the powerful ways Lexi AI helps you manage your health with instant, personalized guidance right on WhatsApp.
          </p>
        </div>

        {/* Grid for Large Screens / Slider for Small Screens */}
        <div className="mockups-layout">
          <div className="mockups-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <img src={feature.img} alt={feature.title} className="mockup-img" />
                <h3 className="feature-label">{feature.title}</h3>
                <p className="feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Slider Version for Mobile */}
          <div className="mockups-slider">
            <button className="nav-btn prev-btn" onClick={prevSlide} aria-label="Previous">
              &lt;
            </button>
            <div className="slider-track" style={{
              transform: `translateX(-${currentSlide * 100}%)`,
              transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
            }}
              onTransitionEnd={handleTransitionEnd}
            >
              {allSlides.map((feature, index) => (
                <div key={index} className="slider-item">
                  <img src={feature.img} alt={feature.title} className="mockup-img-slider" />
                  <h3 className="feature-label-slider">{feature.title}</h3>
                  <p className="feature-desc-slider">{feature.description}</p>
                </div>
              ))}
            </div>
            <button className="nav-btn next-btn" onClick={nextSlide} aria-label="Next">
              &gt;
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Features
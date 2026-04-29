import React, { useState, useEffect } from 'react';
import './CampuusAmbassador.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CampuusAmbassador = () => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeBenefitIndex, setActiveBenefitIndex] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [email, setEmail] = useState('');
  const [emailSuccess, setEmailSuccess] = useState(false);

  // Sample ambassador gallery images
  const ambassadorImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop' },
    { id: 2, url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=400&fit=crop' },
    { id: 3, url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop' },
    { id: 4, url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop' },
  ];

  const benefits = [
    {
      id: 1,
      title: 'Like Minded Individuals',
      description: 'Become part of a vibrant community of young intellectuals across different schools nationwide.',
      bgColor: '#E8F5E9',
      icon: 'bi-people',
    },
    {
      id: 2,
      title: 'Paid Internship Opportunities',
      description: 'Get a chance to intern with us, or any of our partner companies.',
      bgColor: '#FFF9C4',
      icon: 'bi-briefcase',
    },
    {
      id: 3,
      title: 'Scholarship Opportunities',
      description: 'Get the chance to compete for opportunities for students and graduates across the nation.',
      bgColor: '#FCE4EC',
      icon: 'bi-mortarboard',
    },
    {
      id: 4,
      title: 'Career Development',
      description: 'Access mentorship programs and professional development resources to advance your career.',
      bgColor: '#E0F2F1',
      icon: 'bi-graph-up',
    },
    {
      id: 5,
      title: 'Global Network',
      description: 'Connect with industry leaders and professionals from around the world in your field.',
      bgColor: '#F3E5F5',
      icon: 'bi-globe',
    },
    {
      id: 6,
      title: 'Exclusive Perks',
      description: 'Enjoy exclusive discounts, early access to new features, and special ambassador benefits.',
      bgColor: '#FFF3E0',
      icon: 'bi-gift',
    },
  ];

  const stories = [
    {
      id: 1,
      title: 'How I Built My First AI Project',
      excerpt: 'Join me as I share my journey of leveraging Lexi AI to understand healthcare data...',
      date: 'June 25, 2025',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      title: 'Lexi AI Transformed My Learning',
      excerpt: 'Discover how an ambassador program changed the way I approach problem-solving...',
      date: 'March 26, 2024',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      title: 'My Internship with Lexi AI',
      excerpt: "It's been a whirlwind journey learning full-stack development and working on real-world healthcare solutions...",
      date: 'May 31, 2024',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    },
  ];

  const universities = [
    'University of Lagos',
    'Ahmadu Bello University',
    'University of Ibadan',
    'OAU, Ile-Ife',
    'UNILAG (Akoka)',
    'Covenant University',
    'Babcock University',
    'Pan African University',
  ];

  const faqs = [
    {
      id: 1,
      question: 'Who is eligible to apply?',
      answer: 'Any student or recent graduate passionate about healthcare innovation and AI technology can apply. No prior experience necessary.',
    },
    {
      id: 2,
      question: 'Is this program free to join?',
      answer: 'Yes! The Lexi AI Ambassador program is completely free to join. You only need enthusiasm and a commitment to learning.',
    },
    {
      id: 3,
      question: 'Can I apply if I\'m not in a tech field?',
      answer: 'Absolutely! We welcome ambassadors from all fields. Diversity of perspective makes our community stronger.',
    },
    {
      id: 4,
      question: 'What are the time commitments?',
      answer: 'You can start with just a few hours per week. Scale up as your involvement grows. Full flexibility based on your schedule.',
    },
    {
      id: 5,
      question: 'Do I get mentorship?',
      answer: 'Yes! Each ambassador gets paired with a mentor and access to our learning resources and community support.',
    },
  ];

  const handleStoryNav = (direction) => {
    if (direction === 'next') {
      setActiveStoryIndex((prev) => (prev + 1) % stories.length);
    } else {
      setActiveStoryIndex((prev) => (prev - 1 + stories.length) % stories.length);
    }
  };

  const handleBenefitNav = (direction) => {
    const isDesktop = window.innerWidth > 768;
    const step = isDesktop ? 3 : 1;
    const maxIndex = benefits.length;

    if (direction === 'next') {
      setActiveBenefitIndex((prev) => (prev + step) % maxIndex);
    } else {
      setActiveBenefitIndex((prev) => (prev - step + maxIndex) % maxIndex);
    }
  };

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSuccess(true);
      setEmail('');
      setTimeout(() => setEmailSuccess(false), 3000);
    }
  };

  return (
    <div className="campuus-ambassador-page">
      <Navbar />

      {/* Hero Section */}
      <section className="campuus-hero">
        <div className="campuus-hero-content">
          <h1 className="campuus-hero-title">Become a Lexi AI Ambassador</h1>
          <p className="campuus-hero-subtitle">Learn. Lead. Grow.</p>
          <a href="#apply" className="campuus-btn campuus-btn-primary">
            Register Here
          </a>
        </div>
      </section>

      {/* Ambassador Gallery */}
      <section className="campuus-gallery">
        <div className="campuus-gallery-grid">
          {ambassadorImages.map((img) => (
            <div key={img.id} className="campuus-gallery-item">
              <img src={img.url} alt="Ambassador" />
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="campuus-benefits">
        <div className="campuus-container">
          <h2 className="campuus-section-title">What's in it for you?</h2>

          {/* Desktop Swiper */}
          <div className="campuus-benefits-swiper-wrapper">
            <div className="campuus-benefits-swiper">
              <div className="campuus-swiper-track" style={{
                transform: `translateX(-${activeBenefitIndex * (100 / 3)}%)`,
              }}>
                {benefits.map((benefit) => (
                  <div key={benefit.id} className="campuus-benefit-card-wrapper">
                    <div className="campuus-benefit-card" style={{ backgroundColor: benefit.bgColor }}>
                      <div className="campuus-benefit-illustration">
                        <i className={`bi ${benefit.icon}`}></i>
                      </div>
                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Navigation Controls - Below Cards */}
          <div className="campuus-swiper-controls-bottom">
            <button className="campuus-swiper-btn-bottom prev" onClick={() => handleBenefitNav('prev')}>
              <i className="bi bi-chevron-left"></i>
            </button>

            {/* Pagination Dots */}
            <div className="campuus-pagination">
              {[...Array(Math.ceil(benefits.length / 3))].map((_, idx) => (
                <button
                  key={idx}
                  className={`campuus-pagination-dot ${activeBenefitIndex === idx * 3 ? 'active' : ''}`}
                  onClick={() => setActiveBenefitIndex(idx * 3)}
                />
              ))}
            </div>

            <button className="campuus-swiper-btn-bottom next" onClick={() => handleBenefitNav('next')}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>

          {/* Mobile Slider */}
          <div className="campuus-benefits-slider">
            <div className="campuus-benefit-card" style={{ backgroundColor: benefits[activeBenefitIndex].bgColor }}>
              <div className="campuus-benefit-illustration">
                <i className={`bi ${benefits[activeBenefitIndex].icon}`}></i>
              </div>
              <h3>{benefits[activeBenefitIndex].title}</h3>
              <p>{benefits[activeBenefitIndex].description}</p>
            </div>
            <div className="campuus-slider-controls">
              <button className="campuus-slider-btn" onClick={() => handleBenefitNav('prev')}>
                &lt;
              </button>
              <button className="campuus-slider-btn" onClick={() => handleBenefitNav('next')}>
                &gt;
              </button>
            </div>
            <div className="campuus-pagination mobile">
              {benefits.map((_, idx) => (
                <button
                  key={idx}
                  className={`campuus-pagination-dot ${activeBenefitIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveBenefitIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Qualities Banner */}
      <section className="campuus-qualities">
        <div className="campuus-qualities-content">
          <p className="campuus-qualities-label">To be a Lexi AI ambassador, you should:</p>
          <h2 className="campuus-qualities-title">Be an effective communicator</h2>
          <a href="#apply" className="campuus-btn campuus-btn-white">
            Register Here
          </a>
        </div>
      </section>

      {/* Universities Section */}
      <section className="campuus-universities">
        <div className="campuus-container">
          <h2 className="campuus-section-title">Shaping minds one campus at a time</h2>

          {/* Infinite Scroll Marquee */}
          <div className="campuus-universities-marquee">
            <div className="campuus-marquee-track">
              {[...universities, ...universities].map((uni, idx) => (
                <div key={idx} className="campuus-university-badge-marquee">
                  <i className="bi bi-mortarboard"></i>
                  <span>{uni}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="campuus-universities-action">
            <a href="#apply" className="campuus-btn campuus-btn-primary">
              Find Your Campus
            </a>
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="campuus-stories">
        <div className="campuus-container">
          <h2 className="campuus-stories-title">Stories that speak for themselves</h2>

          {/* Desktop Grid */}
          <div className="campuus-stories-grid">
            {stories.map((story) => (
              <div key={story.id} className="campuus-story-card">
                <div className="campuus-story-image">
                  <img src={story.image} alt={story.title} />
                  <div className="campuus-play-icon">▶</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slider */}
          <div className="campuus-stories-slider">
            <div className="campuus-story-card">
              <div className="campuus-story-image">
                <img src={stories[activeStoryIndex].image} alt={stories[activeStoryIndex].title} />
                <div className="campuus-play-icon">▶</div>
              </div>
            </div>
            <div className="campuus-slider-controls">
              <button className="campuus-slider-btn light" onClick={() => handleStoryNav('prev')}>
                &lt;
              </button>
              <button className="campuus-slider-btn light" onClick={() => handleStoryNav('next')}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Stories Section */}
      <section className="campuus-blog-stories">
        <div className="campuus-container">
          <h2 className="campuus-section-title">Read their stories</h2>
          <div className="campuus-blog-grid">
            {stories.map((story) => (
              <article key={story.id} className="campuus-blog-card">
                <div className="campuus-blog-image" style={{ backgroundImage: `url(${story.image})` }}></div>
                <div className="campuus-blog-content">
                  <h3>{story.title}</h3>
                  <p>{story.excerpt}</p>
                  <time>{story.date}</time>
                </div>
              </article>
            ))}
          </div>
          <div className="campuus-blog-action">
            <a href="#stories" className="campuus-btn campuus-btn-primary">
              Read More Stories
            </a>
          </div>
        </div>
      </section>

      {/* Badge Generation Section */}
      <section className="campuus-badge">
        <div className="campuus-container">
          <div className="campuus-badge-content">
            <div className="campuus-badge-form">
              <h2>Generate a badge and share with your friends</h2>
              <form onSubmit={handleEmailSubmit} className="campuus-badge-form-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="campuus-btn campuus-btn-primary">
                  Generate Badge
                </button>
              </form>
              {emailSuccess && <p className="campuus-success-msg">Badge generated successfully!</p>}
            </div>
            <div className="campuus-badge-preview">
              <div className="campuus-badge-card">
                <h3>I'm a</h3>
                <h2>Lexi AI Ambassador</h2>
                <p className="campuus-badge-subtitle">Empowering Healthcare Innovation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="campuus-faqs" id="apply">
        <div className="campuus-container">
          <h2 className="campuus-section-title">FAQs</h2>
          <div className="campuus-faq-list">
            {faqs.map((faq) => (
              <div key={faq.id} className={`campuus-faq-item ${expandedFaq === faq.id ? 'active' : ''}`}>
                <button
                  className="campuus-faq-question"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="campuus-faq-toggle">{expandedFaq === faq.id ? '−' : '+'}</span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="campuus-faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="campuus-faq-cta">
            <a href="#" className="campuus-cta-link">
              Become an Ambassador <span>→</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CampuusAmbassador;

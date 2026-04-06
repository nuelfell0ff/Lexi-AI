import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './Blog.css'

const Blog = () => {
  const categories = [
    'Healthcare Access',
    'AI in Clinical Practice',
    'Policy & Regulation',
    'Founder Perspectives'
  ]

  return (
    <>
      <Navbar />
      <div className="blog-container">
        <div className="blog-wrapper">
          {/* Hero Section */}
          <section className="blog-hero">
            <h1 className="blog-title">Blog / Insights</h1>
            <p className="blog-subtitle">
              The Lexi AI Insights blog publishes original thinking on:
            </p>
          </section>

          {/* Main Content */}
          <section className="blog-content">
            {/* Topics Section */}
            <div className="blog-section">
              <div className="blog-topics">
                <div className="topic-item">
                  <div className="topic-icon"><i className="bi bi-geo-alt"></i></div>
                  <p className="topic-text">Healthcare access in Africa</p>
                </div>
                <div className="topic-item">
                  <div className="topic-icon"><i className="bi bi-cpu"></i></div>
                  <p className="topic-text">AI in clinical care</p>
                </div>
                <div className="topic-item">
                  <div className="topic-icon"><i className="bi bi-shield-check"></i></div>
                  <p className="topic-text">Telemedicine regulation</p>
                </div>
                <div className="topic-item">
                  <div className="topic-icon"><i className="bi bi-currency-dollar"></i></div>
                  <p className="topic-text">Health economics</p>
                </div>
              </div>
            </div>

            {/* Categories Section */}
            <div className="blog-section">
              <h2 className="blog-section-title">Categories</h2>
              <div className="blog-categories">
                {categories.map((category, index) => (
                  <div key={index} className="category-card">
                    <p className="category-name">{category}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coming Soon Message */}
            <div className="blog-section">
              <div className="blog-coming-soon">
                <p className="coming-soon-text">
                  Our blog is launching soon! Subscribe to stay updated with the latest insights on healthcare innovation, AI, and digital health across Africa.
                </p>
                <a href="mailto:contact@medxverseapp.com" className="subscribe-btn">
                  Get Updates
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Blog

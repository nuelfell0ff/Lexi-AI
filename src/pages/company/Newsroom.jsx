import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import './Newsroom.css'

const Newsroom = () => {
  const newsItems = [
    {
      date: 'September 2025',
      title: 'MedxVerse Incorporated',
      description: 'Official company registration under Nigerian law.'
    },
    {
      date: 'Q1 2026',
      title: 'Platform Launch',
      description: '2,000+ users onboarded.'
    },
    {
      date: 'Q1 2026',
      title: 'Doctor Network Expansion',
      description: 'Licensed doctors onboarded.'
    }
  ]

  return (
    <>
      <Navbar />
      <div className="newsroom-container">
        <div className="newsroom-wrapper">
          {/* Hero Section */}
          <section className="newsroom-hero">
            <h1 className="newsroom-title">Newsroom</h1>
            <p className="newsroom-subtitle">
              Latest updates and milestones from MedxVerse
            </p>
          </section>

          {/* News Timeline */}
          <section className="newsroom-content">
            <div className="news-timeline">
              {newsItems.map((item, index) => (
                <div key={index} className="news-item">
                  <div className="news-marker"></div>
                  <div className="news-content">
                    <div className="news-date">{item.date}</div>
                    <h3 className="news-title">{item.title}</h3>
                    <p className="news-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Newsroom

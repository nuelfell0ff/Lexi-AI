import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './AmbassadorGuide.css'

const AmbassadorGuide = () => {
  const roles = [
    {
      id: 1,
      title: 'Brand Ambassador',
      icon: 'bi-star',
      description: 'Represent Lexi AI on your campus and promote our mission of making healthcare accessible'
    },
    {
      id: 2,
      title: 'Community Builder',
      icon: 'bi-people',
      description: 'Organize events, workshops, and awareness campaigns to build a strong community'
    },
    {
      id: 3,
      title: 'Content Creator',
      icon: 'bi-pencil-square',
      description: 'Create engaging content for social media and help spread awareness about our products'
    },
    {
      id: 4,
      title: 'Feedback Collector',
      icon: 'bi-chat-dots',
      description: 'Gather student feedback and insights to help improve Lexi AI products and services'
    }
  ]

  const responsibilities = [
    {
      id: 1,
      category: 'Representation',
      tasks: [
        'Represent Lexi AI brand authentically and professionally',
        'Attend campus events and promote Lexi AI initiatives',
        'Engage with peers about healthcare innovation',
        'Maintain professional conduct in all interactions'
      ]
    },
    {
      id: 2,
      category: 'Outreach',
      tasks: [
        'Organize workshops and awareness sessions',
        'Conduct campus presentations about Lexi AI',
        'Create and share content on social media',
        'Build relationships with student organizations'
      ]
    },
    {
      id: 3,
      category: 'Support',
      tasks: [
        'Provide feedback on product features',
        'Answer questions about Lexi AI services',
        'Report issues and bugs discovered',
        'Help resolve user concerns and questions'
      ]
    },
    {
      id: 4,
      category: 'Growth',
      tasks: [
        'Recruit new ambassadors and volunteers',
        'Organize hackathons or innovation challenges',
        'Collaborate with other campus organizations',
        'Document success stories and case studies'
      ]
    }
  ]

  return (
    <>
      <Navbar />
      <div className="ambassador-guide">
        {/* Header Section */}
        <section className="guide-header">
          <div className="guide-container">
            <h1 className="guide-title">Campus Ambassador Guide</h1>
            <p className="guide-subtitle">
              Everything you need to succeed as a Lexi AI Campus Ambassador - from responsibilities to resources and tips for maximum impact
            </p>
          </div>
        </section>

        {/* Roles Section */}
        <section className="guide-section">
          <div className="guide-container">
            <div className="section-header">
              <h2 className="section-title">Your Roles & Responsibilities</h2>
              <p className="section-description">As a Campus Ambassador, you'll wear multiple hats to represent Lexi AI</p>
            </div>

            <div className="roles-grid">
              {roles.map((role) => (
                <div key={role.id} className="role-card">
                  <div className="role-icon">
                    <i className={`bi ${role.icon}`}></i>
                  </div>
                  <h3 className="role-title">{role.title}</h3>
                  <p className="role-description">{role.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Responsibilities Section */}
        <section className="guide-section alternate-bg">
          <div className="guide-container">
            <div className="section-header">
              <h2 className="section-title">Key Responsibilities</h2>
              <p className="section-description">Here's what we expect from our ambassadors across different areas</p>
            </div>

            <div className="responsibilities-grid">
              {responsibilities.map((resp) => (
                <div key={resp.id} className="responsibility-card">
                  <h3 className="responsibility-category">{resp.category}</h3>
                  <ul className="responsibility-list">
                    {resp.tasks.map((task, index) => (
                      <li key={index}>
                        <i className="bi bi-check-circle"></i>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Practices Section */}
        <section className="guide-section">
          <div className="guide-container">
            <div className="section-header">
              <h2 className="section-title">Best Practices</h2>
              <p className="section-description">Tips and tricks for success in your ambassador role</p>
            </div>

            <div className="practices-grid">
              <div className="practices-card do-card">
                <h3><i className="bi bi-check-circle"></i> DO</h3>
                <ul>
                  <li>✓ Be authentic and passionate about Lexi AI</li>
                  <li>✓ Stay consistent with brand messaging</li>
                  <li>✓ Build genuine relationships with peers</li>
                  <li>✓ Communicate regularly with your team</li>
                  <li>✓ Document and share your wins</li>
                  <li>✓ Seek feedback and continuously improve</li>
                </ul>
              </div>

              <div className="practices-card dont-card">
                <h3><i className="bi bi-x-circle"></i> DON'T</h3>
                <ul>
                  <li>✗ Misrepresent or exaggerate product features</li>
                  <li>✗ Use unprofessional language or conduct</li>
                  <li>✗ Share confidential company information</li>
                  <li>✗ Make commitments you can't fulfill</li>
                  <li>✗ Ignore feedback or complaints</li>
                  <li>✗ Promote competing products</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}

export default AmbassadorGuide

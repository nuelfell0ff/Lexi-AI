import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/CampusAmbassador.css'

const CampusAmbassadorSection = () => {
  const navigate = useNavigate()

  return (
    <section className="campus-ambassador">
      <div className="campus-container">
        {/* Header Section */}
        <div className="campus-header">
          <h1 className="campus-heading">Campus Ambassador Program</h1>
          <p className="campus-subheading">
            Join our mission to revolutionize healthcare access across campuses. As a Campus Ambassador, you'll be at the forefront of bringing AI-powered healthcare solutions to students and faculty.
          </p>
        </div>

        {/* CTA Section */}
        <div className="campus-form-wrapper">
          <div className="campus-form-container">
            <h2 className="form-title">Ready to Make a Difference?</h2>
            <p className="form-description">Join our growing community of Campus Ambassadors</p>

            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button
                onClick={() => navigate('/ambassador-apply')}
                style={{
                  padding: '16px 40px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)'
                }}
              >
                <i className="bi bi-arrow-right"></i> Apply Now
              </button>

              <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
                Complete the application form on our dedicated page. Takes about 5-10 minutes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CampusAmbassadorSection

import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './CampusAmbassador.css'

const CampusAmbassador = () => {
  const [formData, setFormData] = useState({
    name: '',
    courseOfStudy: '',
    institution: '',
    level: '',
    city: '',
    yearOfGraduation: ''
  })

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // To be implemented later
  }

  return (
    <>
      <Navbar />
      <section className="campus-ambassador">
        <div className="campus-container">
          {/* Header Section */}
          <div className="campus-header">
            <h1 className="campus-heading">Campus Ambassador Program</h1>
            <p className="campus-subheading">
              Join our mission to revolutionize healthcare access across campuses. As a Campus Ambassador, you'll be at the forefront of bringing AI-powered healthcare solutions to students and faculty.
            </p>
          </div>

          {/* Form Section */}
          <div className="campus-form-wrapper">
            <div className="campus-form-container">
              <h2 className="form-title">Apply Now</h2>
              <p className="form-description">Tell us about yourself and your institution</p>

              {isSubmitted && (
                <div className="success-message">
                  <p>✓ Thank you for applying! We'll be in touch soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="campus-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="courseOfStudy" className="form-label">Course of Study</label>
                  <input
                    type="text"
                    id="courseOfStudy"
                    name="courseOfStudy"
                    placeholder="e.g., Medicine, Computer Science"
                    value={formData.courseOfStudy}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="institution" className="form-label">Institution</label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    placeholder="Name of your university/college"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="level" className="form-label">Level</label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Select your current level</option>
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level / Postgraduate</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Your city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="yearOfGraduation" className="form-label">Year of Graduation</label>
                  <input
                    type="number"
                    id="yearOfGraduation"
                    name="yearOfGraduation"
                    placeholder="e.g., 2025"
                    value={formData.yearOfGraduation}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="submit-btn"
                >
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CampusAmbassador

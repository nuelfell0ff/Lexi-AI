import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import '../pages/CampusAmbassador.css'

const CampusAmbassadorSection = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [courseOfStudy, setCourseOfStudy] = useState('')
  const [institution, setInstitution] = useState('')
  const [level, setLevel] = useState('')
  const [city, setCity] = useState('')
  const [yearOfGraduation, setYearOfGraduation] = useState('')
  const [cvFile, setCvFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const uploadCV = async (file) => {
    try {
      if (!file) throw new Error('No file selected')
      if (file.type !== 'application/pdf') throw new Error('Only PDF files are allowed')
      if (file.size > 2 * 1024 * 1024) throw new Error('File size must be less than 2MB')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'lexi-ai')

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/datmds5xl/upload',
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('CV Upload Error:', error.message)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let cvUrl = null
    if (cvFile) {
      try {
        cvUrl = await uploadCV(cvFile)
      } catch (error) {
        alert(`CV Upload error: ${error.message}`)
        setLoading(false)
        return
      }
    }

    try {
      await addDoc(collection(db, 'applicants'), {
        name,
        email,
        courseOfStudy,
        institution,
        level,
        city,
        yearOfGraduation,
        cvUrl: cvUrl || null,
        createdAt: new Date()
      })

      setSuccess(true)
      setName('')
      setEmail('')
      setCourseOfStudy('')
      setInstitution('')
      setLevel('')
      setCity('')
      setYearOfGraduation('')
      setCvFile(null)

      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      alert('Error submitting application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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

        {/* Form Section */}
        <div className="campus-form-wrapper">
          <div className="campus-form-container">
            <h2 className="form-title">Apply Now</h2>
            <p className="form-description">Tell us about yourself and your institution</p>

            {success && (
              <div className="success-message">
                <i className="bi bi-check-circle"></i>
                <div>
                  <strong>Application Submitted!</strong>
                  <p>Thank you for applying. We'll review your application and get back to you soon.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type='text'
                  className="form-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type='email'
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Institution *</label>
                  <input
                    type='text'
                    className="form-input"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="Your university name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type='text'
                    className="form-input"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Course of Study *</label>
                  <input
                    type='text'
                    className="form-input"
                    value={courseOfStudy}
                    onChange={(e) => setCourseOfStudy(e.target.value)}
                    placeholder="e.g., Computer Science, Medicine"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Academic Level *</label>
                  <input
                    type='text'
                    className="form-input"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    placeholder="e.g., 100 Level, Final Year"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Expected Graduation Year *</label>
                <input
                  type='number'
                  className="form-input"
                  value={yearOfGraduation}
                  onChange={(e) => setYearOfGraduation(e.target.value)}
                  placeholder="2025"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Upload CV (PDF) *</label>
                <div className="file-input-wrapper">
                  <input
                    type='file'
                    id="cv-file"
                    className="file-input"
                    accept=".pdf"
                    onChange={(e) => setCvFile(e.target.files[0])}
                    required
                  />
                  <label htmlFor="cv-file" className="file-input-label">
                    <i className="bi bi-cloud-upload"></i>
                    <span>{cvFile ? cvFile.name : 'Click to upload or drag and drop'}</span>
                    <small>PDF files only, max 2MB</small>
                  </label>
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <i className={`bi ${loading ? 'bi-hourglass-split' : 'bi-send'}`}></i>
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CampusAmbassadorSection

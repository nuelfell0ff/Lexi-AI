import React, { useState } from 'react'
import '../../styles/ApplicantDetails.css'

const ApplicantDetails = ({ applicant }) => {
  const [status, setStatus] = useState('PENDING')
  const [notes, setNotes] = useState('')

  const mockApplicant = applicant || {
    id: '1',
    name: 'Julianne Moore',
    email: 'j.moore@stanford.edu',
    phone: '+1 234 567 8900',
    institution: 'Stanford University',
    courseOfStudy: 'Computer Science',
    level: 'Senior',
    city: 'Palo Alto, CA',
    yearOfGraduation: '2024',
    gpa: '3.8',
    status: 'PENDING',
    createdAt: new Date(),
    bio: 'Passionate about AI and healthcare technology. Excited to represent Lexi AI on campus.'
  }

  return (
    <div className="applicant-details-page">
      <div className="page-header">
        <button className="btn-back">
          <i className="bi bi-chevron-left"></i> Back to Applicants
        </button>
        <h1>Applicant Details</h1>
      </div>

      <div className="details-container">
        {/* Main Info Card */}
        <div className="info-card">
          <div className="info-header">
            <div className="info-avatar">
              <img src="https://via.placeholder.com/80" alt={mockApplicant.name} />
            </div>
            <div className="info-header-text">
              <h2>{mockApplicant.name}</h2>
              <p>{mockApplicant.email}</p>
              <span className={`status-badge ${mockApplicant.status?.toLowerCase()}`}>
                {mockApplicant.status}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="info-section">
            <h3>Contact Information</h3>
            <div className="info-grid">
              <div className="info-field">
                <span className="field-label">Email</span>
                <span className="field-value">{mockApplicant.email}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Phone</span>
                <span className="field-value">{mockApplicant.phone}</span>
              </div>
              <div className="info-field">
                <span className="field-label">City</span>
                <span className="field-value">{mockApplicant.city}</span>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="info-section">
            <h3>Academic Information</h3>
            <div className="info-grid">
              <div className="info-field">
                <span className="field-label">Institution</span>
                <span className="field-value">{mockApplicant.institution}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Course of Study</span>
                <span className="field-value">{mockApplicant.courseOfStudy}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Level</span>
                <span className="field-value">{mockApplicant.level}</span>
              </div>
              <div className="info-field">
                <span className="field-label">GPA</span>
                <span className="field-value">{mockApplicant.gpa}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Year of Graduation</span>
                <span className="field-value">{mockApplicant.yearOfGraduation}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Application Date</span>
                <span className="field-value">{mockApplicant.createdAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="info-section">
            <h3>Bio</h3>
            <p className="bio-text">{mockApplicant.bio}</p>
          </div>
        </div>

        {/* Actions Card */}
        <div className="actions-card">
          <h3>Actions</h3>

          <div className="action-section">
            <label className="action-label">Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="form-control"
            >
              <option value="PENDING">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>

          <div className="action-section">
            <label className="action-label">Admin Notes</label>
            <textarea
              rows="6"
              className="form-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about this applicant..."
            ></textarea>
          </div>

          <div className="action-buttons">
            <button className="btn-success">
              <i className="bi bi-check-circle"></i> Approve
            </button>
            <button className="btn-danger">
              <i className="bi bi-x-circle"></i> Reject
            </button>
            <button className="btn-warning">
              <i className="bi bi-hand-thumbsdown"></i> Suspend
            </button>
          </div>

          <button className="btn-outline btn-block">
            Delete Application
          </button>
        </div>
      </div>
    </div>
  )
}

export default ApplicantDetails

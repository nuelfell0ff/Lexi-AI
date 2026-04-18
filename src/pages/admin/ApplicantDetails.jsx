import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import LoadingSpinner from '../../components/LoadingSpinner'
import '../../styles/ApplicantDetails.css'

const ApplicantDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [applicant, setApplicant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('PENDING')
  const [notes, setNotes] = useState('')

  useEffect(() => {
    const fetchApplicant = async () => {
      try {
        const docRef = doc(db, 'applicants', id)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setApplicant({ id: docSnap.id, ...data })
          setStatus(data.status || 'PENDING')
          setNotes(data.notes || '')
        } else {
          showToast('Applicant not found', 'error', 'bi bi-exclamation-circle')
          navigate('/admin/applicants')
        }
      } catch (error) {
        console.error('Error fetching applicant:', error)
        showToast('Failed to load applicant', 'error', 'bi bi-exclamation-circle')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchApplicant()
    }
  }, [id, navigate, showToast])

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateDoc(doc(db, 'applicants', id), {
        status: newStatus
      })
      setStatus(newStatus)
      showToast(`Applicant status updated to ${newStatus}`, 'success', 'bi bi-check-circle')
    } catch (error) {
      console.error('Error updating status:', error)
      showToast('Failed to update status', 'error', 'bi bi-x-circle')
    }
  }

  const handleNotesUpdate = async () => {
    try {
      await updateDoc(doc(db, 'applicants', id), {
        notes: notes
      })
      showToast('Notes saved successfully', 'success', 'bi bi-check-circle')
    } catch (error) {
      console.error('Error saving notes:', error)
      showToast('Failed to save notes', 'error', 'bi bi-x-circle')
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (!applicant) {
    return (
      <div className="applicant-details-page">
        <div style={{ textAlign: 'center', padding: '50px' }}>Applicant not found</div>
      </div>
    )
  }

  return (
    <div className="applicant-details-page">
      <div className="page-header">
        <button className="btn-back" onClick={() => navigate('/admin/applicants')}>
          <i className="bi bi-chevron-left"></i> Back to Applicants
        </button>
        <h1>Applicant Details</h1>
      </div>

      <div className="details-container">
        {/* Main Info Card */}
        <div className="info-card">
          <div className="info-header">
            <div className="info-avatar">
              <i className="bi bi-person-circle" style={{ fontSize: '60px', color: '#1E844F' }}></i>
            </div>
            <div className="info-header-text">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                <h2 style={{ margin: 0 }}>{applicant.name}</h2>
                <i className="bi bi-person-badge" style={{ fontSize: '24px', color: '#1E844F' }}></i>
              </div>
              <p>{applicant.email}</p>
              <span className={`status-badge ${status?.toLowerCase()}`}>
                {status}
              </span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="info-section">
            <h3>Contact Information</h3>
            <div className="info-grid">
              <div className="info-field">
                <span className="field-label">Email</span>
                <span className="field-value">{applicant.email}</span>
              </div>
              <div className="info-field">
                <span className="field-label">City</span>
                <span className="field-value">{applicant.city || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Academic Info */}
          <div className="info-section">
            <h3>Academic Information</h3>
            <div className="info-grid">
              <div className="info-field">
                <span className="field-label">Institution</span>
                <span className="field-value">{applicant.institution}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Course of Study</span>
                <span className="field-value">{applicant.courseOfStudy}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Level</span>
                <span className="field-value">{applicant.level}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Year of Graduation</span>
                <span className="field-value">{applicant.yearOfGraduation}</span>
              </div>
              <div className="info-field">
                <span className="field-label">Application Date</span>
                <span className="field-value">
                  {applicant.createdAt?.toDate
                    ? applicant.createdAt.toDate().toLocaleDateString()
                    : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          {/* CV Section */}
          {applicant.cvUrl && (
            <div className="info-section">
              <h3>Submitted CV</h3>
              <div style={{ padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                <a
                  href={applicant.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    color: '#1E844F',
                    textDecoration: 'none',
                    fontWeight: '500'
                  }}
                >
                  <i className="bi bi-file-pdf"></i>
                  View CV Document
                </a>
              </div>
            </div>
          )}

          {/* Identification Section */}
          {applicant.identificationType && (
            <div className="info-section">
              <h3>Identification Information</h3>
              <div className="info-grid">
                <div className="info-field">
                  <span className="field-label">Identification Type</span>
                  <span className="field-value">
                    {applicant.identificationType === 'NIN' ? 'NIN (National Identification Number)' : 'School ID'}
                  </span>
                </div>
              </div>
              {applicant.identificationUrl && (
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
                  <a
                    href={applicant.identificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px',
                      color: '#1E844F',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    <i className="bi bi-card-image"></i>
                    View Identification Document
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Actions Card */}
        <div className="actions-card">
          <h3>Actions</h3>

          <div className="action-section">
            <label className="action-label">Update Status</label>
            <select
              value={status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
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
            <button
              onClick={handleNotesUpdate}
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#1E844F',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Save Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApplicantDetails

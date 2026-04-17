import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/NotificationModal.css'

const NotificationModal = ({ applicants, onClose, onClear }) => {
  const navigate = useNavigate()

  const handleSeeOptions = () => {
    navigate('/admin/applicants')
    onClose()
  }

  const handleClear = () => {
    const confirmed = window.confirm('Are you sure you want to clear all notifications? This action cannot be undone.')
    if (confirmed && onClear) {
      onClear()
    }
  }

  const pendingCount = applicants.filter(a => !a.status || a.status.toLowerCase() === 'pending').length

  return (
    <div className="notification-modal-overlay" onClick={onClose}>
      <div className="notification-modal" onClick={(e) => e.stopPropagation()}>
        <div className="notification-modal-header">
          <h3>New Applications</h3>
          <div className="notification-modal-actions">
            {applicants.length > 0 && (
              <button className="clear-notifications-btn" onClick={handleClear} title="Clear all notifications">
                <i className="bi bi-trash"></i>
              </button>
            )}
            <button className="close-btn" onClick={onClose}>
              <i className="bi bi-x"></i>
            </button>
          </div>
        </div>

        <div className="notification-modal-content">
          {applicants.length === 0 ? (
            <div className="no-notifications">
              <p>No new applications</p>
            </div>
          ) : (
            <div className="notifications-list">
              {applicants.map((applicant) => (
                <div key={applicant.id} className="notification-item">
                  <div className="notification-icon">
                    <i className="bi bi-person-check-fill"></i>
                  </div>
                  <div className="notification-text">
                    <p className="notification-message">
                      <strong>{applicant.name || 'Unknown'}</strong> sent you an application
                    </p>
                    <small className="notification-meta">{applicant.institution || 'Institution not specified'}</small>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="notification-modal-footer">
          <p className="notification-count">{pendingCount} pending application{pendingCount !== 1 ? 's' : ''}</p>
          <button className="btn-see-options" onClick={handleSeeOptions}>
            See Options
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationModal

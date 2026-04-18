import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import '../styles/NotificationModal.css'

const NotificationModal = ({ applicants, onClose, onClear }) => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [dashboardNotificationsEnabled, setDashboardNotificationsEnabled] = useState(true)

  // Fetch dashboard notifications setting
  useEffect(() => {
    const fetchSettings = async () => {
      if (!currentUser) return
      try {
        const settingsRef = doc(db, 'adminSettings', currentUser.uid)
        const settingsSnap = await getDoc(settingsRef)
        if (settingsSnap.exists()) {
          setDashboardNotificationsEnabled(settingsSnap.data().dashboardNotifications !== false)
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }
    fetchSettings()
  }, [currentUser])

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
          {!dashboardNotificationsEnabled && (
            <div style={{
              backgroundColor: '#fff3cd',
              border: '1px solid #ffc107',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}>
              <i className="bi bi-exclamation-triangle" style={{ fontSize: '16px', color: '#ff9800', marginTop: '3px' }}></i>
              <div>
                <strong style={{ fontSize: '14px' }}>Dashboard Notifications are disabled</strong>
                <p style={{ margin: '5px 0 0 0', fontSize: '13px', color: '#666' }}>
                  Turn on Dashboard Notifications in{' '}
                  <button
                    onClick={() => navigate('/admin/settings')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1E844F',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      fontWeight: '600',
                      padding: 0
                    }}
                  >
                    Settings
                  </button>
                  {' '}to see new applications.
                </p>
              </div>
            </div>
          )}
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

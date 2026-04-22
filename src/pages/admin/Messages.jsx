import React, { useState, useEffect } from 'react'
import { collection, getDocs, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import { useAuth } from '../../context/AuthContext'
import { NIGERIAN_UNIVERSITIES } from '../../utils/universities'
import '../../styles/Messages.css'

// Email Templates
const templates = {
  welcome: {
    subject: 'Welcome to Lexi AI Campus Ambassador Program!',
    message: `Welcome to the Lexi AI Campus Ambassador Program! We're thrilled to have you on board.\n\nAs a Campus Ambassador, you'll play a crucial role in bringing AI-powered healthcare solutions to your campus community. Your mission is to educate, engage, and inspire students about the future of healthcare.\n\nBest regards,\nLexi AI Team`
  },
  approval: {
    subject: 'Congratulations! Your Application Has Been Approved',
    message: `Congratulations! Your application to become a Lexi AI Campus Ambassador has been approved!\n\nWe were impressed by your passion and commitment to healthcare innovation. You're now officially part of our ambassador network.\n\nNext steps: We'll be reaching out with onboarding materials and training resources.\n\nBest regards,\nLexi AI Team`
  },
  event: {
    subject: 'Upcoming Event: Join Us for an Exclusive Webinar',
    message: `We're excited to invite you to an exclusive webinar featuring our latest AI-powered healthcare solutions.\n\nDate: [Event Date]\nTime: [Event Time]\nLocation: [Event Location/Link]\n\nReserve your spot and learn more about how AI is transforming healthcare!\n\nBest regards,\nLexi AI Team`
  },
  reminder: {
    subject: 'Reminder: Active Ambassador Status',
    message: `This is a friendly reminder to keep your ambassador activities updated. Your engagement and contributions are valuable to our community.\n\nIf you have any questions or need support, feel free to reach out.\n\nBest regards,\nLexi AI Team`
  }
}

const Messages = () => {
  const { showToast } = useToast()
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [subject, setSubject] = useState('')
  const [recipient, setRecipient] = useState('all')
  const [specificUser, setSpecificUser] = useState('')
  const [selectedUniversity, setSelectedUniversity] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const [attachedMedia, setAttachedMedia] = useState([])
  const [uploadingMedia, setUploadingMedia] = useState(false)
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)
  const [analytics, setAnalytics] = useState({
    totalEmailsSent: 0,
    emailsSentToday: 0,
    totalRecipientsReached: 0,
    successfulEmails: 0,
    failedEmails: 0,
    successRate: 0,
    templateUsage: {},
    recentSends: []
  })

  // EmailJS Configuration
  const EMAILJS_SERVICE_ID = 'service_2947kin'
  const EMAILJS_TEMPLATE_ID = 'template_9br37md'
  const EMAILJS_PUBLIC_KEY = 'xYHizYmGx8k8_1n3O'

  // Ini

  // Fetch email notifications setting
  useEffect(() => {
    const fetchSettings = async () => {
      if (!currentUser) return
      try {
        const settingsRef = doc(db, 'adminSettings', currentUser.uid)
        const settingsSnap = await getDoc(settingsRef)
        if (settingsSnap.exists()) {
          setEmailNotificationsEnabled(settingsSnap.data().emailNotifications !== false)
        }
      } catch (error) {
        console.error('Error fetching settings:', error)
      }
    }
    fetchSettings()
  }, [currentUser])

  // Fetch analytics data
  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const analyticsRef = doc(db, 'emailAnalytics', 'global')
        const analyticsSnap = await getDoc(analyticsRef)
        if (analyticsSnap.exists()) {
          setAnalytics(analyticsSnap.data())
        }
      } catch (error) {
        console.error('Error fetching analytics:', error)
      }
    }
    fetchAnalytics()
  }, [])

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY)
  }, [])

  // Fetch users from Firebase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const snapshot = await getDocs(collection(db, 'applicants'))
        const userData = snapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().name,
          email: doc.data().email,
          status: doc.data().status,
          institution: doc.data().institution || ''
        }))
        setUsers(userData)
      } catch (error) {
        showToast('Failed to load users', 'error', 'bi bi-exclamation-circle')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [showToast])

  // Send email via EmailJS
  const sendEmail = async (toEmail, userName, emailSubject, emailMessage) => {
    try {
      const templateParams = {
        to_email: toEmail,
        name: userName,
        subject: emailSubject,
        message: emailMessage
      }

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      return true
    } catch (error) {
      throw error
    }
  }

  // Get recipients based on filter
  const getRecipients = () => {
    let recipients = []

    if (recipient === 'all') {
      recipients = users
    } else if (recipient === 'approved') {
      recipients = users.filter(u => u.status && u.status.toLowerCase() === 'approved')
    } else if (recipient === 'pending') {
      recipients = users.filter(u => !u.status || u.status.toLowerCase() === 'pending')
    } else if (recipient === 'university') {
      recipients = users.filter(u => u.institution === selectedUniversity)
    } else if (recipient === 'specific') {
      const user = users.find(u => u.id === specificUser)
      recipients = user ? [user] : []
    }

    return recipients
  }

  // Update analytics in Firebase
  const updateAnalytics = async (successCount, failureCount, templateUsed) => {
    try {
      const analyticsRef = doc(db, 'emailAnalytics', 'global')
      const analyticsSnap = await getDoc(analyticsRef)

      const today = new Date().toDateString()
      let currentData = analyticsSnap.exists() ? analyticsSnap.data() : {
        totalEmailsSent: 0,
        emailsSentToday: 0,
        totalRecipientsReached: 0,
        successfulEmails: 0,
        failedEmails: 0,
        templateUsage: {},
        recentSends: [],
        lastDate: today
      }

      // Reset emailsSentToday if it's a new day
      if (currentData.lastDate !== today) {
        currentData.emailsSentToday = 0
        currentData.lastDate = today
      }

      // Update counters
      currentData.totalEmailsSent += successCount + failureCount
      currentData.emailsSentToday += successCount + failureCount
      currentData.totalRecipientsReached += successCount
      currentData.successfulEmails += successCount
      currentData.failedEmails += failureCount

      // Calculate success rate
      currentData.successRate = Math.round(
        (currentData.successfulEmails / currentData.totalEmailsSent) * 100
      ) || 0

      // Update template usage
      if (templateUsed) {
        currentData.templateUsage[templateUsed] = (currentData.templateUsage[templateUsed] || 0) + 1
      }

      // Add recent send record (keep last 10)
      currentData.recentSends = [
        {
          timestamp: new Date().toLocaleString(),
          successful: successCount,
          failed: failureCount,
          recipients: successCount + failureCount,
          subject: subject
        },
        ...currentData.recentSends.slice(0, 9)
      ]

      // Save to Firebase
      await setDoc(analyticsRef, currentData)
      setAnalytics(currentData)
    } catch (error) {
      console.error('Error updating analytics:', error)
    }
  }

  // Handle Send
  const handleSend = async () => {
    // Validation
    if (!subject.trim()) {
      showToast('Please enter a subject', 'error', 'bi bi-exclamation-circle')
      return
    }

    if (!message.trim()) {
      showToast('Please enter a message', 'error', 'bi bi-exclamation-circle')
      return
    }

    const recipients = getRecipients()
    if (recipients.length === 0) {
      showToast('No recipients found', 'error', 'bi bi-exclamation-circle')
      return
    }

    setSendingEmail(true)

    try {
      // Send emails sequentially with delay to avoid rate limiting
      let successCount = 0
      let failureCount = 0
      const selectedTemplate = sessionStorage.getItem('selectedTemplate')

      for (const user of recipients) {
        try {
          await sendEmail(user.email, user.name, subject, message)
          successCount++
        } catch (error) {
          failureCount++
        }
        // Add 500ms delay between emails to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500))
      }

      if (successCount > 0) {
        showToast(
          `Email sent to ${successCount} recipient(s)!${failureCount > 0 ? ` (${failureCount} failed)` : ''}`,
          successCount === recipients.length ? 'success' : 'warning',
          'bi bi-check-circle'
        )

        // Update analytics
        await updateAnalytics(successCount, failureCount, selectedTemplate || 'custom')
      } else {
        showToast('Failed to send emails', 'error', 'bi bi-x-circle')
      }

      // Clear form only if all successful
      if (failureCount === 0) {
        setMessage('')
        setSubject('')
        setRecipient('all')
        setSpecificUser('')
        sessionStorage.removeItem('selectedTemplate')
      }
    } catch (error) {
      showToast('Failed to send email. Check your EmailJS configuration.', 'error', 'bi bi-x-circle')
    } finally {
      setSendingEmail(false)
    }
  }

  // Handle Template Click
  const handleTemplateClick = (templateName) => {
    const template = templates[templateName]
    if (template) {
      setSubject(template.subject)
      setMessage(template.message)
      // Track which template was selected (stored in a ref)
      sessionStorage.setItem('selectedTemplate', templateName)
    }
  }

  // Upload media to Cloudinary
  const uploadMedia = async (file) => {
    try {
      // Validation
      if (!file) throw new Error('No file selected')

      const maxSize = 10 * 1024 * 1024 // 10MB
      if (file.size > maxSize) throw new Error('File size must be less than 10MB')

      // Create FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'lexi-ai')

      // Upload to Cloudinary
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/datmds5xl/upload',
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      return {
        url: data.secure_url,
        type: file.type,
        name: file.name
      }
    } catch (error) {
      throw error
    }
  }

  // Handle media upload
  const handleMediaUpload = async (e) => {
    const files = e.target.files
    if (!files) return

    setUploadingMedia(true)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const mediaData = await uploadMedia(file)

        setAttachedMedia(prev => [...prev, mediaData])

        // Auto-insert media URL into message
        if (mediaData.type.startsWith('image/')) {
          setMessage(prev => prev + `\n\n[Image: ${mediaData.url}]`)
        } else {
          setMessage(prev => prev + `\n\n[File: ${mediaData.name} - ${mediaData.url}]`)
        }
      }

      showToast(`${files.length} file(s) uploaded successfully!`, 'success', 'bi bi-check-circle')
    } catch (error) {
      showToast(`Upload error: ${error.message}`, 'error', 'bi bi-x-circle')
    } finally {
      setUploadingMedia(false)
      e.target.value = '' // Reset input
    }
  }

  // Remove attached media
  const removeMedia = (index) => {
    setAttachedMedia(prev => prev.filter((_, i) => i !== index))
  }

  if (!emailNotificationsEnabled) {
    return (
      <div className="messages-page">
        <div className="page-header">
          <h1>Messages & Email</h1>
          <p>Send communications to ambassadors</p>
        </div>

        <div style={{
          backgroundColor: '#fff3cd',
          border: '2px solid #ff9800',
          borderRadius: '8px',
          padding: '40px 20px',
          marginTop: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <i className="bi bi-exclamation-circle" style={{ fontSize: '48px', color: '#ff9800' }}></i>
          <div>
            <h3 style={{ margin: '0 0 10px 0', color: '#ff9800' }}>Email Notifications Disabled</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '16px', color: '#666', maxWidth: '400px' }}>
              Email Notifications are currently disabled. Enable them in Settings to send emails to ambassadors.
            </p>
            <button
              onClick={() => navigate('/admin/settings')}
              style={{
                backgroundColor: '#1E844F',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              Go to Settings
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="messages-page">
      <div className="page-header">
        <h1>Messages & Email</h1>
        <p>Send communications to ambassadors</p>
      </div>

      <div className="messages-container">
        {/* Compose Card */}
        <div className="compose-card">
          <h3>Compose Email</h3>

          <div className="form-group">
            <label>Recipient</label>
            <select
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="form-control"
            >
              <option value="all">All Ambassadors ({users.length})</option>
              <option value="approved">Approved Only ({users.filter(u => u.status && u.status.toLowerCase() === 'approved').length})</option>
              <option value="pending">Pending Only ({users.filter(u => !u.status || u.status.toLowerCase() === 'pending').length})</option>
              <option value="university">Filter by University</option>
              <option value="specific">Specific Ambassador</option>
            </select>
          </div>

          {recipient === 'university' && (
            <div className="form-group">
              <label>Select University</label>
              <select
                value={selectedUniversity}
                onChange={(e) => setSelectedUniversity(e.target.value)}
                className="form-control"
              >
                <option value="">Choose a university...</option>
                {NIGERIAN_UNIVERSITIES.map(uni => {
                  const count = users.filter(u => u.institution === uni).length
                  return (
                    <option key={uni} value={uni}>
                      {uni} ({count})
                    </option>
                  )
                })}
              </select>
            </div>
          )}

          {recipient === 'specific' && (
            <div className="form-group">
              <label>Select Ambassador</label>
              <select
                value={specificUser}
                onChange={(e) => setSpecificUser(e.target.value)}
                className="form-control"
              >
                <option value="">Choose an ambassador...</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              rows="8"
              className="form-control"
              placeholder="Compose your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="form-actions">
            <input
              type="file"
              id="media-upload"
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              onChange={handleMediaUpload}
              style={{ display: 'none' }}
              disabled={uploadingMedia || sendingEmail}
            />
            <button
              className="btn-secondary"
              disabled={sendingEmail || uploadingMedia}
              onClick={() => document.getElementById('media-upload').click()}
            >
              <i className="bi bi-paperclip"></i> {uploadingMedia ? 'Uploading...' : 'Attach'}
            </button>
            <div className="form-actions-right">
              <button className="btn-outline" disabled={sendingEmail}>Cancel</button>
              <button
                className="btn-primary"
                onClick={handleSend}
                disabled={!message.trim() || !subject.trim() || sendingEmail}
                style={{ whiteSpace: 'nowrap' }}
              >
                <i className="bi bi-send"></i> {sendingEmail ? 'Sending...' : 'Send Email'}
              </button>
            </div>
          </div>

          {attachedMedia.length > 0 && (
            <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
              <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px' }}>Attached Files ({attachedMedia.length}):</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {attachedMedia.map((media, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: '#fff',
                      borderRadius: '6px',
                      border: '1px solid #ddd'
                    }}
                  >
                    <i className={`bi ${media.type.startsWith('image/') ? 'bi-image' : 'bi-file'}`}></i>
                    <span style={{ fontSize: '12px' }}>{media.name}</span>
                    <button
                      onClick={() => removeMedia(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#d32f2f',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Email Templates */}
        <div className="templates-section">
          <h3>Email Templates</h3>
          <div className="templates-grid">
            <div className="template-card">
              <h4>Welcome Email</h4>
              <p>Send welcome message to new ambassadors</p>
              <button
                className="btn-outline"
                onClick={() => handleTemplateClick('welcome')}
                disabled={sendingEmail}
              >
                Use Template
              </button>
            </div>
            <div className="template-card">
              <h4>Approval Notification</h4>
              <p>Notify ambassadors of their approval status</p>
              <button
                className="btn-outline"
                onClick={() => handleTemplateClick('approval')}
                disabled={sendingEmail}
              >
                Use Template
              </button>
            </div>
            <div className="template-card">
              <h4>Event Announcement</h4>
              <p>Share upcoming events with ambassadors</p>
              <button
                className="btn-outline"
                onClick={() => handleTemplateClick('event')}
                disabled={sendingEmail}
              >
                Use Template
              </button>
            </div>
            <div className="template-card">
              <h4>Reminder Email</h4>
              <p>Send periodic reminders and updates</p>
              <button
                className="btn-outline"
                onClick={() => handleTemplateClick('reminder')}
                disabled={sendingEmail}
              >
                Use Template
              </button>
            </div>
          </div>
        </div>

        {/* Email Analytics Section */}
        <div className="analytics-section">
          <h2>Email Analytics</h2>
          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-icon" style={{ backgroundColor: '#194066' }}>
                <i className="bi bi-envelope"></i>
              </div>
              <div className="analytics-content">
                <p className="analytics-label">Total Emails Sent</p>
                <p className="analytics-value">{analytics.totalEmailsSent}</p>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon" style={{ backgroundColor: '#1E844F' }}>
                <i className="bi bi-calendar-day"></i>
              </div>
              <div className="analytics-content">
                <p className="analytics-label">Sent Today</p>
                <p className="analytics-value">{analytics.emailsSentToday}</p>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon" style={{ backgroundColor: '#ff9800' }}>
                <i className="bi bi-people"></i>
              </div>
              <div className="analytics-content">
                <p className="analytics-label">Recipients Reached</p>
                <p className="analytics-value">{analytics.totalRecipientsReached}</p>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon" style={{ backgroundColor: '#4caf50' }}>
                <i className="bi bi-check-circle"></i>
              </div>
              <div className="analytics-content">
                <p className="analytics-label">Success Rate</p>
                <p className="analytics-value">{analytics.successRate}%</p>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon" style={{ backgroundColor: '#2196f3' }}>
                <i className="bi bi-check2-all"></i>
              </div>
              <div className="analytics-content">
                <p className="analytics-label">Successful Sends</p>
                <p className="analytics-value">{analytics.successfulEmails}</p>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon" style={{ backgroundColor: '#f44336' }}>
                <i className="bi bi-x-circle"></i>
              </div>
              <div className="analytics-content">
                <p className="analytics-label">Failed Sends</p>
                <p className="analytics-value">{analytics.failedEmails}</p>
              </div>
            </div>
          </div>

          {/* Recent Sends */}
          {analytics.recentSends && analytics.recentSends.length > 0 && (
            <div className="recent-sends">
              <h3>Recent Email Activity</h3>
              <div className="recent-sends-list">
                {analytics.recentSends.slice(0, 5).map((send, index) => (
                  <div key={index} className="recent-send-item">
                    <div className="recent-send-info">
                      <p className="recent-send-subject">{send.subject}</p>
                      <p className="recent-send-time">{send.timestamp}</p>
                    </div>
                    <div className="recent-send-stats">
                      <span className="stat-badge success">{send.successful} sent</span>
                      {send.failed > 0 && <span className="stat-badge error">{send.failed} failed</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages

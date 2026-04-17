import React from 'react'
import '../../styles/Messages.css'

const Messages = () => {
  const [message, setMessage] = React.useState('')
  const [recipient, setRecipient] = React.useState('all')

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', { message, recipient })
      setMessage('')
    }
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
              <option value="all">All Ambassadors</option>
              <option value="approved">Approved Only</option>
              <option value="pending">Pending Only</option>
              <option value="specific">Specific Ambassador</option>
            </select>
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email subject..."
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
            <button className="btn-secondary">
              <i className="bi bi-paperclip"></i> Attach
            </button>
            <div className="form-actions-right">
              <button className="btn-outline">Cancel</button>
              <button
                className="btn-primary"
                onClick={handleSend}
                disabled={!message.trim()}
              >
                <i className="bi bi-send"></i> Send Email
              </button>
            </div>
          </div>
        </div>

        {/* Email Templates */}
        <div className="templates-section">
          <h3>Email Templates</h3>
          <div className="templates-grid">
            <div className="template-card">
              <h4>Welcome Email</h4>
              <p>Send welcome message to new ambassadors</p>
              <button className="btn-outline">Use Template</button>
            </div>
            <div className="template-card">
              <h4>Approval Notification</h4>
              <p>Notify ambassadors of their approval status</p>
              <button className="btn-outline">Use Template</button>
            </div>
            <div className="template-card">
              <h4>Event Announcement</h4>
              <p>Share upcoming events with ambassadors</p>
              <button className="btn-outline">Use Template</button>
            </div>
            <div className="template-card">
              <h4>Reminder Email</h4>
              <p>Send periodic reminders and updates</p>
              <button className="btn-outline">Use Template</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messages

import React, { useState } from 'react'
import '../../styles/Settings.css'

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    dashboardNotifications: true,
    weeklyReport: true,
    monthlyReport: false,
    maintenanceUpdates: true,
    marketingEmails: false
  })

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Configure your administration preferences</p>
      </div>

      <div className="settings-container">
        {/* Notification Preferences */}
        <div className="settings-section">
          <h3>Notification Preferences</h3>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Email Notifications</span>
              <small>Receive important updates via email</small>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="emailNotifications"
                checked={settings.emailNotifications}
                onChange={() => handleToggle('emailNotifications')}
              />
              <label htmlFor="emailNotifications"></label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Dashboard Notifications</span>
              <small>Show notifications on dashboard</small>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="dashboardNotifications"
                checked={settings.dashboardNotifications}
                onChange={() => handleToggle('dashboardNotifications')}
              />
              <label htmlFor="dashboardNotifications"></label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Weekly Report</span>
              <small>Receive weekly performance reports</small>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="weeklyReport"
                checked={settings.weeklyReport}
                onChange={() => handleToggle('weeklyReport')}
              />
              <label htmlFor="weeklyReport"></label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Monthly Report</span>
              <small>Receive monthly performance reports</small>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="monthlyReport"
                checked={settings.monthlyReport}
                onChange={() => handleToggle('monthlyReport')}
              />
              <label htmlFor="monthlyReport"></label>
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="settings-section">
          <h3>Email Settings</h3>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Maintenance Updates</span>
              <small>Get notified about system maintenance</small>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="maintenanceUpdates"
                checked={settings.maintenanceUpdates}
                onChange={() => handleToggle('maintenanceUpdates')}
              />
              <label htmlFor="maintenanceUpdates"></label>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Marketing Emails</span>
              <small>Receive promotional content and offers</small>
            </div>
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="marketingEmails"
                checked={settings.marketingEmails}
                onChange={() => handleToggle('marketingEmails')}
              />
              <label htmlFor="marketingEmails"></label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="settings-section">
          <h3>System Settings</h3>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Theme</span>
              <small>Choose your preferred display theme</small>
            </div>
            <select className="form-control">
              <option>Light</option>
              <option>Dark</option>
              <option>Auto</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Language</span>
              <small>Select your preferred language</small>
            </div>
            <select className="form-control">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Time Zone</span>
              <small>Set your time zone for scheduling</small>
            </div>
            <select className="form-control">
              <option>UTC</option>
              <option>EST</option>
              <option>CST</option>
              <option>PST</option>
            </select>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="settings-section danger-zone">
          <h3>Danger Zone</h3>
          <button className="btn-danger">
            <i className="bi bi-exclamation-triangle"></i> Delete All Data
          </button>
          <button className="btn-danger">
            <i className="bi bi-arrow-clockwise"></i> Reset Settings
          </button>
        </div>

        {/* Save Settings */}
        <div className="settings-actions">
          <button className="btn-outline">Cancel</button>
          <button className="btn-primary" onClick={() => {
            console.log('Settings saved:', settings)
            alert('Settings saved successfully!')
          }}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default Settings

import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { db } from '../../firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import lexiLogo from '../../assets/Lexi-Ai-No-bg.png'
import Loading from '../../components/Loading'
import '../../styles/Profile.css'

const Profile = () => {
  const { currentUser } = useAuth()
  const { showToast } = useToast()
  const [loading, setLoading] = useState(true)

  const [adminInfo, setAdminInfo] = useState({
    username: '',
    name: 'Super Admin',
    email: currentUser?.email || 'admin@lexiai.com',
    phone: '',
    department: 'Administration',
    role: ''
  })

  useEffect(() => {
    const fetchAdminProfile = async () => {
      if (!currentUser?.uid) return

      try {
        const adminRef = doc(db, 'admins', currentUser.uid)
        const adminSnap = await getDoc(adminRef)

        if (adminSnap.exists()) {
          const data = adminSnap.data()
          setAdminInfo(prev => ({
            ...prev,
            ...data,
            email: currentUser.email
          }))
        }
      } catch (error) {
        console.error('Error fetching admin profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAdminProfile()
  }, [currentUser])

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(adminInfo)
  const [saving, setSaving] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [updatingPassword, setUpdatingPassword] = useState(false)
  const [showReauthModal, setShowReauthModal] = useState(false)
  const [reauthData, setReauthData] = useState({
    currentPassword: ''
  })
  const [reauthenticating, setReauthenticating] = useState(false)
  const [reauthStep, setReauthStep] = useState('password') // 'password' or '2fa'
  const [twoFACode, setTwoFACode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [codeExpiration, setCodeExpiration] = useState(null)
  const [verifying2FA, setVerifying2FA] = useState(false)
  const [showEnable2FAModal, setShowEnable2FAModal] = useState(false)
  const [enable2FAStep, setEnable2FAStep] = useState('password') // 'password' or '2fa'
  const [enable2FAPassword, setEnable2FAPassword] = useState('')
  const [enable2FACode, setEnable2FACode] = useState('')
  const [enable2FASentCode, setEnable2FASentCode] = useState('')
  const [enable2FAExpiration, setEnable2FAExpiration] = useState(null)
  const [verifyingEnable2FA, setVerifyingEnable2FA] = useState(false)

  useEffect(() => {
    setFormData(adminInfo)
  }, [adminInfo])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSave = async () => {
    if (!currentUser?.uid) {
      showToast('Error: User not authenticated', 'error', 'bi bi-x-circle')
      return
    }

    setSaving(true)
    try {
      const adminRef = doc(db, 'admins', currentUser.uid)
      await setDoc(adminRef, {
        username: formData.username,
        name: formData.name,
        email: currentUser.email,
        phone: formData.phone,
        department: formData.department,
        role: formData.role
      }, { merge: true })

      setAdminInfo(formData)
      setIsEditing(false)
      showToast('Profile updated successfully!', 'success', 'bi bi-check-circle')
    } catch (error) {
      console.error('Error saving profile:', error)
      showToast('Failed to update profile', 'error', 'bi bi-x-circle')
    } finally {
      setSaving(false)
    }
  }

  const generateTwoFACode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendTwoFACode = (email) => {
    const code = generateTwoFACode()
    setSentCode(code)

    // Set 5-minute expiration
    const expirationTime = new Date().getTime() + 5 * 60 * 1000
    setCodeExpiration(expirationTime)

    // In production, this would send via email using Firebase Cloud Functions or SendGrid
    console.log(`📧 2FA Code for ${email}: ${code}`)
    showToast(`✉️ Verification code sent to ${email}`, 'info', 'bi bi-envelope')
  }

  const handlePasswordChange = async () => {
    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      showToast('Please enter and confirm your password', 'error', 'bi bi-x-circle')
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showToast('Passwords do not match', 'error', 'bi bi-x-circle')
      return
    }

    if (passwordData.newPassword.length < 6) {
      showToast('Password must be at least 6 characters', 'error', 'bi bi-x-circle')
      return
    }

    setUpdatingPassword(true)
    try {
      await updatePassword(currentUser, passwordData.newPassword)
      setPasswordData({ newPassword: '', confirmPassword: '' })
      setShowPasswordModal(false)
      showToast('✓ Password changed successfully! Use your new password on next login.', 'success', 'bi bi-check-circle')
    } catch (error) {
      console.error('Error updating password:', error)
      if (error.code === 'auth/requires-recent-login') {
        setUpdatingPassword(false)
        setShowReauthModal(true)
      } else {
        showToast('Failed to update password', 'error', 'bi bi-x-circle')
        setUpdatingPassword(false)
      }
    }
  }

  const handleReauthenticate = async () => {
    if (!reauthData.currentPassword) {
      showToast('Please enter your current password', 'error', 'bi bi-x-circle')
      return
    }

    setReauthenticating(true)
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        reauthData.currentPassword
      )
      // Verify password is correct first
      await reauthenticateWithCredential(currentUser, credential)

      // Password verified! Now send 2FA code
      sendTwoFACode(currentUser.email)
      setReauthStep('2fa')
      setReauthData({ currentPassword: '' })
      setTwoFACode('')

    } catch (error) {
      console.error('Error re-authenticating:', error)
      if (error.code === 'auth/wrong-password') {
        showToast('Incorrect password - please try again', 'error', 'bi bi-x-circle')
      } else {
        showToast('Failed to verify password', 'error', 'bi bi-x-circle')
      }
    } finally {
      setReauthenticating(false)
    }
  }

  const handleVerify2FA = async () => {
    if (!twoFACode) {
      showToast('Please enter the 6-digit code', 'error', 'bi bi-x-circle')
      return
    }

    // Check if code expired
    if (codeExpiration && new Date().getTime() > codeExpiration) {
      showToast('Code expired - request a new one', 'error', 'bi bi-x-circle')
      return
    }

    // Verify code matches
    if (twoFACode !== sentCode) {
      showToast('Incorrect code - please try again', 'error', 'bi bi-x-circle')
      return
    }

    setVerifying2FA(true)
    try {
      // Code verified! Now update password
      setUpdatingPassword(true)
      await updatePassword(currentUser, passwordData.newPassword)

      setPasswordData({ newPassword: '', confirmPassword: '' })
      setShowPasswordModal(false)
      setShowReauthModal(false)
      setReauthStep('password')
      setTwoFACode('')
      setSentCode('')
      showToast('✓ Password changed successfully! Use your new password on next login.', 'success', 'bi bi-check-circle')
    } catch (error) {
      console.error('Error updating password after 2FA:', error)
      showToast('Failed to update password', 'error', 'bi bi-x-circle')
    } finally {
      setUpdatingPassword(false)
      setVerifying2FA(false)
    }
  }

  const handleResend2FACode = () => {
    sendTwoFACode(currentUser.email)
  }

  const handle2FABack = () => {
    setReauthStep('password')
    setTwoFACode('')
    setSentCode('')
    setCodeExpiration(null)
    setReauthData({ currentPassword: '' })
  }

  // Enable 2FA handlers
  const handleEnable2FAClick = () => {
    setShowEnable2FAModal(true)
    setEnable2FAStep('password')
    setEnable2FAPassword('')
    setEnable2FACode('')
  }

  const handleVerifyEnable2FAPassword = async () => {
    if (!enable2FAPassword) {
      showToast('Please enter your current password', 'error', 'bi bi-x-circle')
      return
    }

    setVerifyingEnable2FA(true)
    try {
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        enable2FAPassword
      )
      // Verify password is correct
      await reauthenticateWithCredential(currentUser, credential)

      // Password verified! Send 2FA code
      const code = generateTwoFACode()
      setEnable2FASentCode(code)
      const expirationTime = new Date().getTime() + 5 * 60 * 1000
      setEnable2FAExpiration(expirationTime)

      console.log(`📧 2FA Enable Code for ${currentUser.email}: ${code}`)
      showToast(`✉️ Verification code sent to ${currentUser.email}`, 'info', 'bi bi-envelope')

      setEnable2FAStep('2fa')
      setEnable2FAPassword('')
      setEnable2FACode('')

    } catch (error) {
      console.error('Error verifying password:', error)
      if (error.code === 'auth/wrong-password') {
        showToast('Incorrect password - please try again', 'error', 'bi bi-x-circle')
      } else {
        showToast('Failed to verify password', 'error', 'bi bi-x-circle')
      }
    } finally {
      setVerifyingEnable2FA(false)
    }
  }

  const handleVerifyEnable2FACode = async () => {
    if (!enable2FACode) {
      showToast('Please enter the 6-digit code', 'error', 'bi bi-x-circle')
      return
    }

    if (enable2FAExpiration && new Date().getTime() > enable2FAExpiration) {
      showToast('Code expired - request a new one', 'error', 'bi bi-x-circle')
      return
    }

    if (enable2FACode !== enable2FASentCode) {
      showToast('Incorrect code - please try again', 'error', 'bi bi-x-circle')
      return
    }

    setVerifyingEnable2FA(true)
    try {
      // Code verified! Save 2FA status to Firestore
      const adminRef = doc(db, 'admins', currentUser.uid)
      await setDoc(adminRef, {
        twoFAEnabled: true,
        twoFAEnabledAt: new Date().toISOString()
      }, { merge: true })

      setShowEnable2FAModal(false)
      setEnable2FAStep('password')
      setEnable2FACode('')
      setEnable2FAPassword('')
      setEnable2FASentCode('')
      showToast('✓ Two-Factor Authentication enabled successfully!', 'success', 'bi bi-check-circle')
    } catch (error) {
      console.error('Error enabling 2FA:', error)
      showToast('Failed to enable 2FA', 'error', 'bi bi-x-circle')
    } finally {
      setVerifyingEnable2FA(false)
    }
  }

  const handleResendEnable2FACode = () => {
    const code = generateTwoFACode()
    setEnable2FASentCode(code)
    const expirationTime = new Date().getTime() + 5 * 60 * 1000
    setEnable2FAExpiration(expirationTime)

    console.log(`📧 2FA Enable Code for ${currentUser.email}: ${code}`)
    showToast(`✉️ Verification code resent to ${currentUser.email}`, 'info', 'bi bi-envelope')
  }

  const handleEnable2FABack = () => {
    setEnable2FAStep('password')
    setEnable2FACode('')
    setEnable2FAPassword('')
    setEnable2FASentCode('')
    setEnable2FAExpiration(null)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="profile-page">
      <div className="page-header">
        <h1>Profile</h1>
        <p>Manage your admin account</p>
      </div>

      <div className="profile-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-header-section">
            <div className="profile-avatar-large">
              <img src={lexiLogo} alt="Lexi AI Logo" className="profile-logo" />
            </div>
            <div className="profile-intro">
              <h2>{adminInfo.name}</h2>
              <p>{adminInfo.role || '------'}</p>
            </div>
          </div>

          {!isEditing ? (
            <>
              <div className="profile-info-grid">
                <div className="info-item">
                  <span className="info-label">Username</span>
                  <span className="info-value">{adminInfo.username || '------'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <span className="info-value">{adminInfo.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{adminInfo.phone || '------'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Department</span>
                  <span className="info-value">{adminInfo.department}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Role</span>
                  <span className="info-value">{adminInfo.role || '------'}</span>
                </div>
              </div>
              <button className="btn-primary" onClick={() => setIsEditing(true)}>
                <i className="bi bi-pencil-square"></i> Edit Profile
              </button>
            </>
          ) : (
            <>
              <form className="profile-form">
                <div className="form-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Enter your username"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    disabled
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    placeholder="Enter your role"
                    className="form-control"
                  />
                </div>
                <div className="form-actions">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => {
                      setIsEditing(false)
                      setFormData(adminInfo)
                    }}
                    disabled={saving}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>

        {/* Security Card */}
        <div className="security-card">
          <h3>Security Settings</h3>
          <div className="security-item">
            <div className="security-info">
              <span className="security-label">Change Password</span>
              <small>Update your password regularly to maintain security</small>
            </div>
            <button className="btn-outline" onClick={() => setShowPasswordModal(true)}>Change</button>
          </div>
          <div className="security-item">
            <div className="security-info">
              <span className="security-label">Two-Factor Authentication</span>
              <small>Add an extra layer of security to your account</small>
            </div>
            <button className="btn-outline" onClick={handleEnable2FAClick}>Enable</button>
          </div>
          <div className="security-item">
            <div className="security-info">
              <span className="security-label">Active Sessions</span>
              <small>Manage your logged-in devices</small>
            </div>
            <button className="btn-outline">Manage</button>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay" onClick={() => setShowPasswordModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Change Password</h2>
            <p className="modal-message">Enter your new password below</p>

            <div className="password-form">
              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  placeholder="Enter new password"
                  className="form-control"
                  disabled={updatingPassword}
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Confirm new password"
                  className="form-control"
                  disabled={updatingPassword}
                />
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="btn-modal cancel"
                onClick={() => {
                  setShowPasswordModal(false)
                  setPasswordData({ newPassword: '', confirmPassword: '' })
                }}
                disabled={updatingPassword}
              >
                Cancel
              </button>
              <button
                className="btn-modal confirm"
                onClick={handlePasswordChange}
                disabled={updatingPassword}
              >
                {updatingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Re-authentication Modal */}
      {showReauthModal && (
        <div className="modal-overlay" onClick={() => setShowReauthModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {reauthStep === 'password' ? (
              <>
                <h2 className="modal-title">Verify Your Identity</h2>
                <p className="modal-message">For security, please enter your current password</p>

                <div className="password-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={reauthData.currentPassword}
                      onChange={(e) => setReauthData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      placeholder="Enter your current password"
                      className="form-control"
                      disabled={reauthenticating}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-modal cancel"
                    onClick={() => {
                      setShowReauthModal(false)
                      setReauthData({ currentPassword: '' })
                    }}
                    disabled={reauthenticating}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-modal confirm"
                    onClick={handleReauthenticate}
                    disabled={reauthenticating}
                  >
                    {reauthenticating ? 'Verifying...' : 'Verify & Continue'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="modal-title">Two-Factor Authentication</h2>
                <p className="modal-message">Enter the 6-digit code sent to your email</p>

                <div className="password-form">
                  <div className="form-group">
                    <label>Verification Code</label>
                    <input
                      type="text"
                      value={twoFACode}
                      onChange={(e) => setTwoFACode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="form-control"
                      disabled={verifying2FA}
                      maxLength="6"
                      style={{ fontSize: '24px', letterSpacing: '8px', textAlign: 'center' }}
                    />
                  </div>
                  <small style={{ color: '#666', textAlign: 'center', display: 'block', marginTop: '8px' }}>
                    Code expires in 5 minutes
                  </small>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-modal cancel"
                    onClick={handle2FABack}
                    disabled={verifying2FA}
                  >
                    Back
                  </button>
                  <button
                    className="btn-modal confirm"
                    onClick={handleVerify2FA}
                    disabled={verifying2FA || twoFACode.length !== 6}
                  >
                    {verifying2FA ? 'Verifying...' : 'Verify Code'}
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                  <button
                    onClick={handleResend2FACode}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1E844F',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textDecoration: 'underline'
                    }}
                  >
                    Didn't receive code? Resend
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Enable 2FA Modal */}
      {showEnable2FAModal && (
        <div className="modal-overlay" onClick={() => setShowEnable2FAModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {enable2FAStep === 'password' ? (
              <>
                <h2 className="modal-title">Enable Two-Factor Authentication</h2>
                <p className="modal-message">For security, please enter your current password</p>

                <div className="password-form">
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={enable2FAPassword}
                      onChange={(e) => setEnable2FAPassword(e.target.value)}
                      placeholder="Enter your current password"
                      className="form-control"
                      disabled={verifyingEnable2FA}
                    />
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-modal cancel"
                    onClick={() => {
                      setShowEnable2FAModal(false)
                      setEnable2FAPassword('')
                    }}
                    disabled={verifyingEnable2FA}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn-modal confirm"
                    onClick={handleVerifyEnable2FAPassword}
                    disabled={verifyingEnable2FA}
                  >
                    {verifyingEnable2FA ? 'Verifying...' : 'Verify & Continue'}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="modal-title">Verify Your Email</h2>
                <p className="modal-message">Enter the 6-digit code sent to your email</p>

                <div className="password-form">
                  <div className="form-group">
                    <label>Verification Code</label>
                    <input
                      type="text"
                      value={enable2FACode}
                      onChange={(e) => setEnable2FACode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="000000"
                      className="form-control"
                      disabled={verifyingEnable2FA}
                      maxLength="6"
                      style={{ fontSize: '24px', letterSpacing: '8px', textAlign: 'center' }}
                    />
                  </div>
                  <small style={{ color: '#666', textAlign: 'center', display: 'block', marginTop: '8px' }}>
                    Code expires in 5 minutes
                  </small>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-modal cancel"
                    onClick={handleEnable2FABack}
                    disabled={verifyingEnable2FA}
                  >
                    Back
                  </button>
                  <button
                    className="btn-modal confirm"
                    onClick={handleVerifyEnable2FACode}
                    disabled={verifyingEnable2FA || enable2FACode.length !== 6}
                  >
                    {verifyingEnable2FA ? 'Enabling...' : 'Enable 2FA'}
                  </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                  <button
                    onClick={handleResendEnable2FACode}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#1E844F',
                      cursor: 'pointer',
                      fontSize: '14px',
                      textDecoration: 'underline'
                    }}
                  >
                    Didn't receive code? Resend
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile

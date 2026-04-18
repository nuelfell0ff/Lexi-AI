import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase'
import { doc, getDoc, collection, onSnapshot } from 'firebase/firestore'
import NotificationModal from './NotificationModal'
import SearchModal from './SearchModal'
import lexiLogo from '../assets/Lexi-Ai-No-bg.png'
import '../styles/AdminNavbar.css'

const AdminNavbar = () => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  const [adminInfo, setAdminInfo] = useState({
    username: 'Super Admin'
  })
  const [showNotificationModal, setShowNotificationModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [pendingApplicants, setPendingApplicants] = useState([])
  const [clearedNotifications, setClearedNotifications] = useState(() => {
    // Load from localStorage on mount
    try {
      const saved = localStorage.getItem('clearedNotifications')
      return saved ? JSON.parse(saved) : []
    } catch (error) {
      console.error('Error loading cleared notifications:', error)
      return []
    }
  })

  // Save cleared notifications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('clearedNotifications', JSON.stringify(clearedNotifications))
    } catch (error) {
      console.error('Error saving cleared notifications:', error)
    }
  }, [clearedNotifications])

  useEffect(() => {
    const fetchAdminInfo = async () => {
      if (!currentUser?.uid) return
      try {
        const adminRef = doc(db, 'admins', currentUser.uid)
        const adminSnap = await getDoc(adminRef)
        if (adminSnap.exists()) {
          setAdminInfo(adminSnap.data())
        }
      } catch (error) {
        console.error('Error fetching admin info:', error)
      }
    }
    fetchAdminInfo()
  }, [currentUser])

  useEffect(() => {
    try {
      // Get all applicants and filter on client side
      const applicantsCollection = collection(db, 'applicants')
      const unsubscribe = onSnapshot(applicantsCollection, (querySnapshot) => {
        const applicants = querySnapshot.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          .filter(app => !app.status || app.status === '' || app.status?.toLowerCase() === 'pending')
        setPendingApplicants(applicants)
      })
      return () => unsubscribe()
    } catch (error) {
      console.error('Error setting up pending applicants listener:', error)
    }
  }, [])

  const adminName = adminInfo.username || 'Super Admin'
  const adminEmail = currentUser?.email || 'admin@admin.com'

  // Filter out cleared notifications
  const displayedApplicants = pendingApplicants.filter(app => !clearedNotifications.includes(app.id))
  const pendingCount = displayedApplicants.length

  const handleClearNotifications = () => {
    // Mark all current applicants as cleared
    const applicantIds = pendingApplicants.map(app => app.id)
    setClearedNotifications(prev => [...prev, ...applicantIds])
  }

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <img src={lexiLogo} alt="Lexi AI" className="navbar-logo-img" />
        </div>

        {/* Search Bar */}
        <div className="navbar-search" onClick={() => setShowSearchModal(true)}>
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search applications..." readOnly style={{ cursor: 'pointer' }} />
        </div>

        {/* Mobile Search Icon */}
        <button
          className="navbar-mobile-search"
          onClick={() => setShowSearchModal(true)}
          title="Search"
        >
          <i className="bi bi-search"></i>
        </button>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Notification Bell */}
          <button
            className="navbar-icon-btn notification-btn"
            onClick={() => setShowNotificationModal(true)}
          >
            <i className="bi bi-bell-fill"></i>
            {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
          </button>

          {/* Admin Profile */}
          <div 
            className="admin-profile"
            onClick={() => navigate('/admin/profile')}
          >
            <div className="profile-info">
              <span className="profile-name">{adminName}</span>
              <small className="profile-role">{adminEmail}</small>
            </div>
            <div className="profile-avatar">
              <i className="bi bi-person-circle"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Modal */}
      {showNotificationModal && (
        <NotificationModal
          applicants={displayedApplicants}
          onClose={() => setShowNotificationModal(false)}
          onClear={handleClearNotifications}
        />
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <SearchModal onClose={() => setShowSearchModal(false)} />
      )}
    </nav>
  )
}

export default AdminNavbar

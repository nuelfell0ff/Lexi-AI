import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import '../styles/AdminNavbar.css'

const AdminNavbar = () => {
  const { currentUser } = useAuth()
  const [adminInfo, setAdminInfo] = useState({
    username: 'Super Admin'
  })

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

  const adminName = adminInfo.username || 'Super Admin'
  const adminEmail = currentUser?.email || 'admin@admin.com'

  return (
    <nav className="admin-navbar">
      <div className="navbar-container">
        {/* Search Bar */}
        <div className="navbar-search">
          <i className="bi bi-search"></i>
          <input type="text" placeholder="Search applications..." />
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Notification Bell */}
          <button className="navbar-icon-btn notification-btn">
            <i className="bi bi-bell-fill"></i>
            <span className="badge">1</span>
          </button>

          {/* Admin Profile */}
          <div className="admin-profile">
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
    </nav>
  )
}

export default AdminNavbar

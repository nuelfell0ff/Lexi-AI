import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import lexiLogo from '../assets/Lexi-Ai-No-bg.png'
import '../styles/AdminSidebar.css'

const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: 'grid-fill'
    },
    {
      label: 'Applicants',
      path: '/admin/applicants',
      icon: 'people-fill'
    },
    {
      label: 'Messages',
      path: '/admin/messages',
      icon: 'envelope-fill'
    },
    {
      label: 'Analytics',
      path: '/admin/analytics',
      icon: 'bar-chart-fill'
    },
    {
      label: 'Profile',
      path: '/admin/profile',
      icon: 'person-circle'
    },
    {
      label: 'Settings',
      path: '/admin/settings',
      icon: 'gear-fill'
    }
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/admin/signin')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <img src={lexiLogo} alt="Lexi AI Logo" className="sidebar-logo-img" />
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-nav-link ${isActive(item.path) ? 'active' : ''}`}
          >
            <i className={`bi bi-${item.icon}`}></i>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-logout-btn" onClick={handleLogout}>
          <i className="bi bi-box-arrow-right"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar

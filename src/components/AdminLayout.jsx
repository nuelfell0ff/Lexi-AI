import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from './LoadingSpinner'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'
import '../styles/AdminLayout.css'

const AdminLayout = ({ children }) => {
  const { currentUser, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/admin/signin')
    }
  }, [currentUser, loading, navigate])

  if (loading) {
    return (
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminNavbar />
          <main className="admin-content">
            <LoadingSpinner />
          </main>
        </div>
      </div>
    )
  }

  if (!currentUser) {
    return null
  }

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-main">
        <AdminNavbar />
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

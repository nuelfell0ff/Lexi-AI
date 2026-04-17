import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import LoadingSpinner from './LoadingSpinner'
import AdminSidebar from './AdminSidebar'
import AdminNavbar from './AdminNavbar'
import Toast from './Toast'
import '../styles/AdminLayout.css'

const AdminLayout = ({ children }) => {
  const { currentUser, loading } = useAuth()
  const { toast, setToast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    console.log('AdminLayout toast state:', toast)
  }, [toast])

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
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          icon={toast.icon}
          onClose={() => setToast(null)}
        />
      )}
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

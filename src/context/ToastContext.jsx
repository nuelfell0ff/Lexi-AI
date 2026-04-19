import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import ToastPortal from '../components/ToastPortal'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)
  const timeoutRef = useRef(null)

  const showToast = (message, type = 'success', icon = null, duration = 3000) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setToast({ message, type, icon })

    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      setToast(null)
      timeoutRef.current = null
    }, duration)
  }

  const handleCloseToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setToast(null)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toast, showToast, setToast }}>
      <ToastPortal toast={toast} onClose={handleCloseToast} />
      {children}
    </ToastContext.Provider>
  )
}

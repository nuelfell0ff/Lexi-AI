import React, { useEffect } from 'react'
import '../styles/Toast.css'

const Toast = ({ message, type = 'success', icon = null, duration = 3000, onClose }) => {
  useEffect(() => {
    console.log('Toast rendering:', { message, type, icon, duration })
    const timer = setTimeout(() => {
      console.log('Toast auto-closing')
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose, message, type, icon])

  const getIcon = () => {
    if (icon) {
      return <i className={icon}></i>
    }
    switch (type) {
      case 'success':
        return <i className="bi bi-check-circle"></i>
      case 'error':
        return <i className="bi bi-x-circle"></i>
      case 'info':
        return <i className="bi bi-info-circle"></i>
      default:
        return null
    }
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {getIcon()}
        <span>{message}</span>
      </div>
    </div>
  )
}

export default Toast

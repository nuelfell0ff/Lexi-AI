import React, { createContext, useContext, useState } from 'react'

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

  const showToast = (message, type = 'success', icon = null, duration = 3000) => {
    console.log('showToast called:', { message, type, icon, duration })
    setToast({ message, type, icon })
    setTimeout(() => {
      console.log('Clearing toast')
      setToast(null)
    }, duration)
  }

  return (
    <ToastContext.Provider value={{ toast, showToast, setToast }}>
      {children}
    </ToastContext.Provider>
  )
}

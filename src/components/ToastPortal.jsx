import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import Toast from './Toast'

const ToastPortal = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast) {
      console.log('Toast portal mounting to document.body')
      console.log('document.body:', document.body)
      console.log('portal element will render:', toast)
    }
  }, [toast])

  if (!toast) return null

  console.log('ToastPortal rendering with:', toast)

  const portalContent = (
    <div style={{ position: 'fixed', bottom: '50px', left: '50%', transform: 'translateX(-50%)', zIndex: 99999 }}>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={onClose}
      />
    </div>
  )

  return ReactDOM.createPortal(portalContent, document.body)
}

export default ToastPortal

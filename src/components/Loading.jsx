import React from 'react'
import './Loading.css'
import logo from '../assets/logo-2.png'

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <img src={logo} alt="Loading" className="loading-logo" />
        <div className="loading-spinner"></div>
      </div>
    </div>
  )
}

export default Loading

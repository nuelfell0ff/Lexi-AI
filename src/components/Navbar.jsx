import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../assets/Lexi-Ai-No-bg.png'

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <>
      <nav className={`navbar-container ${sidebarOpen ? 'open' : ''}`}>
        <div className="navbar-wrapper">
          {/* Logo */}
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="Logo" className="logo-img" />
            </Link>
          </div>

          {/* Desktop Nav Items */}
          <div className="navbar-menu">
            <a href="#home" className="nav-item">Home</a>
            <a href="#features" className="nav-item">Features</a>
            <a href="#pricing" className="nav-item">Pricing</a>
            <a href="#faq" className="nav-item">FAQ</a>
            <a href="#contact" className="nav-item">Contact</a>
          </div>

          {/* Get Started Button */}
          <a href="https://wa.link/7laj6q" target="_blank" rel="noopener noreferrer" className="btn-get-started">Get Started</a>

          {/* Hamburger Menu */}
          <button className={`hamburger ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
            <i className={sidebarOpen ? 'fas fa-xmark' : 'fas fa-bars'}></i>
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={closeSidebar}>&times;</button>
        <a href="#home" onClick={closeSidebar} className="sidebar-item">Home</a>
        <a href="#features" onClick={closeSidebar} className="sidebar-item">Features</a>
        <a href="#pricing" onClick={closeSidebar} className="sidebar-item">Pricing</a>
        <a href="#faq" onClick={closeSidebar} className="sidebar-item">FAQ</a>
        <a href="#contact" onClick={closeSidebar} className="sidebar-item">Contact</a>
        <a href="https://wa.link/7laj6q" target="_blank" rel="noopener noreferrer" className="btn-sidebar-get-started" onClick={closeSidebar}>Get Started</a>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
    </>
  )
}

export default Navbar
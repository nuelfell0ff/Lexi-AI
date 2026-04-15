import React, { useState } from 'react'
import { auth } from './firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate, useLocation } from 'react-router-dom'
import './Auth.css'

const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const location = useLocation()

  const validateForm = () => {
    const newErrors = {}
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    return newErrors
  }

  const handleSignin = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setErrors({})
      navigate('/admin-dashboard')
    } catch (err) {
      setErrors({ general: 'Invalid email or password' })
      console.error('Sign in error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNavigateToSignup = () => {
    navigate('/admin-signup')
  }

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Section - Form */}
        <div className="auth-form-section">
          <div className="auth-form-content">
            {/* Logo */}
            <div className="auth-logo-section">
              <img
                src="/src/assets/Lexi-Ai-No-bg.png"
                alt="Lexi AI"
                className="auth-logo"
              />
            </div>

            {/* Form Header */}
            <div className="auth-header">
              <h1 className="auth-title">Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your admin account</p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                {errors.general}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignin} className="auth-form" noValidate>
              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-envelope"></i>
                  </span>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors({ ...errors, email: '' })
                    }}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Password Field */}
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    id="password"
                    type="password"
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      if (errors.password) setErrors({ ...errors, password: '' })
                    }}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100 auth-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Toggle Link */}
            <div className="auth-toggle">
              <p className="mb-0">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={handleNavigateToSignup}
                  className="auth-toggle-link"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Branding */}
        <div className="auth-branding-section">
          <div className="auth-branding-content">
            <h2 className="branding-title">Lexi AI Admin</h2>
            <p className="branding-subtitle">
              Manage your healthcare AI platform with ease
            </p>
            <ul className="branding-features">
              <li>
                <i className="bi bi-shield-check"></i>
                <span>Secure & Protected</span>
              </li>
              <li>
                <i className="bi bi-lightning"></i>
                <span>Fast Performance</span>
              </li>
              <li>
                <i className="bi bi-graph-up"></i>
                <span>Real-time Analytics</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
import React, { useState } from 'react'
import { auth } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import lexiLogo from './assets/Lexi-Ai-No-bg.png'
import './Auth.css'

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})

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
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = 'Password must contain at least one uppercase letter'
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = 'Password must contain at least one number'
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    return newErrors
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      setErrors({})
      navigate('/admin-signin')
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setErrors({ general: 'This email is already registered' })
      } else if (err.code === 'auth/weak-password') {
        setErrors({ general: 'Password is too weak' })
      } else {
        setErrors({ general: 'Error creating account. Please try again.' })
      }
      console.error('Sign up error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNavigateToSignin = () => {
    navigate('/admin-signin')
  }

  const getPasswordStrength = () => {
    if (!password) return ''
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    if (strength <= 1) return 'weak'
    if (strength === 2) return 'fair'
    if (strength === 3) return 'good'
    return 'strong'
  }

  const passwordStrength = getPasswordStrength()

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Left Section - Form */}
        <div className="auth-form-section">
          <div className="auth-form-content">
            {/* Logo */}
            <div className="auth-logo-section">
              <img
                src={lexiLogo}
            </div>

            {/* Form Header */}
            <div className="auth-header">
              <h1 className="auth-title">Create Account</h1>
              <p className="auth-subtitle">Join Lexi AI as an admin</p>
            </div>

            {/* Error Message */}
            {errors.general && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                {errors.general}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSignup} className="auth-form" noValidate>
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
                    placeholder="Create a strong password"
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

                {/* Password Strength Indicator */}
                {password && (
                  <div className="password-strength mt-2">
                    <div className="strength-bar">
                      <div className={`strength-fill strength-${passwordStrength}`}></div>
                    </div>
                    <small className={`strength-text strength-${passwordStrength}`}>
                      Strength: {passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
                    </small>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-shield-lock"></i>
                  </span>
                  <input
                    id="confirmPassword"
                    type="password"
                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value)
                      if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' })
                    }}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword}
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
                    Creating Account...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            {/* Toggle Link */}
            <div className="auth-toggle">
              <p className="mb-0">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={handleNavigateToSignin}
                  className="auth-toggle-link"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section - Branding */}
        <div className="auth-branding-section">
          <div className="auth-branding-content">
            <h2 className="branding-title">Join Lexi AI</h2>
            <p className="branding-subtitle">
              Empower healthcare with intelligent AI solutions
            </p>
            <ul className="branding-features">
              <li>
                <i className="bi bi-check-circle"></i>
                <span>Easy Setup</span>
              </li>
              <li>
                <i className="bi bi-people"></i>
                <span>Dedicated Support</span>
              </li>
              <li>
                <i className="bi bi-star"></i>
                <span>Premium Features</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
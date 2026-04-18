import React, { useState, useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import '../styles/SearchModal.css'

const SearchModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState([])
  const [allApplicants, setAllApplicants] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Fetch all applicants on mount
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        setLoading(true)
        const snapshot = await getDocs(collection(db, 'applicants'))
        const applicants = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setAllApplicants(applicants)
      } catch (error) {
        console.error('Error fetching applicants:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchApplicants()
  }, [])

  // Search handler
  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const query = searchQuery.toLowerCase()
    const filtered = allApplicants.filter(applicant => {
      const name = (applicant.name || '').toLowerCase()
      const email = (applicant.email || '').toLowerCase()
      const institution = (applicant.institution || '').toLowerCase()
      const city = (applicant.city || '').toLowerCase()
      const courseOfStudy = (applicant.courseOfStudy || '').toLowerCase()

      return (
        name.includes(query) ||
        email.includes(query) ||
        institution.includes(query) ||
        city.includes(query) ||
        courseOfStudy.includes(query)
      )
    })

    setResults(filtered)
  }, [searchQuery, allApplicants])

  const handleResultClick = (applicantId) => {
    navigate(`/admin/applicants/${applicantId}`)
    onClose()
  }

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <i className="bi bi-search"></i>
            <input
              type="text"
              placeholder="Search by name, email, institution, city, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                className="clear-btn"
                onClick={() => setSearchQuery('')}
              >
                <i className="bi bi-x"></i>
              </button>
            )}
          </div>
          <button className="close-btn" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        <div className="search-modal-content">
          {loading && <div className="search-loading">Loading applicants...</div>}

          {!loading && searchQuery && results.length === 0 && (
            <div className="search-no-results">
              <i className="bi bi-inbox"></i>
              <p>No applications found matching "{searchQuery}"</p>
            </div>
          )}

          {!loading && !searchQuery && (
            <div className="search-placeholder">
              <i className="bi bi-search"></i>
              <p>Start typing to search applications...</p>
            </div>
          )}

          {!loading && results.length > 0 && (
            <div className="search-results">
              <p className="results-count">{results.length} result{results.length !== 1 ? 's' : ''} found</p>
              <div className="results-list">
                {results.map(applicant => (
                  <div
                    key={applicant.id}
                    className="result-item"
                    onClick={() => handleResultClick(applicant.id)}
                  >
                    <div className="result-avatar">
                      <i className="bi bi-person-circle"></i>
                    </div>
                    <div className="result-info">
                      <p className="result-name">{applicant.name}</p>
                      <p className="result-email">{applicant.email}</p>
                      <div className="result-meta">
                        <span className="meta-tag">{applicant.institution}</span>
                        <span className="meta-tag">{applicant.courseOfStudy}</span>
                        {applicant.status && (
                          <span className={`status-badge status-${(applicant.status || '').toLowerCase()}`}>
                            {applicant.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal

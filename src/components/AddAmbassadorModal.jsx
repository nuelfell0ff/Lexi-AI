import React, { useState, useEffect } from 'react'
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useToast } from '../context/ToastContext'
import '../styles/AddAmbassadorModal.css'

const AddAmbassadorModal = ({ isOpen, onClose, onSuccess }) => {
  const { showToast } = useToast()
  const [applicants, setApplicants] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [fetchingApplicants, setFetchingApplicants] = useState(false)

  // Fetch approved applicants
  useEffect(() => {
    if (isOpen) {
      fetchApprovedApplicants()
    }
  }, [isOpen])

  const fetchApprovedApplicants = async () => {
    try {
      setFetchingApplicants(true)
      const q = query(
        collection(db, 'applicants'),
        where('status', '==', 'approved')
      )
      const querySnapshot = await getDocs(q)
      const applicantsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setApplicants(applicantsData)
    } catch (error) {
      console.error('Error fetching applicants:', error)
      showToast('Failed to fetch applicants', 'error', 'bi bi-exclamation-circle')
    } finally {
      setFetchingApplicants(false)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        showToast('Only JPG, PNG, and WebP images are allowed', 'error', 'bi bi-exclamation-circle')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size must be less than 5MB', 'error', 'bi bi-exclamation-circle')
        return
      }
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'lexi-ai')

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/datmds5xl/image/upload', {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedApplicant) {
      showToast('Please select an applicant', 'warning', 'bi bi-exclamation-circle')
      return
    }

    setLoading(true)
    try {
      let imageUrl = null
      if (image) {
        imageUrl = await uploadImageToCloudinary(image)
      }

      const ambassadorPost = {
        name: selectedApplicant.name,
        email: selectedApplicant.email,
        institution: selectedApplicant.institution,
        courseOfStudy: selectedApplicant.courseOfStudy,
        level: selectedApplicant.level,
        image: imageUrl,
        applicantId: selectedApplicant.id,
        createdAt: new Date(),
        status: 'active'
      }

      const docRef = await addDoc(collection(db, 'ambassadorPosts'), ambassadorPost)

      showToast('Ambassador post created successfully!', 'success', 'bi bi-check-circle')

      // Reset form
      setSelectedApplicant(null)
      setImage(null)
      setImagePreview(null)
      setSearchTerm('')

      // Call onSuccess callback
      if (onSuccess) {
        onSuccess(docRef.id)
      }

      onClose()
    } catch (error) {
      console.error('Error creating ambassador post:', error)
      showToast('Failed to create ambassador post', 'error', 'bi bi-exclamation-circle')
    } finally {
      setLoading(false)
    }
  }

  const filteredApplicants = applicants.filter(applicant =>
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.institution.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content add-ambassador-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Ambassador Post</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="add-ambassador-form">
          {/* Step 1: Select Applicant */}
          <div className="form-section">
            <label className="form-label">Select Applicant</label>
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                placeholder="Search by name or institution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            {fetchingApplicants ? (
              <div className="loading-state">
                <p>Loading applicants...</p>
              </div>
            ) : filteredApplicants.length === 0 ? (
              <div className="empty-state">
                <p>No approved applicants found</p>
              </div>
            ) : (
              <div className="applicants-list">
                {filteredApplicants.map(applicant => (
                  <div
                    key={applicant.id}
                    className={`applicant-item ${selectedApplicant?.id === applicant.id ? 'selected' : ''}`}
                    onClick={() => setSelectedApplicant(applicant)}
                  >
                    <div className="applicant-info">
                      <h4>{applicant.name}</h4>
                      <p>{applicant.institution}</p>
                      <small>{applicant.courseOfStudy} - {applicant.level}</small>
                    </div>
                    <div className="selection-indicator">
                      {selectedApplicant?.id === applicant.id && (
                        <i className="bi bi-check-circle-fill"></i>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Step 2: Upload Image */}
          {selectedApplicant && (
            <div className="form-section">
              <label className="form-label">Ambassador Image</label>
              <div className="image-upload-wrapper">
                {imagePreview ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => {
                        setImage(null)
                        setImagePreview(null)
                      }}
                    >
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                ) : (
                  <label className="image-upload-label">
                    <div className="upload-placeholder">
                      <i className="bi bi-cloud-upload"></i>
                      <p>Click to upload image</p>
                      <small>PNG, JPG, or WebP (Max 5MB)</small>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            </div>
          )}

          {/* Selected Applicant Summary */}
          {selectedApplicant && (
            <div className="selected-summary">
              <h4>Selected Ambassador</h4>
              <div className="summary-details">
                <p><strong>Name:</strong> {selectedApplicant.name}</p>
                <p><strong>Email:</strong> {selectedApplicant.email}</p>
                <p><strong>Institution:</strong> {selectedApplicant.institution}</p>
                <p><strong>Course:</strong> {selectedApplicant.courseOfStudy}</p>
                <p><strong>Level:</strong> {selectedApplicant.level}</p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!selectedApplicant || loading}
            >
              {loading ? (
                <>
                  <i className="bi bi-hourglass-split"></i> Creating...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle"></i> Create Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddAmbassadorModal

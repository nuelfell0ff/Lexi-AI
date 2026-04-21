import React, { useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'
import { useToast } from '../context/ToastContext'
import '../styles/StoriesModal.css'

const StoriesModal = ({ isOpen, onClose, onStoryAdded }) => {
  const [authorName, setAuthorName] = useState('')
  const [authorInstitution, setAuthorInstitution] = useState('')
  const [storyTitle, setStoryTitle] = useState('')
  const [storyContent, setStoryContent] = useState('')
  const [storyImage, setStoryImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const uploadFile = async (file) => {
    try {
      if (!file) return null
      if (file.size > 5 * 1024 * 1024) throw new Error('File size must be less than 5MB')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'lexi-ai')

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/datmds5xl/upload',
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('File Upload Error:', error.message)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!authorName.trim() || !storyTitle.trim() || !storyContent.trim()) {
        showToast('Please fill in all required fields', 'error', 'bi bi-exclamation-circle')
        setLoading(false)
        return
      }

      let imageUrl = null
      if (storyImage) {
        try {
          imageUrl = await uploadFile(storyImage)
        } catch (error) {
          showToast('Failed to upload image. Please try again.', 'error', 'bi bi-x-circle')
          setLoading(false)
          return
        }
      }

      await addDoc(collection(db, 'stories'), {
        authorName: authorName.trim(),
        authorInstitution: authorInstitution.trim() || 'Not specified',
        storyTitle: storyTitle.trim(),
        storyContent: storyContent.trim(),
        storyImage: imageUrl || null,
        createdAt: new Date(),
        status: 'approved'
      })

      showToast('Your story has been shared!', 'success', 'bi bi-check-circle')

      // Reset form
      setAuthorName('')
      setAuthorInstitution('')
      setStoryTitle('')
      setStoryContent('')
      setStoryImage(null)
      onClose()
    } catch (error) {
      console.error('Error submitting story:', error)
      showToast('Failed to submit story. Please try again.', 'error', 'bi bi-x-circle')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="stories-modal-overlay" onClick={onClose}>
      <div className="stories-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="stories-modal-header">
          <h2>Share Your Story</h2>
          <button className="stories-modal-close" onClick={onClose}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="stories-form">
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input
              type="text"
              className="form-input"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Institution</label>
            <input
              type="text"
              className="form-input"
              value={authorInstitution}
              onChange={(e) => setAuthorInstitution(e.target.value)}
              placeholder="Your university/institution (optional)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Story Title *</label>
            <input
              type="text"
              className="form-input"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
              placeholder="Give your story a title"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Your Story *</label>
            <textarea
              className="form-input form-textarea"
              value={storyContent}
              onChange={(e) => setStoryContent(e.target.value)}
              placeholder="Share your experience with Lexi AI..."
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label className="form-label">Upload Photo (optional)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="story-image"
                className="file-input"
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => setStoryImage(e.target.files[0])}
              />
              <label htmlFor="story-image" className="file-input-label">
                <i className="bi bi-cloud-upload"></i>
                <span>{storyImage ? storyImage.name : 'Click to upload or drag and drop'}</span>
                <small>Image files (PNG, JPG), max 5MB (Optional)</small>
              </label>
            </div>
          </div>

          <div className="stories-form-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <i className="bi bi-hourglass-split"></i> Submitting...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle"></i> Share Story
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default StoriesModal

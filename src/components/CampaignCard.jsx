import React, { useState } from 'react'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase'
import { useToast } from '../context/ToastContext'
import '../styles/CampaignCard.css'

const CampaignCard = ({ campaign }) => {
  const { showToast } = useToast()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [institution, setInstitution] = useState('')
  const [registeredCount, setRegisteredCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const capacity = Number(campaign.capacity || 0)
  const hasCapacityLimit = Number.isFinite(capacity) && capacity > 0
  const spotsLeft = Math.max(capacity - registeredCount, 0)
  const isFull = hasCapacityLimit && registeredCount >= capacity

  const loadRegisteredCount = async () => {
    try {
      const registrationsQuery = query(
        collection(db, 'campaign_registrations'),
        where('campaignId', '==', campaign.id)
      )
      const snapshot = await getDocs(registrationsQuery)
      setRegisteredCount(snapshot.size)
      return snapshot
    } catch (error) {
      console.error('Failed to fetch registrations count:', error)
      return null
    }
  }

  const openRegistration = async () => {
    setOpen(true)
    await loadRegisteredCount()
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!name || !email) {
      showToast('Please provide name and email', 'error', 'bi bi-exclamation-circle')
      return
    }

    setLoading(true)
    try {
      const normalizedEmail = email.trim().toLowerCase()

      // 1) Prevent duplicate registration for same event + email
      const duplicateQuery = query(
        collection(db, 'campaign_registrations'),
        where('campaignId', '==', campaign.id),
        where('emailLower', '==', normalizedEmail)
      )
      const duplicateSnapshot = await getDocs(duplicateQuery)
      if (!duplicateSnapshot.empty) {
        showToast('You have already registered for this event.', 'warning', 'bi bi-exclamation-circle')
        setLoading(false)
        return
      }

      // 2) Enforce capacity limit when provided
      const countSnapshot = await loadRegisteredCount()
      const currentCount = countSnapshot?.size || 0
      if (hasCapacityLimit && currentCount >= capacity) {
        showToast('Registration is closed. Event capacity has been reached.', 'error', 'bi bi-x-circle')
        setLoading(false)
        return
      }

      await addDoc(collection(db, 'campaign_registrations'), {
        campaignId: campaign.id,
        campaignTitle: campaign.title || '',
        name,
        email,
        emailLower: normalizedEmail,
        institution: institution || null,
        createdAt: new Date()
      })

      showToast('Registration successful. See you there!', 'success', 'bi bi-check-circle')
      setOpen(false)
      setName('')
      setEmail('')
      setInstitution('')
    } catch (error) {
      console.error('Registration error:', error)
      showToast('Failed to register. Please try again.', 'error', 'bi bi-x-circle')
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="campaign-card">
      <div className="campaign-card-topline">
        <span className="campaign-pill">Event</span>
        {campaign.date && <span className="campaign-date"><i className="bi bi-calendar-week"></i> {campaign.date}</span>}
      </div>

      <div className="campaign-header">
        <div className="campaign-heading-group">
          <h3 className="campaign-title">{campaign.title}</h3>
          <p className="campaign-description">{campaign.description}</p>
        </div>
      </div>

      <div className="campaign-meta">
        {campaign.ambassadors !== undefined && (
          <div className="meta-item">
            <i className="bi bi-people"></i>
            <span>{campaign.ambassadors} ambassadors</span>
          </div>
        )}

        {hasCapacityLimit && (
          <div className="meta-item">
            <i className={`bi ${isFull ? 'bi-lock-fill' : 'bi-person-check-fill'}`}></i>
            <span>{isFull ? 'Registration closed' : `${spotsLeft} spots left`}</span>
          </div>
        )}
      </div>

      <div className="campaign-card-footer">
        <div className="campaign-footer-note">
          {hasCapacityLimit ? `Capacity: ${capacity}` : 'Open registration'}
        </div>
        <button
          onClick={openRegistration}
          className="campaign-btn"
        >
          Register
        </button>
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="campaign-modal-overlay"
          />

          <div className="campaign-modal">
            <div className="campaign-modal-header">
              <div>
                <span className="campaign-modal-kicker">Register for event</span>
                <h4>{campaign.title}</h4>
              </div>
              <button onClick={() => setOpen(false)} className="campaign-modal-close" aria-label="Close registration modal">&times;</button>
            </div>

            {hasCapacityLimit && (
              <div className="campaign-modal-capacity">
                <span>Spots left</span>
                <strong>{spotsLeft}</strong>
                <small>of {capacity}</small>
              </div>
            )}

            <form onSubmit={handleRegister} className="campaign-modal-form">
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required className="campaign-input" />
              <input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="campaign-input" />
              <input placeholder="Institution (optional)" value={institution} onChange={(e) => setInstitution(e.target.value)} className="campaign-input" />

              <div className="campaign-modal-actions">
                <button type="submit" disabled={loading || isFull} className="campaign-btn campaign-btn-primary">
                  {loading ? 'Registering...' : 'Confirm Registration'}
                </button>
                <button type="button" onClick={() => setOpen(false)} className="campaign-btn campaign-btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}
    </article>
  )
}

export default CampaignCard


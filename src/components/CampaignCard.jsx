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
    <div style={{ border: '1px solid #e6e6e6', borderRadius: 10, padding: 16, background: '#fff' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px 0' }}>{campaign.title}</h3>
          <p style={{ margin: 0, color: '#666', fontSize: 14 }}>{campaign.description}</p>
          <div style={{ marginTop: 8, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {campaign.date && <span style={{ fontSize: 13, color: '#444' }}><i className="bi bi-calendar-week"></i> {campaign.date}</span>}
            {campaign.ambassadors !== undefined && <span style={{ fontSize: 13, color: '#444' }}><i className="bi bi-people"></i> {campaign.ambassadors} ambassadors</span>}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button
            onClick={openRegistration}
            style={{ padding: '8px 12px', background: '#1E844F', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            Register
          </button>
        </div>
      </div>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.45)', zIndex: 1000 }}
          />

          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 1001, background: '#fff', borderRadius: 10, width: '90%', maxWidth: 520, padding: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h4 style={{ margin: 0 }}>{campaign.title}</h4>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}>&times;</button>
            </div>

            {hasCapacityLimit && (
              <div style={{ marginBottom: 10, fontSize: 13, color: '#555' }}>
                Spots left: <strong>{Math.max(capacity - registeredCount, 0)}</strong> / {capacity}
              </div>
            )}

            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: 10, borderRadius: 8, border: '1px solid #e0e0e0' }} />
              <input placeholder="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: 10, borderRadius: 8, border: '1px solid #e0e0e0' }} />
              <input placeholder="Institution (optional)" value={institution} onChange={(e) => setInstitution(e.target.value)} style={{ padding: 10, borderRadius: 8, border: '1px solid #e0e0e0' }} />

              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <button type="submit" disabled={loading} style={{ padding: '10px 12px', background: loading ? '#ccc' : '#1E844F', color: '#fff', border: 'none', borderRadius: 8, cursor: loading ? 'not-allowed' : 'pointer', flex: 1 }}>
                  {loading ? 'Registering...' : 'Confirm Registration'}
                </button>
                <button type="button" onClick={() => setOpen(false)} style={{ padding: '10px 12px', background: '#f0f0f0', border: 'none', borderRadius: 8, flex: 1 }}>Cancel</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default CampaignCard


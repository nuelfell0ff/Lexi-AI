import React, { useState, useRef, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import ConfirmModal from '../../components/ConfirmModal'
import CampaignModal from '../../components/CampaignModal'

const Campaigns = () => {
  const { showToast } = useToast()
  const [campaigns, setCampaigns] = useState([])
  const [registrations, setRegistrations] = useState([])
  const [selectedCampaignId, setSelectedCampaignId] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)
  const [openCampaignMenu, setOpenCampaignMenu] = useState(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
  const campaignMenuRefs = useRef({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
    date: '',
    ambassadors: '',
    capacity: ''
  })

  // Fetch campaigns with real-time listener
  useEffect(() => {
    console.log('Setting up campaigns listener...')
    setLoading(true)
    const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        console.log('Campaigns snapshot received, docs count:', querySnapshot.docs.length)
        const campaignsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCampaigns(campaignsData)
        setLoading(false)
      } catch (error) {
        console.error('Error processing campaigns:', error)
        showToast('Failed to load campaigns', 'error', 'bi bi-exclamation-circle')
        setLoading(false)
      }
    }, (error) => {
      console.error('Error listening to campaigns:', error)
      showToast('Failed to load campaigns', 'error', 'bi bi-exclamation-circle')
      setLoading(false)
    })

    return () => {
      console.log('Unsubscribing from campaigns listener')
      unsubscribe()
    }
  }, [])

  // Fetch event registrations with real-time listener
  useEffect(() => {
    const q = query(collection(db, 'campaign_registrations'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const registrationsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setRegistrations(registrationsData)
      } catch (error) {
        console.error('Error processing registrations:', error)
      }
    }, (error) => {
      console.error('Error listening to registrations:', error)
    })

    return () => unsubscribe()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'ambassadors' || name === 'capacity') ? (parseInt(value) || 0) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.date) {
      showToast('Please fill in all required fields', 'error', 'bi bi-exclamation-circle')
      return
    }

    setIsSubmitting(true)
    try {
      if (editingId) {
        await updateDoc(doc(db, 'campaigns', editingId), {
          ...formData,
          updatedAt: new Date()
        })
        showToast('Campaign updated successfully!', 'success', 'bi bi-check-circle')
      } else {
        await addDoc(collection(db, 'campaigns'), {
          ...formData,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        showToast('Campaign created successfully!', 'success', 'bi bi-check-circle')
      }

      setFormData({
        title: '',
        description: '',
        status: 'active',
        date: '',
        ambassadors: '',
        capacity: ''
      })
      setEditingId(null)
      setShowModal(false)
    } catch (error) {
      console.error('Error saving campaign:', error)
      showToast('Failed to save campaign', 'error', 'bi bi-exclamation-circle')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (campaign) => {
    setFormData({
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      date: campaign.date,
      ambassadors: campaign.ambassadors || '',
      capacity: campaign.capacity || ''
    })
    setEditingId(campaign.id)
    setShowModal(true)
    setOpenCampaignMenu(null)
  }

  const handleDelete = (id) => {
    setConfirmModal({
      title: 'Delete Campaign',
      message: 'Are you sure you want to delete this campaign?',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'campaigns', id))
          showToast('Campaign deleted successfully!', 'success', 'bi bi-check-circle')
          setConfirmModal(null)
        } catch (error) {
          console.error('Error deleting campaign:', error)
          showToast('Failed to delete campaign', 'error', 'bi bi-exclamation-circle')
        }
      },
      onCancel: () => setConfirmModal(null),
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true
    })
    setOpenCampaignMenu(null)
  }

  const handleCancel = () => {
    setShowModal(false)
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      status: 'active',
      date: '',
      ambassadors: '',
      capacity: ''
    })
  }

  const getCampaignCapacity = (campaign) => {
    const value = Number(campaign.capacity)
    return Number.isFinite(value) && value > 0 ? value : 0
  }

  const getRegistrationCount = (campaignId) => {
    return registrations.filter(reg => reg.campaignId === campaignId).length
  }

  const filteredRegistrations = selectedCampaignId === 'all'
    ? registrations
    : registrations.filter(reg => reg.campaignId === selectedCampaignId)

  const downloadRegistrationsCSV = () => {
    if (filteredRegistrations.length === 0) {
      showToast('No registrations to export', 'warning', 'bi bi-exclamation-circle')
      return
    }

    const header = ['Campaign Title', 'Name', 'Email', 'Institution', 'Registered At']
    const rows = filteredRegistrations.map(reg => ([
      reg.campaignTitle || '',
      reg.name || '',
      reg.email || '',
      reg.institution || '',
      reg.createdAt?.toDate ? reg.createdAt.toDate().toISOString() : ''
    ]))

    const escapeCsv = (value) => {
      const text = String(value ?? '')
      if (text.includes(',') || text.includes('"') || text.includes('\n')) {
        return `"${text.replace(/"/g, '""')}"`
      }
      return text
    }

    const csv = [header, ...rows].map(row => row.map(escapeCsv).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `event-registrations-${selectedCampaignId === 'all' ? 'all' : selectedCampaignId}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const toggleMenu = (id, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setDropdownPos({
      top: rect.bottom + 4,
      left: rect.left - 130
    })
    setOpenCampaignMenu(openCampaignMenu === id ? null : id)
  }

  return (
    <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', gap: '20px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#333', margin: '0 0 8px 0' }}>Campaigns Management</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Create and manage campus ambassador campaigns</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#1E844F',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: 'Poppins, sans-serif'
          }}
        >
          <i className="bi bi-plus-circle"></i>
          New Campaign
        </button>
      </div>

      {/* Campaign Modal */}
      <CampaignModal
        isOpen={showModal}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        editingId={editingId}
        formData={formData}
        onFormChange={handleInputChange}
        isSubmitting={isSubmitting}
      />

      {/* Campaigns Table */}
      <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#333', margin: '0 0 24px 0' }}>Active Campaigns ({campaigns.length})</h3>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <i className="bi bi-hourglass-split" style={{ fontSize: '32px', marginBottom: '16px', display: 'block' }}></i>
            <p>Loading campaigns...</p>
          </div>
        ) : campaigns.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <i className="bi bi-inbox" style={{ fontSize: '32px', marginBottom: '16px', display: 'block' }}></i>
            <p>No campaigns yet. Create your first campaign to get started!</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Title</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Ambassadors</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Capacity</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Registrations</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Description</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#333' }}>{campaign.title}</td>
                    <td style={{ padding: '12px' }}>{campaign.date}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        display: 'inline-block',
                        padding: '6px 12px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        backgroundColor: campaign.status?.toLowerCase() === 'active' ? '#d4edda' : campaign.status?.toLowerCase() === 'completed' ? '#d1ecf1' : '#fff3cd',
                        color: campaign.status?.toLowerCase() === 'active' ? '#155724' : campaign.status?.toLowerCase() === 'completed' ? '#0c5460' : '#856404'
                      }}>
                        {campaign.status || 'active'}
                      </span>
                    </td>
                    <td style={{ padding: '12px' }}>{campaign.ambassadors || 0}</td>
                    <td style={{ padding: '12px' }}>{getCampaignCapacity(campaign) || 'Unlimited'}</td>
                    <td style={{ padding: '12px' }}>{getRegistrationCount(campaign.id)}</td>
                    <td style={{ padding: '12px', color: '#666', fontSize: '12px', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {campaign.description?.substring(0, 50)}...
                    </td>
                    <td style={{ padding: '12px', position: 'relative' }}>
                      <button
                        ref={(el) => (campaignMenuRefs.current[campaign.id] = el)}
                        onClick={(e) => toggleMenu(campaign.id, e)}
                        style={{
                          background: 'none',
                          border: '1px solid #e0e0e0',
                          width: '32px',
                          height: '32px',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '16px',
                          cursor: 'pointer',
                          color: '#333'
                        }}
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      {openCampaignMenu === campaign.id && (
                        <div
                          style={{
                            position: 'fixed',
                            background: '#fff',
                            border: '1px solid #e0e0e0',
                            borderRadius: '6px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            zIndex: 2000,
                            minWidth: '130px',
                            top: `${dropdownPos.top}px`,
                            left: `${dropdownPos.left}px`
                          }}
                        >
                          <button
                            onClick={() => handleEdit(campaign)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              width: '100%',
                              padding: '8px 10px',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer',
                              fontSize: '12px',
                              color: '#333',
                              textAlign: 'left',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                          >
                            <i className="bi bi-pencil"></i>
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(campaign.id)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              width: '100%',
                              padding: '8px 10px',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer',
                              fontSize: '12px',
                              color: '#dc3545',
                              textAlign: 'left',
                              fontFamily: 'Poppins, sans-serif'
                            }}
                          >
                            <i className="bi bi-trash"></i>
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Event Registrations */}
      <div style={{ marginTop: '24px', backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 12, flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>Event Registrations ({filteredRegistrations.length})</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <select
              value={selectedCampaignId}
              onChange={(e) => setSelectedCampaignId(e.target.value)}
              style={{ padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '13px' }}
            >
              <option value="all">All Events</option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.id}>{campaign.title}</option>
              ))}
            </select>
            <button
              onClick={downloadRegistrationsCSV}
              style={{
                padding: '8px 12px',
                backgroundColor: '#1E844F',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              <i className="bi bi-download"></i> Download CSV
            </button>
          </div>
        </div>

        {filteredRegistrations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px', color: '#666' }}>
            No registrations yet for this selection.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999' }}>EVENT</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999' }}>NAME</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999' }}>EMAIL</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999' }}>INSTITUTION</th>
                  <th style={{ padding: '12px', textAlign: 'left', fontWeight: 700, color: '#999' }}>REGISTERED AT</th>
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.map((registration) => (
                  <tr key={registration.id} style={{ borderBottom: '1px solid #e0e0e0' }}>
                    <td style={{ padding: '12px', color: '#333' }}>{registration.campaignTitle || '-'}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{registration.name || '-'}</td>
                    <td style={{ padding: '12px', color: '#333' }}>{registration.email || '-'}</td>
                    <td style={{ padding: '12px', color: '#555' }}>{registration.institution || '-'}</td>
                    <td style={{ padding: '12px', color: '#555' }}>
                      {registration.createdAt?.toDate ? registration.createdAt.toDate().toLocaleString() : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {confirmModal && <ConfirmModal {...confirmModal} />}
    </div>
  )
}

export default Campaigns

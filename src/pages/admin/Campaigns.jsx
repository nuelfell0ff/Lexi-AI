import React, { useState, useRef, useEffect } from 'react'
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import ConfirmModal from '../../components/ConfirmModal'
import '../../styles/Dashboard.css'

const Campaigns = () => {
  const { showToast } = useToast()
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [confirmModal, setConfirmModal] = useState(null)
  const [openMenu, setOpenMenu] = useState(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
  const menuRefs = useRef({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'active',
    date: '',
    ambassadors: ''
  })

  // Fetch campaigns
  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const campaignsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setCampaigns(campaignsData)
    } catch (error) {
      console.error('Error fetching campaigns:', error)
      showToast('Failed to load campaigns', 'error', 'bi bi-exclamation-circle')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'ambassadors' ? parseInt(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.description || !formData.date) {
      showToast('Please fill in all required fields', 'error', 'bi bi-exclamation-circle')
      return
    }

    try {
      if (editingId) {
        // Update existing campaign
        await updateDoc(doc(db, 'campaigns', editingId), {
          ...formData,
          updatedAt: new Date()
        })
        showToast('Campaign updated successfully!', 'success', 'bi bi-check-circle')
      } else {
        // Add new campaign
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
        ambassadors: ''
      })
      setEditingId(null)
      setShowForm(false)
      await fetchCampaigns()
    } catch (error) {
      console.error('Error saving campaign:', error)
      showToast('Failed to save campaign', 'error', 'bi bi-exclamation-circle')
    }
  }

  const handleEdit = (campaign) => {
    setFormData({
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      date: campaign.date,
      ambassadors: campaign.ambassadors || ''
    })
    setEditingId(campaign.id)
    setShowForm(true)
    setOpenMenu(null)
  }

  const handleDelete = (id) => {
    setConfirmModal({
      title: 'Delete Campaign',
      message: 'Are you sure you want to delete this campaign? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'campaigns', id))
          showToast('Campaign deleted successfully!', 'success', 'bi bi-check-circle')
          setConfirmModal(null)
          await fetchCampaigns()
        } catch (error) {
          console.error('Error deleting campaign:', error)
          showToast('Failed to delete campaign', 'error', 'bi bi-exclamation-circle')
        }
      },
      onCancel: () => setConfirmModal(null)
    })
    setOpenMenu(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      title: '',
      description: '',
      status: 'active',
      date: '',
      ambassadors: ''
    })
  }

  const toggleMenu = (id, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setDropdownPos({
      top: rect.bottom + 5,
      left: rect.left - 150
    })
    setOpenMenu(openMenu === id ? null : id)
  }

  return (
    <div className="admin-content">
      <div className="admin-header">
        <h1>Campaigns Management</h1>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => {
            if (showForm) {
              handleCancel()
            } else {
              setShowForm(true)
            }
          }}
        >
          <i className={`bi bi-${showForm ? 'x' : 'plus-circle'}`}></i>
          {showForm ? 'Cancel' : 'New Campaign'}
        </button>
      </div>

      {showForm && (
        <div className="form-section">
          <h2>{editingId ? 'Edit Campaign' : 'Create New Campaign'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Campaign Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Health Awareness Week"
                  required
                />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  placeholder="e.g., April 15 - 30, 2026"
                  required
                />
              </div>
              <div className="form-group">
                <label>Ambassadors Involved</label>
                <input
                  type="number"
                  name="ambassadors"
                  value={formData.ambassadors}
                  onChange={handleInputChange}
                  placeholder="e.g., 25"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the campaign objectives, activities, and impact..."
                rows="5"
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button type="submit" className="admin-btn admin-btn-primary">
                {editingId ? 'Update Campaign' : 'Create Campaign'}
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="campaigns-list">
        <h2>Active Campaigns ({campaigns.length})</h2>

        {loading ? (
          <div className="loading-message">
            <i className="bi bi-hourglass-split"></i>
            Loading campaigns...
          </div>
        ) : campaigns.length === 0 ? (
          <div className="empty-message">
            <i className="bi bi-inbox"></i>
            <p>No campaigns yet. Create your first campaign to get started!</p>
          </div>
        ) : (
          <div className="campaigns-table">
            <table>
              <thead>
                <tr>
                  <th>Campaign Title</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Ambassadors</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => (
                  <tr key={campaign.id}>
                    <td>
                      <div className="campaign-info">
                        <h4>{campaign.title}</h4>
                        <p>{campaign.description?.substring(0, 60)}...</p>
                      </div>
                    </td>
                    <td>{campaign.date}</td>
                    <td>
                      <span className={`status-badge status-${campaign.status.toLowerCase()}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td>{campaign.ambassadors || 0}</td>
                    <td>
                      <div className="action-menu">
                        <button
                          className="menu-btn"
                          ref={el => menuRefs.current[campaign.id] = el}
                          onClick={(e) => toggleMenu(campaign.id, e)}
                        >
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        {openMenu === campaign.id && (
                          <div className="dropdown-menu" style={{ top: dropdownPos.top, left: dropdownPos.left }}>
                            <button
                              className="dropdown-item"
                              onClick={() => handleEdit(campaign)}
                            >
                              <i className="bi bi-pencil"></i>
                              Edit
                            </button>
                            <button
                              className="dropdown-item delete"
                              onClick={() => handleDelete(campaign.id)}
                            >
                              <i className="bi bi-trash"></i>
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
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

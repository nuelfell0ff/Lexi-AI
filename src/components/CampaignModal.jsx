import React, { useEffect } from 'react'

const CampaignModal = ({ isOpen, onClose, onSubmit, editingId, formData, onFormChange, isSubmitting }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          zIndex: 1001,
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflow: 'auto'
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '24px',
            borderBottom: '1px solid #e0e0e0',
            sticky: 'top',
            backgroundColor: '#fff',
            zIndex: 1002
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#333' }}>
            {editingId ? 'Edit Campaign' : 'Create New Campaign'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#999',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Campaign Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={onFormChange}
              placeholder="e.g., Mental Health Awareness Week"
              required
              style={{
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
          </div>

          {/* Status & Date Row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={onFormChange}
                style={{
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Date *</label>
              <input
                type="text"
                name="date"
                value={formData.date}
                onChange={onFormChange}
                placeholder="e.g., April 15 - 30, 2026"
                required
                style={{
                  padding: '10px 12px',
                  border: '1px solid #e0e0e0',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontFamily: 'Poppins, sans-serif'
                }}
              />
            </div>
          </div>

          {/* Ambassadors */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Ambassadors Involved</label>
            <input
              type="number"
              name="ambassadors"
              value={formData.ambassadors}
              onChange={onFormChange}
              placeholder="e.g., 25"
              min="0"
              style={{
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'Poppins, sans-serif'
              }}
            />
          </div>

          {/* Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#333' }}>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={onFormChange}
              placeholder="Describe the campaign..."
              rows="4"
              required
              style={{
                padding: '10px 12px',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '13px',
                fontFamily: 'Poppins, sans-serif',
                resize: 'vertical',
                minHeight: '100px'
              }}
            />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                backgroundColor: isSubmitting ? '#ccc' : '#1E844F',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontFamily: 'Poppins, sans-serif',
                flex: 1
              }}
            >
              {isSubmitting ? 'Saving...' : editingId ? 'Update Campaign' : 'Create Campaign'}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              style={{
                padding: '10px 20px',
                backgroundColor: '#f0f0f0',
                color: '#333',
                border: '1px solid #e0e0e0',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                fontFamily: 'Poppins, sans-serif',
                flex: 1
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CampaignModal

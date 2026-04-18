import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import ConfirmModal from '../../components/ConfirmModal'
import '../../styles/Applicants.css'

const Applicants = ({ applicants = [], refetchApplicants }) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [confirmModal, setConfirmModal] = useState(null)
  const [sortBy, setSortBy] = useState('date')
  const [openMenu, setOpenMenu] = useState(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
  const [currentPage, setCurrentPage] = useState(1)
  const menuRefs = useRef({})
  const applicantsPerPage = 10

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch =
      applicant.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.institution?.toLowerCase().includes(searchTerm.toLowerCase())

    // Get applicant status, treating undefined/empty as 'pending'
    const applicantStatus = (applicant.status || 'pending').toLowerCase()
    const matchesFilter = filterStatus === 'all' || applicantStatus === filterStatus.toLowerCase()

    return matchesSearch && matchesFilter
  })

  // Sort filtered applicants
  const sortedApplicants = [...filteredApplicants].sort((a, b) => {
    if (sortBy === 'date') {
      // Sort by date - newest first
      const dateA = a.createdAt?.toDate?.() || new Date(0)
      const dateB = b.createdAt?.toDate?.() || new Date(0)
      return dateB - dateA
    } else if (sortBy === 'name') {
      // Sort by name - alphabetically
      return (a.name || '').localeCompare(b.name || '')
    } else if (sortBy === 'status') {
      // Sort by status
      return (a.status || 'pending').localeCompare(b.status || 'pending')
    }
    return 0
  })

  // Pagination calculations
  const totalPages = Math.ceil(sortedApplicants.length / applicantsPerPage)
  const startIndex = (currentPage - 1) * applicantsPerPage
  const endIndex = startIndex + applicantsPerPage
  const paginatedApplicants = sortedApplicants.slice(startIndex, endIndex)

  // Reset page to 1 when filters or sort changes
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterStatus, sortBy])

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, 'applicants', id), {
        status: 'APPROVED'
      })
      setOpenMenu(null)
      showToast('Applicant approved successfully!', 'success', 'bi bi-check-circle')
      if (refetchApplicants) await refetchApplicants()
    } catch (error) {
      console.error('Error approving applicant:', error)
      showToast('Failed to approve applicant', 'error', 'bi bi-x-circle')
    }
  }

  const handleReject = async (id) => {
    try {
      await updateDoc(doc(db, 'applicants', id), {
        status: 'REJECTED'
      })
      setOpenMenu(null)
      showToast('Applicant rejected successfully!', 'error', 'bi bi-x-circle')
      if (refetchApplicants) await refetchApplicants()
    } catch (error) {
      console.error('Error rejecting applicant:', error)
      showToast('Failed to reject applicant', 'error', 'bi bi-x-circle')
    }
  }

  const handleDelete = async (id) => {
    setConfirmModal({
      title: 'Delete Applicant',
      message: 'Are you sure you want to delete this applicant? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'applicants', id))
          setOpenMenu(null)
          setConfirmModal(null)
          showToast('Applicant deleted successfully!', 'error', 'bi bi-trash')
          if (refetchApplicants) await refetchApplicants()
        } catch (error) {
          console.error('Error deleting applicant:', error)
          showToast('Failed to delete applicant', 'error', 'bi bi-trash')
        }
      },
      onCancel: () => setConfirmModal(null),
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true
    })
  }

  const handleSuspend = async (id) => {
    try {
      await updateDoc(doc(db, 'applicants', id), {
        status: 'SUSPENDED'
      })
      setOpenMenu(null)
      showToast('Applicant suspended successfully!', 'warning', 'bi bi-hand-thumbsdown')
      if (refetchApplicants) await refetchApplicants()
    } catch (error) {
      console.error('Error suspending applicant:', error)
      showToast('Failed to suspend applicant', 'error', 'bi bi-hand-thumbsdown')
    }
  }

  const handleView = (id) => {
    navigate(`/admin/applicants/${id}`)
    setOpenMenu(null)
  }

  const handleMenuToggle = (id) => {
    if (openMenu === id) {
      setOpenMenu(null)
    } else {
      const button = menuRefs.current[id]
      if (button) {
        const rect = button.getBoundingClientRect()
        setDropdownPos({
          top: rect.bottom + 4,
          left: rect.left - 140
        })
      }
      setOpenMenu(id)
    }
  }

  return (
    <div className="applicants-page">
      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onCancel={confirmModal.onCancel}
          confirmText={confirmModal.confirmText}
          cancelText={confirmModal.cancelText}
          isDangerous={confirmModal.isDangerous}
        />
      )}
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1>Applicants</h1>
          <p>Manage campus ambassador applications</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search applicants by name, email, or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-count">
        Showing <strong>{paginatedApplicants.length}</strong> of <strong>{sortedApplicants.length}</strong> applicant{sortedApplicants.length !== 1 ? 's' : ''}
      </div>

      {/* Table */}
      <div className="applicants-table-wrapper">
        <table className="applicants-table-full">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input type="checkbox" />
              </th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>COURSE</th>
              <th>INSTITUTION</th>
              <th>LEVEL</th>
              <th>CITY</th>
              <th>DATE APPLIED</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApplicants.length > 0 ? (
              paginatedApplicants.map((applicant) => (
                <tr key={applicant.id}>
                  <td className="checkbox-col">
                    <input type="checkbox" />
                  </td>
                  <td className="name-cell">
                    <div className="name-cell-content">
                      <div className="cell-avatar">
                        <i className="bi bi-person-circle"></i>
                      </div>
                      <span>{applicant.name}</span>
                    </div>
                  </td>
                  <td className="email-cell">{applicant.email}</td>
                  <td>{applicant.courseOfStudy || 'N/A'}</td>
                  <td>{applicant.institution || 'N/A'}</td>
                  <td>{applicant.level || 'N/A'}</td>
                  <td>{applicant.city || 'N/A'}</td>
                  <td>{applicant.createdAt?.toDate?.().toLocaleDateString() || 'N/A'}</td>
                  <td>
                    <div className="status-cell">
                      <div className={`status-indicator ${applicant.status?.toLowerCase() || 'pending'}`}></div>
                      <span className={`status-badge ${applicant.status?.toLowerCase()}`}>
                        {applicant.status || 'PENDING'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="action-menu-container">
                      <button
                        ref={(el) => (menuRefs.current[applicant.id] = el)}
                        className="btn-menu-toggle"
                        onClick={() => handleMenuToggle(applicant.id)}
                        title="More actions"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      {openMenu === applicant.id && (
                        <div
                          className="action-menu-dropdown"
                          style={{
                            top: `${dropdownPos.top}px`,
                            left: `${dropdownPos.left}px`
                          }}
                        >
                          <button
                            className="menu-item view"
                            onClick={() => handleView(applicant.id)}
                            title="View Details"
                          >
                            <i className="bi bi-eye"></i> View
                          </button>
                          <button
                            className="menu-item approve"
                            onClick={() => handleApprove(applicant.id)}
                            title="Approve"
                          >
                            <i className="bi bi-check-circle"></i> Approve
                          </button>
                          <button
                            className="menu-item reject"
                            onClick={() => handleReject(applicant.id)}
                            title="Reject"
                          >
                            <i className="bi bi-x-circle"></i> Reject
                          </button>
                          <button
                            className="menu-item suspend"
                            onClick={() => handleSuspend(applicant.id)}
                            title="Suspend"
                          >
                            <i className="bi bi-hand-thumbsdown"></i> Suspend
                          </button>
                          <button
                            className="menu-item delete"
                            onClick={() => handleDelete(applicant.id)}
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="no-data-row">
                  <p>No applicants found matching your criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sortedApplicants.length > 0 && (
        <div className="pagination">
          <button
            className="btn-pagination"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            <i className="bi bi-chevron-left"></i> Previous
          </button>
          <span className="pagination-info">Page {currentPage} of {totalPages}</span>
          <button
            className="btn-pagination"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            Next <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default Applicants

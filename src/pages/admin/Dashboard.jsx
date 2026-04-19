import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Line, Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { doc, updateDoc, deleteDoc, collection, getDocs, query, orderBy, addDoc, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import ConfirmModal from '../../components/ConfirmModal'
import '../../styles/Dashboard.css'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement)

const Dashboard = ({ applicants = [], refetchApplicants }) => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [stats, setStats] = useState({
    totalApplicants: 0,
    pendingReview: 0,
    approvedAmbassadors: 0,
    rejectedApplications: 0,
    growthRate: 12.4
  })
  const [openMenu, setOpenMenu] = useState(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 })
  const [confirmModal, setConfirmModal] = useState(null)
  const menuRefs = useRef({})

  // Fetch campaigns with real-time listener
  useEffect(() => {
    console.log('Setting up Dashboard campaigns listener...')
    const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        console.log('Dashboard campaigns snapshot received, docs count:', querySnapshot.docs.length)
        const campaignsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCampaigns(campaignsData)
      } catch (error) {
        console.error('Error processing Dashboard campaigns:', error)
      }
    }, (error) => {
      console.error('Error listening to Dashboard campaigns:', error)
    })

    return () => {
      console.log('Unsubscribing from Dashboard campaigns listener')
      unsubscribe()
    }
  }, [])

  const handleCampaignInputChange = (e) => {
    const { name, value } = e.target
    setCampaignFormData(prev => ({
      ...prev,
      [name]: name === 'ambassadors' ? parseInt(value) || 0 : value
    }))
  }

  const handleCampaignSubmit = async (e) => {
    e.preventDefault()

    if (!campaignFormData.title || !campaignFormData.description || !campaignFormData.date) {
      showToast('Please fill in all required fields', 'error', 'bi bi-exclamation-circle')
      return
    }

    try {
      if (editingCampaignId) {
        await updateDoc(doc(db, 'campaigns', editingCampaignId), {
          ...campaignFormData,
          updatedAt: new Date()
        })
        showToast('Campaign updated successfully!', 'success', 'bi bi-check-circle')
      } else {
        await addDoc(collection(db, 'campaigns'), {
          ...campaignFormData,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        showToast('Campaign created successfully!', 'success', 'bi bi-check-circle')
      }

      setCampaignFormData({
        title: '',
        description: '',
        status: 'active',
        date: '',
        ambassadors: ''
      })
      setEditingCampaignId(null)
      setShowCampaignForm(false)
      await fetchCampaigns()
    } catch (error) {
      console.error('Error saving campaign:', error)
      showToast('Failed to save campaign', 'error', 'bi bi-exclamation-circle')
    }
  }

  const handleEditCampaign = (campaign) => {
    setCampaignFormData({
      title: campaign.title,
      description: campaign.description,
      status: campaign.status,
      date: campaign.date,
      ambassadors: campaign.ambassadors || ''
    })
    setEditingCampaignId(campaign.id)
    setShowCampaignForm(true)
    setOpenCampaignMenu(null)
  }

  const handleDeleteCampaign = (id) => {
    setConfirmModal({
      title: 'Delete Campaign',
      message: 'Are you sure you want to delete this campaign? This will be removed from the public campus ambassador page.',
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
      onCancel: () => setConfirmModal(null),
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true
    })
    setOpenCampaignMenu(null)
  }

  const handleCampaignCancel = () => {
    setShowCampaignForm(false)
    setEditingCampaignId(null)
    setCampaignFormData({
      title: '',
      description: '',
      status: 'active',
      date: '',
      ambassadors: ''
    })
  }

  const toggleCampaignMenu = (id, event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setDropdownPos({
      top: rect.bottom + 4,
      left: rect.left - 130
    })
    setOpenCampaignMenu(openCampaignMenu === id ? null : id)
  }

  // Calculate stats from applicants data
  useEffect(() => {
    if (applicants && applicants.length > 0) {
      const total = applicants.length
      const pending = applicants.filter(a => !a.status || a.status.toLowerCase() === 'pending').length
      const approved = applicants.filter(a => a.status && a.status.toLowerCase() === 'approved').length
      const rejected = applicants.filter(a => a.status && a.status.toLowerCase() === 'rejected').length
      const growthRate = total > 0 ? ((approved / total) * 100).toFixed(1) : 0

      setStats(prev => ({
        ...prev,
        totalApplicants: total,
        pendingReview: pending,
        approvedAmbassadors: approved,
        rejectedApplications: rejected,
        growthRate: parseFloat(growthRate)
      }))
    }
  }, [applicants])

  // Generate last 10 days labels
  const getLast10DaysLabels = () => {
    const labels = []
    for (let i = 9; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
    }
    return labels
  }

  // Generate data points for last 10 days (proportional to total applicants)
  const getLast10DaysData = () => {
    const data = []
    for (let i = 0; i < 10; i++) {
      const proportion = (i + 1) / 10
      data.push(Math.max(1, Math.round(stats.totalApplicants * proportion)))
    }
    return data
  }

  // Line Chart Data - Application Trends
  const lineChartData = {
    labels: getLast10DaysLabels(),
    datasets: [
      {
        label: 'Applications',
        data: getLast10DaysData(),
        borderColor: '#1E844F',
        backgroundColor: 'rgba(30, 132, 79, 0.05)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: '#1E844F',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2
      }
    ]
  }

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  }

  // Doughnut Chart Data - Status Distribution
  const doughnutChartData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        data: [stats.approvedAmbassadors, stats.pendingReview, stats.rejectedApplications],
        backgroundColor: ['#1E844F', '#FDB913', '#E8E8E8'],
        borderColor: '#ffffff',
        borderWidth: 2
      }
    ]
  }

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          padding: 15,
          font: {
            size: 11
          }
        }
      }
    }
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
          left: rect.left - 130
        })
      }
      setOpenMenu(id)
    }
  }

  const handleApprove = async (id) => {
    try {
      await updateDoc(doc(db, 'applicants', id), {
        status: 'approved'
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
        status: 'rejected'
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
      showToast('Failed to suspend applicant', 'error', 'bi bi-hand-thumbsdown')
    }
  }

  const handleExportData = () => {
    if (!applicants || applicants.length === 0) {
      showToast('No applicants to export', 'warning', 'bi bi-exclamation-circle')
      return
    }

    try {
      // Prepare data for export
      const exportData = applicants.map(applicant => ({
        'Name': applicant.name || 'N/A',
        'Email': applicant.email || 'N/A',
        'Institution': applicant.institution || 'N/A',
        'Course of Study': applicant.courseOfStudy || 'N/A',
        'Level': applicant.level || 'N/A',
        'City': applicant.city || 'N/A',
        'Year of Graduation': applicant.yearOfGraduation || 'N/A',
        'Status': applicant.status || 'PENDING',
        'CV URL': applicant.cvUrl || 'N/A',
        'Application Date': applicant.createdAt?.toDate?.()?.toLocaleString() || 'N/A',
        'Notes': applicant.notes || 'N/A'
      }))

      // Convert to CSV
      const headers = Object.keys(exportData[0])
      const csvContent = [
        headers.join(','),
        ...exportData.map(row =>
          headers.map(header =>
            // Escape CSV fields that contain commas or quotes
            typeof row[header] === 'string' && (row[header].includes(',') || row[header].includes('"'))
              ? `"${row[header].replace(/"/g, '""')}"`
              : row[header]
          ).join(',')
        )
      ].join('\n')

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `lexi-ai-applicants-${new Date().toISOString().split('T')[0]}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      showToast(`Exported ${applicants.length} applicants successfully!`, 'success', 'bi bi-check-circle')
    } catch (error) {
      showToast('Failed to export data', 'error', 'bi bi-x-circle')
    }
  }

  const handleView = (id) => {
    navigate(`/admin/applicants/${id}`)
    setOpenMenu(null)
  }

  return (
    <div className="dashboard">
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
      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h1>Dashboard Overview</h1>
          <p>Monitoring the Lexi AI ambassador ecosystem.</p>
        </div>
        <div className="header-actions">
          <button className="btn-export" onClick={handleExportData}>
            <i className="bi bi-download"></i> Export Data
          </button>
          <button className="btn-invite">
            <i className="bi bi-plus-circle"></i> Invite New Ambassador
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {/* Total Applicants Card */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">TOTAL APPLICANTS</span>
          </div>
          <div className="stat-value">{stats.totalApplicants.toLocaleString()}</div>
          <div className="stat-growth positive">
            <i className="bi bi-arrow-up"></i>
            <span>+{stats.growthRate}%</span>
          </div>
        </div>

        {/* Pending Review Card */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">PENDING REVIEW</span>
            <i className="bi bi-clock-history stat-icon"></i>
          </div>
          <div className="stat-value">{stats.pendingReview}</div>
          <small className="stat-meta">24h turnaround goal</small>
        </div>

        {/* Approved Applicants Card */}
        <div className="stat-card highlight-green">
          <div className="stat-header">
            <span className="stat-label">APPROVED APPLICANTS</span>
            <i className="bi bi-check-circle stat-icon"></i>
          </div>
          <div className="stat-value">{stats.approvedAmbassadors}</div>
          <small className="stat-meta">Active ambassadors</small>
        </div>

        {/* Rejected Applicants Card */}
        <div className="stat-card">
          <div className="stat-header">
            <span className="stat-label">REJECTED APPLICANTS</span>
            <i className="bi bi-x-circle stat-icon"></i>
          </div>
          <div className="stat-value">{stats.rejectedApplications}</div>
          <small className="stat-meta">Not qualified</small>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Application Trends Chart */}
        <div className="chart-card">
          <h3>Application Trends</h3>
          <p className="chart-subtitle">Daily submissions for the last 30 days</p>
          <div className="chart-container">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Status Distribution Chart */}
        <div className="chart-card">
          <h3>Status Distribution</h3>
          <div className="chart-container-small">
            <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
          </div>
          <div className="chart-stats">
            <div className="chart-stat-item">
              <span className="stat-dot approved"></span>
              <span className="stat-text">Approved</span>
              <span className="stat-percentage">{stats.totalApplicants > 0 ? ((stats.approvedAmbassadors / stats.totalApplicants) * 100).toFixed(1) : 0}%</span>
            </div>
            <div className="chart-stat-item">
              <span className="stat-dot pending"></span>
              <span className="stat-text">Pending</span>
              <span className="stat-percentage">{stats.totalApplicants > 0 ? ((stats.pendingReview / stats.totalApplicants) * 100).toFixed(1) : 0}%</span>
            </div>
            <div className="chart-stat-item">
              <span className="stat-dot rejected"></span>
              <span className="stat-text">Rejected</span>
              <span className="stat-percentage">{stats.totalApplicants > 0 ? ((stats.rejectedApplications / stats.totalApplicants) * 100).toFixed(1) : 0}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applicants Section */}
      <div className="recent-applicants">
        <div className="section-header">
          <h3>Recent Applicants</h3>
          <a href="/admin/applicants" className="view-all-link">View All Applications</a>
        </div>

        <div className="table-responsive">
          <table className="applicants-table-full">
            <thead>
              <tr>
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
              {applicants && applicants.length > 0 ? (
                applicants.slice(0, 3).map((applicant) => (
                  <tr key={applicant.id}>
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
                              title="View Details">
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
                  <td colSpan="5" className="text-center py-3">No applicants found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

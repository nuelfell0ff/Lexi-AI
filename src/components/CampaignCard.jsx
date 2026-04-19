import React from 'react'
import '../styles/CampaignCard.css'

const CampaignCard = ({ campaign }) => {
  const getStatusColor = (status) => {
    if (status === 'Active') return '#1E844F'
    if (status === 'Completed') return '#194066'
    return '#999999'
  }

  return (
    <div className="campaign-card">
      <div className="campaign-header">
        <h3 className="campaign-title">{campaign.title}</h3>
        <span className="campaign-badge" style={{ backgroundColor: getStatusColor(campaign.status) }}>
          {campaign.status}
        </span>
      </div>
      <p className="campaign-description">{campaign.description}</p>
      <div className="campaign-meta">
        <span className="meta-item">
          <i className="bi bi-calendar-event"></i>
          {campaign.date}
        </span>
        <span className="meta-item">
          <i className="bi bi-people-fill"></i>
          {campaign.ambassadors} ambassadors
        </span>
      </div>
      <button className="campaign-btn">Learn More</button>
    </div>
  )
}

export default CampaignCard

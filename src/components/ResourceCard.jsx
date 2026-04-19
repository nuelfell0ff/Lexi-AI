import React from 'react'
import '../styles/ResourceCard.css'

const ResourceCard = ({ resource }) => {
  return (
    <div className="resource-card">
      <div className="resource-icon">
        <i className={`bi ${resource.icon}`}></i>
      </div>
      <h3 className="resource-title">{resource.title}</h3>
      <p className="resource-description">{resource.description}</p>
      <a href={resource.link} className="resource-link">
        {resource.linkText}
        <i className="bi bi-arrow-right"></i>
      </a>
    </div>
  )
}

export default ResourceCard

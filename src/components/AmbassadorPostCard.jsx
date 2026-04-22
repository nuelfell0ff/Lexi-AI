import React from 'react'
import '../styles/AmbassadorPostCard.css'

const AmbassadorPostCard = ({ post, showDeleteBtn = false, onDelete = null, showRepresentativeLabel = false }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id)
    }
  }

  return (
    <div className="ambassador-post-card">
      <div className="post-image-container">
        {post.image ? (
          <img src={post.image} alt={post.name} className="post-image" />
        ) : (
          <div className="post-image-placeholder">
            <i className="bi bi-person-circle"></i>
          </div>
        )}
        {showDeleteBtn && onDelete && (
          <button className="delete-post-btn" onClick={handleDelete}>
            <i className="bi bi-trash"></i>
          </button>
        )}
      </div>
      <div className="post-content">
        <h3 className="post-name">{post.name}</h3>
        <p className="post-institution">{post.institution}{showRepresentativeLabel ? ' representative' : ''}</p>
        <p className="post-course">{post.courseOfStudy}</p>
        <div className="post-meta">
          <span className="post-level">{post.level}</span>
          {post.email && (
            <a href={`mailto:${post.email}`} className="post-email">
              <i className="bi bi-envelope"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default AmbassadorPostCard

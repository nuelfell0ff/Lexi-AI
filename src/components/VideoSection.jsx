import React from 'react'
import './VideoSection.css'

const VideoSection = () => {
  return (
    <div className="video-section">
      <div className="video-container">
        <iframe
          className="video-player"
          width="100%"
          height="auto"
          src="https://www.youtube.com/embed/OcLQkeyNK4c"
          title="Lexi AI Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  )
}

export default VideoSection

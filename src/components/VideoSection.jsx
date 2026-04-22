import React from 'react'
import './VideoSection.css'
import videoFile from '../assets/lv_0_20260420235727.mp4'

const VideoSection = () => {
  return (
    <div className="video-section">
      <div className="video-container">
        <video
          className="video-player"
          controls
          width="100%"
          height="auto"
        >
          <source src={videoFile} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}

export default VideoSection

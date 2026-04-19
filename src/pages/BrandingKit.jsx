import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './BrandingKit.css'

const BrandingKit = () => {
  const [copiedItem, setCopiedItem] = useState(null)

  const downloadLogo = (filename) => {
    const link = document.createElement('a')
    link.href = `/src/assets/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const colorPalette = [
    { name: 'Primary Green', hex: '#1E844F', rgb: 'rgb(30, 132, 79)' },
    { name: 'Primary Blue', hex: '#194066', rgb: 'rgb(25, 64, 102)' },
    { name: 'Light Background', hex: '#f8f9fa', rgb: 'rgb(248, 249, 250)' },
    { name: 'Text Dark', hex: '#333333', rgb: 'rgb(51, 51, 51)' },
    { name: 'Border Color', hex: '#e0e0e0', rgb: 'rgb(224, 224, 224)' }
  ]

  const logoVariants = [
    {
      id: 1,
      type: 'Full Logo',
      filename: 'Lexi-Ai-No-bg.png',
      description: 'Complete logo with text - use for main branding',
      usage: 'Headers, landing pages, official documents'
    },
    {
      id: 2,
      type: 'Icon Only',
      filename: 'logo-2.png',
      description: 'Icon version - compact and versatile',
      usage: 'Favicons, app icons, social media profiles'
    },
    {
      id: 3,
      type: 'Lexi AI with Bot',
      filename: 'Lexi-ai-bot-no-bg.png',
      description: 'Logo with AI bot mascot',
      usage: 'Marketing materials, presentations, social media'
    },
    {
      id: 4,
      type: 'Lexi AI White',
      filename: 'Lexi-Ai-Deep-Blue-t-shirt-1.png',
      description: 'White variant for dark backgrounds',
      usage: 'Dark backgrounds, merchandise, branded materials'
    }
  ]

  const fonts = [
    { name: 'Primary Font', family: 'Poppins', usage: 'Headings & CTAs' },
    { name: 'Secondary Font', family: 'Inter', usage: 'Body text & labels' }
  ]

  const handleCopyColor = (hex) => {
    navigator.clipboard.writeText(hex)
    setCopiedItem(hex)
    setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <>
      <Navbar />
      <div className="branding-kit">
        {/* Header Section */}
        <section className="branding-header">
          <div className="branding-container">
            <h1 className="branding-title">Lexi AI Branding Kit</h1>
            <p className="branding-subtitle">
              Comprehensive guidelines for using the Lexi AI brand across all marketing materials and communications
            </p>
          </div>
        </section>

        {/* Color Palette Section */}
        <section className="branding-section">
          <div className="branding-container">
            <div className="section-header">
              <h2 className="section-title">Color Palette</h2>
              <p className="section-description">Our carefully selected color scheme reflects our commitment to healthcare excellence</p>
            </div>

            <div className="colors-grid">
              {colorPalette.map((color, index) => (
                <div
                  key={index}
                  className="color-card"
                  onClick={() => handleCopyColor(color.hex)}
                  title="Click to copy hex code"
                >
                  <div className="color-box" style={{ backgroundColor: color.hex }}></div>
                  <div className="color-details">
                    <h3 className="color-name">{color.name}</h3>
                    <p className="color-hex">{color.hex}</p>
                    <p className="color-rgb">{color.rgb}</p>
                    {copiedItem === color.hex && (
                      <p className="copy-feedback"><i className="bi bi-check"></i> Copied!</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Variants Section */}
        <section className="branding-section alternate-bg">
          <div className="branding-container">
            <div className="section-header">
              <h2 className="section-title">Logo Variants</h2>
              <p className="section-description">Choose the right logo format for your use case</p>
            </div>

            <div className="logos-grid">
              {logoVariants.map((variant) => (
                <div key={variant.id} className="logo-card">
                  <div className="logo-preview">
                    <img
                      src={`/src/assets/${variant.filename}`}
                      alt={variant.type}
                      className="logo-image"
                      onError={(e) => {
                        e.target.alt = `Logo file: ${variant.filename}`
                      }}
                    />
                  </div>
                  <div className="logo-info">
                    <h3 className="logo-type">{variant.type}</h3>
                    <p className="logo-desc">{variant.description}</p>
                    <div className="logo-usage">
                      <span className="usage-label">Usage:</span>
                      <p>{variant.usage}</p>
                    </div>
                    <div className="logo-filename">
                      <code>{variant.filename}</code>
                    </div>
                    <button
                      className="download-btn"
                      onClick={() => downloadLogo(variant.filename)}
                    >
                      <i className="bi bi-download"></i>
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography Section */}
        <section className="branding-section">
          <div className="branding-container">
            <div className="section-header">
              <h2 className="section-title">Typography</h2>
              <p className="section-description">Maintain visual hierarchy with our approved font families</p>
            </div>

            <div className="typography-grid">
              {fonts.map((font, index) => (
                <div key={index} className="font-card">
                  <div className="font-preview" style={{ fontFamily: font.family }}>
                    Aa
                  </div>
                  <div className="font-info">
                    <h3 className="font-name">{font.name}</h3>
                    <p className="font-family">{font.family}</p>
                    <p className="font-usage">Usage: {font.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Brand Guidelines Section */}
        <section className="branding-section alternate-bg">
          <div className="branding-container">
            <div className="section-header">
              <h2 className="section-title">Design Guidelines</h2>
              <p className="section-description">Core design principles for maintaining brand consistency</p>
            </div>

            <div className="guidelines-grid">
              <div className="guideline-card">
                <div className="guideline-icon">
                  <i className="bi bi-rulers"></i>
                </div>
                <h3 className="guideline-title">Logo Spacing</h3>
                <p className="guideline-description">Always maintain minimum clear space around the logo. Never distort or stretch logos.</p>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">
                  <i className="bi bi-palette"></i>
                </div>
                <h3 className="guideline-title">Color Usage</h3>
                <p className="guideline-description">Use official colors only. Do not alter saturation or brightness without approval.</p>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">
                  <i className="bi bi-type"></i>
                </div>
                <h3 className="guideline-title">Typography</h3>
                <p className="guideline-description">Use approved fonts (Poppins primary, Inter secondary). Maintain hierarchy and readability.</p>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">
                  <i className="bi bi-image"></i>
                </div>
                <h3 className="guideline-title">Imagery</h3>
                <p className="guideline-description">Use healthcare-focused, diverse, and professional images that align with our values.</p>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">
                  <i className="bi bi-chat-left-quote"></i>
                </div>
                <h3 className="guideline-title">Tone & Voice</h3>
                <p className="guideline-description">Be professional, trustworthy, innovative, and accessible in all communications.</p>
              </div>

              <div className="guideline-card">
                <div className="guideline-icon">
                  <i className="bi bi-check-circle"></i>
                </div>
                <h3 className="guideline-title">Consistency</h3>
                <p className="guideline-description">Follow brand guidelines across all platforms to maintain a strong, recognizable brand.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Do's and Don'ts Section */}
        <section className="branding-section">
          <div className="branding-container">
            <div className="section-header">
              <h2 className="section-title">Do's and Don'ts</h2>
              <p className="section-description">Best practices for using the Lexi AI brand</p>
            </div>

            <div className="dos-donts-grid">
              <div className="dos-card">
                <h3><i className="bi bi-check-circle"></i> DO</h3>
                <ul>
                  <li>✓ Use logos on light backgrounds when possible</li>
                  <li>✓ Maintain minimum spacing around logos</li>
                  <li>✓ Use brand colors consistently across platforms</li>
                  <li>✓ Follow typography hierarchy</li>
                  <li>✓ Use the official color palette provided</li>
                </ul>
              </div>

              <div className="donts-card">
                <h3><i className="bi bi-x-circle"></i> DON'T</h3>
                <ul>
                  <li>✗ Distort, rotate, or stretch logos</li>
                  <li>✗ Change brand colors without approval</li>
                  <li>✗ Use unapproved fonts or typefaces</li>
                  <li>✗ Place logos on busy or complex backgrounds</li>
                  <li>✗ Mix different logo variants randomly</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      </div>
      <Footer />
    </>
  )
}

export default BrandingKit

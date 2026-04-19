import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './SocialMediaAssets.css'

const SocialMediaAssets = () => {
    const [copiedItem, setCopiedItem] = useState(null)

    const downloadTemplate = (filename) => {
        const link = document.createElement('a')
        link.href = `/src/assets/${filename}`
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const platformGuides = [
        {
            id: 1,
            platform: 'Instagram',
            icon: 'bi-instagram',
            recommendedDimensions: '1080 x 1080px (posts)',
            bestTimes: '9 AM - 3 PM',
            tips: 'Use stories and reels for higher engagement. Post 3-4 times per week.',
            hashtags: '#LexiAI #HealthTech #DigitalHealth #MedicalInnovation'
        },
        {
            id: 2,
            platform: 'Twitter/X',
            icon: 'bi-twitter',
            recommendedDimensions: '1200 x 675px (images)',
            bestTimes: '8 AM - 10 PM',
            tips: 'Keep tweets concise and engaging. Use relevant hashtags and mentions.',
            hashtags: '#LexiAI #HealthTech #AI #Healthcare'
        },
        {
            id: 3,
            platform: 'LinkedIn',
            icon: 'bi-linkedin',
            recommendedDimensions: '1200 x 627px (posts)',
            bestTimes: '7 AM - 4 PM (Weekdays)',
            tips: 'Share thought leadership and company updates. Engage with professional content.',
            hashtags: '#LexiAI #HealthTech #Innovation #Healthcare'
        },
        {
            id: 4,
            platform: 'TikTok',
            icon: 'bi-play-circle',
            recommendedDimensions: '1080 x 1920px (videos)',
            bestTimes: '6 AM - 10 PM',
            tips: 'Create short, engaging videos. Participate in trends and challenges.',
            hashtags: '#LexiAI #HealthTech #TechInnovation'
        },
        {
            id: 5,
            platform: 'Facebook',
            icon: 'bi-facebook',
            recommendedDimensions: '1200 x 628px (posts)',
            bestTimes: '1 PM - 3 PM',
            tips: 'Share longer-form content and community stories. Encourage discussions.',
            hashtags: '#LexiAI #HealthTech #Community #Healthcare'
        },
        {
            id: 6,
            platform: 'YouTube',
            icon: 'bi-youtube',
            recommendedDimensions: '1280 x 720px (thumbnails)',
            bestTimes: 'Tuesday - Thursday 2 PM',
            tips: 'Create educational and product demo videos. Aim for 5-15 minute videos.',
            hashtags: '#LexiAI #HealthTech #Tutorial #Educational'
        }
    ]

    const postTemplates = [
        {
            id: 1,
            title: 'Product Highlight Post',
            description: 'Showcase a key feature or benefit of Lexi AI',
            template: '🚀 Introducing [Feature Name]\n\nLexi AI is revolutionizing healthcare with [brief benefit]. Learn how it can transform your health journey!\n\n[Call-to-action]\n\n#LexiAI #HealthTech',
            category: 'Product'
        },
        {
            id: 2,
            title: 'Educational Health Tip',
            description: 'Share valuable health information',
            template: '💡 Did you know?\n\n[Health fact or tip]\n\nLexi AI helps you [related benefit]. Download the app today!\n\n#HealthTips #LexiAI #Wellness',
            category: 'Education'
        },
        {
            id: 3,
            title: 'Ambassador Spotlight',
            description: 'Feature a campus ambassador or team member',
            template: '🌟 Meet our Ambassador!\n\nName: [Name]\nUniversity: [University]\n\n"[Quote about their experience with Lexi AI]"\n\nJoin our growing community of health advocates!\n\n#LexiAI #CampusAmbassador',
            category: 'Community'
        },
        {
            id: 4,
            title: 'User Success Story',
            description: 'Share a testimonial or success story',
            template: '📱 Success Story\n\n[User name] shares: "[Their story and results]"\n\nTransform your health journey with Lexi AI. Available on iOS and Android!\n\n#LexiAI #HealthJourney #Success',
            category: 'Testimonial'
        },
        {
            id: 5,
            title: 'Event Announcement',
            description: 'Promote webinars, campaigns, or events',
            template: '📅 Save the Date!\n\n[Event Name]\nDate: [Date]\nTime: [Time]\n\nJoin us as we discuss [topic]. Register now!\n\n[Link]\n\n#LexiAI #Event #HealthTech',
            category: 'Events'
        },
        {
            id: 6,
            title: 'Industry News Commentary',
            description: 'Share thoughts on healthcare news',
            template: '📰 Industry Insight\n\n[News headline/topic]\n\nAt Lexi AI, we believe [your perspective]. Here\'s how we\'re making a difference:\n\n[2-3 key points]\n\n#HealthTech #Innovation #LexiAI',
            category: 'News'
        }
    ]

    const contentCalendarTemplates = [
        { day: 'Monday', content: 'Motivational Health Tips', example: '#MotivationMonday - Share wellness tips' },
        { day: 'Tuesday', content: 'Product Features', example: 'Highlight a Lexi AI feature' },
        { day: 'Wednesday', content: 'Educational Content', example: 'Share health education or tutorial' },
        { day: 'Thursday', content: 'Community Spotlight', example: 'Feature ambassadors or users' },
        { day: 'Friday', content: 'Weekend Health Tips', example: 'Wellness tips for the weekend' },
        { day: 'Saturday', content: 'User Content/Testimonials', example: 'Share user stories or testimonials' },
        { day: 'Sunday', content: 'Reflections & Next Week Preview', example: 'Week recap and upcoming announcements' }
    ]

    const hashtagCategories = [
        {
            category: 'Brand',
            tags: ['#LexiAI', '#LexiAICommunity', '#TeamLexiAI']
        },
        {
            category: 'Healthcare',
            tags: ['#HealthTech', '#DigitalHealth', '#HealthcareInnovation', '#MedicalTechnology']
        },
        {
            category: 'Wellness',
            tags: ['#Wellness', '#HealthJourney', '#WellnessMatters', '#HealthyLiving']
        },
        {
            category: 'Technology',
            tags: ['#AI', '#ArtificialIntelligence', '#TechInnovation', '#MobileHealth']
        },
        {
            category: 'Community',
            tags: ['#CampusAmbassador', '#Community', '#Healthcare', '#MentalHealth']
        }
    ]

    const designSpecs = [
        {
            id: 1,
            element: 'Post Caption',
            specs: '125-150 characters optimal, up to 300 for better reach',
            example: 'Use clear, compelling language with 1-2 emojis'
        },
        {
            id: 2,
            element: 'Hashtags Per Post',
            specs: 'Instagram: 20-30 | Twitter: 2-3 | LinkedIn: 3-5',
            example: 'Mix popular and niche hashtags for better visibility'
        },
        {
            id: 3,
            element: 'Image Quality',
            specs: 'Minimum 1200x800px, high resolution (72 DPI+)',
            example: 'Use Lexi AI brand colors for consistency'
        },
        {
            id: 4,
            element: 'Video Length',
            specs: 'Instagram: 15-60 sec | TikTok: 15-60 sec | YouTube: 5-15 min',
            example: 'Keep the first 3 seconds engaging to reduce drop-off'
        },
        {
            id: 5,
            element: 'Posting Frequency',
            specs: 'Instagram: 3-5x/week | Twitter: 1-3x/day | LinkedIn: 1x/day',
            example: 'Maintain consistency for better algorithm performance'
        }
    ]

    const handleCopyHashtag = (hashtag) => {
        navigator.clipboard.writeText(hashtag)
        setCopiedItem(hashtag)
        setTimeout(() => setCopiedItem(null), 2000)
    }

    return (
        <>
            <Navbar />
            <div className="social-media-assets">
                {/* Header Section */}
                <section className="assets-header">
                    <div className="assets-container">
                        <h1 className="assets-title">Social Media Assets</h1>
                        <p className="assets-subtitle">
                            Complete toolkit for maximizing Lexi AI's presence across all social media platforms
                        </p>
                    </div>
                </section>

                {/* Platform Guides Section */}
                <section className="assets-section">
                    <div className="assets-container">
                        <div className="section-header">
                            <h2 className="section-title">Platform Guidelines</h2>
                            <p className="section-description">Optimized strategies and dimensions for each platform</p>
                        </div>

                        <div className="platforms-grid">
                            {platformGuides.map((platform) => (
                                <div key={platform.id} className="platform-card">
                                    <div className="platform-icon">
                                        <i className={`bi ${platform.icon}`}></i>
                                    </div>
                                    <h3 className="platform-name">{platform.platform}</h3>
                                    <div className="platform-details">
                                        <div className="detail-item">
                                            <span className="detail-label">Dimensions:</span>
                                            <span className="detail-value">{platform.recommendedDimensions}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Best Time:</span>
                                            <span className="detail-value">{platform.bestTimes}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Tips:</span>
                                            <span className="detail-value">{platform.tips}</span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">Hashtags:</span>
                                            <span className="detail-value">{platform.hashtags}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Post Templates Section */}
                <section className="assets-section alternate-bg">
                    <div className="assets-container">
                        <div className="section-header">
                            <h2 className="section-title">Post Templates</h2>
                            <p className="section-description">Ready-to-use templates for different content types</p>
                        </div>

                        <div className="templates-grid">
                            {postTemplates.map((template) => (
                                <div key={template.id} className="template-card">
                                    <div className="template-header">
                                        <h3 className="template-title">{template.title}</h3>
                                        <span className="template-category">{template.category}</span>
                                    </div>
                                    <p className="template-description">{template.description}</p>
                                    <div className="template-content">
                                        <pre className="template-text">{template.template}</pre>
                                    </div>
                                    <button
                                        className="copy-template-btn"
                                        onClick={() => {
                                            navigator.clipboard.writeText(template.template)
                                            setCopiedItem(template.id)
                                            setTimeout(() => setCopiedItem(null), 2000)
                                        }}
                                    >
                                        <i className="bi bi-clipboard"></i>
                                        {copiedItem === template.id ? 'Copied!' : 'Copy Template'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Content Calendar Section */}
                <section className="assets-section">
                    <div className="assets-container">
                        <div className="section-header">
                            <h2 className="section-title">Content Calendar Guide</h2>
                            <p className="section-description">Suggested weekly posting schedule to maintain consistency</p>
                        </div>

                        <div className="calendar-grid">
                            {contentCalendarTemplates.map((item, index) => (
                                <div key={index} className="calendar-card">
                                    <div className="calendar-day">{item.day}</div>
                                    <div className="calendar-content">
                                        <h4 className="calendar-title">{item.content}</h4>
                                        <p className="calendar-example">{item.example}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Hashtag Library Section */}
                <section className="assets-section alternate-bg">
                    <div className="assets-container">
                        <div className="section-header">
                            <h2 className="section-title">Hashtag Library</h2>
                            <p className="section-description">Curated hashtags for maximum reach and engagement (click to copy)</p>
                        </div>

                        <div className="hashtags-section">
                            {hashtagCategories.map((cat, index) => (
                                <div key={index} className="hashtag-category">
                                    <h3 className="hashtag-category-title">{cat.category}</h3>
                                    <div className="hashtags-list">
                                        {cat.tags.map((tag, tagIndex) => (
                                            <button
                                                key={tagIndex}
                                                className="hashtag-btn"
                                                onClick={() => handleCopyHashtag(tag)}
                                                title="Click to copy"
                                            >
                                                {tag}
                                                {copiedItem === tag && <i className="bi bi-check"></i>}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Design Specifications Section */}
                <section className="assets-section">
                    <div className="assets-container">
                        <div className="section-header">
                            <h2 className="section-title">Design Specifications</h2>
                            <p className="section-description">Technical requirements for optimal social media presence</p>
                        </div>

                        <div className="specs-grid">
                            {designSpecs.map((spec) => (
                                <div key={spec.id} className="spec-card">
                                    <h3 className="spec-title">{spec.element}</h3>
                                    <p className="spec-details">{spec.specs}</p>
                                    <div className="spec-example">
                                        <strong>Best Practice:</strong> {spec.example}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Best Practices Section */}
                <section className="assets-section alternate-bg">
                    <div className="assets-container">
                        <div className="section-header">
                            <h2 className="section-title">Social Media Best Practices</h2>
                            <p className="section-description">Proven strategies for maximum engagement</p>
                        </div>

                        <div className="best-practices">
                            <div className="practices-grid">
                                <div className="practice-card">
                                    <div className="practice-icon">
                                        <i className="bi bi-chat-dots"></i>
                                    </div>
                                    <h3>Engage Authentically</h3>
                                    <p>Respond to comments and messages within 24 hours. Build genuine relationships with your audience.</p>
                                </div>
                                <div className="practice-card">
                                    <div className="practice-icon">
                                        <i className="bi bi-image"></i>
                                    </div>
                                    <h3>Use High-Quality Visuals</h3>
                                    <p>Always use professional images and videos. Ensure consistency with Lexi AI brand colors and style.</p>
                                </div>
                                <div className="practice-card">
                                    <div className="practice-icon">
                                        <i className="bi bi-heart"></i>
                                    </div>
                                    <h3>Tell Stories</h3>
                                    <p>Share user success stories, ambassador journeys, and behind-the-scenes content to build emotional connections.</p>
                                </div>
                                <div className="practice-card">
                                    <div className="practice-icon">
                                        <i className="bi bi-graph-up"></i>
                                    </div>
                                    <h3>Track Analytics</h3>
                                    <p>Monitor engagement rates, reach, and impressions. Adjust your strategy based on performance data.</p>
                                </div>
                                <div className="practice-card">
                                    <div className="practice-icon">
                                        <i className="bi bi-link-45deg"></i>
                                    </div>
                                    <h3>Cross-Promote</h3>
                                    <p>Link between platforms strategically. Use consistent messaging across all channels for brand unity.</p>
                                </div>
                                <div className="practice-card">
                                    <div className="practice-icon">
                                        <i className="bi bi-megaphone"></i>
                                    </div>
                                    <h3>Call-to-Action</h3>
                                    <p>Always include clear CTAs. Drive users to download the app, sign up, or visit the website.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default SocialMediaAssets

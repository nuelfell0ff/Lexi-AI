import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import StoriesModal from '../components/StoriesModal'
import AmbassadorPostCard from '../components/AmbassadorPostCard'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './CampusAmbassador.css'
import { db } from '../firebase'
import { collection, query, orderBy, onSnapshot, getDocs, where } from 'firebase/firestore'
import { useToast } from '../context/ToastContext'
import { NIGERIAN_UNIVERSITIES } from '../utils/universities'
import galleryImg1 from '../assets/IMG-20260418-WA0086.jpg'
import galleryImg2 from '../assets/IMG-20260418-WA0089.jpg'
import galleryImg3 from '../assets/IMG-20260418-WA0090.jpg'

const CampusAmbassador = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  useScrollAnimation()
  const [campaigns, setCampaigns] = useState([])
  const [ambassadors, setAmbassadors] = useState([])
  const [ambassadorsLoading, setAmbassadorsLoading] = useState(true)
  const [storiesModalOpen, setStoriesModalOpen] = useState(false)
  const [stories, setStories] = useState([])
  const [ambassadorPosts, setAmbassadorPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Group ambassadors by school (one representative per school)
  const getAmbassadorsBySchool = () => {
    const groupedBySchool = {}

    ambassadors.forEach(ambassador => {
      const school = ambassador.institution || 'Unknown'
      // Only one representative per school
      if (!groupedBySchool[school]) {
        groupedBySchool[school] = ambassador
      }
    })

    return groupedBySchool
  }

  // Fetch campaigns from Firestore with real-time listener
  useEffect(() => {
    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const storiesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setStories(storiesData)
      } catch (error) {
        console.error('Error fetching stories:', error)
      }
    }, (error) => {
      console.error('Error listening to stories:', error)
    })

    return () => unsubscribe()
  }, [])

  // Fetch ambassador posts from Firestore with real-time listener
  useEffect(() => {
    setPostsLoading(true)
    const q = query(collection(db, 'ambassadorPosts'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setAmbassadorPosts(postsData)
        setPostsLoading(false)
      } catch (error) {
        console.error('Error fetching ambassador posts:', error)
        setPostsLoading(false)
      }
    }, (error) => {
      console.error('Error listening to ambassador posts:', error)
      setPostsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Fetch ambassadors from Firestore (approved applicants with assigned posts) - Real-time listener
  useEffect(() => {
    setAmbassadorsLoading(true)
    const q = query(
      collection(db, 'applicants'),
      where('isAmbassador', '==', true)
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const ambassadorsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setAmbassadors(ambassadorsData)
        setAmbassadorsLoading(false)
      } catch (error) {
        console.error('Error processing ambassadors snapshot:', error)
        setAmbassadorsLoading(false)
      }
    }, (error) => {
      console.error('Error listening to ambassadors:', error)
      setAmbassadorsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  // Sample Resources Data
  const resources = [
    {
      id: 1,
      title: 'Branding Kit',
      description: 'Download our official logos, color guidelines, and brand assets.',
      icon: 'bi-palette2',
      link: '/branding-kit',
      linkText: 'View Branding Kit'
    },
    {
      id: 2,
      title: 'Social Media Assets',
      description: 'Access templates, graphics, and content for social media promotion.',
      icon: 'bi-share',
      link: '/social-media-assets',
      linkText: 'Explore Assets'
    },
    {
      id: 3,
      title: 'Ambassador Guide',
      description: 'Comprehensive guide on roles, responsibilities, and best practices.',
      icon: 'bi-book',
      link: '/ambassador-guide',
      linkText: 'View Guide'
    }
  ]

  // Gallery Images
  const galleryImages = [
    {
      id: 1,
      title: 'Campus Outreach',
      url: galleryImg1,
      description: 'Ambassadors engaging with students'
    },
    {
      id: 2,
      title: 'Health Awareness',
      url: galleryImg2,
      description: 'Healthcare initiative at campus'
    },
    {
      id: 3,
      title: 'Team Building',
      url: galleryImg3,
      description: 'Ambassador team collaboration'
    }
  ]

  const uploadFile = async (file, allowedTypes = ['application/pdf']) => {
    try {
      if (!file) throw new Error('No file selected')
      if (!allowedTypes.includes(file.type)) throw new Error('Invalid file type')
      if (file.size > 5 * 1024 * 1024) throw new Error('File size must be less than 5MB')

      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'lexi-ai')

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/datmds5xl/upload',
        {
          method: 'POST',
          body: formData
        }
      )

      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      return data.secure_url
    } catch (error) {
      console.error('File Upload Error:', error.message)
      throw error
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    let cvUrl = null
    let identificationUrl = null

    // Upload CV if provided (optional)
    if (cvFile) {
      try {
        cvUrl = await uploadFile(cvFile, ['application/pdf'])
      } catch (error) {
        alert(`CV Upload error: ${error.message}`)
        setLoading(false)
        return
      }
    }

    // Upload Identification (required)
    if (!identificationFile) {
      alert('Please upload your identification document')
      setLoading(false)
      return
    }

    try {
      identificationUrl = await uploadFile(identificationFile, ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'])
    } catch (error) {
      alert(`Identification Upload error: ${error.message}`)
      setLoading(false)
      return
    }

    try {
      // Check if email already exists
      const emailQuery = query(collection(db, 'applicants'), where('email', '==', email))
      const emailSnapshot = await getDocs(emailQuery)

      if (!emailSnapshot.empty) {
        showToast('Ambassador already exists', 'error', 'bi bi-exclamation-circle')
        setLoading(false)
        return
      }

      await addDoc(collection(db, 'applicants'), {
        name,
        email,
        courseOfStudy,
        institution,
        level,
        city,
        yearOfGraduation,
        cvUrl: cvUrl || null,
        identificationType,
        identificationUrl,
        createdAt: new Date()
      })

      showToast('Application received! We will review it shortly.', 'success', 'bi bi-check-circle')
      setSuccess(true)
      setName('')
      setEmail('')
      setCourseOfStudy('')
      setInstitution('')
      setLevel('')
      setCity('')
      setYearOfGraduation('')
      setCvFile(null)
      setIdentificationType('')
      setIdentificationFile(null)

      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      alert('Error submitting application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Ambassadors list - institutions with ambassadors
  const ambassadorInstitutions = NIGERIAN_UNIVERSITIES.slice(0, 24)

  return (
    <>
      <Navbar />
      <section className="campus-ambassador">
        <div className="campus-container">
          {/* Header Section */}
          <div className="campus-header">
            <h1 className="campus-heading">Become a Lexi AI Ambassador</h1>
            <p className="campus-subheading">
              Shaping minds one campus at a time. Join our growing community of healthcare innovators across Nigerian institutions.
            </p>
          </div>

          {/* Gallery Section */}
          <div className="gallery-section animate-on-scroll">
            <h2 className="gallery-title">Stories that speak for themselves</h2>
            <div className="gallery-grid">
              {galleryImages.map((image, index) => (
                <div key={image.id} className={`gallery-item animate-on-scroll delay-${index + 1}`}>
                  <img src={image.url} alt={image.title} className="gallery-image" />
                  <div className="gallery-overlay">
                    <h3 className="gallery-image-title">{image.title}</h3>
                    <p className="gallery-image-description">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ambassadors Showcase - By Post */}
          <div className="ambassadors-showcase animate-on-scroll">
            <h2 className="ambassadors-showcase-title">Meet Our Campus Leaders</h2>
            <p className="ambassadors-showcase-subtitle">Join a network of innovators coordinating Lexi AI across Nigerian campuses</p>

            {ambassadorsLoading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ color: '#999', fontSize: '1.1rem' }}>Loading campus leaders...</p>
              </div>
            ) : ambassadors.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ color: '#999', fontSize: '1.1rem' }}>No campus leaders assigned yet</p>
              </div>
            ) : (
              <div className="schools-grid">
                {Object.entries(getAmbassadorsBySchool()).map(([school, ambassador], index) => (
                  <div key={school} className={`school-column animate-on-scroll delay-${(index % 4) + 1}`}>
                    <div className="ambassador-profile-card">
                      <div className="ambassador-card-content">
                        <div className="ambassador-image-container">
                          <i className="bi bi-person-circle ambassador-icon"></i>
                        </div>
                        <div className="ambassador-profile-info">
                          <h4 className="ambassador-profile-name">{ambassador.name}</h4>
                          <p className="ambassador-profile-school">{school} representative</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Ambassador Posts Display */}
            {ambassadorPosts.length > 0 && (
              <div style={{ marginTop: '60px' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, color: '#333', marginBottom: '40px', textAlign: 'center' }}>Featured Ambassador Posts</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                  {ambassadorPosts.map((post) => (
                    <AmbassadorPostCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Benefits Section */}
          <div className="benefits-section animate-on-scroll">
            <h2 className="benefits-title">What's in it for you?</h2>
            <div className="benefits-grid">
              <div className="benefit-card animate-on-scroll delay-1">
                <div className="benefit-icon">
                  <i className="bi bi-briefcase"></i>
                </div>
                <h3 className="benefit-name">Career Support</h3>
                <p className="benefit-description">Get mentorship and career guidance from industry experts in healthcare tech</p>
              </div>
              <div className="benefit-card animate-on-scroll delay-2">
                <div className="benefit-icon">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h3 className="benefit-name">Build Leadership Skills</h3>
                <p className="benefit-description">Develop leadership and project management skills through real-world initiatives</p>
              </div>
              <div className="benefit-card animate-on-scroll delay-3">
                <div className="benefit-icon">
                  <i className="bi bi-people"></i>
                </div>
                <h3 className="benefit-name">Network & Community</h3>
                <p className="benefit-description">Connect with like-minded innovators and build lasting professional relationships</p>
              </div>
            </div>
          </div>

          {/* Hero Section - Be an Innovator */}
          <div className="innovator-section animate-on-scroll">
            <div className="innovator-content">
              <h2 className="innovator-title">Be a creative innovator</h2>
              <p className="innovator-subtitle">See how ambassadors are making a difference across campuses</p>
              <button
                onClick={() => navigate('/ambassador-apply')}
                className="innovator-cta"
              >
                <i className="bi bi-arrow-right"></i> Apply Now
              </button>
            </div>
          </div>



          {/* Campaigns Section - Read their stories */}
          <div className="campaigns-section animate-on-scroll">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
              <div>
                <h2 className="campaigns-section-title">Read their stories</h2>
              </div>
              <button
                onClick={() => setStoriesModalOpen(true)}
                className="share-story-btn"
              >
                <i className="bi bi-pencil-square"></i> Share Your Story
              </button>
            </div>
            {stories.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
                <i className="bi bi-chat-left-text" style={{ fontSize: '48px', marginBottom: '16px', display: 'block', color: '#ddd' }}></i>
                <p style={{ fontSize: '18px', fontWeight: 500, margin: '0 0 8px 0', color: '#333' }}>No stories yet</p>
                <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>Be the first to share your experience!</p>
              </div>
            ) : (
              <div className="campaigns-grid">
                {stories.map(story => (
                  <div key={story.id} className="campaign-card">
                    {story.storyImage ? (
                      <div className="story-image-container">
                        <img src={story.storyImage} alt={story.authorName} className="story-image" />
                      </div>
                    ) : (
                      <div className="story-image-placeholder">
                        <i className="bi bi-person-circle"></i>
                      </div>
                    )}
                    <div className="campaign-header">
                      <h3 className="campaign-title">{story.storyTitle}</h3>
                    </div>
                    <p className="campaign-description">{story.storyContent.substring(0, 150)}...</p>
                    <div className="campaign-meta">
                      <span><i className="bi bi-person"></i> {story.authorName}</span>
                      {story.authorInstitution && story.authorInstitution !== 'Not specified' && <span><i className="bi bi-building"></i> {story.authorInstitution}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources Section */}
          <div className="resources-section animate-on-scroll">
            <div className="section-header">
              <div>
                <h2 className="section-title">Ambassador Resources</h2>
                <p className="section-description">Everything you need to succeed</p>
              </div>
            </div>
            <div className="resources-grid">
              {resources.map(resource => (
                <div key={resource.id} className="resource-card">
                  <div className="resource-icon-wrapper">
                    <i className={`bi ${resource.icon}`}></i>
                  </div>
                  <h3 className="resource-title">{resource.title}</h3>
                  <p className="resource-description">{resource.description}</p>
                  <a
                    href={resource.link}
                    className="resource-link"
                    onClick={(e) => {
                      if (resource.link.startsWith('/')) {
                        e.preventDefault()
                        navigate(resource.link)
                      }
                    }}
                  >
                    {resource.linkText}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content Wrapper - Form Section */}
          <div className="ambassador-content-wrapper">
            {/* Button to navigate to form page */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <button
                onClick={() => navigate('/ambassador-apply')}
                className="apply-form-btn"
              >
                <i className="bi bi-arrow-right"></i> Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
      <StoriesModal
        isOpen={storiesModalOpen}
        onClose={() => setStoriesModalOpen(false)}
        onStoryAdded={() => {
          // Stories will be automatically updated from Firestore listener
        }}
      />
      <Footer />
    </>
  )
}

export default CampusAmbassador

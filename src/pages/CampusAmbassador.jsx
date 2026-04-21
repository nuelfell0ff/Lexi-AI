import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './CampusAmbassador.css'
import { db } from '../firebase'
import { collection, query, orderBy, onSnapshot, addDoc, getDocs, where } from 'firebase/firestore'
import { useToast } from '../context/ToastContext'
import galleryImg1 from '../assets/IMG-20260418-WA0063.jpg'
import galleryImg2 from '../assets/IMG-20260418-WA0064.jpg'
import galleryImg3 from '../assets/IMG-20260418-WA0065.jpg'

const NIGERIAN_UNIVERSITIES = [
  'University of Ibadan',
  'University of Nigeria, Nsukka',
  'Obafemi Awolowo University',
  'Ahmadu Bello University',
  'University of Lagos',
  'University of Benin',
  'Bayero University, Kano',
  'University of Calabar',
  'University of Ilorin',
  'University of Jos',
  'University of Maiduguri',
  'Usmanu Danfodiyo University',
  'University of Port Harcourt',
  'Federal University of Technology, Owerri',
  'Federal University of Technology, Akure',
  'Modibbo Adama University, Yola',
  'Federal University of Technology, Minna',
  'Nigerian Defence Academy',
  'University of Abuja',
  'Abubakar Tafawa Balewa University',
  'Federal University of Agriculture, Abeokuta',
  'University of Agriculture, Makurdi',
  'Michael Okpara University of Agriculture',
  'Nnamdi Azikiwe University',
  'University of Uyo',
  'National Open University of Nigeria',
  'Federal University of Petroleum Resources, Effurun',
  'Federal University, Lokoja',
  'Federal University, Lafia',
  'Federal University, Kashere',
  'Federal University, Wukari',
  'Federal University, Dutsin-Ma',
  'Federal University, Dutse',
  'Federal University, Birnin Kebbi',
  'Federal University, Gusau',
  'Federal University, Gashua',
  'Federal University, Oye-Ekiti',
  'Federal University, Ndifu-Alike',
  'Federal University, Otuoke',
  'Federal University of Health Sciences',
  'Abia State University',
  'Adamawa State University',
  'Adekunle Ajasin University',
  'Akwa Ibom State University',
  'Ambrose Alli University',
  'Chukwuemeka Odumegwu Ojukwu University',
  'Bauchi State University',
  'Benue State University',
  'Delta State University',
  'Ebonyi State University',
  'Edo State University (Iyamho)',
  'Ekiti State University',
  'Enugu State University of Science and Technology',
  'Gombe State University',
  'Ibrahim Badamasi Babangida University',
  'Ignatius Ajuru University of Education',
  'Imo State University',
  'Kaduna State University',
  'Kano University of Science & Technology',
  'Kebbi State University of Science and Technology',
  'Kogi State University',
  'Kwara State University',
  'Lagos State University',
  'Ladoke Akintola University of Technology',
  'Nasarawa State University',
  'Niger Delta University',
  'Olabisi Onabanjo University',
  'Ondo State University of Science and Technology',
  'Osun State University',
  'Plateau State University',
  'Rivers State University',
  'Sokoto State University',
  'Taraba State University',
  'Umaru Musa Yar\'Adua University',
  'Yobe State University',
  'Zamfara State University',
  'Tai Solarin University of Education',
  'Confluence University of Science and Technology',
  'University of Delta',
  'Dennis Osadebay University'
]

const CampusAmbassador = () => {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [courseOfStudy, setCourseOfStudy] = useState('')
  const [institution, setInstitution] = useState('')
  const [level, setLevel] = useState('')
  const [city, setCity] = useState('')
  const [yearOfGraduation, setYearOfGraduation] = useState('')
  const [cvFile, setCvFile] = useState(null)
  const [identificationType, setIdentificationType] = useState('')
  const [identificationFile, setIdentificationFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [campaigns, setCampaigns] = useState([])
  const [ambassadors, setAmbassadors] = useState([])
  const [ambassadorsLoading, setAmbassadorsLoading] = useState(true)

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  // Group ambassadors by school
  const getAmbassadorsBySchool = () => {
    const groupedBySchool = {}
    ambassadors.forEach(ambassador => {
      const school = ambassador.institution || 'Unknown'
      if (!groupedBySchool[school]) {
        groupedBySchool[school] = []
      }
      groupedBySchool[school].push(ambassador)
    })
    return groupedBySchool
  }

  // Get ambassadors grouped by school (up to 4 per school)
  const getAmbassadorsBySchoolLimited = () => {
    const groupedBySchool = getAmbassadorsBySchool()
    const result = {}

    Object.keys(groupedBySchool).forEach(school => {
      result[school] = groupedBySchool[school].slice(0, 4)
    })

    return result
  }

  // Fetch campaigns from Firestore with real-time listener
  useEffect(() => {
    const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const campaignsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setCampaigns(campaignsData)
      } catch (error) {
        console.error('Error fetching campaigns:', error)
      }
    }, (error) => {
      console.error('Error listening to campaigns:', error)
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
          <div className="gallery-section">
            <h2 className="gallery-title">Stories that speak for themselves</h2>
            <div className="gallery-grid">
              {galleryImages.map(image => (
                <div key={image.id} className="gallery-item">
                  <img src={image.url} alt={image.title} className="gallery-image" />
                  <div className="gallery-overlay">
                    <h3 className="gallery-image-title">{image.title}</h3>
                    <p className="gallery-image-description">{image.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ambassadors Showcase - By School */}
          <div className="ambassadors-showcase">
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
              Object.entries(getAmbassadorsBySchoolLimited()).map(([school, ambassadorsList]) => (
                <div key={school} className="school-ambassador-group">
                  <h3 className="school-heading">{school}</h3>
                  <div className="school-ambassadors-grid">
                    {ambassadorsList.map(ambassador => (
                      <div key={ambassador.id} className="ambassador-profile-card">
                        <div className="ambassador-card-content">
                          <div className="ambassador-image-container">
                            <i className="bi bi-person-circle ambassador-icon"></i>
                          </div>
                          <div className="ambassador-profile-info">
                            <h4 className="ambassador-profile-name">{ambassador.name}</h4>
                            <p className="ambassador-profile-post">{ambassador.post}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Benefits Section */}
          <div className="benefits-section">
            <h2 className="benefits-title">What's in it for you?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="bi bi-briefcase"></i>
                </div>
                <h3 className="benefit-name">Career Support</h3>
                <p className="benefit-description">Get mentorship and career guidance from industry experts in healthcare tech</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="bi bi-graph-up"></i>
                </div>
                <h3 className="benefit-name">Build Leadership Skills</h3>
                <p className="benefit-description">Develop leadership and project management skills through real-world initiatives</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="bi bi-people"></i>
                </div>
                <h3 className="benefit-name">Network & Community</h3>
                <p className="benefit-description">Connect with like-minded innovators and build lasting professional relationships</p>
              </div>
            </div>
          </div>

          {/* Hero Section - Be an Innovator */}
          <div className="innovator-section">
            <div className="innovator-content">
              <h2 className="innovator-title">Be a creative innovator</h2>
              <p className="innovator-subtitle">See how ambassadors are making a difference across campuses</p>
              <a href="#apply-form" className="innovator-cta">
                <i className="bi bi-arrow-right"></i> Apply Now
              </a>
            </div>
          </div>



          {/* Campaigns Section - Read their stories */}
          <div className="campaigns-section">
            <h2 className="campaigns-section-title">Read their stories</h2>
            {campaigns.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
                <i className="bi bi-inbox" style={{ fontSize: '48px', marginBottom: '16px', display: 'block', color: '#ddd' }}></i>
                <p style={{ fontSize: '18px', fontWeight: 500, margin: '0 0 8px 0', color: '#333' }}>Coming Soon</p>
                <p style={{ fontSize: '14px', color: '#999', margin: 0 }}>Ambassador stories and testimonials will be featured here.</p>
              </div>
            ) : (
              <div className="campaigns-grid">
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="campaign-card">
                    <div className="campaign-header">
                      <h3 className="campaign-title">{campaign.title}</h3>
                      <span className={`campaign-status ${campaign.status.toLowerCase()}`}>{campaign.status}</span>
                    </div>
                    <p className="campaign-description">{campaign.description}</p>
                    <div className="campaign-meta">
                      <span><i className="bi bi-calendar"></i> {campaign.date}</span>
                      <span><i className="bi bi-people"></i> {campaign.ambassadors} ambassadors</span>
                    </div>
                    <a href="#" className="learn-more-btn">Learn More →</a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources Section */}
          <div className="resources-section">
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
            {/* Form Section */}
            <div className="campus-form-side">
              <div className="campus-form-container" id="apply-form">
                <h2 className="form-title">Apply Now</h2>
                <p className="form-description">Tell us about yourself and your institution</p>

                {success && (
                  <div className="success-message">
                    <i className="bi bi-check-circle"></i>
                    <div>
                      <strong>Application Submitted!</strong>
                      <p>Thank you for applying. We'll review your application and get back to you soon.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type='text'
                      className="form-input"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input
                      type='email'
                      className="form-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Institution *</label>
                      <select
                        className="form-input"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        required
                      >
                        <option value="">Select your university</option>
                        {NIGERIAN_UNIVERSITIES.map((uni) => (
                          <option key={uni} value={uni}>
                            {uni}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">City *</label>
                      <input
                        type='text'
                        className="form-input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Course of Study *</label>
                      <input
                        type='text'
                        className="form-input"
                        value={courseOfStudy}
                        onChange={(e) => setCourseOfStudy(e.target.value)}
                        placeholder="e.g., Computer Science, Medicine"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Academic Level *</label>
                      <input
                        type='text'
                        className="form-input"
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}
                        placeholder="e.g., 100 Level, Final Year"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Expected Graduation Year *</label>
                    <input
                      type='number'
                      className="form-input"
                      value={yearOfGraduation}
                      onChange={(e) => setYearOfGraduation(e.target.value)}
                      placeholder="2025"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Identification Type *</label>
                    <select
                      className="form-input"
                      value={identificationType}
                      onChange={(e) => setIdentificationType(e.target.value)}
                      required
                    >
                      <option value="">Select identification type</option>
                      <option value="NIN">NIN (National Identification Number)</option>
                      <option value="SCHOOL_ID">School ID</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload Identification (Image or PDF) *</label>
                    <div className="file-input-wrapper">
                      <input
                        type='file'
                        id="identification-file"
                        className="file-input"
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => setIdentificationFile(e.target.files[0])}
                        required
                      />
                      <label htmlFor="identification-file" className="file-input-label">
                        <i className="bi bi-cloud-upload"></i>
                        <span>{identificationFile ? identificationFile.name : 'Click to upload or drag and drop'}</span>
                        <small>PDF or Image files (PNG, JPG), max 5MB</small>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Upload CV (PDF)</label>
                    <div className="file-input-wrapper">
                      <input
                        type='file'
                        id="cv-file"
                        className="file-input"
                        accept=".pdf"
                        onChange={(e) => setCvFile(e.target.files[0])}
                      />
                      <label htmlFor="cv-file" className="file-input-label">
                        <i className="bi bi-cloud-upload"></i>
                        <span>{cvFile ? cvFile.name : 'Click to upload or drag and drop'}</span>
                        <small>PDF files only, max 2MB (Optional)</small>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="submit-btn" disabled={loading}>
                    <i className={`bi ${loading ? 'bi-hourglass-split' : 'bi-send'}`}></i>
                    {loading ? 'Submitting...' : 'Submit Application'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CampusAmbassador

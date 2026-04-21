import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { db } from '../firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { useToast } from '../context/ToastContext'
import '../pages/CampusAmbassador.css'

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

const AmbassadorApplicationForm = () => {
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

      setTimeout(() => {
        navigate('/campus-ambassador')
      }, 2000)
    } catch (error) {
      alert('Error submitting application. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <section className="campus-ambassador">
        <div className="campus-container">
          {/* Header Section */}
          <div className="campus-header">
            <h1 className="campus-heading">Ambassador Application Form</h1>
            <p className="campus-subheading">
              Join our community of healthcare innovators. Complete this form to apply for the Lexi AI Campus Ambassador program.
            </p>
          </div>

          {/* Form Section */}
          <div className="ambassador-content-wrapper">
            <div className="campus-form-side">
              <div className="campus-form-container">
                <h2 className="form-title">Your Information</h2>
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

                  <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button type="submit" className="submit-btn" disabled={loading}>
                      <i className={`bi ${loading ? 'bi-hourglass-split' : 'bi-send'}`}></i>
                      {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/campus-ambassador')}
                      style={{
                        flex: 1,
                        padding: '12px 24px',
                        backgroundColor: '#f5f5f5',
                        color: '#333',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                      }}
                    >
                      <i className="bi bi-arrow-left"></i> Cancel
                    </button>
                  </div>
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

export default AmbassadorApplicationForm

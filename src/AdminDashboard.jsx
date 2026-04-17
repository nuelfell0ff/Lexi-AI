import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const Navigate = useNavigate()
  const [applicants, setApplicants] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [cvFile, setCvFile] = useState(null)
  const applicantsPerPage = 10

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("Admin logged in:", user.email)
      } else {
        console.log("Not logged in")
        Navigate('/admin/signin')
      }
    })
    return () => unsubscribe()
  }, [Navigate])

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'applicants'))

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      setApplicants(data)
      setCurrentPage(1) // Reset to first page when data loads
    }

    fetchData()
  }, [])

  // Calculate pagination
  const totalPages = Math.ceil(applicants.length / applicantsPerPage)
  const startIndex = (currentPage - 1) * applicantsPerPage
  const endIndex = startIndex + applicantsPerPage
  const currentApplicants = applicants.slice(startIndex, endIndex)

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const uploadCV = async (file) => {
    try {
      // Validation
      if (!file) throw new Error('No file selected')
      if (file.type !== 'application/pdf') throw new Error('Only PDF files are allowed')
      if (file.size > 2 * 1024 * 1024) throw new Error('File size must be less than 2MB')

      // Create FormData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', 'lexi-ai')

      // Upload to Cloudinary
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
      console.error('CV Upload Error:', error.message)
      throw error
    }
  }

  const handleCVUpload = async () => {
    if (!cvFile) {
      alert('Please select a file first')
      return
    }
    try {
      const cvUrl = await uploadCV(cvFile)
      console.log('CV uploaded successfully:', cvUrl)
      alert('CV uploaded successfully!')
      setCvFile(null) // Clear the file after successful upload
    } catch (error) {
      alert(`Upload error: ${error.message}`)
    }
  }

  return (
    <>
      <h1>Welcome to the Admin Dashboard</h1>

      {/* CV Upload Section */}
      <div style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
        <h3>Upload CV</h3>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setCvFile(e.target.files[0])}
          style={{ marginBottom: '10px' }}
        />
        {cvFile && <p style={{ color: '#666' }}>Selected: {cvFile.name}</p>}
        <button
          onClick={handleCVUpload}
          style={{
            padding: '8px 16px',
            backgroundColor: '#1E844F',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Upload CV
        </button>
      </div>

      {currentApplicants.map(user => (
        <div key={user.id}>
          <h4>{user.name}</h4>
          <h4>{user.email}</h4>
          <h4>{user.courseOfStudy}</h4>
          <h4>{user.institution}</h4>
          <h4>{user.level}</h4>
          <h4>{user.city}</h4>
          <h4>{user.yearOfGraduation}</h4>
          <h4>{user.createdAt?.toDate?.().toLocaleString() || 'N/A'}</h4>
        </div>
      ))}

      {/* Pagination Controls */}
      <div style={{ marginTop: '30px', display: 'flex', alignItems: 'center', gap: '15px', justifyContent: 'center' }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === 1 ? '#ccc' : '#1E844F',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
          }}
        >
          Previous
        </button>

        <span style={{ fontSize: '16px', fontWeight: '600' }}>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            padding: '8px 16px',
            backgroundColor: currentPage === totalPages ? '#ccc' : '#1E844F',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
          }}
        >
          Next
        </button>
      </div>

      <div style={{ marginTop: '15px', textAlign: 'center', color: '#666' }}>
        Showing {startIndex + 1} to {Math.min(endIndex, applicants.length)} of {applicants.length} applicants
      </div>
    </>
  )
}

export default AdminDashboard
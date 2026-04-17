import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const Navigate = useNavigate()
  const [applicants, setApplicants] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
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

  return (
    <>
      <h1>Welcome to the Admin Dashboard</h1>

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
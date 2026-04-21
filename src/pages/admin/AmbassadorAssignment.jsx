import React, { useState, useEffect } from 'react'
import { collection, updateDoc, doc, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import '../../styles/AmbassadorAssignment.css'

const AMBASSADOR_POSTS = [
  'Campus Lead',
  'Operations Lead',
  'Events Coordinator',
  'Tech Lead'
]

const AmbassadorAssignment = () => {
  const { showToast } = useToast()
  const [ambassadors, setAmbassadors] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAmbassador, setSelectedAmbassador] = useState(null)
  const [selectedPost, setSelectedPost] = useState('')
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [assigningId, setAssigningId] = useState(null)

  // Fetch ambassadors (approved applicants) - Real-time listener
  useEffect(() => {
    setLoading(true)
    const q = query(
      collection(db, 'applicants'),
      where('status', '==', 'approved')
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const ambassadorsData = querySnapshot.docs.map(doc => {
          const data = doc.data()
          console.log('Ambassador found:', { id: doc.id, name: data.name, status: data.status, post: data.post })
          return {
            id: doc.id,
            ...data
          }
        })
        console.log('Total ambassadors fetched:', ambassadorsData.length)
        setAmbassadors(ambassadorsData)
        setLoading(false)
      } catch (error) {
        console.error('Error processing ambassadors snapshot:', error)
        showToast('Failed to load ambassadors', 'error', 'bi bi-x-circle')
        setLoading(false)
      }
    }, (error) => {
      console.error('Error listening to ambassadors:', error)
      showToast('Failed to load ambassadors', 'error', 'bi bi-x-circle')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [showToast])

  const handleAssignPost = async (ambassadorId, post) => {
    // Check if post is already taken in this school
    const ambassador = ambassadors.find(amb => amb.id === ambassadorId)
    if (isPostTakenInSchool(ambassador.institution, post, ambassadorId)) {
      showToast(`The "${post}" post is already assigned to someone in ${ambassador.institution}`, 'error', 'bi bi-exclamation-circle')
      return
    }

    try {
      setAssigningId(ambassadorId)
      await updateDoc(doc(db, 'applicants', ambassadorId), {
        post: post,
        isAmbassador: true,
        postAssignedAt: new Date()
      })

      // Update local state
      setAmbassadors(ambassadors.map(amb =>
        amb.id === ambassadorId
          ? { ...amb, post: post, isAmbassador: true }
          : amb
      ))

      showToast(`Post "${post}" assigned successfully!`, 'success', 'bi bi-check-circle')
      setSelectedAmbassador(null)
      setSelectedPost('')
    } catch (error) {
      console.error('Error assigning post:', error)
      showToast('Failed to assign post', 'error', 'bi bi-x-circle')
    } finally {
      setAssigningId(null)
    }
  }

  const handleRemovePost = async (ambassadorId) => {
    try {
      setAssigningId(ambassadorId)
      await updateDoc(doc(db, 'applicants', ambassadorId), {
        post: null,
        isAmbassador: false
      })

      setAmbassadors(ambassadors.map(amb =>
        amb.id === ambassadorId
          ? { ...amb, post: null, isAmbassador: false }
          : amb
      ))

      showToast('Post removed successfully!', 'success', 'bi bi-check-circle')
    } catch (error) {
      console.error('Error removing post:', error)
      showToast('Failed to remove post', 'error', 'bi bi-x-circle')
    } finally {
      setAssigningId(null)
    }
  }

  const getFilteredAmbassadors = () => {
    return ambassadors.filter(amb => {
      const matchesSearch = amb.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        amb.institution?.toLowerCase().includes(searchTerm.toLowerCase())

      if (filter === 'assigned') {
        return matchesSearch && amb.post
      } else if (filter === 'unassigned') {
        return matchesSearch && !amb.post
      }
      return matchesSearch
    })
  }

  // Check if a post is already taken in a specific school
  const isPostTakenInSchool = (school, post, excludeId = null) => {
    return ambassadors.some(amb =>
      amb.institution === school &&
      amb.post === post &&
      amb.id !== excludeId
    )
  }

  // Get available posts for an ambassador (excluding posts taken in their school)
  const getAvailablePostsForAmbassador = (ambassadorId) => {
    const ambassador = ambassadors.find(amb => amb.id === ambassadorId)
    if (!ambassador) return AMBASSADOR_POSTS

    return AMBASSADOR_POSTS.filter(post => !isPostTakenInSchool(ambassador.institution, post, ambassadorId))
  }

  const filteredList = getFilteredAmbassadors()

  if (loading) {
    return (
      <div className="ambassador-assignment">
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <p>Loading ambassadors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="ambassador-assignment">
      <div className="assignment-header">
        <h2>Ambassador Post Assignment</h2>
        <p>Assign roles to approved applicants</p>
      </div>

      <div className="assignment-controls">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search by name or institution..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({ambassadors.length})
          </button>
          <button
            className={`filter-btn ${filter === 'assigned' ? 'active' : ''}`}
            onClick={() => setFilter('assigned')}
          >
            Assigned ({ambassadors.filter(a => a.post).length})
          </button>
          <button
            className={`filter-btn ${filter === 'unassigned' ? 'active' : ''}`}
            onClick={() => setFilter('unassigned')}
          >
            Unassigned ({ambassadors.filter(a => !a.post).length})
          </button>
        </div>
      </div>

      <div className="assignment-list">
        {filteredList.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-inbox"></i>
            <p>No ambassadors found</p>
          </div>
        ) : (
          <div className="ambassador-cards">
            {filteredList.map(ambassador => (
              <div key={ambassador.id} className="ambassador-assignment-card">
                <div className="card-header">
                  <div className="ambassador-info">
                    <h3>{ambassador.name}</h3>
                    <p className="institution">{ambassador.institution}</p>
                    <p className="email">{ambassador.email}</p>
                  </div>
                  {ambassador.post && (
                    <div className="current-post">
                      <span className="post-badge">{ambassador.post}</span>
                    </div>
                  )}
                </div>

                <div className="card-actions">
                  {ambassador.post ? (
                    <button
                      className="btn-remove"
                      onClick={() => handleRemovePost(ambassador.id)}
                      disabled={assigningId === ambassador.id}
                    >
                      <i className="bi bi-trash"></i> Remove Post
                    </button>
                  ) : (
                    <div className="post-selector">
                      <select
                        className="post-dropdown"
                        value={selectedAmbassador === ambassador.id ? selectedPost : ''}
                        onChange={(e) => {
                          setSelectedAmbassador(ambassador.id)
                          setSelectedPost(e.target.value)
                        }}
                      >
                        <option value="">Select a post...</option>
                        {getAvailablePostsForAmbassador(ambassador.id).map(post => {
                          const isTaken = isPostTakenInSchool(ambassador.institution, post, ambassador.id)
                          return (
                            <option key={post} value={post} disabled={isTaken}>
                              {post} {isTaken ? '(taken in your school)' : ''}
                            </option>
                          )
                        })}
                      </select>
                      <button
                        className="btn-assign"
                        onClick={() => handleAssignPost(ambassador.id, selectedPost)}
                        disabled={!selectedPost || assigningId === ambassador.id}
                      >
                        <i className="bi bi-check"></i> Assign
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AmbassadorAssignment

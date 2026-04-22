import React, { useState, useEffect } from 'react'
import { collection, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../../firebase'
import { useToast } from '../../context/ToastContext'
import ConfirmModal from '../../components/ConfirmModal'
import AddAmbassadorModal from '../../components/AddAmbassadorModal'
import AmbassadorPostCard from '../../components/AmbassadorPostCard'
import '../../styles/AmbassadorAssignment.css'

const AmbassadorAssignment = () => {
  const { showToast } = useToast()
  const [ambassadorPosts, setAmbassadorPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [confirmModal, setConfirmModal] = useState(null)
  const [showAddAmbassadorModal, setShowAddAmbassadorModal] = useState(false)

  // Fetch ambassador posts with real-time listener
  useEffect(() => {
    setLoading(true)
    const q = query(collection(db, 'ambassadorPosts'), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const postsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setAmbassadorPosts(postsData)
        setLoading(false)
      } catch (error) {
        console.error('Error processing ambassador posts snapshot:', error)
        showToast('Failed to load ambassador posts', 'error', 'bi bi-x-circle')
        setLoading(false)
      }
    }, (error) => {
      console.error('Error listening to ambassador posts:', error)
      showToast('Failed to load ambassador posts', 'error', 'bi bi-x-circle')
      setLoading(false)
    })

    return () => unsubscribe()
  }, [showToast])

  const handleDeleteAmbassadorPost = (postId) => {
    setConfirmModal({
      title: 'Delete Ambassador Post',
      message: 'Are you sure you want to delete this ambassador post? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await deleteDoc(doc(db, 'ambassadorPosts', postId))
          showToast('Ambassador post deleted successfully!', 'success', 'bi bi-check-circle')
          setConfirmModal(null)
        } catch (error) {
          console.error('Error deleting ambassador post:', error)
          showToast('Failed to delete ambassador post', 'error', 'bi bi-exclamation-circle')
        }
      },
      onCancel: () => setConfirmModal(null),
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true
    })
  }

  if (loading) {
    return (
      <div style={{ backgroundColor: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>Loading ambassador posts...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#333', margin: 0 }}>Meet Our Campus Leaders ({ambassadorPosts.length})</h3>
        <button className="btn-invite" onClick={() => setShowAddAmbassadorModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, fontFamily: 'Poppins, sans-serif', transition: 'all 0.3s ease' }} onMouseEnter={(e) => { e.target.style.background = '#1d4ed8' }} onMouseLeave={(e) => { e.target.style.background = '#2563eb' }}>
          <i className="bi bi-plus-circle"></i> Add Ambassador
        </button>
      </div>
      <div style={{ backgroundColor: '#fff', padding: '28px', borderRadius: '12px', border: '1px solid #e0e0e0', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)' }}>

        {ambassadorPosts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <i className="bi bi-people" style={{ fontSize: '32px', marginBottom: '16px', display: 'block', color: '#ddd' }}></i>
            <p>No ambassador posts yet. Create one using the "Add Ambassador" button.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {ambassadorPosts.map((post) => (
              <div key={post.id} style={{ position: 'relative' }}>
                <AmbassadorPostCard
                  post={post}
                  showDeleteBtn={true}
                  onDelete={() => handleDeleteAmbassadorPost(post.id)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {confirmModal && (
        <ConfirmModal
          title={confirmModal.title}
          message={confirmModal.message}
          onConfirm={confirmModal.onConfirm}
          onCancel={confirmModal.onCancel}
          confirmText={confirmModal.confirmText}
          cancelText={confirmModal.cancelText}
          isDangerous={confirmModal.isDangerous}
        />
      )}
      <AddAmbassadorModal
        isOpen={showAddAmbassadorModal}
        onClose={() => setShowAddAmbassadorModal(false)}
      />
    </>
  )
}

export default AmbassadorAssignment

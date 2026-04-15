import React from 'react'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const AdminDashboard = () => {
  const Navigate = useNavigate()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Admin logged in:", user.email);
    } else {
      console.log("Not logged in");
      Navigate('/admin-signin');
    }
  });

  return (
    <>
      <h1>Welcome to the Admin Dashboard</h1>
    </>
  )
}

export default AdminDashboard
import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'
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

  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'applicants'));

      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setApplicants(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>Welcome to the Admin Dashboard</h1>

      {applicants.map(user => (
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
    </>
  )
}

export default AdminDashboard
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './CampusAmbassador.css'
import { db } from '../firebase'
import { collection, addDoc } from 'firebase/firestore'

const CampusAmbassador = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [courseOfStudy, setCourseOfStudy] = useState('')
  const [institution, setInstitution] = useState('')
  const [level, setLevel] = useState('')
  const [city, setCity] = useState('')
  const [yearOfGraduation, setYearOfGraduation] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    await addDoc(collection(db, 'applicants'), {
      name,
      email,
      courseOfStudy,
      institution,
      level,
      city,
      yearOfGraduation,
      createdAt: new Date()
    });

    alert('Submitted! Thank you for applying to be a Campus Ambassador. We will review your application and get back to you soon.')
  }

  return (
    <>
      <Navbar />
      <section className="campus-ambassador">
        <div className="campus-container">
          {/* Header Section */}
          <div className="campus-header">
            <h1 className="campus-heading">Campus Ambassador Program</h1>
            <p className="campus-subheading">
              Join our mission to revolutionize healthcare access across campuses. As a Campus Ambassador, you'll be at the forefront of bringing AI-powered healthcare solutions to students and faculty.
            </p>
          </div>

          {/* Form Section */}
          <div className="campus-form-wrapper">
            <div className="campus-form-container">
              <h2 className="form-title">Apply Now</h2>
              <p className="form-description">Tell us about yourself and your institution</p>

              <form onSubmit={handleSubmit}>
                <input type='text' onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type='email' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type='text' onChange={(e) => setCourseOfStudy(e.target.value)} placeholder="Course of Study" />
                <input type='text' onChange={(e) => setInstitution(e.target.value)} placeholder="Institution" />
                <input type='text' onChange={(e) => setLevel(e.target.value)} placeholder="Level" />
                <input type='text' onChange={(e) => setCity(e.target.value)} placeholder="City" />
                <input type='number' onChange={(e) => setYearOfGraduation(e.target.value)} placeholder="Graduation Year" />

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default CampusAmbassador

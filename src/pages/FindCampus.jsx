import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { NIGERIAN_UNIVERSITIES } from '../utils/universities';
import './FindCampus.css';

const FindCampus = () => {
  return (
    <div className="find-campus-page">
      <Navbar />

      <section className="find-campus-hero">
        <div className="find-campus-container">
          <h1 className="find-campus-title">Find Your Campus</h1>
          <p className="find-campus-subtitle">
            Meet the campus leaders from your school and join the Lexi AI Ambassador community
          </p>
        </div>
      </section>

      <section className="find-campus-list-section">
        <div className="find-campus-container">
          <div className="universities-list">
            {NIGERIAN_UNIVERSITIES.map((university, index) => (
              <div key={index} className="university-list-item">
                <div className="university-icon">
                  <i className="bi bi-mortarboard"></i>
                </div>
                <div className="university-info">
                  <h3>{university}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindCampus;

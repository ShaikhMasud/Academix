import React from 'react';
import './subject.css';
import { Link } from 'react-router-dom';

import bgImg1 from './bg img/b.JPG'; 
import bgImg2 from './bg img/b2.JPG'; 
import bgImg3 from './bg img/b3.JPG'; 
import bgImg4 from './bg img/b4.JPG'; 
import bgImg5 from './bg img/b5.JPG'; 


const Subjectpagehod = () => {
  const toggleLogoutMenu = () => {
    const logoutMenu = document.getElementById('logoutMenu');
    if (logoutMenu.style.display === 'block') {
      logoutMenu.style.display = 'none';
    } else {
      logoutMenu.style.display = 'block';
    }
  };

  const logout = () => {
    alert('Logging out...');
    // Add your logout logic here
  };

  return (
    <div className="App">
      <nav className="curved-nav">
        <div className="nav-content">
        <Link to="/managefaculty"><button className="nav-btn">Manage Teachers</button></Link>
        <button className="nav-btn">PO</button>
          <div className="profile-menu">
            <div className="profile-circle" onClick={toggleLogoutMenu}>
              <i className="fas fa-user"></i>
            </div>
            <div id="logoutMenu" className="logout-menu">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="card-container">
        <div className="skill-card">
          <img
            className="skill-card__background"
            src={bgImg1}
            alt="Course background"
          />
          <div className="skill-card__content">
            <div className="skill-card__content--container">
              <h2 className="skill-card__title">
                ITC-301 MATHEMATICS
                <br />
                Prof XYZ
              </h2>
              <pre className="skill-card__description">
                IA 1 - LEVEL 2
                <br />
                IA 2 - LEVEL 1
                <br />
                INTERNAL - LEVEL 2
                <br />
                ESE - LEVEL 1
              </pre>
            </div>
          </div>
        </div>

        <div className="skill-card">
          <img
            className="skill-card__background"
            src={bgImg2}
            alt="Course background"
          />
          <div className="skill-card__content">
            <div className="skill-card__content--container">
              <h2 className="skill-card__title">
                ITC-302 PHYSICS
                <br />
                Prof ABC
              </h2>
              <pre className="skill-card__description">
                IA 1 - LEVEL 1
                <br />
                IA 2 - LEVEL 2
                <br />
                INTERNAL - LEVEL 1
                <br />
                ESE - LEVEL 2
              </pre>
            </div>
          </div>
        </div>

        <div className="skill-card">
          <img
            className="skill-card__background"
            src={bgImg3}
            alt="Course background"
          />
          <div className="skill-card__content">
            <div className="skill-card__content--container">
              <h2 className="skill-card__title">
                ITC-303 CHEMISTRY
                <br />
                Prof DEF
              </h2>
              <pre className="skill-card__description">
                IA 1 - LEVEL 2
                <br />
                IA 2 - LEVEL 2
                <br />
                INTERNAL - LEVEL 1
                <br />
                ESE - LEVEL 1
              </pre>
            </div>
          </div>
        </div>

        <div className="skill-card">
          <img
            className="skill-card__background"
            src={bgImg4}
            alt="Course background"
          />
          <div className="skill-card__content">
            <div className="skill-card__content--container">
              <h2 className="skill-card__title">
                ITC-304 BIOLOGY
                <br />
                Prof GHI
              </h2>
              <pre className="skill-card__description">
                IA 1 - LEVEL 1
                <br />
                IA 2 - LEVEL 2
                <br />
                INTERNAL - LEVEL 2
                <br />
                ESE - LEVEL 1
              </pre>
            </div>
          </div>
        </div>

        <div className="skill-card">
          <img
            className="skill-card__background"
            src={bgImg5}
            alt="Course background"
          />
          <div className="skill-card__content">
            <div className="skill-card__content--container">
              <h2 className="skill-card__title">
                ITC-305 COMPUTER SCIENCE
                <br />
                Prof JKL
              </h2>
              <pre className="skill-card__description">
                IA 1 - LEVEL 2
                <br />
                IA 2 - LEVEL 1
                <br />
                INTERNAL - LEVEL 2
                <br />
                ESE - LEVEL 2
              </pre>
            </div>
          </div>
        </div>
        
        {/* Add more skill cards as needed */}
        
      </div>
    </div>
  );
};

export default Subjectpagehod;
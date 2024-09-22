import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import './principaldash.css';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";

// Register Chart.js components
Chart.register(...registerables);

const PrincipalMainPage = () => {
  const {stream}=useParams();
  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedLevel, setSelectedLevel] = useState('SE');
  const [semesters, setSemesters] = useState({ sem1: 'Sem 3', sem2: 'Sem 4' });
  
  const chart1Ref = useRef(null);
  const chart2Ref = useRef(null);

  const updateSemesterDisplay = (level) => {
    let semYear = 0;
    switch (level) {
      case 'SE':
        semYear = 2;
        break;
      case 'TE':
        semYear = 4;
        break;
      case 'BE':
        semYear = 6;
        break;
      default:
        break;
    }
    setSemesters({ sem1: `Sem ${semYear + 1}`, sem2: `Sem ${semYear + 2}` });
  };

  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    updateSemesterDisplay(level);
  };

  useEffect(() => {
    if (chart1Ref.current && chart2Ref.current) {
      const ctx1 = chart1Ref.current.getContext('2d');
      const chart1 = new Chart(ctx1, {
        type: 'pie',
        data: {
          labels: ['Level 0', 'Level 1', 'Level 2'],
          datasets: [{
            label: 'Level Distribution',
            data: [30, 50, 20],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            hoverOffset: 4
          }]
        }
      });

      const ctx2 = chart2Ref.current.getContext('2d');
      const chart2 = new Chart(ctx2, {
        type: 'pie',
        data: {
          labels: ['Level 0', 'Level 1', 'Level 2'],
          datasets: [{
            label: 'Level Distribution',
            data: [45, 25, 30],
            backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe'],
            hoverOffset: 4
          }]
        }
      });

      return () => {
        chart1.destroy();
        chart2.destroy();
      };
    }
  }, []);

  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  return (
    user.role === "Principal" ? (
      <div className="containerpd">
        {/* Navigation Bar */}
        <div className="nav-bar">
          <div className="nav-bar-content">
            <Link to="/principaldashboard"><button className="nav-btn">Home</button></Link>
            <Link to="/sub"><button className="nav-btn">Subjects</button></Link>
            <button className="nav-btn">Profile Picture</button>
            <button className="nav-btn">{stream}</button>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>

        {/* Year Selection Section */}
        <div className="year-selection">
          {['2024', '2023', '2022', '2021', '2020'].map(year => (
            <button 
              key={year}
              onClick={() => setSelectedYear(year)}
              className={selectedYear === year ? 'selected-year-box' : 'year-box'}>
              {year}
            </button>
          ))}
        </div>

        <hr className="hr-style" />

        {/* Level Selection Section */}
        <div className="level-selection">
          {['SE', 'TE', 'BE'].map(level => (
            <button 
              key={level}
              onClick={() => handleLevelChange(level)}
              className={selectedLevel === level ? 'selected-level-btn' : 'level-btn'}>
              {level}
            </button>
          ))}
        </div>

        <hr className="hr-style" />

        {/* Semester and Graph Section */}
        <div className="semester-section">
          <Link to={`/SemSub/${semesters.sem1}/${stream}`}><button className="sem-box"><h3>{semesters.sem1}</h3></button></Link>
          <Link to={`/SemSub/${semesters.sem2}/${stream}`}><button className="sem-box"><h3>{semesters.sem2}</h3></button></Link>
        </div>

        {/* Graphs */}
        <div className="canvas-container">
          <canvas ref={chart1Ref}></canvas>
        </div>
        <div className="canvas-container">
          <canvas ref={chart2Ref}></canvas>
        </div>
      </div>
    ) : (
      <p>Access denied. This page is for Principal only.</p>
    )
  );
};

export default PrincipalMainPage;

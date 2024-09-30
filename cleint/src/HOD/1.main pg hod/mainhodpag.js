import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import './mainhod.css';
import { Link, useNavigate } from 'react-router-dom';

// Register Chart.js components
Chart.register(...registerables);

const Hodmainpage = () => {
  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedLevel, setSelectedLevel] = useState('SE');  // Default to SE
  const [semesters, setSemesters] = useState({ sem1: 'Sem 3', sem2: 'Sem 4' }); // Set to Sem 3 and Sem 4 by default
  const navigate = useNavigate();


  // Update semester display based on selected level
  const updateSemesterDisplay = (level) => {
    let semYear = 0;
    switch (level) {
      case 'SE':
        semYear = 2; // Set semYear to 2 to get Sem 3 and Sem 4
        setSemesters({ sem1: `Sem ${semYear + 1}`, sem2: `Sem ${semYear + 2}` });
        break;
      case 'TE':
        semYear = 4;
        setSemesters({ sem1: `Sem ${semYear + 1}`, sem2: `Sem ${semYear + 2}` });
        break;
      case 'BE':
        semYear = 6;
        setSemesters({ sem1: `Sem ${semYear + 1}`, sem2: `Sem ${semYear + 2}` });
        break;
      default:
        break;
    }
  };

  // Handle level selection
  const handleLevelChange = (level) => {
    setSelectedLevel(level);
    updateSemesterDisplay(level);
  };

  // Set the default semesters on initial load based on the default level (SE)
  useEffect(() => {
    updateSemesterDisplay(selectedLevel); // Initialize with SE semesters
  }, []);

  // Initialize the chart
  useEffect(() => {
    if (user) {
      const ctx1 = document.getElementById('levelChart')?.getContext('2d');
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
  
      const ctx2 = document.getElementById('levelChart2')?.getContext('2d');
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
        if (chart1) chart1.destroy();
        if (chart2) chart2.destroy();
      };
    }
  }, [user]);
  
  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  if (user.role !== "HOD") {
    return <p>Access denied. This page is for HODs only.</p>;
  }
  const toggleLogoutMenu = () => {
    const logoutMenu = document.getElementById('logoutMenu');
    logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
};

const handleLogout = () => {
    sessionStorage.removeItem('currentUser'); // Clear user session
    navigate('/'); // Redirect to login
};


  return (
    <div className="containerpd">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-bar-content">
          <Link to="/subjects"><button className="nav-btn">Subjects</button></Link>
          <div className="profile-menu">
                        <div className="profile-circle" onClick={toggleLogoutMenu}>
                            <i className="fas fa-user" />
                        </div>
                        <div id="logoutMenu" className="logout-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
          <div className="user-icon">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </div>

      {/* Year Selection Section */}
      <div className="year-selection">
        {['2024', '2023', '2022', '2021', '2020'].map(year => (
          <div key={year}
            onClick={() => setSelectedYear(year)}
            className={selectedYear === year ? 'selected-year-box' : 'year-box'}>
            {year}
          </div>
        ))}
      </div>

      <hr className="hr-style" />

      {/* Conditional Level and Semester Selection */}
      {user.department === 'FE' ? (
        // Only show Sem 1 and Sem 2 for FE department
        <div className="semester-section">
          <Link to={`/SemSubjects/Sem 1`}><button className="sem-box"><h3>Sem 1</h3></button></Link>
          <Link to={`/SemSubjects/Sem 2`}><button className="sem-box"><h3>Sem 2</h3></button></Link>
        </div>
      ) : (
        <>
          {/* Level Selection Section */}
          <div className="level-selection">
            {['SE', 'TE', 'BE'].map(level => (
              <button key={level}
                onClick={() => handleLevelChange(level)}
                className={selectedLevel === level ? 'selected-level-btn' : 'level-btn'}>
                {level}
              </button>
            ))}
          </div>

          <hr className="hr-style" />

          {/* Semester and Graph Section */}
          <div className="semester-section">
            <Link to={`/SemSubjects/${semesters.sem1}`}><button className="sem-box"><h3>{semesters.sem1}</h3></button></Link>
            <Link to={`/SemSubjects/${semesters.sem2}`}><button className="sem-box"><h3>{semesters.sem2}</h3></button></Link>
          </div>
        </>
      )}
      
      {/* Graphs */}
      <div className="canvas-container">
        <canvas id="levelChart"></canvas>
      </div>
      <div className="canvas-container">
        <canvas id="levelChart2"></canvas>
      </div>
    </div>
  );
};

export default Hodmainpage;

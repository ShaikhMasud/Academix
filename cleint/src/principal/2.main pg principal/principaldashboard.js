import React, { useState, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import './styles.css'; // Import the CSS file

// Register Chart.js components
Chart.register(...registerables);

const Principalmainpage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedLevel, setSelectedLevel] = useState('SE');
  const [semesters, setSemesters] = useState({ sem1: 'Sem 3', sem2: 'Sem 4' });

  // Update semester display based on selected level
  const updateSemesterDisplay = (level) => {
    let semYear = 0;
    switch (level) {
      case 'SE':
        semYear = 2;
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

  // Initialize the chart
  useEffect(() => {
    const ctx1 = document.getElementById('levelChart').getContext('2d');
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

    const ctx2 = document.getElementById('levelChart2').getContext('2d');
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

    // Cleanup function to destroy charts on component unmount
    return () => {
      if (chart1) chart1.destroy();
      if (chart2) chart2.destroy();
    };
  }, []);

  return (
    <div className="container">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-bar-content">
          <button className="nav-btn">Home</button>
          <button className="nav-btn">About</button>
          <button className="nav-btn">Contact</button>
          <div>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
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
        <button className="sem-box"><h3>{semesters.sem1}</h3></button>
        <button className="sem-box"><h3>{semesters.sem2}</h3></button>
      </div>

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

export default Principalmainpage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './studdb.css';

const Studdashboard = () => {
  const navigate = useNavigate();

  // Function to handle viewing a semester
  const viewSemester = (semester) => {
    if (semester === 'Honours') {
      navigate('/honours'); // Navigate to Honours page
    } else {
      navigate(`/studsem`); // Navigate to specific semester page
    }
  };

  // Handle locked semester click
  const handleLockedClick = () => {
    alert("This semester is locked!");
  };

  return (
    <div className="dashboard">
      {/* Profile Section */}
      <div className="profile-section">
        <img src="dushyant git profile pic.jpg" alt="Profile Picture" className="profile-pic" />
        <div className="personal-info">
          <h2>Dushyant Bhagwat</h2>
          <p>Roll No: 123456</p>
          <p>Information Technology, 3rd Year</p>
          <div className="cgpa">
            <h3>CGPA: 8.5</h3>
          </div>
        </div>
      </div>

      {/* Semester Cards */}
      <div className="cards-container">
        {/* Semesters 1 to 4 (completed) */}
        <div className="card unlocked" onClick={() => viewSemester(1)}>Semester 1</div>
        <div className="card unlocked" onClick={() => viewSemester(2)}>Semester 2</div>
        <div className="card unlocked" onClick={() => viewSemester(3)}>Semester 3</div>
        <div className="card unlocked" onClick={() => viewSemester(4)}>Semester 4</div>

        {/* Semester 5 (ongoing) */}
        <div className="card current-ongoing" onClick={() => viewSemester(5)}>
          Semester 5
          <span className="badge">Ongoing</span>
        </div>

        {/* Semesters 6 to 8 (locked) */}
        <div className="card locked" onClick={handleLockedClick}>Semester 6</div>
        <div className="card locked" onClick={handleLockedClick}>Semester 7</div>
        <div className="card locked" onClick={handleLockedClick}>Semester 8</div>

        {/* Honours (ongoing) */}
        <div className="card honours-ongoing" onClick={() => viewSemester('Honours')}>
          Honours
          <span className="badge">Ongoing</span>
        </div>
      </div>
    </div>
  );
};

export default Studdashboard;

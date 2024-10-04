import React, { useState, useEffect } from 'react';
import './mainhod.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Hodmainpage = () => {
  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [selectedLevel, setSelectedLevel] = useState('SE');
  const [semesters, setSemesters] = useState({ sem1: 'Sem 3', sem2: 'Sem 4' });
  const [sem1Levels, setSem1Levels] = useState({});
  const [sem2Levels, setSem2Levels] = useState({});

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

  const fetchExamData = async (semester) => {
    try {
      let depart = user.department;
      const response = await axios.post('http://localhost:3001/getSemData', { semester, depart });

      if (response.data) {
        return {
          IA1: response.data.IA1 || 'Pending',
          IA2: response.data.IA2 || 'Pending',
          Assignment: response.data.Assignment || 'Pending',
          ESE: response.data.ESE || 'Pending',
        };
      }
    } catch (error) {
      console.error('Error fetching exam data:', error);
    }
    return {
      IA1: 'Pending',
      IA2: 'Pending',
      Assignment: 'Pending',
      ESE: 'Pending',
    };
  };

  useEffect(() => {
    const fetchLevels = async () => {
      if (user?.department === 'FE') {
        const fetchedSem1Levels = await fetchExamData(1);
        const fetchedSem2Levels = await fetchExamData(2);

        if (JSON.stringify(fetchedSem1Levels) !== JSON.stringify(sem1Levels)) {
          setSem1Levels(fetchedSem1Levels);
        }
        if (JSON.stringify(fetchedSem2Levels) !== JSON.stringify(sem2Levels)) {
          setSem2Levels(fetchedSem2Levels);
        }
      } else {
        const sem1Number = semesters.sem1.slice(-1);
        const sem2Number = semesters.sem2.slice(-1);

        const fetchedSem1Levels = await fetchExamData(sem1Number);
        const fetchedSem2Levels = await fetchExamData(sem2Number);

        setSem1Levels(fetchedSem1Levels);
        setSem2Levels(fetchedSem2Levels);
      }
    };

    fetchLevels();
  }, [semesters, user]); // Added user and semesters as dependencies


  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  if (user.role !== 'HOD') {
    return <p>Access denied. This page is for HODs only.</p>;
  }

  return (
    <div className="containerpd">
      <div className="nav-bar_hoddb">
        <div className="nav-bar-content">
          <h1 className="navbar-title">Academix</h1>
          <div className="nav-btn-group">
            <Link to="/subjects">
              <button className="nav-btn-hoddb">HOD's Subjects</button>
            </Link>
            <Link to="/managefaculty">
            <button className="nav-btn-hoddb">Assign Subjects</button>
            </Link>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="year-selection-hoddb">
        {['2024', '2025', '2026', '2027', '2028'].map((year) => (
          <div
            key={year}
            onClick={() => setSelectedYear(year)}
            className={selectedYear === year ? 'selected-year-box-hoddb' : 'year-box-hoddb'}
          >
            {year}
          </div>
        ))}
      </div>

      <hr className="hr-style" /> */}

      {user.department === 'FE' ? (
        <div className="semester-section-hoddb-fe">
          {/* Semester 1 */}
          <div className="sem-box-hoddb">
            <h4>Sem 1</h4>
            <Link to={`/SemSubjects/Sem 1`}>
              <button className="sem-btn-hoddb">View Subjects</button>
            </Link>
            <div className="sem-card">
              <p>IA - 1 Level: {sem1Levels.IA1 || 'Loading...'}</p>
              <p>IA - 2 Level: {sem1Levels.IA2 || 'Loading...'}</p>
              <p>Assignment Level: {sem1Levels.Assignment || 'Loading...'}</p>
              <p>ESE Level: {sem1Levels.ESE || 'Loading...'}</p>
            </div>
          </div>

          {/* Semester 2 */}
          <div className="sem-box-hoddb">
            <h4>Sem 2</h4>
            <Link to={`/SemSubjects/Sem 2`}>
              <button className="sem-btn-hoddb">View Subjects</button>
            </Link>
            <div className="sem-card">
              <p>IA - 1 Level: {sem2Levels.IA1 || 'Loading...'}</p>
              <p>IA - 2 Level: {sem2Levels.IA2 || 'Loading...'}</p>
              <p>Assignment Level: {sem2Levels.Assignment || 'Loading...'}</p>
              <p>ESE Level: {sem2Levels.ESE || 'Loading...'}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="level-selection-hoddb2">
            {['SE', 'TE', 'BE'].map((level) => (
              <button
                key={level}
                onClick={() => handleLevelChange(level)}
                className={selectedLevel === level ? 'selected-level-btn-hoddb' : 'level-btn-hoddb'}
              >
                {level}
              </button>
            ))}
          </div>

          <hr className="hr-style" />

          <div className="semester-section-hoddb">
            {/* Semester 1 */}
            <div className="sem-box-hoddb">
              <h4>{semesters.sem1}</h4>
              <Link to={`/SemSubjects/${semesters.sem1}`}>
                <button className="sem-btn-hoddb">View Subjects</button>
              </Link>
              <div className="sem-card">
                <p>IA - 1 Level: {sem1Levels.IA1 || 'Loading...'}</p>
                <p>IA - 2 Level: {sem1Levels.IA2 || 'Loading...'}</p>
                <p>Assignment Level: {sem1Levels.Assignment || 'Loading...'}</p>
                <p>ESE Level: {sem1Levels.ESE || 'Loading...'}</p>
              </div>
            </div>

            {/* Semester 2 */}
            <div className="sem-box-hoddb">
              <h4>{semesters.sem2}</h4>
              <Link to={`/SemSubjects/${semesters.sem2}`}>
                <button className="sem-btn-hoddb">View Subjects</button>
              </Link>
              <div className="sem-card">
                <p>IA - 1 Level: {sem2Levels.IA1 || 'Loading...'}</p>
                <p>IA - 2 Level: {sem2Levels.IA2 || 'Loading...'}</p>
                <p>Assignment Level: {sem2Levels.Assignment || 'Loading...'}</p>
                <p>ESE Level: {sem2Levels.ESE || 'Loading...'}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Hodmainpage;

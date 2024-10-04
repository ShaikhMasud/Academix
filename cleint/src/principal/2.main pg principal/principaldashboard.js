import React, { useState, useEffect } from 'react';
import './principaldash.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Principalmainpage = () => {
  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedLevel, setSelectedLevel] = useState('SE');
  const [semesters, setSemesters] = useState({ sem1: 'Sem 3', sem2: 'Sem 4' });
  const [sem1Levels, setSem1Levels] = useState({});
  const [sem2Levels, setSem2Levels] = useState({});
  const {stream}=useParams();

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
      console.log(stream)
      const response = await axios.post('http://localhost:3001/getSemData', { semester });
      console.log(`Fetched data for ${semester}:`, response.data);

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
      let fetchedSem1Levels, fetchedSem2Levels;
  
      if (stream === 'FE') {
        fetchedSem1Levels = await fetchExamData(1);
        fetchedSem2Levels = await fetchExamData(2);
      } else {
        const sem1Number = semesters.sem1.slice(-1);
        const sem2Number = semesters.sem2.slice(-1);
        fetchedSem1Levels = await fetchExamData(sem1Number);
        fetchedSem2Levels = await fetchExamData(sem2Number);
      }
  
      // Only update if data has actually changed
      if (JSON.stringify(fetchedSem1Levels) !== JSON.stringify(sem1Levels)) {
        setSem1Levels(fetchedSem1Levels);
      }
  
      if (JSON.stringify(fetchedSem2Levels) !== JSON.stringify(sem2Levels)) {
        setSem2Levels(fetchedSem2Levels);
      }
    };
  
    fetchLevels();
  }, [semesters, stream]); // Removed 'user' as a dependency
  

  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  if (user.role !== 'Principal') {
    return <p>Access denied. This page is for HODs only.</p>;
  }

  return (
    <div className="containerpd">
      <div className="nav-bar_prindb">
        <div className="nav-bar-content">
          <h1 className="navbar-title">Academix</h1>
          <div className="nav-btn-group">
            <Link to="/sub">
              <button className="nav-btn-hoddb">Subjects</button>
            </Link>
            <button className="nav-btn-hoddb">Profile</button>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>

      {stream === 'FE' ? (
        <div className="semester-section-hoddb-fe">
          {/* Semester 1 */}
          <div className="sem-box-hoddb">
            <h4>Sem 1</h4>
            <Link to={`/SemSub/${semesters.sem1.slice(-1)}/FE`}>
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
            <Link to={`/SemSub/${semesters.sem2.slice(-1)}/FE`}>
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
          <div className="level-selection-hoddb">
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
              <Link to={`/SemSub/${semesters.sem1.slice(-1)}/${stream}`}>
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
              <Link to={`/SemSub/${semesters.sem2.slice(-1)}/${stream}`}>
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

export default Principalmainpage;

import React, { useState, useEffect } from 'react';
import './mainhod.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Hodmainpage = () => {
  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedLevel, setSelectedLevel] = useState('SE');
  const [semesters, setSemesters] = useState({ sem1: 'Sem 3', sem2: 'Sem 4' });
  const [sem1Levels, setSem1Levels] = useState({});
  const [sem2Levels, setSem2Levels] = useState({});

  const Allsubject = {
    "departments": [
        {
            "name": "FE",
            "semesters": [
                {
                    "semester": 1,
                    "subjects": [
                        "Mathematics I",
                        "Physics I",
                        "Chemistry II",
                        "Engineering Mechanics",
                        "Basic Electrical Engineering"
                    ],
                    "codes": ["FEC101", "FEC102", "FEC103", "FEC104", "FEC105"]
                },
                {
                    "semester": 2,
                    "subjects": [
                        "Mathematics II",
                        "Physics II",
                        "Chemistry II",
                        "Engineering Graphics",
                        "C Programming"
                    ],
                    "codes": ["FEC201", "FEC202", "FEC203", "FEC204", "FEC205"]
                }
            ]
        },
        {
            "name": "IT",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": [
                        "Engineering Mathematics-III",
                        "Discrete Mathematics",
                        "Computer Networks",
                        "Database Management Systems",
                        "Object-Oriented Programming"
                    ],
                    "codes": ["IT301", "IT302", "IT303", "IT304", "IT305"]
                },
                {
                    "semester": 4,
                    "subjects": [
                        "Operating Systems",
                        "Web Development",
                        "Software Engineering",
                        "Computer Architecture",
                        "Design and Analysis of Algorithms"
                    ],
                    "codes": ["IT401", "IT402", "IT403", "IT404", "IT405"]
                },
                {
                    "semester": 5,
                    "subjects": [
                        "Machine Learning",
                        "Mobile Application Development",
                        "Network Security",
                        "Cloud Computing",
                        "Human-Computer Interaction"
                    ],
                    "codes": ["IT501", "IT502", "IT503", "IT504", "IT505"]
                },
                {
                    "semester": 6,
                    "subjects": [
                        "Artificial Intelligence",
                        "Data Mining",
                        "Cryptography",
                        "Internet of Things",
                        "Big Data Analytics"
                    ],
                    "codes": ["IT601", "IT602", "IT603", "IT604", "IT605"]
                },
                {
                    "semester": 7,
                    "subjects": [
                        "Blockchain Technology",
                        "Cybersecurity",
                        "Advanced Databases",
                        "Distributed Systems",
                        "Soft Computing"
                    ],
                    "codes": ["IT701", "IT702", "IT703", "IT704", "IT705"]
                },
                {
                    "semester": 8,
                    "subjects": [
                        "Quantum Computing",
                        "Advanced Machine Learning",
                        "Natural Language Processing",
                        "Project Management",
                        "Entrepreneurship"
                    ],
                    "codes": ["IT801", "IT802", "IT803", "IT804", "IT805"]
                }
            ]
        },
        {
            "name": "Comps",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": [
                        "Digital Logic Design",
                        "Object-Oriented Programming",
                        "Microprocessors",
                        "Data Structures",
                        "Theory of Computation"
                    ],
                    "codes": ["COMPS301", "COMPS302", "COMPS303", "COMPS304", "COMPS305"]
                },
                {
                    "semester": 4,
                    "subjects": [
                        "Operating Systems",
                        "Database Systems",
                        "Computer Networks",
                        "Software Engineering",
                        "Computer Organization"
                    ],
                    "codes": ["COMPS401", "COMPS402", "COMPS403", "COMPS404", "COMPS405"]
                },
                {
                    "semester": 5,
                    "subjects": [
                        "Artificial Intelligence",
                        "Machine Learning",
                        "Compiler Design",
                        "Information Security",
                        "Web Technology"
                    ],
                    "codes": ["COMPS501", "COMPS502", "COMPS503", "COMPS504", "COMPS505"]
                },
                {
                    "semester": 6,
                    "subjects": [
                        "Data Science",
                        "Cloud Computing",
                        "Parallel Computing",
                        "Cryptography",
                        "Big Data Analytics"
                    ],
                    "codes": ["COMPS601", "COMPS602", "COMPS603", "COMPS604", "COMPS605"]
                },
                {
                    "semester": 7,
                    "subjects": [
                        "Blockchain",
                        "Advanced Machine Learning",
                        "Deep Learning",
                        "Cybersecurity",
                        "Embedded Systems"
                    ],
                    "codes": ["COMPS701", "COMPS702", "COMPS703", "COMPS704", "COMPS705"]
                },
                {
                    "semester": 8,
                    "subjects": [
                        "Quantum Computing Fundamentals",
                        "IoT Security",
                        "Robotics",
                        "Software Testing",
                        "Project Development"
                    ],
                    "codes": ["COMPS801", "COMPS802", "COMPS803", "COMPS804", "COMPS805"]
                }
            ]
        },
        {
            "name": "Mech",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": [
                        "Thermodynamics",
                        "Mechanics of Materials",
                        "Fluid Mechanics",
                        "Engineering Materials",
                        "Manufacturing Processes"
                    ],
                    "codes": ["MECH301", "MECH302", "MECH303", "MECH304", "MECH305"]
                },
                {
                    "semester": 4,
                    "subjects": [
                        "Heat Transfer",
                        "Dynamics of Machinery",
                        "Material Science",
                        "Production Technology",
                        "Machine Drawing"
                    ],
                    "codes": ["MECH401", "MECH402", "MECH403", "MECH404", "MECH405"]
                },
                {
                    "semester": 5,
                    "subjects": [
                        "Automobile Engineering",
                        "Refrigeration and Air Conditioning",
                        "Robotics",
                        "Industrial Engineering",
                        "Control Systems"
                    ],
                    "codes": ["MECH501", "MECH502", "MECH503", "MECH504", "MECH505"]
                },
                {
                    "semester": 6,
                    "subjects": [
                        "Power Plant Engineering",
                        "Finite Element Analysis",
                        "Advanced Manufacturing",
                        "Mechatronics",
                        "Fluid Power Systems"
                    ],
                    "codes": ["MECH601", "MECH602", "MECH603", "MECH604", "MECH605"]
                },
                {
                    "semester": 7,
                    "subjects": [
                        "Automotive Engineering",
                        "Vibration Engineering",
                        "Engineering Economics",
                        "Computer-Aided Design",
                        "Product Design"
                    ],
                    "codes": ["MECH701", "MECH702", "MECH703", "MECH704", "MECH705"]
                },
                {
                    "semester": 8,
                    "subjects": [
                        "Advanced Thermodynamics",
                        "Renewable Energy",
                        "Project Management",
                        "Advanced CAD/CAM",
                        "Robotics Engineering"
                    ],
                    "codes": ["MECH801", "MECH802", "MECH803", "MECH804", "MECH805"]
                }
            ]
        },
        {
            "name": "EXTC",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": [
                        "Signals and Systems",
                        "Analog Circuits",
                        "Digital Electronics",
                        "Network Analysis",
                        "Microprocessors"
                    ],
                    "codes": ["EXTC301", "EXTC302", "EXTC303", "EXTC304", "EXTC305"]
                },
                {
                    "semester": 4,
                    "subjects": [
                        "Control Systems",
                        "Analog Communication",
                        "Digital Signal Processing",
                        "Electromagnetic Theory",
                        "Microcontrollers"
                    ],
                    "codes": ["EXTC401", "EXTC402", "EXTC403", "EXTC404", "EXTC405"]
                },
                {
                    "semester": 5,
                    "subjects": [
                        "Wireless Communication",
                        "Optical Communication",
                        "VLSI Design",
                        "Information Theory",
                        "Telecommunication Networks"
                    ],
                    "codes": ["EXTC501", "EXTC502", "EXTC503", "EXTC504", "EXTC505"]
                },
                {
                    "semester": 6,
                    "subjects": [
                        "Digital Communication",
                        "Embedded Systems",
                        "Antenna Theory",
                        "Satellite Communication",
                        "Network Security"
                    ],
                    "codes": ["EXTC601", "EXTC602", "EXTC603", "EXTC604", "EXTC605"]
                },
                {
                    "semester": 7,
                    "subjects": [
                        "IoT in Communication",
                        "Advanced Communication Systems",
                        "RF Circuit Design",
                        "Mobile Communication",
                        "Microwave Engineering"
                    ],
                    "codes": ["EXTC701", "EXTC702", "EXTC703", "EXTC704", "EXTC705"]
                },
                {
                    "semester": 8,
                    "subjects": [
                        "Optical Networks",
                        "5G Networks",
                        "Wireless Sensor Networks",
                        "Project Management",
                        "Communication Protocols"
                    ],
                    "codes": ["EXTC801", "EXTC802", "EXTC803", "EXTC804", "EXTC805"]
                }
            ]
        }
    ]
  }

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
      const response = await axios.post('http://localhost:3001/getSemData', { semester });

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

  const fetchReportData = async (subject, semester) => {
    console.log("passed params: ", subject, semester);
    try {
      const response = await axios.get('http://localhost:3001/getAttainmentData', {
        params: { subject, semester }, // Correctly passing params
      });

      console.log("HERE BRO", response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };

  const generatePDF = async () => {
    const doc = new jsPDF();
    
    // Set font style to bold
    doc.setFont('Times New Roman', 'bold');
    
    // Get the width of the page and the text
    const title = 'CO-PO Report';
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(title);
    
    // Calculate x position to center the text
    const xPosition = (pageWidth - textWidth) / 2;

    // Underline the title
    const yPosition = 10; // Starting Y position
    doc.text(title, xPosition, yPosition);
    const titleLineHeight = 5; // Adjust as needed
    doc.line(xPosition, yPosition + 1, xPosition + textWidth, yPosition + 1); // Draw underline

    // Reset font style back to normal
    doc.setFont('Times New Roman', 'normal');
    
    let currentY = yPosition + titleLineHeight + 5;

    // Traverse through departments
    for (const department of Allsubject.departments) {
      if (currentY > 280) {
        doc.addPage();
        currentY = 10;
      }

      doc.setFont('Times New Roman', 'bold');
      if(department.name === 'Comps'){
        doc.text('Computer Engineering (COMPS)', 10, currentY);
        currentY += 10;
      } else if(department.name === 'IT'){
        doc.text('Information Technology Engineering (IT)', 10, currentY);
        currentY += 10;
      } else if(department.name === 'Mech'){
        doc.text('Mechanical Engineering (MECH)', 10, currentY);
        currentY += 10;
      }  else if(department.name === 'EXTC'){
        doc.text('Electronics and Telecommunication Engineering (EXTC)', 10, currentY);
        currentY += 10;
      } else {
        doc.text('First Year Engineering (FE)', 10, currentY);
        currentY += 10;
      }
      doc.setFont('Times New Roman', 'normal');
      let flag = 0;

        // Traverse through semesters in each department
        for (const semesterData of department.semesters) {
            const { semester, subjects, codes } = semesterData;
            let flag2 = 0;

            for (let i = 0; i < subjects.length; i++) {
                const subject = subjects[i];
                const code = codes[i];

                console.log("sended params: ", subject, semester);
                // Fetch the data for the current subject and semester
                const attainmentData = await fetchReportData(subject, semester);

                // If data exists, add it to the PDF
                if (attainmentData) {
                    if(flag2 === 0){
                      doc.setFont('Times New Roman', 'bold');
                      doc.text(`Semester - ${semester}`, 15, currentY);
                      currentY += 10;
                      flag2 = 1;
                      doc.setFont('Times New Roman', 'normal');
                    }
                    if (currentY > 280) {
                      doc.addPage();
                      currentY = 10;
                    }
                    flag = 1;
                    doc.text(`${code} - ${subject}`, 15, currentY);
                    currentY += 10; // Increment Y position after subject title

                    if (currentY > 280) {
                      doc.addPage();
                      currentY = 10;
                    }
                    // CO Attainment Table
                    doc.text('CO-Attainment', 17, currentY);
                    currentY += 5; // Increment Y position after CO Attainment title
                    doc.autoTable({
                        startY: currentY,
                        head: [['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6']],
                        body: [attainmentData.Co_attainment],
                        theme: 'grid', // Optional: Set a theme for better visuals
                    });
                    currentY = doc.autoTable.previous.finalY + 10; // Update Y position after table

                    if (currentY > 280) {
                      doc.addPage();
                      currentY = 10;
                    }

                    // PO Attainment Table
                    if (attainmentData.Po_attainment) {
                        doc.text('PO-Attainment', 17, currentY);
                        currentY += 5;
                        doc.autoTable({
                            startY: currentY,
                            head: [['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12']],
                            body: [attainmentData.Po_attainment], // Ensure it's an array of arrays
                            theme: 'grid', // Optional: Set a theme for better visuals
                        });
                        currentY = doc.autoTable.previous.finalY + 10; // Update Y position after table
                    } else {
                        // Handle the case when Po_attainment is null
                        doc.text('PO-Attainment data is not available.', 17, currentY);
                        currentY += 20; // Increment Y position after the message
                    }
                }
            }
        }
        if(flag === 0){
          doc.text('Department data not found', 12, currentY);
          currentY += 20;
        }
      }
    // Save the PDF
    doc.save('Report.pdf');
};


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
              <button className="nav-btn-hoddb">Subjects</button>
            </Link>
            <button className="nav-btn-hoddb" onClick={() => generatePDF()}>Report</button>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>

      <div className="year-selection-hoddb">
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

      <hr className="hr-style" />

      {user.department === 'FE' ? (
        <div className="semester-section-hoddb">
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

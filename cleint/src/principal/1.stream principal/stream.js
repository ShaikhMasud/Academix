import React, { useState, useEffect, useRef } from 'react';
import './stream.css'; // Ensure this is the path to your CSS file
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const StreamPage = () => {

  const departments = [
    { name: 'Information Technology Engineering', shortName: 'IT', color: '#4ade80' },
    { name: 'Computer Engineering', shortName: 'Comps', color: '#4C4E52' },
    { name: 'Electronics & Telecommunication Engg.', shortName: 'EXTC', color: '#f87171' },
    { name: 'Mechanical Engineering', shortName: 'Mech', color: '#fb923c' },
    { name: 'First Year Engineering', shortName: 'FE', color: '#7851a9' },
  ];

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

  const navigate = useNavigate();

  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [isMenuVisible, setMenuVisible] = useState(false);
  const cardRefs = useRef([]);

  const logout = () => {
    alert('Logging out...');
    // Add your logout logic here
  };

  const handleCardClick = (stream) => {
    window.location.href = `/${stream}-overview.html`;
  };

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
  const toggleLogoutMenu = () => {
    const logoutMenu = document.getElementById('logoutMenu');
    logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
};

const handleLogout = () => {
    sessionStorage.removeItem('currentUser'); // Clear user session
    navigate('/'); // Redirect to login
};

const deleteall = () => {
  // Ask if they need a CO-PO report
  const needReport = window.confirm("Do you need a CO-PO report for the data?");
  
  if (needReport) {
    // If yes, call the generatePdf() function
    generatePDF();
  }
  
  // Ask if they are sure about deleting the data
  const confirmDelete = window.confirm("Are you sure you want to delete all data?");
  
  if (confirmDelete) {
    // If confirmed, make the API call to delete all data
    axios.post('http://localhost:3001/deleteall')
      .then(() => {
        alert("Deleted all data");
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
        alert("Error deleting data");
      });
  } else {
    // If not confirmed, do nothing
    alert("Deletion cancelled");
  }
}


  return (
    user.role==="Principal"?(
    <div>
      {/* <div className="nav-bar_hoddb">
        <div className="nav-bar-content">
          <h1 className="navbar-title">Academix</h1>
          <div className="nav-btn-group">
            <button className="nav-btn-hoddb" onClick={() => generatePDF()}>Report</button>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container">
      <div className="header-container">
        <h1 className="maintitle">Department Dashboard</h1>
        <button className="dashboard-btn" onClick={() => generatePDF()}>Generate Report</button>
        <button className="dashboard-btn2" onClick={() => deleteall()}>Start New Semester</button>
      </div>

      <div className="card-container">
        {departments.map((dept) => (
          <div key={dept.shortName} className="card" style={{ borderColor: dept.color }}>
            <h2 className="department-name">{dept.name}</h2>
            <span
              className="short-name"
              style={{ backgroundColor: `${dept.color}30`, color: dept.color }}
            >
              {dept.shortName}
            </span>
            <p className="description">Access department details</p>
            <Link to={`/stream_analysis/${dept.shortName}`}>
              <button className="button" style={{ backgroundColor: dept.color }}>
                Open Dashboard
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
    ):(
      <p>Access denied. This page is for Pricipal only.</p>
    )
  );
};

export default StreamPage;

import React from 'react';
import './subject.css';
import bgImg1 from './bg img/b.JPG'; 
import bgImg2 from './bg img/b2.JPG'; 
import bgImg3 from './bg img/b3.JPG'; 
import bgImg4 from './bg img/b4.JPG'; 
import bgImg5 from './bg img/b5.JPG'; 
import { useParams,useNavigate } from "react-router-dom";

const Subjectpageprin = () => {
  const navigate = useNavigate();

  const Allsubject = {
    "departments": [
        {
            "name": "FE",
            "semesters": [
                {
                    "semester": 1,
                    "subjects": ["Mathematics I", "Physics I", "chemistry", "Engineering Mechanics", "Basic Electrical Engineering"]
                },
                {
                    "semester": 2,
                    "subjects": ["Mathematics II", "Physics II", "Chemistry II", "Engineering Drawing", "Introduction to Programming"]
                }
            ]
        },
        {
            "name": "IT",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": ["Engineering Mathematics-III", "Discrete Mathematics", "Computer Networks", "Database Management Systems", "Object-Oriented Programming"]
                },
                {
                    "semester": 4,
                    "subjects": ["Operating Systems", "Web Development", "Software Engineering", "Computer Architecture", "Design and Analysis of Algorithms"]
                },
                {
                    "semester": 5,
                    "subjects": ["Machine Learning", "Mobile Application Development", "Network Security", "Cloud Computing", "Human-Computer Interaction"]
                },
                {
                    "semester": 6,
                    "subjects": ["Artificial Intelligence", "Data Mining", "Cryptography", "Internet of Things", "Big Data Analytics"]
                },
                {
                    "semester": 7,
                    "subjects": ["Blockchain Technology", "Cybersecurity", "Advanced Databases", "Distributed Systems", "Soft Computing"]
                },
                {
                    "semester": 8,
                    "subjects": ["Quantum Computing", "Advanced Machine Learning", "Natural Language Processing", "Project Management", "Entrepreneurship"]
                }
            ]
        },
        {
            "name": "Comps",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": ["Digital Logic Design", "Object-Oriented Programming", "Microprocessors", "Data Structures", "Theory of Computation"]
                },
                {
                    "semester": 4,
                    "subjects": ["Operating Systems", "Database Systems", "Computer Networks", "Software Engineering", "Computer Organization"]
                },
                {
                    "semester": 5,
                    "subjects": ["Artificial Intelligence", "Machine Learning", "Compiler Design", "Information Security", "Web Technology"]
                },
                {
                    "semester": 6,
                    "subjects": ["Data Science", "Cloud Computing", "Parallel Computing", "Cryptography", "Big Data Analytics"]
                },
                {
                    "semester": 7,
                    "subjects": ["Blockchain", "Advanced Machine Learning", "Deep Learning", "Cybersecurity", "Embedded Systems"]
                },
                {
                    "semester": 8,
                    "subjects": ["Quantum Computing Fundamentals", "IoT Security", "Robotics", "Software Testing", "Project Development"]
                }
            ]
        },
        {
            "name": "Mech",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": ["Thermodynamics", "Mechanics of Materials", "Fluid Mechanics", "Engineering Materials", "Manufacturing Processes"]
                },
                {
                    "semester": 4,
                    "subjects": ["Heat Transfer", "Dynamics of Machinery", "Material Science", "Production Technology", "Machine Drawing"]
                },
                {
                    "semester": 5,
                    "subjects": ["Automobile Engineering", "Refrigeration and Air Conditioning", "Robotics", "Industrial Engineering", "Control Systems"]
                },
                {
                    "semester": 6,
                    "subjects": ["Power Plant Engineering", "Finite Element Analysis", "Advanced Manufacturing", "Mechatronics", "Fluid Power Systems"]
                },
                {
                    "semester": 7,
                    "subjects": ["Automotive Engineering", "Vibration Engineering", "Engineering Economics", "Computer-Aided Design", "Product Design"]
                },
                {
                    "semester": 8,
                    "subjects": ["Advanced Thermodynamics", "Renewable Energy", "Project Management", "Advanced CAD/CAM", "Robotics Engineering"]
                }
            ]
        },
        {
            "name": "EXTC",
            "semesters": [
                {
                    "semester": 3,
                    "subjects": ["Signals and Systems", "Analog Circuits", "Digital Electronics", "Network Analysis", "Microprocessors"]
                },
                {
                    "semester": 4,
                    "subjects": ["Control Systems", "Analog Communication", "Digital Signal Processing", "Electromagnetic Theory", "Microcontrollers"]
                },
                {
                    "semester": 5,
                    "subjects": ["Wireless Communication", "Optical Communication", "VLSI Design", "Information Theory", "Telecommunication Networks"]
                },
                {
                    "semester": 6,
                    "subjects": ["Digital Communication", "Embedded Systems", "Antenna Theory", "Satellite Communication", "Network Security"]
                },
                {
                    "semester": 7,
                    "subjects": ["IoT in Communication", "Advanced Communication Systems", "RF Circuit Design", "Mobile Communication", "Microwave Engineering"]
                },
                {
                    "semester": 8,
                    "subjects": ["Optical Networks", "5G Networks", "Wireless Sensor Networks", "Project Management", "Communication Protocols"]
                }
            ]
        }
    ]
};

  const { sem, stream } = useParams();
  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;


  if (!user) {
    return <p>Please log in to access this page.</p>;
  }

  // Find the department and semester dynamically
  const department = Allsubject.departments.find(dep => dep.name.toLowerCase() === stream.toLowerCase());
  if (!department) {
    return <p>Department not found.</p>;
  }

  const semesterObj = department.semesters.find(semObj => `Sem ${semObj.semester}` === sem);
  if (!semesterObj) {
    return <p>Semester not found.</p>;
  }
  const toggleLogoutMenu = () => {
    const logoutMenu = document.getElementById('logoutMenu');
    logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
};

const handleLogout = () => {
    sessionStorage.removeItem('currentUser'); // Clear user session
    navigate('/'); // Redirect to login
};

  const subjectImages = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5];

  return (
    user.role === "Principal" ? (
      <div className="App">
        <nav className="curved-nav">
          <div className="nav-content">

          <div className="profile-menu">
                        <div className="profile-circle" onClick={toggleLogoutMenu}>
                            <i className="fas fa-user" />
                        </div>
                        <div id="logoutMenu" className="logout-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
          </div>
        </nav>

        <div className="card-container">
          {semesterObj.subjects.map((subject, index) => (
            <div className="skill-card" key={subject}>
              <img
                className="skill-card__background"
                src={subjectImages[index % subjectImages.length]}  // Cycle through available images
                alt="Course background"
              />
              <div className="skill-card__content">
                <div className="skill-card__content--container">
                  <h2 className="skill-card__title">
                    {subject}
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
          ))}
        </div>
      </div>
    ) : (
      <p>Access denied. This page is for Principal only.</p>
    )
  );
};

export default Subjectpageprin;

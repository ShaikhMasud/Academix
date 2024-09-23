import React from 'react';
import './subject.css';
import bgImg1 from './bg img/b.JPG'; 
import bgImg2 from './bg img/b2.JPG'; 
import bgImg3 from './bg img/b3.JPG'; 
import bgImg4 from './bg img/b4.JPG'; 
import bgImg5 from './bg img/b5.JPG'; 
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

const Subjectpagehod = () => {
  const Allsubject = {
    "departments": [
      {
        "name": "FE",
        "semesters": [
          {
            "semester": 1,
            "subjects": ["Mathematics I", "Physics I", "Chemistry II", "Engineering Mechanics", "Basic Electrical Engineering"],
            "codes": ["FEC101", "FEC102", "FEC103", "FEC104", "FEC105"]
          },
          {
            "semester": 2,
            "subjects": ["Mathematics II", "Physics II", "Chemistry II", "Engineering Graphics", "C Programming"],
            "codes": ["FEC201", "FEC202", "FEC203", "FEC204", "FEC205"]
          }
        ]
      },
      {
        "name": "IT",
        "semesters": [
          {
            "semester": 3,
            "subjects": ["Engineering Mathematics-III", "Discrete Mathematics", "Computer Networks", "Database Management Systems", "Object-Oriented Programming"],
            "codes": ["IT301", "IT302", "IT303", "IT304", "IT305"]
          },
          {
            "semester": 4,
            "subjects": ["Operating Systems", "Web Development", "Software Engineering", "Computer Architecture", "Design and Analysis of Algorithms"],
            "codes": ["IT401", "IT402", "IT403", "IT404", "IT405"]
          },
          {
            "semester": 5,
            "subjects": ["Machine Learning", "Mobile Application Development", "Network Security", "Cloud Computing", "Human-Computer Interaction"],
            "codes": ["IT501", "IT502", "IT503", "IT504", "IT505"]
          },
          {
            "semester": 6,
            "subjects": ["Artificial Intelligence", "Data Mining", "Cryptography", "Internet of Things", "Big Data Analytics"],
            "codes": ["IT601", "IT602", "IT603", "IT604", "IT605"]
          },
          {
            "semester": 7,
            "subjects": ["Blockchain Technology", "Cybersecurity", "Advanced Databases", "Distributed Systems", "Soft Computing"],
            "codes": ["IT701", "IT702", "IT703", "IT704", "IT705"]
          },
          {
            "semester": 8,
            "subjects": ["Quantum Computing", "Advanced Machine Learning", "Natural Language Processing", "Project Management", "Entrepreneurship"],
            "codes": ["IT801", "IT802", "IT803", "IT804", "IT805"]
          }
        ]
      },
      {
        "name": "Comps",
        "semesters": [
          {
            "semester": 3,
            "subjects": ["Digital Logic Design", "Object-Oriented Programming", "Microprocessors", "Data Structures", "Theory of Computation"],
            "codes": ["COMPS301", "COMPS302", "COMPS303", "COMPS304", "COMPS305"]
          },
          {
            "semester": 4,
            "subjects": ["Operating Systems", "Database Systems", "Computer Networks", "Software Engineering", "Computer Organization"],
            "codes": ["COMPS401", "COMPS402", "COMPS403", "COMPS404", "COMPS405"]
          },
          {
            "semester": 5,
            "subjects": ["Artificial Intelligence", "Machine Learning", "Compiler Design", "Information Security", "Web Technology"],
            "codes": ["COMPS501", "COMPS502", "COMPS503", "COMPS504", "COMPS505"]
          },
          {
            "semester": 6,
            "subjects": ["Data Science", "Cloud Computing", "Parallel Computing", "Cryptography", "Big Data Analytics"],
            "codes": ["COMPS601", "COMPS602", "COMPS603", "COMPS604", "COMPS605"]
          },
          {
            "semester": 7,
            "subjects": ["Blockchain", "Advanced Machine Learning", "Deep Learning", "Cybersecurity", "Embedded Systems"],
            "codes": ["COMPS701", "COMPS702", "COMPS703", "COMPS704", "COMPS705"]
          },
          {
            "semester": 8,
            "subjects": ["Quantum Computing", "IoT Security", "Robotics", "Software Testing", "Project Development"],
            "codes": ["COMPS801", "COMPS802", "COMPS803", "COMPS804", "COMPS805"]
          }
        ]
      },
      {
        "name": "Mech",
        "semesters": [
          {
            "semester": 3,
            "subjects": ["Thermodynamics", "Mechanics of Materials", "Fluid Mechanics", "Engineering Materials", "Manufacturing Processes"],
            "codes": ["MECH301", "MECH302", "MECH303", "MECH304", "MECH305"]
          },
          {
            "semester": 4,
            "subjects": ["Heat Transfer", "Dynamics of Machinery", "Material Science", "Production Technology", "Machine Drawing"],
            "codes": ["MECH401", "MECH402", "MECH403", "MECH404", "MECH405"]
          },
          {
            "semester": 5,
            "subjects": ["Automobile Engineering", "Refrigeration and Air Conditioning", "Robotics", "Industrial Engineering", "Control Systems"],
            "codes": ["MECH501", "MECH502", "MECH503", "MECH504", "MECH505"]
          },
          {
            "semester": 6,
            "subjects": ["Power Plant Engineering", "Finite Element Analysis", "Advanced Manufacturing", "Mechatronics", "Fluid Power Systems"],
            "codes": ["MECH601", "MECH602", "MECH603", "MECH604", "MECH605"]
          },
          {
            "semester": 7,
            "subjects": ["Automotive Engineering", "Vibration Engineering", "Engineering Economics", "Computer-Aided Design", "Product Design"],
            "codes": ["MECH701", "MECH702", "MECH703", "MECH704", "MECH705"]
          },
          {
            "semester": 8,
            "subjects": ["Advanced Thermodynamics", "Renewable Energy", "Project Management", "Advanced CAD/CAM", "Robotics Engineering"],
            "codes": ["MECH801", "MECH802", "MECH803", "MECH804", "MECH805"]
          }
        ]
      },
      {
        "name": "EXTC",
        "semesters": [
          {
            "semester": 3,
            "subjects": ["Signals and Systems", "Analog Circuits", "Digital Electronics", "Network Analysis", "Microprocessors"],
            "codes": ["EXTC301", "EXTC302", "EXTC303", "EXTC304", "EXTC305"]
          },
          {
            "semester": 4,
            "subjects": ["Control Systems", "Analog Communication", "Digital Signal Processing", "Electromagnetic Theory", "Microcontrollers"],
            "codes": ["EXTC401", "EXTC402", "EXTC403", "EXTC404", "EXTC405"]
          },
          {
            "semester": 5,
            "subjects": ["Wireless Communication", "Optical Communication", "VLSI Design", "Information Theory", "Telecommunication Networks"],
            "codes": ["EXTC501", "EXTC502", "EXTC503", "EXTC504", "EXTC505"]
          },
          {
            "semester": 6,
            "subjects": ["Digital Communication", "Embedded Systems", "Antenna Theory", "Satellite Communication", "Network Security"],
            "codes": ["EXTC601", "EXTC602", "EXTC603", "EXTC604", "EXTC605"]
          },
          {
            "semester": 7,
            "subjects": ["IoT in Communication", "Advanced Communication Systems", "RF Circuit Design", "Mobile Communication", "Microwave Engineering"],
            "codes": ["EXTC701", "EXTC702", "EXTC703", "EXTC704", "EXTC705"]
          },
          {
            "semester": 8,
            "subjects": ["Optical Networks", "5G Networks", "Wireless Sensor Networks", "Project Management", "Communication Protocols"],
            "codes": ["EXTC801", "EXTC802", "EXTC803", "EXTC804", "EXTC805"]
          }
        ]
      }
    ]
  };

  const { sem } = useParams();
  
  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const stream =user.department;
  const toggleLogoutMenu = () => {
    const logoutMenu = document.getElementById('logoutMenu');
    logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
  };

  const logout = () => {
    alert('Logging out...');
    // Add your logout logic here
  };

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

  const subjectImages = [bgImg1, bgImg2, bgImg3, bgImg4, bgImg5];

  return (
    user.role === "HOD" ? (
      <div className="App">
        <nav className="curved-nav">
          <div className="nav-content">
            <Link to="/managefaculty">
              <button className="nav-btn">Manage Faculty</button>
            </Link>
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
      <p>Access denied. This page is for HOD only.</p>
    )
  );
};

export default Subjectpagehod;

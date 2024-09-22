import React, { useState, useEffect } from 'react';
import './db_faculty.css';
import { Link } from 'react-router-dom';
import bgImage from './bg img/b.JPG';
import graphIcon from './bg img/graph.png';
import coIcon from './bg img/co.png';
import profPic from './bg img/prof.jpeg';

function Prin_sub() {
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [showGraph, setShowGraph] = useState(false);

    const Allsubject = {
        "departments": [
            {
                "name": "First Year",
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
                "name": "FE",
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
                "name": "Computer Engineering",
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
                        "subjects": ["Quantum Computing", "IoT Security", "Robotics", "Software Testing", "Project Development"]
                    }
                ]
            },
            {
                "name": "Mechanical Engineering",
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

    const findSemester = (departmentName, subjectName) => {
        const department = Allsubject.departments.find(dep => dep.name === departmentName);
        if (department) {
            for (const semester of department.semesters) {
                if (semester.subjects.includes(subjectName)) {
                    return semester.semester;
                }
            }
        }
        return null; // Return null if not found
    };

    const toggleGraph = () => {
        setShowGraph(prevShowGraph => !prevShowGraph);
    };

    const toggleLogoutMenu = () => {
        const logoutMenu = document.getElementById('logoutMenu');
        logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
    };

    const handleLogout = () => {
        alert('Logging out...');
        // Add your logout logic here
    };

    useEffect(() => {
        // Initialize Chart.js or other required setup here if needed
    }, []);

    if (!user) {
        return <p>Please log in to access this page.</p>;
    }

    const subjectsAssigned = user.Subjects_assigned || [];

    return user.role === 'Principal' ? (
        <>
            <nav className="curved-nav">
                <div className="nav-content">
                    <Link to="/principaldashboard">
                        <button className="nav-btn">Home</button>
                    </Link>
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
                {subjectsAssigned.length > 0 ? (
                    subjectsAssigned.map((subject, index) => {
                        const semester = findSemester(user.department, subject); // Assuming user has a department property
                        return (
                            <article className="skill-card" key={index} data-aos="zoom-in" data-aos-delay={350}>
                                <img
                                    className="skill-card__background"
                                    src={bgImage}
                                    alt="Background"
                                    width={1920}
                                    height={2193}
                                />
                                <div className="skill-card__content | flow">
                                    <div className="skill-card__content--container | flow">
                                        <button className="icon-button" onClick={toggleGraph}>
                                            <img src={graphIcon} alt="Graph Icon" />
                                        </button>
                                        <Link to={`/co_po/${subject}/${semester}`}>                                            
                                                <button className="icon-button">
                                                <img src={coIcon} alt="CO Icon" />
                                            </button>
                                        </Link>
                                        <h2 className="skill-card__title">{subject}</h2>
                                        <pre className="skill-card__description">
                                        <Link to={`/iamarks_entry/${subject}/${semester}/${1}`}>                                                
                                                <button className="btn">IA 1</button> - LEVEL 2{"\n"}
                                                </Link>
                                                <Link to={`/iamarks_entry/${subject}/${semester}/${2}`}>                                                
                                                <button className="btn">IA 2</button> - LEVEL 1{"\n"}
                                            </Link>
                                            <button className="btn">INTERNAL</button> - LEVEL 2{"\n"}
                                            <button className="btn">ESE</button> - LEVEL 1{"\n"}
                                            <p>Semester: {semester !== null ? semester : 'Not Found'}</p>
                                        </pre>
                                    </div>
                                </div>
                            </article>
                        );
                    })
                ) : (
                    <p>No subjects assigned.</p>
                )}

                <div className="profile">
                    <img className="profile-pic" src={profPic} alt="Profile" />
                </div>
            </div>
        </>
    ) : (
        <p>Access Denied. This page is only for Principal Only.</p>
    );
}

export default Prin_sub;

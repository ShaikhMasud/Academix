import React, { useState, useEffect, useRef } from 'react';
import './db_faculty.css';
import { Link } from 'react-router-dom';
import bgImage from './bg img/b.JPG';
import graphIcon from './bg img/graph.png';
import coIcon from './bg img/co.png';
import profPic from './bg img/prof.jpeg';
import { Chart } from 'chart.js';


function Subjects() {
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [showGraph, setShowGraph] = useState(false);
    const chartRef = useRef(null);

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
                            "Quantum Computing",
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
            // Your departments and semesters data...
        ]
    }

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

    useEffect(() => {
        if (showGraph && chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Level 0', 'Level 1', 'Level 2', 'Level 3'],
                    datasets: [{
                        label: 'Level Distribution',
                        data: [10, 20, 30, 40], // Example data
                        backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56'],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [showGraph]);

    const toggleLogoutMenu = () => {
        const logoutMenu = document.getElementById('logoutMenu');
        logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
    };

    const handleLogout = () => {
        alert('Logging out...');
        // Add your logout logic here
    };

    if (!user) {
        return <p>Please log in to access this page.</p>;
    }

    const subjectsAssigned = user.Subjects_assigned || [];

    return user.role === 'Teacher' ? (
        <>
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
                {subjectsAssigned.length > 0 ? (
                    subjectsAssigned.map((subject, index) => {
                        const semester = findSemester(user.department, subject);
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
                                        <Link to={`/co-po-map/${subject}/${semester}`}>
                                            <button className="icon-button">
                                                <img src={coIcon} alt="CO Icon" />
                                            </button>
                                        </Link>
                                        <h2 className="skill-card__title">{subject}</h2>
                                        <pre className="skill-card__description">
                                            <Link to={`/ia/${subject}/${semester}/${1}`}>
                                                <button className="btn">IA 1</button> - LEVEL 2{"\n"}
                                            </Link>
                                            <Link to={`/ia/${subject}/${semester}/${2}`}>
                                                <button className="btn">IA 2</button> - LEVEL 1{"\n"}
                                            </Link>
                                            <Link to={`/assignment/${subject}/${semester}`}>
                                            <button className="btn">INTERNAL</button> - LEVEL 2{"\n"}
                                            </Link>
                                            <Link to={`/ia/${subject}/${semester}/${3}`}>
                                            <button className="btn">ESE</button> - LEVEL 1{"\n"}
                                            </Link>
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
                    <p className='name'>Hello! {user.name}</p>
                </div>

                {/* Conditionally render the graph and table */}
                {showGraph && (
                    <div id="graphAndTableContainer">
                        <div id="graphContainer">
                            <canvas id="levelChart" ref={chartRef}></canvas>
                        </div>
                        <div id="tableContainer">
                            <h3>CO Attainment Table</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>CO1</th>
                                        <th>CO2</th>
                                        <th>CO3</th>
                                        <th>CO4</th>
                                        <th>CO5</th>
                                        <th>CO6</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>IA - 1</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>IA - 2</td>
                                        <td></td>
                                        <td>3</td>
                                        <td></td>
                                        <td>3</td>
                                        <td>1</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>Average</td>
                                        <td>2</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>2.5</td>
                                        <td>1</td>
                                        <td>2</td>
                                    </tr>
                                    <tr>
                                        <td>ASSGT</td>
                                        <td></td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>1</td>
                                        <td>2</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </>
    ) : (
        <p>Access Denied. This page is only for HODs Only.</p>
    );
}

export default Subjects;

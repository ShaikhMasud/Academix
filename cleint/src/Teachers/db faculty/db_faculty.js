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
            // Your departments and semesters data...
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

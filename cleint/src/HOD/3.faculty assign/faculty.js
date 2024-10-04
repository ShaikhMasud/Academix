import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './faculty.css'; 
import { Link,useNavigate } from 'react-router-dom';

const FacultyAssignment = () => {
    const navigate = useNavigate();


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

    // Get current user from sessionStorage
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [subjects, setSubjects] = useState([]);
    const [filter, setFilter] = useState('all');
    const [teachers, setTeachers] = useState([]);
    const [message, setMessage] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [hasChanges, setHasChanges] = useState(true);

    const department = user ? user.department : null;

    // Fetch teachers based on department
    useEffect(() => {
        if (department) {
            const fetchTeachers = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/dept_faculty?department=${department}`);
                    const teacherData = response.data;

                    console.log('Fetched teachers:', teacherData); // Debugging

                    // Update teachers state with the fetched data
                    setTeachers(teacherData); // Store full teacher objects

                    // If a semester is already selected (e.g., after page reload), fetch subjects
                    if (selectedSemester) {
                        setSubjectsForSemester(selectedSemester, teacherData);
                    }
                } catch (error) {
                    console.error('Error fetching teachers:', error);
                }
            };

            fetchTeachers();
        }
    }, [department]);

    // Function to set subjects based on selected semester
    const setSubjectsForSemester = (semesterNumber, teacherData = teachers) => {
        const deptData = Allsubject.departments.find(dep => dep.name === department);
        console.log('Department Data:', deptData); // Debugging

        if (!deptData) {
            console.error('Department not found in subject data');
            return;
        }

        const semesterData = deptData.semesters.find(sem => sem.semester === semesterNumber);
        console.log('Semester Data:', semesterData); // Debugging

        if (!semesterData) {
            console.error(`Semester ${semesterNumber} not found in department ${department}`);
            setSubjects([]);
            return;
        }

        const { subjects: semesterSubjects, codes: semesterCodes } = semesterData;

        const newSubjects = semesterSubjects.map((subject, index) => {
            const code = semesterCodes[index];
            // Find the teacher who has this subject assigned
            const assignedTeacher = teacherData.find(teacher => teacher.Subjects_assigned && teacher.Subjects_assigned.includes(subject));
            console.log(`Subject: ${subject}, Assigned Teacher: ${assignedTeacher ? assignedTeacher.name : 'None'}`); // Debugging
            return {
                code: code,
                course: subject,
                faculty: assignedTeacher ? assignedTeacher.name : '',
                type: determineSubjectType(subject, semesterNumber) // Function to determine type
            };
        });

        setSubjects(newSubjects);
    };

    // Function to determine subject type based on some logic
    const determineSubjectType = (subject, semesterNumber) => {
        // Example logic: first few semesters are lab, others are theory
        // Adjust based on actual data
        if (department === 'IT' && semesterNumber <= 4) {
            return 'lab';
        }
        return 'theory';
    };

    // Handle semester selection
    const handleSemesterChange = (event) => {
        const semesterNumber = parseInt(event.target.value);
        setSelectedSemester(semesterNumber);
        setSubjectsForSemester(semesterNumber);
    };

    // Generate the table rows
    const generateTable = (filteredSubjects) => {
        return filteredSubjects.map((subject, index) => (
            <tr key={index}>
                <td>{subject.code}</td>
                <td>{subject.course}</td>
                <td>
                    <select className='tableselect' 
                        value={subject.faculty} 
                        onChange={(e) => {
                            const newFaculty = e.target.value;
                            if (hasChanges) {
                                setSelections(index, newFaculty);
                            } else {
                                handleFacultyChange(index, newFaculty);
                            }
                        }}
                    >
                        <option value="" disabled>Select Faculty</option>
                        {teachers.length > 0 ? (
                            teachers.map((teacher, idx) => (
                                <option key={idx} value={teacher.name}>
                                    {teacher.name}
                                </option>
                            ))
                        ) : (
                            <option value="">No teachers available</option>
                        )}
                    </select>
                </td>
            </tr>
        ));
    };

    const setSelections = async (index, newFaculty) => {
        const updatedSubjects = [...subjects];
        const selectedSubject = updatedSubjects[index].course;
        updatedSubjects[index].faculty = newFaculty;
        setSubjects(updatedSubjects);

        try {
            // Send the subjects to the backend
            const response = await axios.post(`http://localhost:3001/submitSubjects`, subjects);

            // Check the status of the response (if status is 200 or success)
            if (response.status === 200) {
                setMessage('Data submitted successfully!');
                // Re-fetch teachers to get updated Subjects_assigned
                const fetchResponse = await axios.get(`http://localhost:3001/dept_faculty?department=${department}`);
                setTeachers(fetchResponse.data);
                setSubjectsForSemester(selectedSemester, fetchResponse.data);
                setHasChanges(false); // Reset the change tracker after fetching
            } else {
                setMessage('Error submitting data.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage('Error submitting data.');
        }
    }

    // Handle faculty assignment change
    const handleFacultyChange = async (index, newFaculty) => {
        const updatedSubjects = [...subjects];
        const selectedSubject = updatedSubjects[index].course; // Get the subject name from the table
        const previousFaculty = updatedSubjects[index].faculty;

        updatedSubjects[index].faculty = newFaculty;
        setSubjects(updatedSubjects);

        try {
            // Send selected faculty, subject, and previous faculty to backend
            await axios.post('http://localhost:3001/updateSubjects', {
                faculty: newFaculty,
                subject: selectedSubject,
                previousFaculty: previousFaculty
            });

            // Re-fetch teachers to get updated Subjects_assigned
            const response = await axios.get(`http://localhost:3001/dept_faculty?department=${department}`);
            setTeachers(response.data);
            setSubjectsForSemester(selectedSemester, response.data);
        } catch (error) {
            console.error('Error updating subjects:', error);
            setMessage('Error updating subjects.');
        }
    };

    // Handle filter buttons
    const handleFilter = (type) => {
        setFilter(type);
    };

    // Handle file upload (if needed)
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const excelData = XLSX.utils.sheet_to_json(firstSheet);

                // Ensure that uploaded subjects belong to the selected semester
                const deptData = Allsubject.departments.find(dep => dep.name === department);
                if (!deptData) {
                    console.error('Department not found in subject data');
                    return;
                }

                const semesterData = deptData.semesters.find(sem => sem.semester === selectedSemester);
                if (!semesterData) {
                    console.error(`Semester ${selectedSemester} not found in department ${department}`);
                    return;
                }

                const updatedSubjects = excelData.map(item => ({
                    code: item['Subject Code'],
                    course: item['Course'],
                    faculty: '', // Reset faculty
                    type: item['Type'] // Assuming 'Type' column defines 'theory' or 'lab'
                }));

                setSubjects(updatedSubjects);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Please upload an Excel file!');
        }
    };

    // Filter subjects based on type
    const filteredSubjects = filter === 'all'
        ? subjects
        : subjects.filter(subject => subject.type === filter);

    if (!user) {
        return <p>Please log in to access this page.</p>
    }
    const toggleLogoutMenu = () => {
        const logoutMenu = document.getElementById('logoutMenu');
        logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
    };
    
    const handleLogout = () => {
        sessionStorage.removeItem('currentUser'); // Clear user session
        navigate('/'); // Redirect to login
    };

    return (
        user.role === "HOD" ? (
            <div className="containerpd">
                {/* Navigation Bar */}
            <div className="nav-bar_hoddb">
                <div className="nav-bar-content">
                  <h1 className="navbar-title">Academix</h1>
                  <div className="nav-btn-group">
                    <Link to="/subjects">
                      <button className="nav-btn-hoddb">Subjects</button>
                    </Link>
                    {/* <button className="nav-btn-hoddb">!!!!!!</button> */}
                    <div className="user-icon">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                </div>
            </div>
    
                {/* Semester Selection Dropdown */}
                <div className="semester-dropdown">
                    <select value={selectedSemester} onChange={handleSemesterChange} className='semdropdown'>
                        <option value="" disabled>Select Semester</option>
                        {department && Allsubject.departments.find(dep => dep.name === department).semesters.map(sem => (
                            <option key={sem.semester} value={sem.semester}>
                                Semester {sem.semester}
                            </option>
                        ))}
                    </select>
                </div>
                    
                {/* Subjects Table */}
                <div className="table-containers">
                    <table className='assign-table'>
                        <thead>
                            <tr>
                                <th>Subject Code</th>
                                <th>Course</th>
                                <th>Faculty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {generateTable(filteredSubjects)}
                        </tbody>
                    </table>
    
                    {message && <p>{message}</p>}
                </div>
    
                <Link to="/hoddashboard">
                    <button>Back</button>
                </Link>
            </div>
        ) : (
            <p>Access Denied. This page is only for HODs.</p>
        )
    );
};

export default FacultyAssignment;
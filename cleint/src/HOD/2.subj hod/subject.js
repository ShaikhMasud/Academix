
import React, { useState, useEffect, useRef } from 'react';
import './subject.css';
import { Link, useNavigate } from 'react-router-dom';
import coIcon from './bg img/b.JPG';
import { Chart } from 'chart.js';
import axios from 'axios'; // Import Axios
import {  useParams } from 'react-router-dom';

function Subjectpagehod() {
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [showGraph, setShowGraph] = useState(false);
    const chartRef = useRef(null);
    const navigate = useNavigate();
    const [currentExam,setSelectedExam]=useState(null);


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
        ]
    }

    const [ass1,setass1]=useState("");
    const [ass2,setass2]=useState("");
    const [ass3,setass3]=useState("");
    const [ass4,setass4]=useState("");
    const [ass5,setass5]=useState("");
    const [ass6,setass6]=useState("");

    const [des1ass,setdes1ass]=useState("")
    const [des2ass,setdes2ass]=useState("")
    const [des3ass,setdes3ass]=useState("")
    const [des4ass,setdes4ass]=useState("")
    const [des5ass,setdes5ass]=useState("")
    const [des6ass,setdes6ass]=useState("")


    

    const [q1ia1,setq1ia1]=useState("");
    const [q2ia1,setq2ia1]=useState("");
    const [q3ia1,setq3ia1]=useState("");
    const [q1ia2,setq1ia2]=useState("");
    const [q2ia2,setq2ia2]=useState("");
    const [q3ia2,setq3ia2]=useState("");

    const [q1ia1level,setq1ia1level]=useState("");
    const [q2ia1level,setq2ia1level]=useState("");
    const [q3ia1level,setq3ia1level]=useState("");
    const [q1ia2level,setq1ia2level]=useState("");
    const [q2ia2level,setq2ia2level]=useState("");
    const [q3ia2level,setq3ia2level]=useState("");

    const [desai1q1,setdesai1q1]=useState("");
    const [desai1q2,setdesai1q2]=useState("");
    const [desai1q3,setdesai1q3]=useState("");
    const [desai2q1,setdesai2q1]=useState("");
    const [desai2q2,setdesai2q2]=useState("");
    const [desai2q3,setdesai2q3]=useState("");


    const [endl,setendl]=useState("");


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

    const toggleGraph = async (subject, semester) => {
        // Toggle the graph visibility state
      
        try {            
            // Fetch the coAttainment data
            const response = await axios.post('http://localhost:3001/coAttainment', { subject, semester });
            const { coAttainments, coLevels } = response.data;
            if (Array.isArray(coAttainments) && coAttainments.length === 6) {
                setco1attain(coAttainments[0] || 1);
                setco2attain(coAttainments[1] || 0);
                setco3attain(coAttainments[2] || 0);
                setco4attain(coAttainments[3] || 0);
                setco5attain(coAttainments[4] || 0);
                setco6attain(coAttainments[5] || 0);
            } else {
                console.error("Unexpected CO attainment response format:", response.data);
            }
    
            // Fetch the PO attainment data
            const responsePo = await axios.post('http://localhost:3001/poAttainment', { subject, semester });
            const { poAttainments } = responsePo.data;
    
            // Process PO levels
            if (Array.isArray(poAttainments) && poAttainments.length === 12) {
                setpo1attain(poAttainments[0] || 0);
                setpo2attain(poAttainments[1] || 0);
                setpo3attain(poAttainments[2] || 0);
                setpo4attain(poAttainments[3] || 0);
                setpo5attain(poAttainments[4] || 0);
                setpo6attain(poAttainments[5] || 0);
                setpo7attain(poAttainments[6] || 0);
                setpo8attain(poAttainments[7] || 0);
                setpo9attain(poAttainments[8] || 0);
                setpo10attain(poAttainments[9] || 0);
                setpo11attain(poAttainments[10] || 0);
                setpo12attain(poAttainments[11] || 0);
            } else {
                console.error("Unexpected response format for PO attainments:", responsePo.data);
            }
        } catch (error) {
            console.error("Error fetching CO and PO attainment data:", error);
        }
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
                                label: function (tooltipItem) {
                                    return tooltipItem.label + ': ' + tooltipItem.raw + '%';
                                }
                            }
                        }
                    }
                }
            });
        }
    }, [showGraph, user]);

    const [levelia1, setLevelia1] = useState("Show level");
    const [levelia2, setLevelia2] = useState("Show level");
    const [levelend, setLevelend] = useState("Show level");
    const [levelassign, setLevelassign] = useState("Show level");

    const [co1attain,setco1attain]=useState(0);
    const [co2attain,setco2attain]=useState(0);
    const [co3attain,setco3attain]=useState(0);
    const [co4attain,setco4attain]=useState(0);
    const [co5attain,setco5attain]=useState(0);
    const [co6attain,setco6attain]=useState(0);

    const [po1attain,setpo1attain]=useState(0);
    const [po2attain,setpo2attain]=useState(0);
    const [po3attain,setpo3attain]=useState(0);
    const [po4attain,setpo4attain]=useState(0);
    const [po5attain,setpo5attain]=useState(0);
    const [po6attain,setpo6attain]=useState(0);
    const [po7attain,setpo7attain]=useState(0);
    const [po8attain,setpo8attain]=useState(0);
    const [po9attain,setpo9attain]=useState(0);
    const [po10attain,setpo10attain]=useState(0);
    const [po11attain,setpo11attain]=useState(0);
    const [po12attain,setpo12attain]=useState(0);


    const calculatelevelend = async (subject, semester) => {
        try {
            const response = await axios.get(`http://localhost:3001/LevelCalculationEnd`, {
                params: {
                    subject: subject,
                    semester: semester,
                }
            });

            // Update the levelia1 based on the response from the server
            setLevelend(response.data);
            }
         catch (error) {
            console.error('Error fetching level data:', error);
            setLevelia1("Error fetching level");
        }
    };

    const calculatelevelia = async (subject, semester, ia) => {
        try {
            const response = await axios.get(`http://localhost:3001/LevelCalculationIA`, {
                params: {
                    subject: subject,
                    semester: semester,
                    ia: ia
                }
            });

            // Update the levelia1 based on the response from the server
            if(ia===1){
                setLevelia1(response.data);
            } else if(ia===2){
                setLevelia2(response.data)
            }
            
        } catch (error) {
            console.error('Error fetching level data:', error);
            setLevelia1("Error fetching level");
        }
    };

    const calculatelevelassign = async (subject, semester) => {
        try {
            const response = await axios.get(`http://localhost:3001/LevelCalculationAssign`, {
                params: {
                    subject: subject,
                    semester: semester,
                }
            });

            // Update the levelia1 based on the response from the server
            setLevelassign(response.data);
            }
         catch (error) {
            console.error('Error fetching level data:', error);
            setLevelia1("Error fetching level");
        }
    };

    const toggleLogoutMenu = () => {
        const logoutMenu = document.getElementById('logoutMenu');
        logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
    };

    const handleLogout = () => {
        alert('Logging out...');
        // Add your logout logic here
    };

    const { sem } = useParams();
    const stream =user.department;
    const department = Allsubject.departments.find(dep => dep.name.toLowerCase() === stream.toLowerCase());
    const semesterObj = department.semesters.find(semObj => `Sem ${semObj.semester}` === sem);

    const subjectsAssigned = user.Subjects_assigned || [];

    const handleIAClick = (subject, semester, ia) => {
        navigate(`/IA_marks_entry/${subject}/${semester}`); // Navigate to the new page
    };
    const handleAssignmentClick = (subject, semester) => {
        navigate(`/assignmenthod/${subject}/${semester}`); // Navigate to the new page
    };

    const [expandedIndices, setExpandedIndices] = useState([]);

// Toggle the expansion state
    const toggleDetails = (index) => {
        if (expandedIndices.includes(index)) {
            setExpandedIndices(expandedIndices.filter(i => i !== index)); // Collapse if already expanded
        } else {
            setExpandedIndices([...expandedIndices, index]); // Expand the selected card
        }
    };
    
    if (!user) {
        return <p>Please log in to access this page.</p>;
    }
    const toggleExam = (subject, exam) => {
        setSelectedExam((prev) => (prev === exam ? null : exam)); // Toggle between exam and null
    };

    const toggleia1level = async (subject, semester) => {
      console.log(semester,subject);
        try {
            // Step 1: Fetch question comparison data (ai1, ai2)
            const responseComap = await axios.post('http://localhost:3001/questionComap', { subject, semester });
            const { ai1, ai2 } = responseComap.data;
            
            // Assign values directly to variables (to avoid relying on state updates)
            const q1 = ai1.q1;
            const q2 = ai1.q2;
            const q3 = ai1.q3;
    
            // Step 2: Fetch CO attainment data
            const responseCo = await axios.post('http://localhost:3001/coAttainment', { subject, semester });
            const { coAttainments, coLevels } = responseCo.data;
    
            // Manually extract levels using the question IDs (not using setState yet)
            const q1Level = coLevels[q1.toLowerCase()].IA1.level >= 0 ? coLevels[q1.toLowerCase()].IA1.level : "pending";
            const q2Level = coLevels[q2.toLowerCase()].IA1.level >= 0 ? coLevels[q2.toLowerCase()].IA1.level : "pending";
            const q3Level = coLevels[q3.toLowerCase()].IA1.level >= 0 ? coLevels[q3.toLowerCase()].IA1.level : "pending";
    
            // Step 3: Fetch CO descriptions using question IDs (directly, without waiting for setState)
            const coDescriptionResponse = await axios.get(`http://localhost:3001/getCoPo/${semester}/${subject}`);
            const coRecords = coDescriptionResponse.data.record;
    
            // Extract descriptions manually
            const q1Description = coRecords[q1].description;
            const q2Description = coRecords[q2].description;
            const q3Description = coRecords[q3].description;
    
            // Once all the data is ready, update the state in one go
            setq1ia1(q1);
            setq2ia1(q2);
            setq3ia1(q3);
            setq1ia1level(q1Level);
            setq2ia1level(q2Level);
            setq3ia1level(q3Level);
            setdesai1q1(q1Description);
            setdesai1q2(q2Description);
            setdesai1q3(q3Description);
    
        } catch (error) {
            console.error("Error in toggleia1level:", error);
        }
    };

    const toggleia2level = async (subject, semester) => {
        try {
            // Step 1: Fetch question comparison data (ai1, ai2)
            const responseComap = await axios.post('http://localhost:3001/questionComap', { subject, semester });
            const { ai1, ai2 } = responseComap.data;
            
            // Assign values directly to variables (to avoid relying on state updates)
            const q1 = ai2.q1;
            const q2 = ai2.q2;
            const q3 = ai2.q3;
    
            // Step 2: Fetch CO attainment data
            const responseCo = await axios.post('http://localhost:3001/coAttainment', { subject, semester });
            const { coAttainments, coLevels } = responseCo.data;
    
            // Manually extract levels using the question IDs (not using setState yet)
            const q1Level = coLevels[q1.toLowerCase()].IA2.level >= 0 ? coLevels[q1.toLowerCase()].IA2.level : "pending";
            const q2Level = coLevels[q2.toLowerCase()].IA2.level >= 0 ? coLevels[q2.toLowerCase()].IA2.level : "pending";
            const q3Level = coLevels[q3.toLowerCase()].IA2.level >= 0 ? coLevels[q3.toLowerCase()].IA2.level : "pending";
    
            // Step 3: Fetch CO descriptions using question IDs (directly, without waiting for setState)
            const coDescriptionResponse = await axios.get(`http://localhost:3001/getCoPo/${semester}/${subject}`);
            const coRecords = coDescriptionResponse.data.record;
    
            // Extract descriptions manually
            const q1Description = coRecords[q1].description;
            const q2Description = coRecords[q2].description;
            const q3Description = coRecords[q3].description;
    
            // Once all the data is ready, update the state in one go
            setq1ia2(q1);
            setq2ia2(q2);
            setq3ia2(q3);
            setq1ia2level(q1Level);
            setq2ia2level(q2Level);
            setq3ia2level(q3Level);
            setdesai2q1(q1Description);
            setdesai2q2(q2Description);
            setdesai2q3(q3Description);
    
        } catch (error) {
            console.error("Error in toggleia1level:", error);
        }
    };

    const toggleass =async (subject,semester)=>{
        const response = await axios.post('http://localhost:3001/coAttainment', { subject, semester });
        const { coAttainments, coLevels } = response.data;
        setass1(coLevels.co1.Assignment.level >= 0 ? coLevels.co1.Assignment.level : "pending");
        setass2(coLevels.co2.Assignment.level >= 0 ? coLevels.co2.Assignment.level : "pending");
        setass3(coLevels.co3.Assignment.level >= 0 ? coLevels.co3.Assignment.level : "pending");
        setass4(coLevels.co4.Assignment.level >= 0 ? coLevels.co4.Assignment.level : "pending");
        setass5(coLevels.co5.Assignment.level >= 0 ? coLevels.co5.Assignment.level : "pending");
        setass6(coLevels.co6.Assignment.level >= 0 ? coLevels.co6.Assignment.level : "pending");

        const coDescriptionResponse = await axios.get(`http://localhost:3001/getCoPo/${semester}/${subject}`);
        const coRecords = coDescriptionResponse.data.record;
    
            // Safely access the record
        setdes1ass(coRecords.CO1.description);
        setdes2ass(coRecords.CO2.description);
        setdes3ass(coRecords.CO3.description);
        setdes4ass(coRecords.CO4.description);
        setdes5ass(coRecords.CO5.description);
        setdes6ass(coRecords.CO6.description);

    }

    const toggleEnd = async (subject,semester)=>{
        
    const coDescriptionResponse = await axios.get(`http://localhost:3001/getCoPo/${semester}/${subject}`);
    const coRecords = coDescriptionResponse.data.record;

        // Safely access the record
    setdes1ass(coRecords.CO1.description);
    setdes2ass(coRecords.CO2.description);
    setdes3ass(coRecords.CO3.description);
    setdes4ass(coRecords.CO4.description);
    setdes5ass(coRecords.CO5.description);
    setdes6ass(coRecords.CO6.description);
    }

    function getSubjectCode(department, semester, subject) {
        const departmentData = Allsubject.departments.find(dep => dep.name === department);
        if (departmentData) {
            const semesterData = departmentData.semesters.find(sem => sem.semester === semester);
            if (semesterData) {
                const subjectIndex = semesterData.subjects.indexOf(subject);
                if (subjectIndex !== -1) {
                    return semesterData.codes[subjectIndex];
                }
            }
        }
        return null;
    }
    
    return user.role === 'HOD' ? (
        <>
            <div className="nav-bar_hoddb">
        <div className="nav-bar-content">
          <h1 className="navbar-title">Academix</h1>
          <div className="nav-btn2-group">
            <Link to="/subjects">
              <button className="nav-btn2-hoddb">HOD's Subjects</button>
            </Link>
            <Link to="/managefaculty">
            <button className="nav-btn2-hoddb">Assign Subjects</button>
            </Link>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>
    
      <div className="card-container-facdb">
                {semesterObj.subjects.length > 0 ? (
                    semesterObj.subjects.map((subject, index) => {
                        const semester = findSemester(user.department, subject);
                        const isExpanded = expandedIndices.includes(index); // Check if the current index is expanded

                        const subjectCode = getSubjectCode(user.department, semester, subject);
                        const displayText = subjectCode ? `${subjectCode} - ${subject}` : subject
    
                        return (
                            <article
                                className={`skill-card-facdb ${isExpanded ? 'expand' : ''}`}
                                key={index}
                                data-aos="zoom-in"
                                data-aos-delay={350}
                            >
                                <div className="skill-card__content-facdb | flow">
                                    <div className="skill-card__content--container-facdb | flow">
                                        {/* <button className="icon-button" onClick={() => toggleGraph(subject, semester)}>
                                            <img src={graphIcon} alt="Graph Icon" />
                                        </button> */}
                                        <h2 className="skill-card__title-facdb">{displayText}</h2>
    
                                        {/* Only show this section when expanded */}
                                        {isExpanded && (
                                            <div className="skill-card__description-facdb">
                                            <div className="details-row">
                                                <div className="ia-info">
                                                    <div>
                                                        <button className="btn2" onClick={() => handleIAClick(subject, semester)}>IA 1</button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button
                                                    className="btn2"
                                                    onClick={() => {
                                                        toggleExam(subject, 'IA1');
                                                        calculatelevelia(subject, semester, 1);
                                                        toggleia1level(subject,semester);
                                                    }}
                                                    >
                                                    {currentExam === 'IA1' ? '▲' : '▶'}
                                                    </button>
                                                    {currentExam === 'IA1' && (
                                                    <div className="qa-info">
                                                        <p>Q1: {q1ia1} - Description of this CO - {desai1q1} - {q1ia1level}</p>
                                                        <p>Q2: {q2ia1} - Description of this CO - {desai1q2} - {q2ia1level}</p>
                                                        <p>Q3: {q3ia1} - Description of this CO - {desai1q3} - {q3ia1level}</p>
                                                        <p>Average:{levelia1}</p>
                                                    </div>
                                                    )}
                                                </div>
                                            </div>
                                        
                                            <div className="details-row">
                                                <div className="ia-info">
                                                    <div>
                                                        <button className="btn2" onClick={() => handleIAClick(subject, semester)}>IA 2</button>
                                                    </div>
                                                </div>
                                                <div className='togglediv'>
                                                    <button
                                                    className="btn2"
                                                    onClick={() => {
                                                        toggleExam(subject, 'IA2')
                                                        calculatelevelia(subject, semester, 2)
                                                        toggleia2level(subject,semester);
                                                    }
                                                    }
                                                    >
                                                    {currentExam === 'IA2' ? '▲' : '▶'}
                                                    </button>
                                                    {currentExam === 'IA2' && (
                                                    <div className="qa-info">
                                                        <p>Q1: {q1ia2} - Description of this CO - {desai2q1} - {q1ia2level}</p>
                                                        <p>Q2: {q2ia2} - Description of this CO - {desai2q2} - {q2ia2level}</p>
                                                        <p>Q3: {q3ia2} - Description of this CO - {desai2q3} - {q3ia2level}</p>
                                                        <p>Average:{levelia2}</p>
                                                    </div>
                                                    )}
                                                </div>
                                            </div>
                                        
                                            <div className='details-row'>
                                                <button className="btn2" onClick={() => handleAssignmentClick(subject, semester)}>Assignment</button>
                                                <div>
                                                    <button
                                                    className="btn2"
                                                    onClick={() => {
                                                        toggleExam(subject, 'Assignment');
                                                        calculatelevelassign(subject, semester)
                                                        toggleass(subject,semester)
                                                    }}
                                                    >
                                                    {currentExam === 'Assignment' ? '▲' : '▶'}
                                                    </button>
                                                    {currentExam === 'Assignment' && (
                                                    <div className="qa-info">
                                                        <p> Description: {des1ass} - CO1 - {ass1}</p>
                                                        <p> Description: {des2ass} - CO2 - {ass2}</p>
                                                        <p> Description: {des3ass} - CO3 - {ass3}</p>
                                                        <p> Description: {des4ass} - CO4 - {ass4}</p>
                                                        <p> Description: {des5ass} - CO5 - {ass5}</p>
                                                        <p> Description: {des6ass} - CO6 - {ass6}</p>
                                                        <p>Average:{levelassign}</p>
                                                    </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                        
                                            <div className='details-row'>
                                                <button className="btn2" onClick={() => {
                                                    handleIAClick(subject, semester);

                                                    }}>End-Sem</button>

                                                <button
                                                    className="btn2"
                                                    onClick={() => {
                                                        toggleExam(subject, 'ESE')
                                                        calculatelevelend(subject,semester)
                                                        toggleEnd(subject,semester)
                                                    }}
                                                    >
                                                    {currentExam === 'ESE' ? '▲' : '▶'}
                                                    </button>
                                                    {currentExam === 'ESE' && (
                                                    <div className="qa-info">
                                                        <p> Total Marks Level: {levelend}</p>
                                                        <p> Description: {des1ass} - CO1</p>
                                                        <p> Description: {des2ass} - CO2</p>
                                                        <p> Description: {des3ass} - CO3</p>
                                                        <p> Description: {des4ass} - CO4</p>
                                                        <p> Description: {des5ass} - CO5</p>
                                                        <p> Description: {des6ass} - CO6</p> 
                                                    </div>
                                                    )}
                                            </div>
                                        
                                            <p className='sem-line'>Semester: {semester !== null ? semester : 'Not Found'}</p>
                                        </div>
                                        )}
                                        <button className="submitbutton2" onClick={() => {
                                            toggleGraph(subject, semester); // Call toggleGraph with subject and semester
                                            toggleDetails(index); // Then toggle the details
                                        }}>
                                            {isExpanded ? 'Collapse' : 'Details'}
                                        </button>
                                    </div>
                                </div>
    
                                {/* Tables Container - Only show if expanded */}
                                {isExpanded && (
                                    <div id="graphAndTableContainer">
                                        <div id="tableContainer">
                                            <h3 className='value-head'>CO Attainment Values</h3>
                                            <table className='co_po_table'>
                                                <thead>
                                                    <tr>
                                                        {/* <th></th> */}
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
                                                        {/* <td>Co Attainment Values</td> */}
                                                        <td>{co1attain}</td>
                                                        <td>{co2attain}</td>
                                                        <td>{co3attain}</td>
                                                        <td>{co4attain}</td>
                                                        <td>{co5attain}</td>
                                                        <td>{co6attain}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
    
                                        <div id="tableContainer">
                                            <h3 className='value-head'>PO Attainment Values</h3>
                                            <table className='co_po_table'>
                                                <thead>
                                                    <tr>
                                                        {/* <th></th> */}
                                                        <th>PO1</th>
                                                        <th>PO2</th>
                                                        <th>PO3</th>
                                                        <th>PO4</th>
                                                        <th>PO5</th>
                                                        <th>PO6</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        {/* <td>Po Attainment Values</td> */}
                                                        <td>{po1attain}</td>
                                                        <td>{po2attain}</td>
                                                        <td>{po3attain}</td>
                                                        <td>{po4attain}</td>
                                                        <td>{po5attain}</td>
                                                        <td>{po6attain}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table className='co_po_table'>
                                                <thead>
                                                    <tr>
                                                        <th>PO7</th>
                                                        <th>PO8</th>
                                                        <th>PO9</th>
                                                        <th>PO10</th>
                                                        <th>PO11</th>
                                                        <th>PO12</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>{po7attain}</td>
                                                        <td>{po8attain}</td>
                                                        <td>{po9attain}</td>
                                                        <td>{po10attain}</td>
                                                        <td>{po11attain}</td>
                                                        <td>{po12attain}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </article>
                        );
                    })
                ) : (
                    <p>No subjects assigned.</p>
                )}
            </div>
        </>
    ) : (
        <p>Access Denied. This page is only for Teachers Only.</p>
    );   
}

export default Subjectpagehod;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './faculty.css'; // Ensure you have a styles.css file for styling
import { Link } from 'react-router-dom';


// const teachers = [
//     "Tayyab Sir", "Uday Sir", "Prasad Sir", "Jhanvi Maam", 
//     "Aruna Maam", "Vaishali Maam", "Nilesh Sir", "Sunantha Maam",
//     "Shiv Sir", "Mrudul Maam", "Teacher 11", "Teacher 12",
//     "Teacher 13", "Teacher 14", "Teacher 15", "Teacher 16",
//     "Teacher 17", "Teacher 18", "Teacher 19", "Teacher 20"
// ];

const initialSubjects = [
    { code: 'ITM301', course: 'Mini Project - 1 A for Front end /backend Application using JAVA', faculty: '', type: 'lab' },
    { code: 'ITL304', course: 'Java Lab', faculty: '', type: 'lab' },
    { code: 'ITL303', course: 'Computer Programming Paradigms Lab', faculty: '', type: 'lab' },
    { code: 'ITL302', course: 'SQL Lab', faculty: '', type: 'lab' },
    { code: 'ITL301', course: 'Data Structure Lab', faculty: '', type: 'lab' },
    { code: 'ITC305', course: 'Paradigms and Computer Programming Fundamentals', faculty: '', type: 'theory' },
    { code: 'ITC304', course: 'Principle of Communication', faculty: '', type: 'theory' },
    { code: 'ITC303', course: 'Database Management System', faculty: '', type: 'theory' },
    { code: 'ITC302', course: 'Data Structure and Analysis', faculty: '', type: 'theory' },
    { code: 'ITC301', course: 'Engineering Mathematics-III', faculty: '', type: 'theory' }
];

const FacultyAssignment = () => {
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [subjects, setSubjects] = useState(initialSubjects);
    const [filter, setFilter] = useState('all');
    const [teachers, setTeachers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/teachers');
                const teacherData = response.data;
    
                // Update teachers state with the fetched data
                const teacherNames = teacherData.map(teacher => teacher.name);
                setTeachers(teacherNames);
    
                // Set subjects with assigned faculties from the data
                const updatedSubjects = initialSubjects.map(subject => {
                    const assignedTeacher = teacherData.find(teacher => teacher.Subjects_assigned.includes(subject.course));
                    return {
                        ...subject,
                        faculty: assignedTeacher ? assignedTeacher.name : 'Select Faculty'
                    };
                });
    
                setSubjects(updatedSubjects);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };
    
        fetchTeachers();
    }, []);
    


    const generateTable = (filteredSubjects) => {
        return filteredSubjects.map((subject, index) => (
            <tr key={index}>
                <td>{subject.code}</td>
                <td>{subject.course}</td>
                <td>
                    <select 
                        value={subject.faculty || 'Select Faculty'} 
                        onChange={(e) => handleFacultyChange(index, e.target.value)}
                    >
                        <option value="Select Faculty" disabled>Select Faculty</option>
                        {teachers.length > 0 ? (
                            teachers.map((teacher, idx) => (
                                <option key={idx} value={teacher}>
                                    {teacher}
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
    
    
    const handleFacultyChange = async (index, newFaculty) => {
        const updatedSubjects = [...subjects];
        const selectedSubject = updatedSubjects[index].course; // Get the subject name from the table
        const previousFaculty = updatedSubjects[index].faculty;

        updatedSubjects[index].faculty = newFaculty;
        setSubjects(updatedSubjects);
    
        try {
            // Send selected faculty and subject to backend
            await axios.post('http://localhost:3001/updateSubjects', {
                faculty: newFaculty,
                subject: selectedSubject,
                previousFaculty: previousFaculty
            });
        } catch (error) {
            console.error('Error updating subjects:', error);
        }
    };
    

    const handleFilter = (type) => {
        setFilter(type);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const excelData = XLSX.utils.sheet_to_json(firstSheet);
                const updatedSubjects = excelData.map(item => ({
                    code: item['Subject Code'],
                    course: item['Course'],
                    faculty: item['Faculty'],
                    type: item['Type'] // Assuming 'Type' column defines 'theory' or 'lab'
                }));
                setSubjects(updatedSubjects);
            };
            reader.readAsArrayBuffer(file);
        } else {
            alert('Please upload an Excel file!');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if all faculties are selected
        const allSelected = subjects.every(subject => subject.faculty !== 'Select Faculty');
    
        if (!allSelected) {
            alert('Please complete all fields before submitting.');
            return;
        }
    
        try {
            // Send the subjects to the backend
            const response = await axios.post('http://localhost:3001/submitSubjects', subjects);
    
            // Check the status of the response (if status is 200 or success)
            if (response.status === 200) {
                setMessage('Data submitted successfully!');
            } else {
                setMessage('Error submitting data.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setMessage('Error submitting data.');
        }
    };
    

    const filteredSubjects = filter === 'all'
        ? subjects
        : subjects.filter(subject => subject.type === filter);

    if(!user){
        return <p>Please log in to access this page.</p>
    }

    return (
        user.role==="HOD"?(
        <div className="containerpd">
      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-bar-content">
          <Link to="/subjects"><button className="nav-btn">Subjects</button></Link>
          <button className="nav-btn">Profile Picture</button>
          <div>
            <div className="user-icon">
              <i className="fas fa-user"></i>
            </div>
          </div>
        </div>
      </div>
      

            <div className="filter-section">
                <button className="filter-btn" onClick={() => handleFilter('all')}>All Subjects</button>
                <button className="filter-btn" onClick={() => handleFilter('theory')}>Theory Subjects</button>
                <button className="filter-btn" onClick={() => handleFilter('lab')}>Lab Subjects</button>
            </div>

            <div className="upload-section">
                <input type="file" id="excelUpload" accept=".xlsx" onChange={handleFileUpload} />
                <button id="uploadBtn" className="btn">Upload Excel</button>
            </div>

            {/* Subjects Table */}
            <div className="table-container">
                <form onSubmit={handleSubmit}>
                    <table>
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
                    <button type="submit" className="btn">Submit</button>
                </form>
            </div>

                <Link to="/hoddashboard"><button>Back</button></Link>
            </div>
        ) : (
            <p>Access Denied. This page is only for HODs Only.</p>
    )
);
};

export default FacultyAssignment;

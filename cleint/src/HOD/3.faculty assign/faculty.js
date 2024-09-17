import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './faculty.css'; // Ensure you have a styles.css file for styling

const teachers = [
    "Tayyab Sir", "Uday Sir", "Prasad Sir", "Jhanvi Maam", 
    "Aruna Maam", "Vaishali Maam", "Nilesh Sir", "Sunantha Maam",
    "Shiv Sir", "Mrudul Maam", "Teacher 11", "Teacher 12",
    "Teacher 13", "Teacher 14", "Teacher 15", "Teacher 16",
    "Teacher 17", "Teacher 18", "Teacher 19", "Teacher 20"
];

const initialSubjects = [
    { code: 'ITM301', course: 'Mini Project - 1 A for Front end /backend Application using JAVA', faculty: 'Tayyab Sir', type: 'lab' },
    { code: 'ITL304', course: 'Java Lab', faculty: 'Prasad Sir', type: 'lab' },
    { code: 'ITL303', course: 'Computer Programming Paradigms Lab', faculty: 'Uday Sir', type: 'lab' },
    { code: 'ITL302', course: 'SQL Lab', faculty: 'Jhanvi Maam', type: 'lab' },
    { code: 'ITL301', course: 'Data Structure Lab', faculty: 'Aruna Maam', type: 'lab' },
    { code: 'ITC305', course: 'Paradigms and Computer Programming Fundamentals', faculty: 'Vaishali Maam', type: 'theory' },
    { code: 'ITC304', course: 'Principle of Communication', faculty: 'Nilesh Sir', type: 'theory' },
    { code: 'ITC303', course: 'Database Management System', faculty: 'Shiv Sir', type: 'theory' },
    { code: 'ITC302', course: 'Data Structure and Analysis', faculty: 'Mrudul Maam', type: 'theory' },
    { code: 'ITC301', course: 'Engineering Mathematics-III', faculty: 'Sunantha Maam', type: 'theory' }
];

const FacultyAssignment = () => {
    const [subjects, setSubjects] = useState(initialSubjects);
    const [filter, setFilter] = useState('all');

    const generateTable = (filteredSubjects) => {
        return filteredSubjects.map((subject, index) => (
            <tr key={index}>
                <td>{subject.code}</td>
                <td>{subject.course}</td>
                <td>
                    <select value={subject.faculty} onChange={(e) => handleFacultyChange(index, e.target.value)}>
                        {teachers.map((teacher, idx) => (
                            <option key={idx} value={teacher}>
                                {teacher}
                            </option>
                        ))}
                    </select>
                </td>
            </tr>
        ));
    };

    const handleFacultyChange = (index, newFaculty) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].faculty = newFaculty;
        setSubjects(updatedSubjects);
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

    const filteredSubjects = filter === 'all'
        ? subjects
        : subjects.filter(subject => subject.type === filter);

    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><a href="#">CO</a></li>
                    <li><a href="#">PO</a></li>
                    <li><a href="#">Faculty</a></li>
                </ul>
                <div className="profile">
                    <img src="profile.png" alt="Profile" id="profile-circle" />
                    <div className="dropdown-content">
                        <a href="#" id="logout">Logout</a>
                    </div>
                </div>
            </nav>

            <div className="filter-section">
                <button className="filter-btn" onClick={() => handleFilter('all')}>All Subjects</button>
                <button className="filter-btn" onClick={() => handleFilter('theory')}>Theory Subjects</button>
                <button className="filter-btn" onClick={() => handleFilter('lab')}>Lab Subjects</button>
            </div>

            <div className="upload-section">
                <input type="file" id="excelUpload" accept=".xlsx" onChange={handleFileUpload} />
                <button id="uploadBtn" className="btn">Upload Excel</button>
            </div>

            <div className="table-container">
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
            </div>
        </div>
    );
};

export default FacultyAssignment;

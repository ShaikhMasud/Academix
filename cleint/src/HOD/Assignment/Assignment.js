import React, { useState, useEffect } from 'react';
import './Assignment.css';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios';

const StudentMarksEntryAssignmenthod = () => {
    const { subject, semester } = useParams();
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const [numAssignments, setNumAssignments] = useState(0);
    const [coSelections, setCoSelections] = useState([]); // Default CO selection
    const [coOptions] = useState(["CO1", "CO2", "CO3", "CO4", "CO5", "CO6"]); // Example CO options
    const [tableData, setTableData] = useState([]); // State to hold table data
    const [percentageAssignments, setpercentageAssignments] = useState(0);

    useEffect(() => {
        fetchAndPopulateAssignmentData();
    }, [subject, semester]);

    // Function to handle file upload and fetch data
    const uploadExcel = () => {
        const fileUpload = document.getElementById("fileUpload");
        if (fileUpload.files.length === 0) {
            alert("Please upload an Excel file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

                console.log("Raw Excel Data:", jsonData); // Log to check data structure

                const headerRow = jsonData[0];
                const numAssignmentsInFile = headerRow.length - 2; // Subtract 2 for "Roll No." and "Name"

                const rows = jsonData.slice(1).map(row => ({
                    rollNo: row[0],
                    name: row[1],
                    assignments: row.slice(2, 2 + numAssignmentsInFile) // Extract marks for assignments
                }));

                setNumAssignments(numAssignmentsInFile); // Set the number of assignments from Excel
                setTableData(rows);
                setCoSelections(Array(numAssignmentsInFile).fill("CO1")); // Reset CO selections for new file data
            } catch (error) {
                console.error("Error reading Excel file:", error);
                alert("Error reading the Excel file. Please check the format.");
            }
        };
        reader.readAsArrayBuffer(fileUpload.files[0]);
    };

    const handleNumAssignmentsChange = (event) => {
        const newNumAssignments = parseInt(event.target.value);
        setNumAssignments(newNumAssignments);
        setCoSelections(Array(newNumAssignments).fill("CO1"));

        const newTableData = tableData.map(row => {
            const trimmedAssignments = row.assignments.slice(0, newNumAssignments);
            return {
                ...row,
                assignments: trimmedAssignments.concat(Array(newNumAssignments - trimmedAssignments.length).fill(0))
            };
        });
        setTableData(newTableData);
    };
    const handlepercentageAssignmentsChange = (event) => {
        const newPercentageAssignments = parseInt(event.target.value);
        setpercentageAssignments(newPercentageAssignments);
    }

    const handleCoChange = (assignmentIndex, value) => {
        const newSelections = [...coSelections];
        newSelections[assignmentIndex] = value;
        setCoSelections(newSelections);
    };

    const handleMarksChange = (rowIndex, assignmentIndex, value) => {
        const newData = [...tableData];
        newData[rowIndex].assignments[assignmentIndex] = value;
        setTableData(newData);
    };

    // Function to submit data to the backend
    const handleSubmit = async () => {
        const studentData = tableData.map((row) => {
            const assignmentData = {};
            for (let i = 0; i < numAssignments; i++) {
                const marks = parseFloat(row.assignments[i]) || 0;
                const coValue = coSelections[i];
                assignmentData[`Assignment_${i + 1}`] = { marks, co: coValue };
            }
            return {
                studentname: row.name,
                rollno: row.rollNo,
                [`sem${semester}`]: {
                    subject_name: subject,
                    Assignment: assignmentData
                }
            };
        });

        try {
            const response = await axios.post('http://localhost:3001/studentsAssignment', { studentData, semester,percentageAssignments });
            if (response.data.success) {
                alert('Student data submitted successfully!');
            } else {
                alert('Error submitting data');
            }
        } catch (error) {
            console.error("Error submitting student data:", error);
            alert('Submission failed. Please try again.');
        }
    };

    const fetchAndPopulateAssignmentData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/fetchStudentsAssignment', {
                params: { subject, semester }
            });
    
            if (response.data.success) {
                const studentsData = response.data.data;
                console.log("Fetched Students Data:", studentsData); // Log for debugging
    
                if (studentsData.length === 0) {
                    console.log("No students found.");
                    return;
                }
    
                const rows = studentsData.map(student => {
                    const semesterData = student[`sem${semester}`];
                    if (semesterData && semesterData.length > 0 && semesterData[0].Assignment) {
                        const assignments = semesterData[0].Assignment;
                        setNumAssignments(assignments.length); // Set number of assignments
    
                        // Populate CO selections based on assignment data
                        const coValues = assignments.map(a => a.AssignmentCo || "CO1"); // Default to CO1 if undefined
                        setCoSelections(coValues); // Set CO selections for dropdowns
    
                        return {
                            rollNo: student.roll,
                            name: student.studentname,
                            assignments: assignments.map(a => a.AssignmentMarks),
                        };
                    } else {
                        setNumAssignments(0); // No assignments found
                        setCoSelections([]); // Reset CO selections
                        return {
                            rollNo: student.roll,
                            name: student.studentname,
                            assignments: Array(numAssignments).fill(0), // Default to zero if no assignments
                        };
                    }
                });
    
                console.log("Processed Rows:", rows); // Log the processed rows
                setTableData(rows);
            }
        } catch (error) {
            console.error("Error fetching assignment data:", error);
        }
    };
    


    if (!user) {
        return <p>Please log in to access this page.</p>;
    }

    return (
        user.role === "HOD" ? (
            <div>
                {/* Navigation and other content */}

                <div className="container">
                    <h2>Student IA Marks Entry</h2>

                    <div>
                        <label htmlFor="numAssignments">Number of Assignments:</label>
                        <input 
                            type="number" 
                            id="numAssignments" 
                            min="1" 
                            value={numAssignments} 
                            onChange={handleNumAssignmentsChange} 
                        />
                    </div>
                    <div>
                        <label htmlFor="numAssignments">Enter the percentage of the Assignment:</label>
                        <input 
                            type="number" 
                            id="percentageAssignments" 
                            min="1" 
                            value={percentageAssignments} 
                            onChange={handlepercentageAssignmentsChange} 
                        />
                    </div>


                    <h2>Upload Excel File to Add Data</h2>

                    <div className="upload-container">
                        <label htmlFor="fileUpload" className="custom-file-upload">Choose Excel File</label>
                        <input type="file" id="fileUpload" />
                        <button onClick={uploadExcel}>Fetch Data</button>
                    </div>

                    {/* CO Dropdowns for each assignment */}
                    <div id="co-dropdowns" className="co-dropdowns">
                        {Array.from({ length: numAssignments }, (_, i) => (
                            <div className="co-dropdown-container" key={i}>
                                <label htmlFor={`co-select-${i}`}>Assign CO for Assignment {i + 1}:</label>
                                <select 
                                    id={`co-select-${i}`} 
                                    className="co-dropdown" 
                                    value={coSelections[i]} 
                                    onChange={(e) => handleCoChange(i, e.target.value)}
                                >
                                    {coOptions.map(co => (
                                        <option key={co} value={co}>{co}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    {/* Render table headers dynamically */}
                    <table id="studentTable">
                        <thead>
                            <tr>
                                <th>Roll No.</th>
                                <th>Name</th>
                                {Array.from({ length: numAssignments }, (_, i) => (
                                    <th key={i}>Assignment {i + 1} (Marks)</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((row, rowIndex) => (
                                <tr key={row.rollNo}>
                                    <td>{row.rollNo}</td>
                                    <td>{row.name}</td>
                                    {row.assignments.map((marks, assignmentIndex) => (
                                        <td key={assignmentIndex}>
                                            <input
                                                type="number"
                                                value={marks}
                                                onChange={(e) => handleMarksChange(rowIndex, assignmentIndex, e.target.value)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Link to="/subjects">
                        <button>Back</button>
                    </Link>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        ) : (
            <p>You do not have access to this page.</p>
        )
    );
};

export default StudentMarksEntryAssignmenthod;

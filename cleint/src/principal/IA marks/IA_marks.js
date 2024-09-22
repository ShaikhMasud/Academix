import React from 'react';
import './IA.css'; 
import * as XLSX from 'xlsx'; 
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios'; 

const StudentMarksEntryprin = () => {
    const { subject, semester,ia } = useParams(); // Fetch the subject and semester from the URL params
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Function to handle file upload and fetch data
    function uploadExcel() {
        const fileUpload = document.getElementById("fileUpload");
        const reader = new FileReader();

        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            populateTable(jsonData);
        };

        if (fileUpload.files.length > 0) {
            reader.readAsArrayBuffer(fileUpload.files[0]);
        } else {
            alert("Please upload an Excel file.");
        }
    }

    // Function to populate the table with Excel data
    function populateTable(data) {
        const tableBody = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
        tableBody.innerHTML = "";  

        for (let i = 1; i < data.length; i++) {
            const row = document.createElement("tr");

            for (let j = 0; j < data[i].length; j++) {
                const cell = document.createElement("td");
                cell.textContent = data[i][j];
                row.appendChild(cell);
            }

            const totalCell = document.createElement("td");
            totalCell.textContent = data[i].slice(2, 5).reduce((sum, mark) => sum + parseFloat(mark), 0); // Calculate total
            row.appendChild(totalCell);

            tableBody.appendChild(row);
        }
    }

    // Function to submit data to the backend
    const handleSubmit = async () => {
        const tableRows = document.querySelectorAll("#studentTable tbody tr");

        const studentData = Array.from(tableRows).map(row => {
            const cells = row.querySelectorAll("td");
            const rollNo = cells[0].textContent;
            const name = cells[1].textContent;
            const q1Marks = parseFloat(cells[2].textContent);
            const q2Marks = parseFloat(cells[3].textContent);
            const q3Marks = parseFloat(cells[4].textContent);
            const total = parseFloat(cells[5].textContent);

            const coSelectors = document.querySelectorAll(".co-select"); 

            return {
                studentname: name,
                rollno: rollNo,
                [`sem${semester}`]: {  // Dynamically assign the semester
                    subject_name: subject, // Assign the subject name from URL
                    [`IA${ia}`]: {  // You can change this to IA2, ESE, or Assignment based on the input type
                        Q1: q1Marks,
                        Q2: q2Marks,
                        Q3: q3Marks,
                        Q1_co: coSelectors[0].value,
                        Q2_co: coSelectors[1].value,
                        Q3_co: coSelectors[2].value,
                    }
                }
            };
        });

        try {
            console.log(studentData)
            const response = await axios.post('http://localhost:3001/students', studentData);
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

    if (!user) {
        return <p>Please log in to access this page.</p>;
    }

    return (
        user.role === "Principal" ? (
            <div>
                <nav className="curved-nav">
                    <div className="nav-content">
                        <button className="nav-btn">CO</button>
                        <button className="nav-btn">PO</button>
                        <div className="profile-menu">
                            <div className="profile-circle" onClick={() => { /* Toggle profile menu */ }}>
                                <i className="fas fa-user"></i>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <h2>Student IA Marks Entry</h2>

                    <div className="co-max-marks">
                        <table>
                            <tbody>
                                <tr>
                                    <th>Assign appropriate COs</th>
                                    <td>
                                        <select className="co-select" defaultValue="CO1">
                                            <option value="CO1">CO1</option>
                                            <option value="CO2">CO2</option>
                                            <option value="CO3">CO3</option>
                                            <option value="CO4">CO4</option>
                                            <option value="CO5">CO5</option>
                                            <option value="CO6">CO6</option>
                                        </select> (Q1)
                                    </td>
                                    <td>
                                        <select className="co-select" defaultValue="CO1">
                                            <option value="CO1">CO1</option>
                                            <option value="CO2">CO2</option>
                                            <option value="CO3">CO3</option>
                                            <option value="CO4">CO4</option>
                                            <option value="CO5">CO5</option>
                                            <option value="CO6">CO6</option>
                                        </select> (Q2)
                                    </td>
                                    <td>
                                        <select className="co-select" defaultValue="CO1">
                                            <option value="CO1">CO1</option>
                                            <option value="CO2">CO2</option>
                                            <option value="CO3">CO3</option>
                                            <option value="CO4">CO4</option>
                                            <option value="CO5">CO5</option>
                                            <option value="CO6">CO6</option>
                                        </select> (Q3)
                                    </td>
                                </tr>
                                <tr>
                                    <th>Max Marks</th>
                                    <td>10 (Q1)</td>
                                    <td>5 (Q2)</td>
                                    <td>5 (Q3)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>Upload Excel File to Add Data</h2>

                    <div className="upload-container">
                        <label htmlFor="fileUpload" className="custom-file-upload">Choose Excel File</label>
                        <input type="file" id="fileUpload" />
                        <button onClick={uploadExcel}>Fetch Data</button>
                    </div>

                    <table id="studentTable">
                        <thead>
                            <tr>
                                <th>Roll No.</th>
                                <th>Name</th>
                                <th>Q1 (Marks)</th>
                                <th>Q2 (Marks)</th>
                                <th>Q3 (Marks)</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>

                    <Link to="/sub">
                        <button>Back</button>
                    </Link>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        ) : (
            <p>Access denied. This page is for Teachers only.</p>
        )
    );
};

export default StudentMarksEntryprin;

import React, { useState, useEffect } from 'react';
import './IA.css'; 
import * as XLSX from 'xlsx'; 
import { Link, useParams } from 'react-router-dom';
import axios from 'axios'; 

const StudentMarksEntry = () => {
    const { subject, semester } = useParams();
    const [selectedExam, setSelectedExam] = useState("Select Exam");

    useEffect(() => {
        const examSelect = document.getElementById("examSelect");

        // Event listener for select bar changes
        examSelect.addEventListener('change', (e) => {
            setSelectedExam(e.target.value);
        });

        return () => {
            examSelect.removeEventListener('change', (e) => setSelectedExam(e.target.value));
        };
    }, []);

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
            totalCell.textContent = data[i].slice(2, 5).reduce((sum, mark) => sum + parseFloat(mark), 0);
            row.appendChild(totalCell);
            tableBody.appendChild(row);
        }
    }

    const handleSubmit = async () => {
        const examSelect = document.getElementById("examSelect");
        if (!examSelect || examSelect.value === "Select Exam") {
            alert("Please select an exam before submitting.");
            return;
        }

        const examType = examSelect.value === "IA-1" ? "IA1" :
                         examSelect.value === "IA-2" ? "IA2" :
                         examSelect.value === "End-Sem" ? "ESE" : "Assignment";

        const tableRows = document.querySelectorAll("#studentTable tbody tr");

        const studentData = Array.from(tableRows).map(row => {
            const cells = row.querySelectorAll("td");
            const rollNo = cells[0].textContent;
            const name = cells[1].textContent;

            if (examType === "ESE") {
                const total = parseFloat(cells[2].textContent);
                return {
                    studentname: name,
                    rollno: rollNo,
                    [`sem${semester}`]: {
                        subject_name: subject,
                        [examType]: { total }
                    }
                };
            } else {
                const q1Marks = parseFloat(cells[2].textContent);
                const q2Marks = parseFloat(cells[3].textContent);
                const q3Marks = parseFloat(cells[4].textContent);
                const coSelectors = document.querySelectorAll(".co-select");
                return {
                    studentname: name,
                    rollno: rollNo,
                    [`sem${semester}`]: {
                        subject_name: subject,
                        [examType]: {
                            Q1: q1Marks,
                            Q2: q2Marks,
                            Q3: q3Marks,
                            Q1_co: coSelectors[0].value,
                            Q2_co: coSelectors[1].value,
                            Q3_co: coSelectors[2].value
                        }
                    }
                };
            }
        });

        try {
            const response = await axios.post('http://localhost:3001/studentsAssignment', { studentData, semester });
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

    return (
        <div>
            <h1>Student Marks Entry</h1>
            <select id="examSelect">
                <option>Select Exam</option>
                <option>IA-1</option>
                <option>IA-2</option>
                <option>End-Sem</option>
                <option>Assignment</option>
            </select>

            <input type="file" id="fileUpload" onChange={uploadExcel} />
            <table id="studentTable">
                <thead>
                    <tr>
                        <th>Roll No.</th>
                        <th>Name</th>
                        <th>Q1 Marks</th>
                        <th>Q2 Marks</th>
                        <th>Q3 Marks</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <button onClick={handleSubmit}>Submit Data</button>
        </div>
    );
};

export default StudentMarksEntry;

import React, { useState, useEffect, useRef } from 'react';
import './IA.css'; 
import * as XLSX from 'xlsx'; 
import { Link,useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from 'axios'; 

const StudentMarksEntryprin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const examSelect = document.getElementById("examSelect");
    
        // Check if the element is found
        if (examSelect) {
            fetchAndPopulateData(examSelect.value);
    
            // Add event listener for changes in select bar
            examSelect.addEventListener('change', (e) => {
                fetchAndPopulateData(e.target.value);
            });
    
            // Cleanup event listener on component unmount
            return () => {
                examSelect.removeEventListener('change', (e) => fetchAndPopulateData(e.target.value));
            };
        } else {
            console.error("examSelect element not found");
        }
    }, []);
    


    const { subject, semester} = useParams();
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const [selectedExam, setSelectedExam] = useState("Select Exam");
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        // Trigger the click on the hidden file input
        fileInputRef.current.click();
      };
    
      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          uploadExcel(file); // Call the uploadExcel function with the selected file
        }
      };

    // Function to handle file upload and fetch data
    function uploadExcel() {
        const fileUpload = document.getElementById("fileUpload");

        const file = fileUpload.files[0]; // Get the first (and only) file

        if (!file) {
            alert("Please upload an Excel file.");
            return;
        }

        // Check if the file has an appropriate extension (.xlsx, .xls, or .ods)
        const validExtensions = [".xlsx", ".xls"];
        const fileName = file.name.toLowerCase();
        const fileExtension = fileName.substring(fileName.lastIndexOf("."));

        if (!validExtensions.includes(fileExtension)) {
            alert("Invalid file type. Please upload a .xlsx or .xls file.");
            return;
        }

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

    const handleSubmit = async () => {
        const examSelect = document.getElementById("examSelect");
        
        console.log("Selected Exam Value:", examSelect?.value); // Log exam value
        
        if (!examSelect || examSelect.value === "" || examSelect.value === "Select Exam") {
            alert("Please select an exam before submitting.");
            console.log("No exam selected, alert shown.");
            return;
        }
    
        let examType = "";
    
        if (examSelect.value === "IA-1") {
            examType = "IA1";
        } else if (examSelect.value === "IA-2") {
            examType = "IA2";
        } else if (examSelect.value === "End-Sem") {
            examType = "ESE";
        } else {
            examType = "Assignment";
        }
    
        const tableRows = document.querySelectorAll("#studentTable tbody tr");
    
        const studentData = Array.from(tableRows).map(row => {
            const cells = row.querySelectorAll("td");
            const rollNo = cells[0].textContent;
            const name = cells[1].textContent;
            const department = "EXTC";
    
            if (examType === "ESE") {
                // For End-Sem, only send total marks
                const total = parseFloat(cells[2].textContent);
                return {
                    studentname: name,
                    rollno: rollNo,
                    depart: department,
                    [`sem${semester}`]: {
                        subject_name: subject,
                        [examType]: {
                            total: total
                        }
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
                    depart: department,
                    [`sem${semester}`]: {
                        subject_name: subject,
                        [examType]: {
                            Q1: q1Marks,
                            Q2: q2Marks,
                            Q3: q3Marks,
                            Q1_co: coSelectors[0].value,
                            Q2_co: coSelectors[1].value,
                            Q3_co: coSelectors[2].value,
                        }
                    }
                };
            }
        });
    
        try {
            console.log(studentData);
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
    

    function handleExamSelect(event) {
        const selectedExam = event.target.value;
        // setSelectedExam(selectedExam);
        const coMaxMarksContainer = document.querySelector('.co-max-marks table tbody');
        const studentTableHeader = document.querySelector('#studentTable thead tr');

        if (selectedExam === 'End-Sem') {
            if (coMaxMarksContainer) {
                coMaxMarksContainer.innerHTML = '';
            }
            studentTableHeader.innerHTML = `
                <th>Roll No.</th>
                <th>Name</th>
                <th>Total</th>
            `;
        } else {
            // Revert to the original columns for other exams
            coMaxMarksContainer.innerHTML = `
                <tr>
                    <th>Assign appropriate COs</th>
                    <td>
                        <select class="co-select" id="q1-co-select" defaultValue="CO1">
                            <option value="CO1">CO1</option>
                            <option value="CO2">CO2</option>
                            <option value="CO3">CO3</option>
                            <option value="CO4">CO4</option>
                            <option value="CO5">CO5</option>
                            <option value="CO6">CO6</option>
                        </select> (Q1)
                    </td>
                    <td>
                        <select class="co-select" id="q2-co-select" defaultValue="CO1">
                            <option value="CO1">CO1</option>
                            <option value="CO2">CO2</option>
                            <option value="CO3">CO3</option>
                            <option value="CO4">CO4</option>
                            <option value="CO5">CO5</option>
                            <option value="CO6">CO6</option>
                        </select> (Q2)
                    </td>
                    <td>
                        <select class="co-select" id="q3-co-select" defaultValue="CO1">
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
                    <td>20 (Q1)</td>
                    <td>20 (Q2)</td>
                    <td>20 (Q3)</td>
                </tr>
            `;

            // Remove Q4, Q5, Q6 columns in 'studentTable'
            studentTableHeader.innerHTML = `
                <th>Roll No.</th>
                <th>Name</th>
                <th>Q1 (Marks)</th>
                <th>Q2 (Marks)</th>
                <th>Q3 (Marks)</th>
                <th>Total</th>
            `;
        }
    }

    const fetchAndPopulateData = async (examType) => {
        try {
            // Map examType to the database field names
            if (examType === "IA-1") {
                examType = "IA1";
            } else if (examType === "IA-2") {
                examType = "IA2";
            } else if (examType === "End-Sem") {
                examType = "ESE";
            }
    
            console.log(`Exam Type: ${examType}, Subject: ${subject}, Semester: ${semester}`);
            const response = await axios.get(`http://localhost:3001/fetchStudents?examType=${examType}&subject=${subject}&semester=${semester}`);
            console.log("Fetched Student Data:", response.data);
            const studentData = response.data;
    
            const tableBody = document.querySelector("#studentTable tbody");
            tableBody.innerHTML = ""; // Clear the table
    
            studentData.forEach(student => {
                const row = document.createElement('tr');
            
                // Roll Number and Name
                const rollNoCell = document.createElement('td');
                rollNoCell.textContent = student.rollno || '-';
                row.appendChild(rollNoCell);
            
                const nameCell = document.createElement('td');
                nameCell.textContent = student.studentname || '-';
                row.appendChild(nameCell);
            
                if (examType === "ESE") {
                    // For ESE, only show total marks
                    const totalCell = document.createElement('td');
                    totalCell.textContent = student[examType]?.total ?? '-';
                    row.appendChild(totalCell);
                } else {
                    // For IA1, IA2, Assignment, show Q1, Q2, Q3 marks
                    ['Q1', 'Q2', 'Q3'].forEach((q) => {
                        const qCell = document.createElement('td');
                        qCell.textContent = student[examType]?.[q] ?? '-';  // Fetching marks directly under examType
                        row.appendChild(qCell);
                    });
            
                    // Total column
                    const totalCell = document.createElement('td');
                    const totalMarks = ['Q1', 'Q2', 'Q3'].reduce((sum, q) => {
                        const mark = parseFloat(student[examType]?.[q] || 0);
                        return sum + mark;
                    }, 0);
                    totalCell.textContent = totalMarks > 0 ? totalMarks : '-';
                    row.appendChild(totalCell);
                }
            
                tableBody.appendChild(row);
            });
    
            // Populate CO Selectors (for Q1_co, Q2_co, Q3_co)
            const coData = studentData[0]?.[examType];  // Accessing CO data directly from examType
            if (coData) {
                document.querySelector("#q1-co-select").value = coData.Q1_co || 'CO1'; // Populate Q1 CO select
                document.querySelector("#q2-co-select").value = coData.Q2_co || 'CO1'; // Populate Q2 CO select
                document.querySelector("#q3-co-select").value = coData.Q3_co || 'CO1'; // Populate Q3 CO select
            }

    
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };    
            
    

    if (!user) {
        return <p>Please log in to access this page.</p>;
    }
    const toggleLogoutMenu = () => {
        const logoutMenu = document.getElementById('logoutMenu');
        logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
    };

    const handleLogout = () => {
        navigate('/'); // Redirect to login
        // Add your logout logic here
    };

    return (
        user.role === "Principal" ? (
            <div className='ia-marks'>
                <div className="marks_container-hod">
                    <div className='heading-div'>
                        <h2 className='heading'>Student Marks Entry</h2>
                    </div>
                    {/* Conditionally render co-max-marks table based on selected exam */}
                    {selectedExam !== 'End-Sem' && (
                        <div className="co-max-marks">
                            <table className='co-table'>
                                <tbody id="co-max-table-body">
                                    {/* This will be populated dynamically based on the selected exam */}
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className="upload-container">
                        <h2 className='upload'>Upload Excel File to Add Data</h2>
                        <div className='upload-controls'>
                            <select id="examSelect" className='examSelect' onChange={handleExamSelect} defaultValue="Select Exam">
                                <option value="Select Exam" disabled>Select Exam</option>
                                <option value="IA-1">IA-1</option>
                                <option value="IA-2">IA-2</option>
                                <option value="End-Sem">End-Sem</option>
                            </select>
                        
                            <button className='fetch-button' onClick={handleButtonClick}>Upload Excel file</button>
                            <input
                              type="file"
                              id="fileUpload"
                              accept=".xlsx, .xls"
                              ref={fileInputRef}
                              style={{ display: "none" }} // Hide the input element
                              onChange={handleFileChange}
                            />
                        </div>
                    </div>
                </div>
                <div className='table_container'>
                    <table id="studentTable" className='student-marks-table'>
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
                        <button className='backbutton'>Back</button>
                    </Link>
                    <button className='submitbutton' onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        ) : (
            <p>Access denied. This page is for Teachers only.</p>
        )
    );
}

export default StudentMarksEntryprin;
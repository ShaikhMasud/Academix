import React from 'react';
import './IA.css'; // Import CSS for styling
import * as XLSX from 'xlsx'; // Import XLSX library
import { Link } from 'react-router-dom';


const StudentMarksEntryHOD = () => {
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    // Function to handle file upload and fetch data
    const uploadExcel = () => {
        const fileInput = document.getElementById('fileUpload');
        if (fileInput.files.length === 0) return;

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            // Process the data from the first sheet
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

            // Here, you should handle the jsonData and update the table
            console.log(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    // Function to toggle logout menu visibility
    const toggleLogoutMenu = () => {
        const logoutMenu = document.getElementById('logoutMenu');
        logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
    };

    // Function to handle logout
    const logout = () => {
        alert('Logging out...');
    };

    if (!user) {
        return <p>Please log in to access this page.</p>;
    }
    return (
        user.role==="HOD"?(
        <div>
            <nav className="curved-nav">
                <div className="nav-content">
                    <button className="nav-btn">CO</button>
                    <button className="nav-btn">PO</button>
                    <div className="profile-menu">
                        <div className="profile-circle" onClick={toggleLogoutMenu}>
                            <i className="fas fa-user"></i>
                        </div>
                        <div id="logoutMenu" className="logout-menu">
                            <button onClick={logout}>Logout</button>
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
                                    <select>
                                        <option>CO1</option>
                                        <option>CO2</option>
                                        <option>CO3</option>
                                        <option>CO4</option>
                                        <option>CO5</option>
                                        <option>CO6</option>
                                    </select> (Q1)
                                </td>
                                <td>
                                    <select>
                                        <option>CO1</option>
                                        <option>CO2</option>
                                        <option>CO3</option>
                                        <option>CO4</option>
                                        <option>CO5</option>
                                        <option>CO6</option>
                                    </select> (Q2)
                                </td>
                                <td>
                                    <select>
                                        <option>CO1</option>
                                        <option>CO2</option>
                                        <option>CO3</option>
                                        <option>CO4</option>
                                        <option>CO5</option>
                                        <option>CO6</option>
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
                    <label htmlFor="fileUpload" className="custom-file-upload">
                        Choose Excel File
                    </label>
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
                    <tbody>
                        {/* Data will be populated here dynamically */}
                    </tbody>
                </table>
            </div>
            <Link to="/subjects"><button>back</button>  <button>Submit</button></Link>
        </div>
        ):(
            <p>Access denied. This page is for HODs only.</p>
        )
    );
};

export default StudentMarksEntryHOD;

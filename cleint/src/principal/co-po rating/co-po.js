import React, { useState, useRef } from 'react';
import './co-po.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from "react-router-dom";


const Co_po_prin = () => {
    const storedUser = sessionStorage.getItem('currentUser');
    const user = storedUser ? JSON.parse(storedUser) : null;

    const poStatements = {
        PO1: "Engineering Knowledge: Graduates should have a deep understanding of the fundamental principles, theories, and concepts in their chosen engineering field.",
        PO2: "Problem Solving: Graduates should be able to apply engineering knowledge to identify, formulate, and solve complex engineering problems.",
        PO3: "Design/development of solutions: Design solutions for complex engineering problems with societal, cultural, and environmental considerations.",
        PO4: "Conduct investigations of complex problems: Use research-based knowledge and methods to provide valid conclusions.",
        PO5: "Modern tool usage: Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools.",
        PO6: "The engineer and society: Assess societal, health, safety, legal, and cultural issues relevant to professional engineering practice.",
        PO7: "Environment and sustainability: Understand the impact of professional engineering solutions in societal and environmental contexts.",
        PO8: "Ethics: Apply ethical principles and commit to professional ethics and responsibilities.",
        PO9: "Individual and team work: Function effectively as an individual, and as a member or leader in diverse teams.",
        PO10: "Communication: Communicate effectively on complex engineering activities, including reports and presentations.",
        PO11: "Project management and finance: Apply engineering and management principles to one's work, as a member or leader in a team.",
        PO12: "Life-long learning: Recognize the need for independent and life-long learning in the broadest context of technological change."
    };

    const { subject, semester } = useParams();

    const [tooltipText, setTooltipText] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
    const tooltipRef = useRef(null);
    const [logoutMenuVisible, setLogoutMenuVisible] = useState(false);

    const handleMouseEnter = (event) => {
        const po = event.target.dataset.po;
        setTooltipText(poStatements[po]);
        setTooltipPosition({
            left: event.pageX,
            top: event.pageY - 40
        });
    };

    const handleMouseLeave = () => {
        setTooltipText('');
    };

    const toggleLogoutMenu = () => {
        setLogoutMenuVisible(!logoutMenuVisible);
    };

    const logout = () => {
        alert('Logging out...');
        // Add your logout logic here
    };

    const handleSubmit = () => {
        const data = [];
    
        // Iterate through the COs
        for (const co of [1, 2, 3, 4, 5, 6]) {
            const selectElements = document.querySelectorAll(`tr[data-co="${co}"] select`);
            const description = document.querySelector(`tr[data-co="${co}"] textarea`).value;
    
            // Collect PO values
            const poValues = Array.from(selectElements).map(select => select.value);
    
            // Ensure poValues has exactly 12 entries
            if (poValues.length === 12) {
                data.push({
                    poValues,
                    description
                });
            } 
        }
        axios.post('http://localhost:3001/submitCoPo', { 
            semester:semester,
            subject_name:subject,
            CO1:data[0],
            CO2:data[1],
            CO3:data[2],
            CO4:data[3],
            CO5:data[4],
            CO6:data[5]
        })
        console.log(data);
    };
    

    if (!user) {
        return <p>Please log in to access this page.</p>;
    }

    return (
        user.role === "Principal" ? (
            <>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>CO-PO Attainment Table</title>
                <link rel="stylesheet" href="style.css" />
                <nav className="curved-nav">
                    <div className="nav-content">
                        <button className="nav-btn">CO</button>
                        <button className="nav-btn">PO</button>
                        <div className="profile-menu">
                            <div className="profile-circle" onClick={toggleLogoutMenu}>
                                <i className="fas fa-user" />
                            </div>
                            {logoutMenuVisible && (
                                <div id="logoutMenu" className="logout-menu">
                                    <button onClick={logout}>Logout</button>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
                <h2>CO-PO Correlation Table</h2>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>CO</th>
                                {Object.keys(poStatements).map(po => (
                                    <th
                                        key={po}
                                        className="po-header"
                                        data-po={po}
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {po}
                                    </th>
                                ))}
                                <th>CO Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1,2,3,4,5,6].map(co => (
                                <tr key={co} data-co={co}>
                                    <td>{co}</td>
                                    {Object.keys(poStatements).map(po => (
                                        <td key={po}>
                                            <select>
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </select>
                                        </td>
                                    ))}
                                    <td>
                                        <textarea className="co-description" defaultValue="Description for CO" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/sub">
                        <button>back</button>
                    </Link>
                    <button onClick={handleSubmit}>Submit</button>
                </div>
                {tooltipText && (
                    <div
                        id="po-tooltip"
                        ref={tooltipRef}
                        style={{
                            position: 'absolute',
                            left: `${tooltipPosition.left}px`,
                            top: `${tooltipPosition.top}px`,
                            display: 'block'
                        }}
                    >
                        {tooltipText}
                    </div>
                )}
            </>
        ) : (
            <p>Access denied. This page is for Principal only.</p>
        )
    );
};

export default Co_po_prin;

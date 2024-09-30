import React, { useState, useEffect, useRef } from 'react';
import './co-po.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Appco = () => {
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

    const [coPoData, setCoPoData] = useState({
        CO1: { PoValues: Array(12).fill(0), description: "Description for CO" },
        CO2: { PoValues: Array(12).fill(0), description: "Description for CO" },
        CO3: { PoValues: Array(12).fill(0), description: "Description for CO" },
        CO4: { PoValues: Array(12).fill(0), description: "Description for CO" },
        CO5: { PoValues: Array(12).fill(0), description: "Description for CO" },
        CO6: { PoValues: Array(12).fill(0), description: "Description for CO" },
    });

    const [tooltipText, setTooltipText] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
    const tooltipRef = useRef(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/getCoPo/${semester}/${subject}`)
            .then(response => {
                if (response.data.success && response.data.record) {
                    setCoPoData(response.data.record);
                }
            })
            .catch(error => {
                console.error("Error fetching CO-PO data:", error);
                alert("Failed to load CO-PO data. Please try again later.");
            });
    }, [semester, subject]);

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

    const handleSubmit = () => {
        const data = [];

        for (const co of [1, 2, 3, 4, 5, 6]) {
            const selectElements = document.querySelectorAll(`tr[data-co="${co}"] select`);
            const description = document.querySelector(`tr[data-co="${co}"] textarea`).value;

            const poValues = Array.from(selectElements).map(select => select.value);

            if (poValues.length === 12) {
                data.push({
                    poValues,
                    description
                });
            }
        }

        axios.post('http://localhost:3001/submitCoPo', {
            semester: semester,
            subject_name: subject,
            CO1: data[0],
            CO2: data[1],
            CO3: data[2],
            CO4: data[3],
            CO5: data[4],
            CO6: data[5]
        }).then(response => {
            if (response.data.success) {
                alert('CO-PO data submitted successfully!');
            } else {
                alert('Failed to submit CO-PO data.');
            }
        }).catch(error => {
            console.error("Error submitting CO-PO data:", error);
            alert('An error occurred while submitting data. Please try again.');
        });
    };

    if (!user) {
        alert('Please log in to access this page.');
        return <p>Please log in to access this page.</p>;
    }

    return (
        user.role === "Teacher" ? (
            <>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>CO-PO Attainment Table</title>
                <link rel="stylesheet" href="style.css" />

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
                            {[1, 2, 3, 4, 5, 6].map(co => (
                                <tr key={co} data-co={co}>
                                    <td>{co}</td>
                                    {Object.keys(poStatements).map((po, index) => (
                                        <td key={po}>
                                            <select
                                                value={coPoData[`CO${co}`].PoValues[index]}
                                                onChange={(e) => {
                                                    const newCoPoData = { ...coPoData };
                                                    newCoPoData[`CO${co}`].PoValues[index] = parseInt(e.target.value);
                                                    setCoPoData(newCoPoData);
                                                }}
                                            >
                                                <option value={0}>0</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                            </select>
                                        </td>
                                    ))}
                                    <td>
                                        <textarea
                                            className="co-description"
                                            value={coPoData[`CO${co}`].description || ""}
                                            onChange={(e) => {
                                                const newCoPoData = { ...coPoData };
                                                newCoPoData[`CO${co}`].description = e.target.value;
                                                setCoPoData(newCoPoData);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Link to="/facultydashboard">
                        <button>Back</button>
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
            <p>Access denied. This page is for Teachers only.</p>
        )
    );
};

export default Appco;

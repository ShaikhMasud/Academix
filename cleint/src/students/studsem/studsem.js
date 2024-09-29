import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './studsem.css';

const StudSem = () => {
    const graphRef = useRef(null); // Create a ref to hold the chart instance
    const canvasRef = useRef(null); // Create a ref for the canvas element

    // PO Data
    const poData = {
        labels: ['PO1', 'PO2', 'PO3', 'PO4', 'PO5', 'PO6', 'PO7', 'PO8', 'PO9', 'PO10', 'PO11', 'PO12'],
        datasets: [{
            label: 'Performance',
            data: [8, 7, 9, 6, 7, 8, 9, 6, 7, 8, 9, 7],
            backgroundColor: 'rgba(0, 123, 255, 0.6)',
            borderColor: 'rgba(0, 123, 255, 1)',
            borderWidth: 1
        }]
    };

    // CO Data
    const coData = {
        labels: ['CO1', 'CO2', 'CO3', 'CO4', 'CO5', 'CO6'],
        datasets: [{
            label: 'Marks Progress',
            data: [4, 3, 5, 2, 4, 3],
            backgroundColor: 'rgba(40, 167, 69, 0.6)',
            borderColor: 'rgba(40, 167, 69, 1)',
            borderWidth: 1
        }]
    };

    // Function to render graphs
    const renderGraph = (data, title) => {
        const ctx = canvasRef.current.getContext('2d');
    
        // If there is an existing chart instance, destroy it
        if (graphRef.current) {
            graphRef.current.destroy(); 
        }
    
        // Create a new chart instance
        graphRef.current = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Scores'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: title
                        }
                    }
                }
            }
        });
    };
    

    // Show PO graph by default
    useEffect(() => {
        renderGraph(poData, 'Program Outcomes');
    }, []); // Empty array means it runs only on mount

    // Function to switch to CO graph
    const showCOGraph = () => {
        renderGraph(coData, 'Course Outcomes');
    };

    // Function to handle IA, ESE, INTERNAL button clicks
    const handlePageSwitch = (page) => {
        switch (page) {
            case 'ia1':
                window.location.href = './studmrk';
                break;
            case 'ia2':
                window.location.href = 'ia2.js';
                break;
            case 'ese':
                window.location.href = 'ese.js';
                break;
            case 'internal':
                window.location.href = 'internal.js';
                break;
            default:
                console.error('Invalid page');
        }
    };

    return (
        <div className="containersem">
            <div className="left-panelsem">
                <h2>SEM 4 SUBJECTS</h2>

                {/* Subject Cards */}
                {['ITC401: MATHEMATICS', 'ITC402: COMPUTER NETWORK', 'ITC403: OPERATING SYSTEM', 'ITC404: AUTOMATA THEORY', 'ITC405: COA'].map((subject, index) => (
                    <div className="subject-cardsem" key={index} onClick={showCOGraph}>
                        <h3>{subject}</h3>
                        <div className="buttonssem">
                            <button onClick={() => handlePageSwitch('ia1')}>IA1</button>
                            <button onClick={() => handlePageSwitch('ia2')}>IA2</button>
                            <button onClick={() => handlePageSwitch('ese')}>ESE</button>
                            <button onClick={() => handlePageSwitch('internal')}>INTERNAL</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="right-panelsem">
                <div className="student-detailssem">
                    <img src="dushyant git profile pic.jpg" alt="Student Image" />
                    <h3>Name: Dushyant Bhagwat</h3>
                    <p>ID: 123456</p>
                    <p>SGPA: 8.2</p>
                </div>

                <div className="graph-containersem">
                    <canvas ref={canvasRef} id="graphCanvassem"></canvas>
                    <div className="tooltipsem" id="tooltipsem"></div>
                </div>
            </div>
        </div>
    );
};

export default StudSem;

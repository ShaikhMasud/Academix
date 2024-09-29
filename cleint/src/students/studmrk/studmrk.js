import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import './studmrk.css';

const StudentMarksAnalysis = () => {
    const chartRef = useRef(null);

    useEffect(() => {
        // Create the chart when the component mounts
        const ctx = chartRef.current.getContext('2d');
        const coData = {
            labels: ['CO1', 'CO2', 'CO3'],
            datasets: [{
                label: 'Marks Progress',
                data: [4, 3, 8], // Example marks for Q1, Q2, Q3
                backgroundColor: 'rgba(40, 167, 69, 0.6)',
                borderColor: 'rgba(40, 167, 69, 1)',
                borderWidth: 1
            }]
        };

        const coGraph = new Chart(ctx, {
            type: 'bar',
            data: coData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Marks'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Course Outcomes'
                        }
                    }
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Cleanup the chart instance on component unmount
        return () => {
            coGraph.destroy();
        };
    }, []);

    return (
        <div className="container">
            <div className="header">
                <h1>Student Marks Analysis</h1>
            </div>

            <div className="marks-container">
                <div className="marks-section">
                    <h2>IA Marks Overview: ITC401: MATHEMATICS</h2>
                    <div className="marks-card">
                        <h3>Q1 - CO1</h3>
                        <div className="marks-value">4 / 5</div>
                    </div>
                    <div className="marks-card">
                        <h3>Q2 - CO2</h3>
                        <div className="marks-value">3 / 5</div>
                    </div>
                    <div className="marks-card">
                        <h3>Q3 - CO3</h3>
                        <div className="marks-value">8 / 10</div>
                    </div>
                    <div className="total">
                        <h3>Total Marks: <span id="totalMarks">15</span> / 20</h3>
                    </div>
                </div>

                <div className="graph-container">
                    <h2>Course Outcome Progress</h2>
                    <canvas ref={chartRef} id="coGraph"></canvas>
                    <div className="progress-info">
                        <p>Performance by Course Outcome:</p>
                        <ul>
                            <li>CO1: <strong>80%</strong></li>
                            <li>CO2: <strong>60%</strong></li>
                            <li>CO3: <strong>80%</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentMarksAnalysis;

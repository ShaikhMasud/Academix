import React, { useState,  useEffect } from 'react';
import './db_faculty.css';
import { Link } from 'react-router-dom';
// Import images
import bgImage from './bg img/b.JPG';
import graphIcon from './bg img/graph.png';
import coIcon from './bg img/co.png';
import profPic from './bg img/prof.jpeg';

function Subjects() {
    const [showGraph, setShowGraph] = useState(false);

    // Function to toggle the graph visibility
    const toggleGraph = () => {
        setShowGraph(prevShowGraph => !prevShowGraph);
    };

    // Function to toggle logout menu
    const toggleLogoutMenu = () => {
        const logoutMenu = document.getElementById('logoutMenu');
        if (logoutMenu.style.display === 'block') {
            logoutMenu.style.display = 'none';
        } else {
            logoutMenu.style.display = 'block';
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        alert('Logging out...');
        // Add your logout logic here
    };

    useEffect(() => {
        // Initialize Chart.js or other required setup here if needed
    }, []);

    return (
        <>
            <nav className="curved-nav">
                <div className="nav-content">
                    <Link to="/hoddashboard"><button className="nav-btn">Home</button></Link>
                    <div className="profile-menu">
                        <div className="profile-circle" onClick={toggleLogoutMenu}>
                            <i className="fas fa-user" />
                        </div>
                        <div id="logoutMenu" className="logout-menu">
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="card-container">
                <article className="skill-card" data-aos="zoom-in" data-aos-delay={350}>
                    <img
                        className="skill-card__background"
                        src={bgImage}
                        alt="Background"
                        width={1920}
                        height={2193}
                    />
                    <div className="skill-card__content | flow">
                        <div className="skill-card__content--container | flow">
                            <button className="icon-button" onClick={toggleGraph}>
                                <img src={graphIcon} alt="Graph Icon" />
                            </button>
                            <Link to="/co-po"><button className="icon-button">
                                <img src={coIcon} alt="CO Icon" />
                            </button>
                            </Link>
                            <h2 className="skill-card__title">ITC-301 MATHEMATICS</h2>
                            <pre className="skill-card__description">
                                <Link to="/IA_marks_entry"><button className="btn">IA 1 </button> - LEVEL 2{"\n"}
                                {"\n"}
                                <button className="btn"> IA 2</button> - LEVEL 1{"\n"}
                                {"\n"}
                                </Link>
                                <button className="btn"> INTERNAL</button> - LEVEL 2{"\n"}
                                {"\n"}
                                <button className="btn"> ESE</button> - LEVEL 1{"\n"}
                                {"                    "}
                            </pre>
                        </div>
                    </div>
                </article>
                
                <article className="skill-card" data-aos="zoom-in" data-aos-delay={350}>
                    <img
                        className="skill-card__background"
                        src={bgImage}
                        alt="Background"
                        width={1920}
                        height={2193}
                    />
                    <div className="skill-card__content | flow">
                        <div className="skill-card__content--container | flow">
                            <button className="icon-button" onClick={toggleGraph}>
                                <img src={graphIcon} alt="Graph Icon" />
                            </button>
                            <Link to="/co-po"><button className="icon-button">
                                <img src={coIcon} alt="CO Icon" />
                            </button>
                            </Link>
                            <h2 className="skill-card__title">
                                ITC-505 <br /> ADSA
                            </h2>
                            <pre className="skill-card__description">
                                <Link to="/IA_marks_entry"><button className="btn">IA 1 </button> - LEVEL 2{"\n"}
                                {"\n"}
                                <button className="btn"> IA 2</button> - LEVEL 1{"\n"}
                                {"\n"}
                                </Link>
                                <button className="btn"> INTERNAL</button> - LEVEL 2{"\n"}
                                {"\n"}
                                <button className="btn"> ESE</button> - LEVEL 1{"\n"}
                                {"                  "}
                            </pre>
                        </div>
                    </div>
                </article>
                
                <article className="skill-card" data-aos="zoom-in" data-aos-delay={350}>
                    <img
                        className="skill-card__background"
                        src={bgImage}
                        alt="Background"
                        width={1920}
                        height={2193}
                    />
                    <div className="skill-card__content | flow">
                        <div className="skill-card__content--container | flow">
                            <button className="icon-button" onClick={toggleGraph}>
                                <img src={graphIcon} alt="Graph Icon" />
                            </button>
                            <Link to="/co-po"><button className="icon-button">
                                <img src={coIcon} alt="CO Icon" />
                            </button>
                            </Link>
                            <h2 className="skill-card__title">
                                ITC-703 <br /> AIML
                            </h2>
                            <pre className="skill-card__description">
                                <Link to="/IA_marks_entry"><button className="btn">IA 1 </button> - LEVEL 2{"\n"}
                                {"\n"}
                                <button className="btn"> IA 2</button> - LEVEL 1{"\n"}
                                {"\n"}
                                </Link>
                                <button className="btn"> INTERNAL</button> - LEVEL 2{"\n"}
                                {"\n"}
                                <button className="btn"> ESE</button> - LEVEL 1{"\n"}
                                {"                "}
                            </pre>
                        </div>
                    </div>
                </article>

                <div className="profile">
                    <img className="profile-pic" src={profPic} alt="Profile" />
                    <h2 className="name">Hello Dushyant!</h2>
                    {/* Graph */}
                    {showGraph && (
                        <div className="graph-container" id="graphContainer">
                            <canvas id="levelChart" />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Subjects;

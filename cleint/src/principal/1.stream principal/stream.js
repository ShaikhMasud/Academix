import React, { useState, useEffect, useRef } from 'react';
import './stream.css'; // Ensure this is the path to your CSS file
import { Link, useNavigate } from 'react-router-dom';




const StreamPage = () => {
  const navigate = useNavigate();

  const storedUser = sessionStorage.getItem('currentUser');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [isMenuVisible, setMenuVisible] = useState(false);
  const cardRefs = useRef([]);

  const logout = () => {
    alert('Logging out...');
    // Add your logout logic here
  };

  const handleCardClick = (stream) => {
    window.location.href = `/${stream}-overview.html`;
  };
  

  useEffect(() => {
    const handleMouseMove = (event) => {
      cardRefs.current.forEach((card) => {
        if (card) {
          let gloss = card.querySelector('.card__gloss');
          let rect = card.getBoundingClientRect();
          let width = card.offsetWidth;
          let height = card.offsetHeight;
          let mouseX = event.clientX - rect.left - width / 2;
          let mouseY = event.clientY - rect.top - height / 2;
          let currentX = 0;
          let currentY = 0;
          let requestId;

          function updateParallax(card, gloss, width, height) {
            currentX += (mouseX - currentX) * 0.1;  // Smooth transition
            currentY += (mouseY - currentY) * 0.1;
            light(currentX, currentY, gloss, width, height);
            tilt(currentX, currentY, card, width, height);

            if (Math.abs(mouseX - currentX) < 0.1 && Math.abs(mouseY - currentY) < 0.1) {
              requestId = null;  // Stop the animation if it's very close to the target
            } else {
              requestId = requestAnimationFrame(() => updateParallax(card, gloss, width, height));
            }
          }

          function light(x, y, gloss, width, height) {
            let angle = (Math.atan2(y, x) * 180) / Math.PI - 90;
            gloss.style.background = `linear-gradient(${angle}deg, rgba(255, 255, 255, ${y / height * 0.9}) 0%, rgba(255, 255, 255, 0) 80%)`;    
          }

          function tilt(x, y, card, width, height) {
            let force = 40; // Adjusted force for smoother effect
            let rx = (x / width) * force;
            let ry = (y / height) * -force;
            card.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;
          }

          function resetTilt(card, gloss) {
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            gloss.style.background = 'none';
          }

          card.addEventListener('mousemove', (event) => {
            let rect = card.getBoundingClientRect();
            mouseX = event.clientX - rect.left - width / 2;
            mouseY = event.clientY - rect.top - height / 2;
            if (!requestId) {
              requestId = requestAnimationFrame(() => updateParallax(card, gloss, width, height));
            }
          });

          card.addEventListener('mouseleave', () => {
            resetTilt(card, gloss);
          });
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  if (!user) {
    return <p>Please log in to access this page.</p>;
  }
  const toggleLogoutMenu = () => {
    const logoutMenu = document.getElementById('logoutMenu');
    logoutMenu.style.display = logoutMenu.style.display === 'block' ? 'none' : 'block';
};

const handleLogout = () => {
    sessionStorage.removeItem('currentUser'); // Clear user session
    navigate('/'); // Redirect to login
};

  return (
    user.role==="Principal"?(
    <div>
      <nav className="curved-nav">
        <div className="nav-content">
          <Link to="/sub"><button className="nav-btn">Subjects</button></Link>
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

      <div className="stream-container">
        {['IT', 'Comps', 'EXTC', 'Mech', 'FE'].map((stream) => (
          <Link to={`/stream_analysis/${stream}`}>
          <div className="container" key={stream}>
            <button
              id={`card-${stream}`}
              className="card"
              onClick={() => handleCardClick(stream)}
              ref={(el) => (cardRefs.current[stream] = el)}
            >
              <div className="card__content">
                <i className={`fas fa-${stream === 'IT' ? 'network-wired' : stream === 'Comps' ? 'laptop-code' : stream === 'EXTC' ? 'broadcast-tower' : stream === 'Mech' ? 'cogs' : 'flask'}`}></i>
                <h3 className="card__name">
                  {stream === 'IT'
                    ? 'Information Technology'
                    : stream === 'Comps'
                    ? 'Computer Science'
                    : stream === 'EXTC'
                    ? 'Electronics & Telecomm'
                    : stream === 'Mech'
                    ? 'Mechanical Engineering'
                    : 'First Year Engineering'}
                </h3>
                <p className="card__stream">{stream.toUpperCase()}</p>
              </div>
              <div className="card__gloss"></div>
            </button>
          </div>
          </Link>
        ))}
      </div>
    </div>
    ):(
      <p>Access denied. This page is for Pricipal only.</p>
    )
  );
};

export default StreamPage;

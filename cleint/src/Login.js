import React, { useState, useEffect } from 'react';
import './login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons for password visibility
import * as THREE from 'three'; // Importing Three.js for 3D animations

function Login() {
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('currentUser');

    axios.post('http://localhost:3001/login', { username, password })
      .then(result => {
        if (result.data !== "Unauthorized") {
          sessionStorage.setItem('currentUser', JSON.stringify(result.data));
          if (result.data.role === "HOD") navigate("/hoddashboard");
          else if (result.data.role === "Principal") navigate("/principaldashboard");
          else if (result.data.role === "Teacher") navigate("/facultydashboard");
        } else {
          setMessage('Unauthorized: Please check your credentials.');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="containerlog d-flex justify-content-center align-items-center vh-100">
      <div className="cardlog p-4 animate-card" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                name="password"
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="input-group-append" onClick={() => setShowPassword(!showPassword)}>
                <span className="input-group-text eye-icon">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {message && (
          <div className="text-center mt-3">
            <p className={`text-${message.includes('Unauthorized') ? 'danger' : 'success'}`}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;

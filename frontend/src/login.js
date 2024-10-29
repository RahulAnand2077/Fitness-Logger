import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = 'hidden';

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful, store token and redirect to the main page
        localStorage.setItem('token', data.token); // Store token in localStorage
        navigate('/main');
      } else {
        alert(data.message || 'Invalid credentials'); // Display error in an alert
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div id="login_page">
      <div id="image-container">
        <img id="_1_img" src={`${process.env.PUBLIC_URL}/img3.jpg`} alt="Fitness Image" />
        <div id="overlay"></div>
      </div>

      <div id="text-overlay">
        <h1>Fitness Logger</h1>
      </div>

      <div id="login">
        <h2>Login</h2>
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Enable onChange to track input
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Enable onChange to track input
        />
        <br />
        <button type="submit" onClick={handleLogin}>Login</button>
        <br />
        <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}

export default Login;

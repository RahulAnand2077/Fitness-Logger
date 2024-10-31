import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';  

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loc = null;  // You can collect this from the user in the future
  const age = null;  // You can collect this from the user in the future
  const height = null;  // You can collect this from the user in the future
  const weight = null;  // You can collect this from the user in the future
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, loc, age, height, weight }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save user details to localStorage
        localStorage.setItem('username', data.username);
        localStorage.setItem('email', data.email);
        localStorage.setItem('loc', loc); // If you collect location later
        localStorage.setItem('age', age); // If you collect age later
        localStorage.setItem('height', height); // If you collect height later
        localStorage.setItem('weight', weight); // If you collect weight later

        alert('Signup successful!');
        navigate('/main');
      } else {
        alert(data.message || 'Signup failed. Please try again.');
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
        <h2>Sign up</h2><br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br/><br/>
          <button type="submit">Sign Up</button>
        </form>
        <br />
      </div>
    </div>
  );
}

export default Signup;

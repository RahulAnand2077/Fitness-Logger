import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
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
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("loc", data.loc);
        localStorage.setItem("age", data.age);
        localStorage.setItem("height", data.height);
        localStorage.setItem("weight", data.weight);
        navigate('/main');
      } else {
        alert(data.message || 'Invalid credentials'); 
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
        />

        <button type="submit" onClick={handleLogin}>Login</button>
        <br/>
        <a href="/signup">Sign up</a>
      </div>
    </div>
  );
}

export default Login;

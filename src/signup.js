import React, { useState, useEffect } from 'react';
import './login.css';  // Using the same CSS file for styling

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Disable scrolling when the component mounts
    document.body.style.overflow = 'hidden';

    // Enable scrolling when the component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the sign-up logic here
    console.log("Email:", email, "Password:", password);
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
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

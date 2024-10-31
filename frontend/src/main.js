import React, { useState,useEffect } from 'react';
import './main.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './login';
import './about_us';
import axios from 'axios';


const Main = () => {
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [log, setLog] = useState('');

    const [username, setUsername] = useState('');
    useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
      else {
          window.location.href = '/login';
      }
    }, []);

    useEffect(() => {
      console.log("Fetched workouts:", workouts);
  }, [workouts]);

    const today = new Date().toLocaleDateString();
    
    function handleSignOut() {
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('loc');
      localStorage.removeItem('age');
      localStorage.removeItem('height');
      localStorage.removeItem('weight');
      setUsername('');
      window.location.href = '/login'; 
    }

    function addWorkout() {
      setShowWorkoutForm(true);
    }
  
    function submitWorkout() {
      const workoutData = {
          email: localStorage.getItem("email"),
          date: today,
          log: log, 
      };
  
      axios.post("http://localhost:5010/logs", workoutData)
          .then(response => {
              alert(response.data.message);
              setWorkouts([...workouts, workoutData]);
              setLog('');
              setShowWorkoutForm(false);
          })
          .catch(error => {
              console.error("Error logging workout:", error?.response?.data || error.message);
              alert("Error logging workout");
          });
  }
  
  
    function cancelWorkout() {
      setShowWorkoutForm(false);
    }
  
    return (
      <div id="main">
        <div id="topbar_main">
          <h1 id="title_company_main">Fitness Logger</h1>
          <h1 id="about_us_main">
            <a href="/about_us">About us</a>
          </h1>
        </div>
  
        <div id="profile_main">
          <img
            src={`${process.env.PUBLIC_URL}/img2.jpg`}
            alt="Profile Photo"
            id="profile_photo_main"
          />
          <div id="profile_content_main">
            <p id="username_main">
              <a href="/profile">{username || 'Guest'}</a>
            </p>
            <a href="#" id="signout_main" onClick={handleSignOut}>
              Sign out
            </a>
          </div>
        </div>
        
        <div class="section-container">
          <span id="quote1">
            <p>"Nothing will work unless you do."</p>
          </span>
  
          <div id="recent">
            <div id="workoutList">
              {workouts.length === 0 ? (
                <p id="recent_workout">No recent workouts logged.</p>
              ) : (
                workouts?.map((workout, index) => (
                  <div key={index}>
                      <p><strong>{workout.date}</strong></p>
                      {workout.logs?.map((log, logIndex) => (
                          <div key={logIndex}>{log}</div>
                      ))}
                  </div>
                ))
              )}
            </div>
  
            {showWorkoutForm && (
              <div id="workoutForm">
                <textarea
                  placeholder='Log Workout'
                  value={log}
                  onChange={(e) => setLog(e.target.value)}
                  rows="12"
                  style={{ width: '100%' }}
                ></textarea>
                <button id="workout_sub_b" onClick={submitWorkout}>Submit</button>
                <button id="workout_sub_b" onClick={cancelWorkout}>Cancel</button>
              </div>
            )}
          </div>
  
          <div id="add_workout">
            <button id="b1" onClick={addWorkout}>
              Log Workout
            </button>
          </div>
  
          <div id="quote2">
            <p>"All progress takes place outside the comfort zone."</p>
          </div>
          <div id="goals">{/* Placeholder for goals details */}</div>
          <div id="add_goals">
            <button id="b2">Log Goals</button>
          </div>
  
          <div id="quote3">
            <p>"Excuses don't burn calories."</p>
          </div>
          <div id="nutrition">{/* Placeholder for nutrition details */}</div>
          <div id="add_food">
            <button id="b3">Log Calories</button>
          </div>
        </div>
  
        <div id="footer_main">
          <div id="foot_content_main">
            <div className="social-icons">
              <a
                href="https://www.linkedin.com/in/rahul-anand-bb3995317/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </a>{' '}
              |
              <a
                href="https://www.instagram.com/i_rahul.anand/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faInstagram} /> Instagram
              </a>
            </div>
            <p>&copy; 2024 FitLog. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Main;

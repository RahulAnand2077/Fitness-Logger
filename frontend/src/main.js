import React, { useState } from 'react';
import './main.css'; // Import the CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './login';
import './about_us';


const Main = () => {
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [exercise, setExercise] = useState('Planck');
    const [reps, setReps] = useState('');
  
    const today = new Date().toLocaleDateString();
  
    function addWorkout() {
      setShowWorkoutForm(true);
    }
  
    function submitWorkout() {
      if (reps < 1) {
        alert('Number of reps must be 1 or greater.');
        return;
      }
  
      const newWorkout = {
        exercise,
        reps,
      };
  
      setWorkouts([...workouts, newWorkout]);
      setExercise('Planck');
      setReps('');
      setShowWorkoutForm(false);
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
            src={`${process.env.PUBLIC_URL}/img1.jpg`}
            alt="Profile Photo"
            id="profile_photo_main"
          />
          <div id="profile_content_main">
            <p id="username_main">
              <a href="/profile">John Doe</a>
            </p>
            <a href="/login" id="signout_main">
              Sign out
            </a>
          </div>
        </div>
        
        <div class="section-container">
          <span id="quote1">
            <p>"Nothing will work unless you do."</p>
          </span>
  
          <div id="recent">
            <p>{today}</p> 
            <div id="workoutList">
              {workouts.length === 0 ? (
                <p id="recent_workout">No recent workouts logged.</p>
              ) : (
                workouts.map((workout, index) => (
                  <div key={index}>
                    {workout.exercise} - {workout.reps} reps
                  </div>
                ))
              )}
            </div>
  
            {showWorkoutForm && (
              <div id="workoutForm">
                <label htmlFor="exercise">Exercise:</label>
                <select
                  id="exercise"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                >
                  <option value="Planck">Planck</option>
                  <option value="Squats">Squats</option>
                  <option value="Push-ups">Push-ups</option>
                  <option value="Running">Running</option>
                  <option value="Cycling">Cycling</option>
                </select>
                <label htmlFor="reps">Reps:</label>
                <input
                  type="number"
                  id="reps"
                  min="1"
                  value={reps}
                  onChange={(e) => setReps(e.target.value)}
                  required
                />
                <button onClick={submitWorkout}>Submit</button>
                <button onClick={cancelWorkout}>Cancel</button>
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

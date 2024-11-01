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

    const today = new Date().toLocaleDateString();

    useEffect(() => {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
      else {
          window.location.href = '/login';
      }
    }, []);

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

    useEffect(() => {
      fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
      try {
          const email = localStorage.getItem("email");
          const response = await axios.get(`http://localhost:5010/logs?email=${email}`);
          setWorkouts(response.data.workouts || []);
      } catch (error) {
          console.error("Error fetching workouts:", error);
      }
    };

    const submitWorkout = async () => {
      const workoutData = {
          email: localStorage.getItem("email"),
          date: today,
          log: log, 
      };

      try {
          await axios.post("http://localhost:5010/logs", workoutData);
          setLog('');
          setShowWorkoutForm(false);
          fetchWorkouts(); 
      } catch (error) {
          console.error("Error logging workout:", error);
          alert("Error logging workout");
      }
    };
  
    function addWorkout() {
      setShowWorkoutForm(true);
    }
    function cancelWorkout() {
      setShowWorkoutForm(false);
    }


    const fetchGoals = async () => {
      const email = localStorage.getItem("email");
  
      try {
          const response = await axios.get(`http://localhost:5015/goals?email=${email}`);
          const todayGoals = response.data.goals.find(goal => goal.date === today);
  
          if (todayGoals) {
              setWaterIntake(todayGoals.goals[0].water || 0);
              setSleep(todayGoals.goals[0].sleep || 0);
          }
      } catch (error) {
          console.error("Error fetching goals:", error);
      }
    };
    
    useEffect(() => {
        fetchGoals();
    }, []);
    
    const saveGoals = async () => {
      const email = localStorage.getItem("email");
  
      try {
          await axios.post("http://localhost:5015/goals", {
              email,
              date: today,
              water: waterIntake,
              sleep: sleepIntake,
          });
      } catch (error) {
          console.error("Error saving goals:", error);
          alert("Error saving goals");
      }
    };

    const [waterIntake, setWaterIntake] = useState(0);
    const dailyGoal_w = 2000; 

    const addWaterIntake = () => {
        if (waterIntake < dailyGoal_w) {
            const newIntake_w = waterIntake + 200;
            setWaterIntake(newIntake_w > dailyGoal_w ? dailyGoal_w : newIntake_w);
            saveGoals();
        }
    };

    useEffect(() => {
        const percentage = Math.min((waterIntake / dailyGoal_w) * 100, 100);
        document.querySelector(".circular-progress1").style.setProperty("--progress", `${(percentage / 100) * 360}deg`);
        document.querySelector(".progress-value1").textContent = `${Math.round(percentage)}%`;
    }, [waterIntake]);

    const [sleepIntake, setSleep] = useState(0);
    const dailyGoal_s = 8; 

    const addSleep = () => {
        if (sleepIntake < dailyGoal_s) {
            const newIntake_s = sleepIntake + 1;
            setSleep(newIntake_s > dailyGoal_s ? dailyGoal_s : newIntake_s);
            saveGoals();
        }
    };

    useEffect(() => {
        const percentage = Math.min((sleepIntake / dailyGoal_s) * 100, 100);
        document.querySelector(".circular-progress2").style.setProperty("--progress", `${(percentage / 100) * 360}deg`);
        document.querySelector(".progress-value2").textContent = `${Math.round(percentage)}%`;
    }, [sleepIntake]);
  
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
            <h2>Workout</h2>
            <p>"Nothing will work unless you do."</p>
          </span>
  
          <div id="recent">
            <div id="workoutList">
            {workouts.length === 0 ? (
              <p id="recent_workout">No recent workouts logged.</p>
            ) : (
              workouts.map((workout, index) => (
                <div key={index}>
                    <p><strong>{workout.date}</strong></p>
                    {workout.logs.map((log, logIndex) => (
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
            <h2>Goals</h2>
            <p>"All progress takes place outside the comfort zone."</p>
          </div>
          <div id="goals">
            <div id="waterTracker">
              <h2>Water Intake</h2>
              <h4>2000ml</h4>
              <div class="circular-progress1">
                  <span class="progress-value1">0%</span>
                  <div id="blank_circle1"></div>
              </div>
              <button id="goal_b1" onClick={addWaterIntake}>Add 200ml</button>
            </div>

            <div id="sleepTracker">
              <h2>Sleep</h2>
              <h4>8 Hrs</h4>
              <div class="circular-progress2">
                  <span class="progress-value2">0%</span>
                  <div id="blank_circle2"></div>
              </div>
              <button id="goal_b2" onClick={addSleep}>Add 1 Hr</button>
            </div>
          </div>
  
          <div id="quote3">
            <h2>Nutirtion</h2>
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

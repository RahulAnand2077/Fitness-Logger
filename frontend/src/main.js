import React, { useState,useEffect } from 'react';
import './main.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './login';
import './about_us';
import './how_it_works'
import axios from 'axios';



const Main = () => {
    const [username, setUsername] = useState('');
    
    const [showWorkoutForm, setShowWorkoutForm] = useState(false);
    const [workouts, setWorkouts] = useState([]);
    const [log, setLog] = useState('');

    const [sleepIntake, setSleep] = useState(0);
    const [waterIntake, setWaterIntake] = useState(0);

    const [showCalForm, setShowCalForm] = useState(false);
    const [foodItems, setFoodItems] = useState([]);
    const [foodInput, setFoodInput] = useState('');
    const [currentFood, setCurrentFood] = useState(null);

    const today = new Date().toLocaleDateString();
    const dailyGoal_w = 2000; 
    const dailyGoal_s = 8; 

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



    // Workout 
    useEffect(() => {
      fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
      try {
          const email = localStorage.getItem("email");
          const response = await axios.get(`http://localhost:5010/logs?email=${email}&date=${today}`);
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



    // Goals
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
    const addWaterIntake = () => {
        if (waterIntake < dailyGoal_w) {
            const newIntake_w = waterIntake + 200;
            setWaterIntake(newIntake_w > dailyGoal_w ? dailyGoal_w : newIntake_w);
            saveGoals();
        }
    };
    useEffect(() => {
        const percentage1 = Math.min((waterIntake / dailyGoal_w) * 100, 100);
        document.querySelector(".circular-progress1").style.setProperty("--progress", `${(percentage1 / 100) * 360}deg`);
        document.querySelector(".progress-value1").textContent = `${Math.round(percentage1)}%`;
    }, [waterIntake]);
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



    //  Nutrition
    useEffect(() => {
      fetchFoodItems();
    }, []);
    const fetchFoodItems = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await axios.get(`http://localhost:5020/items?email=${email}`);
        setFoodItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    const fetchNutritionData = async () => {
      try {
        let response = await axios.get(
          `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(foodInput)}&search_simple=1&json=1`
        );
        
        if (response.data.products && response.data.products.length > 0) {
          const product = response.data.products[0];
          const nutriments = product.nutriments;
          
          const calories = 
            nutriments.energy_kcal_100g || 
            (nutriments.energy_100g ? nutriments.energy_100g / 4.184 : 0) || 
            0;
    
          setCurrentFood({
            name: product.product_name || foodInput,
            cal: Math.round(calories), 
            protein: Math.round((nutriments.proteins_100g || 0) * 10) / 10,
            carbs: Math.round((nutriments.carbohydrates_100g || 0) * 10) / 10,
            fat: Math.round((nutriments.fat_100g || 0) * 10) / 10,
          });
    
          console.log("OpenFoodFacts data:", {
            name: product.product_name || foodInput,
            cal: Math.round(calories),
            protein: nutriments.proteins_100g,
            carbs: nutriments.carbohydrates_100g,
            fat: nutriments.fat_100g
          });
    
        } else {
          const edamamResponse = await axios.get(
            'https://api.edamam.com/api/nutrition-data',
            {
              params: {
                app_id: "c8f76a8f",
                app_key: "44da0a94e538bffd3a898c6829fc4eb9",
                ingr: foodInput,
                nutrition_type: "logging" 
              },
            }
          );
    
          const nutrients = edamamResponse.data;
          
          setCurrentFood({
            name: foodInput,
            cal: Math.round(nutrients.calories || 0),
            protein: Math.round((nutrients.totalNutrients?.PROCNT?.quantity || 0) * 10) / 10,
            carbs: Math.round((nutrients.totalNutrients?.CHOCDF?.quantity || 0) * 10) / 10,
            fat: Math.round((nutrients.totalNutrients?.FAT?.quantity || 0) * 10) / 10,
          });
    
          console.log("Edamam data:", {
            calories: nutrients.calories,
            protein: nutrients.totalNutrients?.PROCNT?.quantity,
            carbs: nutrients.totalNutrients?.CHOCDF?.quantity,
            fat: nutrients.totalNutrients?.FAT?.quantity
          });
        }
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
        alert("Error fetching nutrition data. Please try again.");
      }
    };
    
    const NutritionPreview = ({ food }) => {
      if (!food) return null;
      
      return (
        <div className="nutrition-preview">
          <h3>Nutrition Information for: {food.name}</h3>
          <div className="nutrition-details">
            <p><strong>Calories:</strong> {food.cal} kcal</p>
            <p><strong>Protein:</strong> {food.protein}g</p>
            <p><strong>Carbohydrates:</strong> {food.carbs}g</p>
            <p><strong>Fat:</strong> {food.fat}g</p>
          </div>
        </div>
      );
    };

  const submitCal = async () => {
    if (!currentFood) {
      alert("Please search for a food item first");
      return;
    }

    const nutritionData = {
      email: localStorage.getItem("email"),
      date: today,
      ...currentFood
    };

    try {
      await axios.post("http://localhost:5020/items", nutritionData);
      setFoodInput('');
      setCurrentFood(null);
      setShowCalForm(false);
      fetchFoodItems();
    } catch (error) {
      console.error("Error logging nutrition:", error);
      alert("Error logging nutrition");
    }
  };


    return (
      <div id="main">
        <div id="topbar_main">
          <h1 id="title_company_main">Fitness Logger</h1>
          <h1 id="about_us_main">
            <a href="/about_us">About us</a>
          </h1>
          <h1 id="contact_us_main">
                <a href="/contact_us">Contact Us</a>
            </h1>
          <h1 id="how_it_works_main">
            <a href="/how_it_works">How It Works</a>
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
                  [...workouts].reverse().map((workout, index) => (
                      <div key={index}>
                          <br />
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
                  placeholder="Log Workout"
                  value={log}
                  onChange={(e) => setLog(e.target.value)}
                  rows="22"
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
            <h2>Nutrition</h2>
            <p>"Excuses don't burn calories."</p>
          </div>
          <div id="add_food">
            <button id="b3" onClick={() => setShowCalForm(true)}>Log Calories</button>
          </div>
          <div id="nutrition">
            <div id="nutritionList">
                {foodItems.length === 0 ? (
                    <p id="recent_food">No recent food items logged.</p>
                ) : (
                    // Reverse the foodItems array to show the latest food items first
                    [...foodItems].reverse().map((dayEntry, index) => (
                        <div key={index}>
                            <br />
                            <p><strong>{dayEntry.date}</strong></p>
                            {dayEntry.items.map((item, itemIndex) => (
                                <div key={itemIndex}>
                                    {item.name} - {item.cal}cal (P: {item.protein}g, C: {item.carbs}g, F: {item.fat}g)
                                </div>
                            ))}
                        </div>
                    ))
                )}
            </div>
            {showCalForm && (
              <div id="nutritionForm">
                <div className="search-section">
                  <input
                    type="text"
                    placeholder="Enter food item (e.g., '100g apple' or '1 slice bread')"
                    value={foodInput}
                    onChange={(e) => setFoodInput(e.target.value)}
                    style={{ width: '98%' }}
                  />
                  <button 
                    id="nut_sub_b1" 
                    onClick={fetchNutritionData}
                    className="search-button"
                  >
                    Search
                  </button>
                </div>
                
                {currentFood && <NutritionPreview food={currentFood} />}
                
                <div className="form-buttons">
                  <button 
                    id="nut_sub_b" 
                    onClick={submitCal}
                    disabled={!currentFood}
                  >
                    Submit
                  </button>
                  <button 
                    id="nut_sub_b" 
                    onClick={() => {
                      setShowCalForm(false);
                      setCurrentFood(null);
                      setFoodInput('');
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
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

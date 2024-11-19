import React from "react";
import "./how_it_works.css"; 

const HowItWorks = () => {
  return (
    
    <div>
        <div id="topbar_main">
            <h1 id="title_company_main">Fitness Logger</h1>
            <h1 id="about_us_main">
            <a href="/about_us">About us</a>
            </h1>
        </div>
        <div className="how-it-works-container">
            <h1>How It Works</h1>
            <p>
                Welcome to the FitLog Website! Follow these simple steps to get started with tracking your nutrition, goals, and workouts.
            </p>
            
            <div className="steps">
                <div className="step">
                <h2>1. Log Your Workouts</h2>
                <p>
                    Head to the "Workouts" section under the Main page and click log button to log your workouts.
                </p>
                </div>

                <div className="step">
                <h2>2. Log Your Goals</h2>
                <p>
                    Head to the "Goals" section under the Main page and you can update your sleep and water intake.
                </p>
                </div>

                <div className="step">
                <h2>3. Log Your Nutrition</h2>
                <p>
                    Head to the "Nutrition" section under the Main page and click log button to track your daily meals. 
                </p>
                </div>

                <div className="step">
                <h2>4. Update Your Profile</h2>
                <p>
                    Click your Username and Personalize your experience by updating your profile with your stats.
                </p>
                </div>

                <div className="step">
                <h2>5. Monitor Your Progress</h2>
                <p>
                    Regularly log your workout and nutrition and update your goals.
                </p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default HowItWorks;

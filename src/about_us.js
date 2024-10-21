import React from 'react';
import './main.css'; // Make sure to import your CSS file

const AboutUs = () => {
    return (
        <div>
            <div id="topbar">
                <h1 id="title_company">Fitness Logger</h1>
            </div>

            <div id="about-section">
                <h2>About FitLog</h2>
                <p className="about_detail">
                    Welcome to FitLog! We are dedicated to helping you achieve your fitness goals through effective tracking and personalized insights. Our platform offers features to log workouts, set goals, and monitor your nutrition.
                </p>

                <h3>Our Mission</h3>
                <p className="about_detail">
                    Our mission is to empower individuals to lead healthier lives by providing the tools and resources needed to stay on track with their fitness journeys.
                </p>

                <h3>Our Team</h3>
                <p className="about_detail">
                    FitLog was created by a passionate team of fitness enthusiasts, nutritionists, and tech experts. We believe in the power of community and are committed to supporting you every step of the way.
                </p>

                <h3>Contact Us</h3>
                <p className="about_detail">
                    If you have any questions, feedback, or suggestions, feel free to reach out to us at{' '}
                    <a href="mailto:support@fitlog.com" style={{ textDecoration: 'none', color: '#FF204E' }}>
                        support@fitlog.com
                    </a>.
                </p>

                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/rahul-anand-bb3995317/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/i_rahul.anand/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
                <p>&copy; 2024 FitLog. All rights reserved.</p>
            </div>
        </div>
    );
};

export default AboutUs;

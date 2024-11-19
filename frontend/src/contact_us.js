import React from 'react';
import './main.css'; 

const ContactUs = () => {
    return (
        <div>
            <div id="topbar">
                <h1 id="title_company">Fitness Logger</h1>
            </div>

            <div id="about-section">
                <h2>Contact Us</h2>
                <p className="about_detail">
                    If you have any questions, feedback, or suggestions, feel free to reach out to us at{' '}
                    <br></br><br></br>
                    <strong>Email : </strong>
                    <a href="mailto:support@fitlog.com" style={{ textDecoration: 'none', color: '#FF204E' }}>
                        support@fitlog.com
                    </a>.
                    <p><strong>Phone : </strong> +1 234 567 8901</p>
                </p>

                <div className="social-icons">
                    <a href="https://www.linkedin.com/in/rahul-anand-bb3995317/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://www.instagram.com/i_rahul.anand/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

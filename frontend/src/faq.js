import React, { useState } from "react";
import "./faq.css"; // Optional: Add styling if needed

const FAQ = () => {
  const faqs = [
    {
      question: "What is the FitLog?",
      answer:
        "The Logger Website helps you track your fitness goals, daily workouts, and nutrition effortlessly.",
    },
    {
      question: "How do I sign up?",
      answer:
        "Click on the Sign-Up page, fill in your username, email and password, and you’re ready to get started!",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, your data is encrypted and securely stored. We take privacy seriously.",
    },
    {
      question: "Can I update my profile later?",
      answer:
        "Absolutely! You can modify your profile anytime from the 'Profile' section on the Main page.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You can reach out to us via the 'Contact Us' page for any assistance.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
        <div id="topbar_main">
            <h1 id="title_company_main">Fitness Logger</h1>
            <h1 id="contact_us_faq">
                <a href="/contact_us">Contact Us</a>
            </h1>
        </div>
        <div className="faq-container">
            <h1 id="heading">Frequently Asked Questions</h1>
            <div className="faq-list">
                {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={`faq-item ${activeIndex === index ? "active" : ""}`}
                >
                    <div className="faq-question" onClick={() => toggleFAQ(index)}>
                    {faq.question}
                    <span className="toggle-icon">
                        {activeIndex === index ? "-" : "+"}
                    </span>
                    </div>
                    {activeIndex === index && (
                    <div className="faq-answer">{faq.answer}</div>
                    )}
                </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default FAQ;

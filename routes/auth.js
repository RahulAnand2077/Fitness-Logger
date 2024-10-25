const express = require('express');
const router = express.Router();
const User = require('../models/User');  // Import the User model

// Signup Route
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received signup data:', email, password); // Debug log

  try {
    // Ensure email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Create and save new user
    const newUser = new User({ email, password });
    await newUser.save();

    // Return success message
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error saving user:', error); // Log error details
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Received login data:', email, password); // Debug log

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Check if the password matches (since no hashing, simple comparison)
    if (user.password !== password) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Login successful
    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error); // Log error details
    res.status(500).json({ success: false, message: 'Error logging in' });
  }
});

module.exports = router;

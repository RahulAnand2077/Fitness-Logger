// routes/authRoutes.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Assuming your user model is here
const router = express.Router();

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret'; // Replace this with a secure key

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid password' });
    }

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Send success response with the token
    return res.json({ success: true, token });
  } catch (error) {
    console.error('Error in login route:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

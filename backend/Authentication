//LOGIN & SIGN UP

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Sign Up
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword
    });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Registration failed' });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: 'Invalid email or password' });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.json({ success: false, message: 'Invalid email or password' });

    const token = jwt.sign({ email: user.email }, 'secretKey', { expiresIn: '1h' });
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: 'Login failed' });
  }
};

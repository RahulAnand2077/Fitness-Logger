const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./backend/Authentication'); // Import the auth routes

const app = express();

// Middleware
app.use(express.json());  // Parse incoming JSON requests
app.use(cors());  // Enable CORS for frontend-backend communication

// MongoDB connection
mongoose.connect('your_mongodb_connection_string_here', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/', authRoutes);  // Use the auth routes for signup/login

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

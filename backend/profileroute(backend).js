const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const authenticateToken = require('../middleware/authenticateToken');

// GET /profile - Fetch profile
router.get('/profile', authenticateToken, profileController.getProfile);

// PUT /profile - Update profile
router.put('/profile', authenticateToken, profileController.updateProfile);

module.exports = router;

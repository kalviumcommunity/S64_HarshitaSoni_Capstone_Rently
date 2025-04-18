const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, getAllUsers } = require('../controllers/userController');

// Register a new user
router.post('/', registerUser);

// Login user
router.post('/login', loginUser);

// Get user profile (optional)
router.get('/profile', getUserProfile);

// Fetch all users
router.get('/', getAllUsers);

module.exports = router;

const User = require('../models/User');  // Only one import
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users from the database
    res.json(users);  // Return all users in the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { role, name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ role, name, email, password: hashedPassword });
    await user.save();

    // Respond with the user data (excluding password)
    res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Respond with user data (excluding password)
    res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId); // Assuming the user ID is in the request (after authentication)
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

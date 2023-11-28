// routes/authRoutes.js

const express = require('express');
const { register, login } = require('../controllers/auth');
// const auth = require('../middleware/auth'); // Uncomment when you have the 'auth' middleware defined for protected routes

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;

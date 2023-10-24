const express = require('express');
const { register, login } = require('../controllers/auth');
// const auth = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

module.exports = router;
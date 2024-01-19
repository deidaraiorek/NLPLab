// controllers/auth.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    console.log('req.body:', req.body);
    const { email, password, isAdmin } = req.body;

    // Check if the user already exists
    let user = await User.findByEmail(email);
    if (user) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User(email, passwordHash, isAdmin);

    // Save the user in the database
    await user.save();

    // User registered successfully, now let's create a token for the user
    const payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };

    jwt.sign(
      payload,
      "deidara", // Ensure that you have JWT_SECRET in your .env
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, isAdmin: user.isAdmin }); // send token and isAdmin status back to the client
      }
    );
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).send('Invalid credentials');
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).send('Invalid credentials');
    }

    // Create and return a JWT
    const payload = {
      email: user.email,
      isAdmin: user.isAdmin,
    };

    jwt.sign(
      payload,
      "deidara", // from your .env file
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, isAdmin: user.isAdmin });
      }
    );
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).send('Error logging in user');
  }
};

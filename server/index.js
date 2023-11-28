const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// AWS configuration will be moved to the controller where it's used.

// Import routes
const contractRoutes = require('./routes/contract');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/contract', contractRoutes); // Setting the base path for all contract routes
app.use('/api/user', authRoutes); // Setting the base path for all auth routes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



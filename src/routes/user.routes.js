// routes/userRoutes.js

const express = require('express');
const { getUserDetails } = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware'); // Assuming you have an authentication middleware

const router = express.Router();

// Route to get user details and contacts
router.get('/details', authenticate, getUserDetails);

module.exports = router;

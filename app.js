const express = require('express');
const cors = require('cors')
const { logger, errorLogger } = require('./src/utils/logger');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/auth.routes');
const contactRoutes = require('./src/routes/contact.routes');
// const errorMiddleware = require('./src/middlewares/errorMiddleware');
const userRoutes = require('./src/routes/user.routes')
const app = express();
// Configure CORS
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Connect to MongoDB
connectDB();

// Middleware for logging requests
app.use(logger); // Log all requests

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
// Other middleware and routes
app.use('/api/users', userRoutes);
// Middleware for logging errors
app.use(errorLogger); // Log errors

// Error Handling Middleware
// app.use(errorMiddleware);

module.exports = app;

const express = require('express');
const { register, login, verifyOtp, resendVerificationEmail } = require('../controllers/auth.controller');
const { registerSchema, loginSchema, verifyOtpSchema } = require('../validations/auth.validation');
const { validate } = require('../middlewares/validate.middleware');
const Joi = require('joi')

const router = express.Router();

// User Registration
router.post('/register', validate(registerSchema), register);

// User Login
router.post('/login', validate(loginSchema), login);

// Verify OTP
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtp);

//Resend verification OTP
router.post('/resend-verification-email', resendVerificationEmail);

module.exports = router;

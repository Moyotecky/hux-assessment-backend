const { registerUser, loginUser, verifyOtpService } = require('../services/auth.service');
const { registerSchema, loginSchema, verifyOtpSchema } = require('../validations/auth.validation');
const User  = require('../models/User')
const { sendOtpEmail, sendWelcomeEmail } = require('../services/email.service');
const { generateOtp } = require('../services/otp.service');


// Registration controller
const register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Registration successful, check your email for the OTP' });
  } catch (error) {
    next(error);
  }
};

// Login controller
const login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    next(error);
  }
};

// Verify OTP controller
const verifyOtp = async (req, res, next) => {
  const { error } = verifyOtpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    await verifyOtpService(req.body);
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    next(error);
  }
};

// Function to resend verification email
const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Ensure User is properly imported
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a new OTP
    const otp = generateOtp(); // Ensure this function is defined elsewhere
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // OTP expires in 10 minutes

    // Save the OTP in the user document
    await user.save();

    // Send the OTP email
    await sendOtpEmail(user.email, otp); // Ensure this function is defined elsewhere

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    next(error);
  }
};


module.exports = {
  register,
  login,
  verifyOtp,
  resendVerificationEmail
};

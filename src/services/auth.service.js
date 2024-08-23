const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendOtpEmail, sendWelcomeEmail } = require('./email.service');

// Register user
const registerUser = async ({ username, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error('User already exists');

  const hashedPassword = await bcrypt.hash(password, 10);
  const otp = crypto.randomInt(100000, 999999).toString();
  const otpExpires = Date.now() + 10 * 60 * 1000;

  const user = new User({
    username,
    email,
    password: hashedPassword,
    otp,
    otpExpires,
  });

  await user.save();
  await sendOtpEmail(user.email, otp);

  return user;
};

// Login user
const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials');
  }

  if (!user.isVerified) {
    throw new Error('Email not verified');
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return token;
};

// Verify OTP
const verifyOtpService = async ({ email, otp }) => {
  const user = await User.findOne({ email, otp });

  if (!user) {
    throw new Error('Invalid OTP or email');
  }

  if (user.otpExpires < Date.now()) {
    throw new Error('OTP has expired');
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpires = undefined;

  sendWelcomeEmail(user.email, user.username)

  await user.save();
};

module.exports = {
  registerUser,
  loginUser,
  verifyOtpService,
};

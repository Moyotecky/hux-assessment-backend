const transporter = require('../config/mail');

// Enhanced OTP Email Template
const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-body {
      padding: 20px;
    }
    .email-footer {
      background-color: #f1f1f1;
      padding: 10px;
      text-align: center;
    }
    .button {
      display: inline-block;
      padding: 12px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #28a745;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;
      margin-top: 10px;
    }
    .button:hover {
      background-color: #218838;
    }
    h1 {
      font-size: 24px;
      color: #333333;
      margin: 0;
    }
    p {
      font-size: 16px;
      color: #666666;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Verification Code</h1>
    </div>
    <div class="email-body">
      <p>Dear User,</p>
      <p>We received a request to verify your email address. Your verification code is <strong>${otp}</strong>.</p>
      <p>Enter this code in the verification field to complete the process.</p>
      <a href="#" class="button">Verify Your Email</a>
    </div>
    <div class="email-footer">
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  </div>
</body>
</html>
`;

// Enhanced Welcome Email Template
const welcomeEmailTemplate = (name) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    .email-header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .email-body {
      padding: 20px;
    }
    .email-footer {
      background-color: #f1f1f1;
      padding: 10px;
      text-align: center;
    }
    .button {
      display: inline-block;
      padding: 12px 20px;
      font-size: 16px;
      color: #ffffff;
      background-color: #28a745;
      border-radius: 5px;
      text-decoration: none;
      text-align: center;
      margin-top: 10px;
    }
    .button:hover {
      background-color: #218838;
    }
    h1 {
      font-size: 24px;
      color: #333333;
      margin: 0;
    }
    p {
      font-size: 16px;
      color: #666666;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Welcome, ${name}!</h1>
    </div>
    <div class="email-body">
      <p>Hello ${name},</p>
      <p>Welcome to our service! We are thrilled to have you with us.</p>
      <p>Click the button below to get started and explore all the features we offer.</p>
      <a href="#" class="button">Get Started</a>
    </div>
    <div class="email-footer">
      <p>If you have any questions, feel free to contact us.</p>
    </div>
  </div>
</body>
</html>
`;

const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Verification Code',
    html: otpEmailTemplate(otp),
  };

  await transporter.sendMail(mailOptions);
};

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Our Service!',
    html: welcomeEmailTemplate(name),
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOtpEmail,
  sendWelcomeEmail,
};

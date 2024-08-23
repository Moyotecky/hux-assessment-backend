// controllers/userController.js

const User = require('../models/User');
const Contact = require('../models/Contact');

exports.getUserDetails = async (req, res) => {
  try {
    // Assuming req.user.id contains the user's ID from the authenticated token
    const userId = req.user.id;

    // Fetch the user details
    const user = await User.findById(userId).select('-password'); // Exclude password

    // Fetch the user's contacts
    const contacts = await Contact.find({ userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      username: user.username,
      email: user.email,
      contacts: contacts,
      // Add any other details you want to include
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ message: 'An error occurred while fetching user details' });
  }
};

const Contact = require('../models/Contact');
const { validateContact } = require('../middlewares/validate.middleware'); // Import validation middleware

// Create a new contact
const createContact = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, address, notes } = req.body;
    const userId = req.user._id; // Assuming user ID is available in req.user

    // Validate request data
    const { error } = validateContact(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const contact = new Contact({ user: userId, firstName, lastName, phoneNumber, email, address, notes });
    await contact.save();

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

// Retrieve all contacts for a user
const getContacts = async (req, res, next) => {
  try {
    const userId = req.user._id; // Assuming user ID is available in req.user
    const contacts = await Contact.find({ user: userId });

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

// Retrieve a single contact by ID
const getContactById = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOne({ _id: contactId, user: req.user._id });

    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// Update a contact by ID
const updateContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const { firstName, lastName, phoneNumber, email, address, notes } = req.body;

    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body);
    
    // Validate request data
    const { error } = validateContact(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const contact = await Contact.findOneAndUpdate(
      { _id: contactId, user: req.user._id },
      { firstName, lastName, phoneNumber, email, address, notes },
      { new: true }
    );

    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

// Delete a contact by ID
const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findOneAndDelete({ _id: contactId, user: req.user._id });

    if (!contact) return res.status(404).json({ message: 'Contact not found' });

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
};

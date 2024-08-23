const express = require('express');
const router = express.Router();
const {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact
} = require('../controllers/contact.controller');

// Middleware to ensure user is authenticated
const { authenticate } = require('../middlewares/auth.middleware');

// Route to create a new contact
router.post('/', authenticate, createContact);

// Route to retrieve all contacts for the logged-in user
router.get('/', authenticate, getContacts);

// Route to retrieve a specific contact by ID
router.get('/:id', authenticate, getContactById);

// Route to update a contact by ID
router.put('/:id', authenticate, updateContact);

// Route to delete a contact by ID
router.delete('/:id', authenticate, deleteContact);

module.exports = router;

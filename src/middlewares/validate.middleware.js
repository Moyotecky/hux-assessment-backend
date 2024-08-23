const { ValidationError } = require('joi');
const Joi = require('joi')
// Middleware for validating request data using Joi schemas
const validate = (schema) => (req, res, next) => {
  // Validate request body against the schema
  const { error } = schema.validate(req.body);
  
  if (error) {
    // If validation fails, send a 400 status with the validation error message
    return res.status(400).json({
      status: 'error',
      message: error.details[0].message
    });
  }
  
  // If validation passes, proceed to the next middleware or route handler
  next();
};

// Validation schema for contact
const contactSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  phoneNumber: Joi.string().required(), 
  email: Joi.string().email().optional(), // Optional email field
  address: Joi.string().optional(),
  notes: Joi.string().optional() // Optional notes field
});

// Validate contact data
const validateContact = (data) => {
  return contactSchema.validate(data);
};

module.exports = {
  validate,
  validateContact
};

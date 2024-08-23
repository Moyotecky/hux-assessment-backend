const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { 
    type: String, 
    required: true,
    validate: {
      validator: function(v) {
        return /^\+?[1-9]\d{1,14}$/.test(v); // Example: E.164 format
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  email: { 
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v); // Simple email regex
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  address: { type: String},
  notes: { type: String } // Optional field for additional notes
}, {
  timestamps: true,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;

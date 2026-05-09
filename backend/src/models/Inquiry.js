const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please add a valid email',
      ],
    },
    phone: {
      type: String,
      required: [true, 'Please add a phone number'],
    },
    interest: {
      type: String,
      required: [true, 'Please describe your interest'],
      maxLength: [1000, 'Interest message cannot be more than 1000 characters'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Inquiry', inquirySchema);

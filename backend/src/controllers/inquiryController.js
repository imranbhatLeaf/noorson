const Inquiry = require('../models/Inquiry');
const { sendInquiryEmail } = require('../services/emailService');

// @desc    Create new inquiry
// @route   POST /api/inquiries
// @access  Public
const createInquiry = async (req, res) => {
  try {
    const { name, email, phone, interest } = req.body;

    if (!name || !email || !phone || !interest) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const inquiry = await Inquiry.create({
      name,
      email,
      phone,
      interest,
    });

    // Send email notification asynchronously
    sendInquiryEmail(inquiry).catch(err => console.error('Email notification failed:', err));

    res.status(201).json({
      success: true,
      data: inquiry,
      message: 'Inquiry received successfully. We will contact you soon.',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message,
    });
  }
};

module.exports = { createInquiry };

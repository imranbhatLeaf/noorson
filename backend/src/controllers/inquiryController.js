const Inquiry = require('../models/Inquiry');
const { sendInquiryEmail } = require('../services/emailService');

// @desc    Get all inquiries
// @route   GET /api/inquiries
// @access  Public (add auth later)
const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: inquiries.length, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

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

module.exports = { createInquiry, getInquiries };

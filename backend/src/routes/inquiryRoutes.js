const express = require('express');
const router = express.Router();
const { createInquiry, getInquiries } = require('../controllers/inquiryController');

router.get('/', getInquiries);
router.post('/', createInquiry);

module.exports = router;

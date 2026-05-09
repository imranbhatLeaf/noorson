const express = require('express');
const router = express.Router();
const upload = require('../config/cloudinary');

// @desc    Upload an image to Cloudinary
// @route   POST /api/upload
// @access  Private (Currently Public for setup)
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  res.status(200).json({
    success: true,
    url: req.file.path, // This is the Cloudinary URL
    public_id: req.file.filename,
  });
});

module.exports = router;

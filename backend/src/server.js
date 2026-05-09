require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Rate Limiting for Inquiries (Spam protection)
const inquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 inquiry requests per window
  message: {
    success: false,
    message: 'Too many inquiries from this IP, please try again after 15 minutes',
  },
});

// Routes
app.use('/api/inquiries', inquiryLimiter, require('./routes/inquiryRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Basic route for health check
app.get('/', (req, res) => {
  res.send('Noorson Luxury Lookbook API is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

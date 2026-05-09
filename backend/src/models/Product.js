const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a product name'],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    media_urls: {
      type: [String],
      required: [true, 'Please add at least one image URL'],
    },
    category: {
      type: String,
      required: [true, 'Please specify a category'],
    },
    craft: {
      type: String,
      default: 'Sozni Pashmina',
    },
    origin: {
      type: String,
      default: 'Kashmir',
    },
    price: {
      type: String, // Storing as string to allow "Contact for Price" or similar
      default: 'Contact for pricing',
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    bg: {
      type: String,
      default: '#d6cfc4',
    },
    bgHover: {
      type: String,
      default: '#bfb5a8',
    },
    accent: {
      type: String,
      default: '#c8a870',
    },
    pattern: {
      type: String,
      default: 'diagonal',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Product', productSchema);

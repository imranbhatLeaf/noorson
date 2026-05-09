require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./config/db');

const products = [
  {
    name: 'Ivory Kani Shawl',
    description: 'A masterpiece of Kashmiri craftsmanship, this deep charcoal Pashmina features intricate silver needlework (Sozni).',
    media_urls: ['https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=1000&auto=format&fit=crop'],
    category: 'Heritage Collection',
    bg: '#d6cfc4',
    bgHover: '#bfb5a8',
    accent: '#7a6a58',
    pattern: 'diagonal',
    isFeatured: true
  },
  {
    name: 'Midnight Sozni',
    description: 'Soft cream-beige base with delicate pastel floral embroidery along the borders.',
    media_urls: ['https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=1000&auto=format&fit=crop'],
    category: 'Embroidery',
    bg: '#2a2824',
    bgHover: '#1a1816',
    accent: '#c8a870',
    pattern: 'dots',
    isFeatured: false
  },
  {
    name: 'The Celestial Sozni',
    description: 'An ethereal showcase of celestial patterns, hand-embroidered with precision on the finest Pashmina wool.',
    media_urls: ['https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297343/generated-image-september-13-2025---12_25pm-1-hqqfJyLM3nFBJx9m_wpq2lq.webp'],
    category: 'New Arrival',
    bg: '#c8884a',
    bgHover: '#a86e38',
    accent: '#fff8ee',
    pattern: 'wave',
    isFeatured: true
  },
  {
    name: 'Ethereal Bloom Wrap',
    description: 'A contemporary take on traditional motifs, this wrap features a blooming floral pattern.',
    media_urls: ['https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297739/another_pose_drone_view_2K_202605090841_ifs6en.jpg'],
    category: 'Editorial',
    bg: '#7a8c6e',
    bgHover: '#5e6e54',
    accent: '#f0ece4',
    pattern: 'grid',
    isFeatured: true
  },
  {
    name: 'Moonlight Heritage',
    description: 'A deep, reflective piece that mirrors the moonlight on the Jhelum river.',
    media_urls: ['https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297390/make_her_turn_202604262035_ini7fa.jpg'],
    category: "Collector's",
    bg: '#c8a8a0',
    bgHover: '#a88880',
    accent: '#3a2824',
    pattern: 'diagonal',
    isFeatured: true
  },
  {
    name: 'Indigo Jamavar',
    description: 'A rich Indigo Jamavar shawl with intricate Kani loom work.',
    media_urls: ['https://res.cloudinary.com/dy9t52cl1/image/upload/v1778297820/Slow_motion_Kashmiri_202604221512_uurvgn.jpg'],
    category: 'Kani Loom',
    bg: '#2e3a58',
    bgHover: '#1e2840',
    accent: '#c0b890',
    pattern: 'wave',
    isFeatured: false
  },
  {
    name: 'Alabaster Plain',
    description: 'A minimal alabaster plain shawl for a sophisticated look.',
    media_urls: ['https://res.cloudinary.com/dy9t52cl1/image/upload/v1778298936/whatsapp-image-2026-02-24-at-12.07.13-pm-nDwkI9BqKa0ewNY5_upwcap.jpg'],
    category: 'Minimal Edit',
    bg: '#e8e4dc',
    bgHover: '#d4cfc4',
    accent: '#6a5a4a',
    pattern: 'dots',
    isFeatured: false
  },
  {
    name: 'Ember Ring Shawl',
    description: 'A warm ember ring shawl from our Artisan Series.',
    media_urls: ['https://res.cloudinary.com/dy9t52cl1/image/upload/v1778298984/make_her_pose_202604261800_d6fxml.jpg'],
    category: 'Artisan Series',
    bg: '#8a3a28',
    bgHover: '#6e2c1e',
    accent: '#f0d8c0',
    pattern: 'grid',
    isFeatured: false
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing products
    await Product.deleteMany();
    console.log('Existing products cleared.');

    // Insert seed data
    await Product.insertMany(products);
    console.log('Seed data inserted successfully!');

    process.exit();
  } catch (error) {
    console.error(`Error with seeding: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();

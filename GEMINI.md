# Project: Noorson Luxury Lookbook Website

## Overview

This is a premium fashion-style lookbook website for Noorson, showcasing Kashmiri Sozni Pashmina shawls. The goal is to present products in a high-end, editorial format similar to luxury fashion brands.

This is NOT an e-commerce website. It is a visual showcase designed to attract international buyers and generate direct inquiries.

---

## Tech Stack

* Frontend: React.js
* Styling: Tailwind CSS
* Animations: Framer Motion
* Smooth Scroll: Lenis
* Backend: Node.js + Express
* Database: PostgreSQL (Supabase)

---

## Core Concept

Build a clean, minimal, luxury lookbook-style website with:

* Large visuals
* Editorial layouts
* Minimal text
* Smooth transitions

The focus is on showcasing products like a fashion brand, not selling them directly.

---

## Core Features

* Fullscreen hero section
* Collection gallery (grid-based)
* Product detail pages (image-heavy)
* Editorial/visual sections
* WhatsApp inquiry system
* Contact page

---

## Business Logic (IMPORTANT)

* No cart system
* No checkout
* No pricing emphasis (optional display)
* Products are unique, high-value pieces
* Users must contact to place orders
* Primary CTA = WhatsApp

---

## User Flow

1. User lands on homepage
2. Views hero visuals
3. Browses collection gallery
4. Clicks on a product
5. Views product detail page
6. Contacts via WhatsApp or form

---

## Homepage Structure

### 1. Hero Section

* Fullscreen image or video
* Minimal text (brand name + tagline)
* Strong visual impact

### 2. Collection Gallery

* Grid layout (2–3 items per row)
* Large product cards
* Hover: slight zoom + overlay text

### 3. Featured Product / Editorial Section

* Large image with minimal text
* Focus on craftsmanship and texture

### 4. About Section

* Short brand story (very minimal)

### 5. Contact / CTA Section

* WhatsApp button
* Clean, minimal layout

---

## Product Page Structure

* Fullscreen image gallery
* Scroll or swipe navigation
* Minimal product details:

  * Name
  * Craft (Sozni)
  * Origin (Kashmir)
* “Contact on WhatsApp” button

---

## UI/UX Design Principles

* Luxury, minimal, editorial aesthetic
* Large, high-quality visuals
* Generous whitespace
* Clean grid layouts
* No clutter
* No heavy UI elements

---

## Color Palette

* Deep black / charcoal
* Soft cream / beige
* Subtle gold accents (very limited use)

---

## Typography

* Serif font for headings (luxury feel)
* Sans-serif for body text
* Large font sizes with strong spacing

---

## Animation Guidelines

* Use subtle animations only
* Fade-ins, smooth transitions
* Slow hover effects (scale 1.03–1.05)
* Avoid heavy or complex animations

Use:

* Framer Motion for UI animations
* Lenis for smooth scrolling

---

## Coding Guidelines

* Use functional React components with hooks
* Keep components reusable and modular
* Use Tailwind CSS for styling
* Maintain clean folder structure
* Avoid overengineering

---

## Backend Requirements

* API for products
* API for inquiries
* Basic validation and error handling

---

## Database Design

Tables:

* products (id, name, description, media_urls, category_id)
* categories (id, name)
* inquiries (id, name, email, message, product_id)

---

## WhatsApp Integration

Primary conversion method:

https://wa.me/<number>?text=I am interested in this product

---

## Content Strategy

* Use real product images (high priority)
* Use AI-generated visuals only as background or artistic support
* Maintain consistent lighting and tone across images

---

## AI Instructions

* Always generate clean, minimal, production-ready code
* Do not add e-commerce features like cart or checkout
* Focus on visual presentation and user experience
* Follow luxury design principles strictly
* Keep UI simple and elegant

---

## Future Enhancements

* Multi-language support
* SEO optimization
* Admin dashboard for uploading products
* Email notifications for inquiries

---

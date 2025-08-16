# Progbiz Backend API

**Backend API for Progbiz** – a full-featured backend application built with Node.js and TypeScript.  
Supports **two user roles (Admin & User)**. Admin can manage Hero section, About section, Testimonials, and Q&A/FAQ.

---

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Installation & Running](#installation--running)
6. [API Endpoints](#api-endpoints)
7. [Scripts](#scripts)
8. [License](#license)

---

## Features

- **Admin functionalities (no login required):**
  - Create/Edit/Delete **Hero Section**
  - Create/Edit/Delete **About Section**
  - Manage **Testimonials**
  - Manage **Q&A / FAQ**
- REST API endpoints for user and admin actions
- Security: Helmet, Compression, Rate Limiting
- Logging using Winston
- File uploads via Cloudinary

---

## Technologies Used

- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT
- **File Storage:** Cloudinary (optional)
- **Dev Tools:** ts-node-dev, biome, lefthook, lint-staged

---

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm installed globally (`npm install -g pnpm`)
- MongoDB connection
- Cloudinary account (optional, for media uploads)

---

## Environment Variables

```env
# MongoDB connection
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=1d

# Cloudinary configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Node environment
NODE_ENV=development

```

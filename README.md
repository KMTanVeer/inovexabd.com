# Inovexa BD Website

Inovexa BD is an enterprise hardware showcase and catalog site for servers, networking equipment, and storage products.  
The project includes a React + Vite frontend and an Express API backend with optional MongoDB persistence.

## Features

- Product browsing with category and search filters
- Product detail pages with image galleries and specifications
- Category/sub-category navigation linked to real product detail paths
- Admin product management API with JWT-protected write routes
- Local in-memory product fallback when MongoDB is not configured

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Express
- MongoDB (optional)

## Project Structure

- `src/` — frontend app, pages, components, product data
- `src/server/` — API routes and database model
- `server.ts` — app server entry for dev/prod
- `Products-image/` — local product image assets

## Getting Started

### Prerequisites

- Node.js 20+ (recommended)

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy `.env.example` to `.env.local` (or `.env`) and set values:

- `JWT_SECRET` (required for auth token signing)
- `MONGODB_URI` (optional, enables DB persistence)
- `CLOUDINARY_*` (optional, if image upload flow is used)
- `GEMINI_API_KEY` (optional, for Gemini-powered features)

### 3) Run in development

```bash
npm run dev
```

The app runs on `http://localhost:3000`.

## Build and Validation

```bash
npm run lint
npm run build
```

## Admin Login (default)

- Email: `admin@inovexa.com`
- Password: `admin123`

> Change these credentials in `src/server/api.ts` before production use.

# Inovexa BD Website

Official storefront and admin panel for Inovexa BD, built with React + Vite + Express.

## Features

- Product catalog, categories, search, and product detail pages
- Admin login and protected product management APIs
- Dynamic page SEO metadata with Open Graph and Twitter tags
- Security-focused API updates (JWT-only auth configuration, login rate limit, security headers)
- Static SEO assets (`robots.txt`, `sitemap.xml`)

## Tech Stack

- Frontend: React 19, Vite, Tailwind CSS
- Backend: Express, Mongoose, JWT
- Build tools: TypeScript, esbuild

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### 1) Install dependencies

```bash
npm install
```

### 2) Configure environment variables

Copy `.env.example` into your runtime environment and set:

- `MONGODB_URI` (optional for DB-backed mode)
- `JWT_SECRET` (required for admin auth)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH` (recommended) or `ADMIN_PASSWORD` (local testing only)

Generate password hash:

```bash
node -e "console.log(require('bcryptjs').hashSync('strong-password', 12))"
```

### 3) Run locally

```bash
npm run dev
```

App runs on `http://localhost:3000`.

## Scripts

- `npm run dev` — Start development server
- `npm run build` — Build frontend and backend bundles
- `npm run start` — Run production server from `dist`
- `npm run lint` — Type-check with TypeScript

## SEO

- Base metadata is in `/index.html`
- Per-page metadata is managed by `src/components/common/SEO.tsx`
- Crawl assets:
  - `public/robots.txt`
  - `public/sitemap.xml`

## Notes

- This repository currently contains a `repo-clone/` directory with duplicate files not used at runtime.
- `npm run lint` may report unrelated issues from `repo-clone/` unless TypeScript scope is restricted.

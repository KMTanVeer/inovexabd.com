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

### 4) Add products with MongoDB Atlas (recommended flow)

1. Configure runtime env values:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD_HASH` (or `ADMIN_PASSWORD` for local testing only)
2. In MongoDB Atlas:
   - Allow your current IP in Network Access.
   - Create a DB user with read/write permissions for your database.
3. Start the app and confirm DB mode:
   - Check server log for `Connected to MongoDB`.
   - Verify `GET /api/health/db` returns `"usingDatabase": true`.
4. Open `http://localhost:3000/admin/login` and sign in with your admin credentials.
5. Go to `http://localhost:3000/admin/products` and add products from the admin panel.
6. Use only supported categories:
   - `switches`, `routers`, `ssds`, `servers`, `lan-cards`
7. Verify persistence:
   - Refresh admin products page.
   - Restart server and check product still exists.
   - Optionally verify document in Atlas collection.

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

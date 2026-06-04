# InovexaBD — Enterprise Network & Infrastructure Showcase

InovexaBD is a professional, high-performance web catalog and inventory showcase for enterprise hardware, including servers, routers, network switches, enterprise SSDs, and fiber optic accessories. 

The site features a custom client-side React 19 single-page application (SPA), automated build-time static site pre-rendering (SSG), dynamic server-side crawler meta injection, and an administrative panel backed by an Express backend API with optional MongoDB clustering.

---

## 🚀 Key Features

### 💻 Client & Visual Design (Frontend)
* **Modern Interface**: Glassmorphic UI containers, smooth animations via Framer Motion, and Tailwind CSS v4 design tokens.
* **Responsive Layouts**: Fully responsive layouts featuring mobile-first sliders, detail tab structures, and responsive image aspect grids to prevent layout shifts.
* **FOUC Prevention**: Immediate inline head checks reading user LocalStorage preferences to eliminate visual theme flashing.
* **B2B Call to Actions**: Dynamic pre-filled WhatsApp inquiry forms and immediate telephone link callbacks on detail pages.

### 🛡️ Security Hardening & Backend (API)
* **Secure Auth Systems**: Environment-driven credentials (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`) avoiding code leaks. Support for bcrypt password verification.
* **IP-based Rate Limiter**: Admin login routes restricted to a maximum of 5 attempts per 15 minutes to defend against brute-force attacks.
* **Strict Payload Filtering**: Blocked parameter injection by explicitly destructuring and validating incoming product payloads on `/api/products` (POST/PUT) instead of using the insecure `...req.body` spreading.
* **Secure HTTP Headers**: Set `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`, and HSTS Https headers to ensure browser security.

### 📈 SEO, Performance & CTR Optimizations
* **WebP Asset Optimization**: Hero banner assets compressed using Python Pillow, reducing images (e.g. Dell Server) from **1.02 MB -> 84 KB (a 91.5% reduction)**, boosting Largest Contentful Paint (LCP) speeds.
* **Dynamic OG Cards & SSG**: Automated build-time pre-rendering generating physical folders for all 28 dynamic product routes containing rich metadata. This ensures platforms like WhatsApp and Telegram display specs and image previews when shared.
* **Rich Snippets & Schema**: Fully compliant structured data including:
  * `WebSite` & `Organization` schemas (enabling Google Search knowledge graphs and Sitelinks Searchbox).
  * `Product` schema (integrating rating, review, merchant return finite window, and shipping country rate details).
  * `BreadcrumbList` schema showing logical folder hierarchies in search listings.
* **Robots & Sitemap**: Automated sitemap generator indexing static paths (including `/about`) and product pages inside `sitemap.xml`, linked to Google Search Console via canonical `www.` robots directives.

---

## 🛠️ Technology Stack

* **Frontend**: React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React icons, React Helmet Async
* **Backend**: Node.js, Express, JSON Web Token (JWT) auth, Bcryptjs, Mongoose/MongoDB
* **Build Tools**: Vite 6, Esbuild (for server bundling), Tsx, Sitemap XML generation scripts

---

## ⚙️ Environment Variables Configuration

Copy `.env.example` to `.env` in the root directory and define the following variables:

```env
# Database Connection (Optional, falls back to memory store if not set)
MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/inovexa"

# JWT Authentication
JWT_SECRET="your_secure_jwt_signing_secret_here"

# Administrative Credentials
ADMIN_EMAIL="admin@inovexa.com"
ADMIN_PASSWORD_HASH="$2a$10$X86Z99N1hYxX2K1Jg1Y1JeyoD6m59eD9O3qV7zN.L/h0N1S2C7p3O" # Bcrypt hash (Defaults to admin123 if not set)

# Image Uploads (Optional, Cloudinary cloud storage integrations)
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

---

## 📁 Repository Structure

```
├── public/                 # Static assets (Favicons, robots.txt, sitemap.xml)
├── scripts/                # Build pipeline scripts
│   ├── compress-images.py  # Conversions of hero assets to WebP
│   ├── generate-sitemap.ts # Sitemap XML generator
│   └── prerender-products.ts # SSG product route prerenderer
├── src/
│   ├── assets/             # Images and product photos
│   ├── components/         # Reusable widgets and Layout wrappers
│   │   ├── common/         # SEO, CookieConsent, BrandLogo, GlassContainer
│   │   └── layout/         # Header/Navbar and Footer
│   ├── context/            # Context providers (ThemeContext)
│   ├── data/               # Local product specifications database
│   ├── pages/              # App views (Home, Shop, ProductDetail, About, Returns, Shipping, Contact)
│   ├── server/             # Express API router and Mongoose models
│   ├── App.tsx             # Route definitions and store layout
│   └── main.tsx            # Client entry point
├── server.ts               # Express web server entry point
├── vercel.json             # Vercel CDN deployment configurations
└── package.json            # Scripts and dependencies definitions
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
The app will run locally on `http://localhost:3000`.

### 3. Compress Media Assets (Optional)
If you add or update hero images, run the Python compression script to generate WebP assets:
```bash
pip install Pillow
python scripts/compress-images.py
```

### 4. Build for Production
This compiles the client code, bundles the Express server, writes sitemaps, and pre-renders index pages:
```bash
npm run build
```

---

## 📦 Deployment & Hosting

### Vercel Deployment (Recommended)
This repository is configured for Git-based continuous deployment on Vercel:
* Vercel builds the static bundle and handles dynamic sitemap delivery.
* Redirect loops from non-www to www are managed at the edge based on [vercel.json](vercel.json).
* Static directories are pre-rendered during the `postbuild` script, meaning social platforms (WhatsApp, Telegram) can crawl product details without executing JS.

### VPS / Node Server Deployment
To deploy on a VPS (Ubuntu/CentOS), build the assets and start the bundled node server:
```bash
npm run build
npm start
```
The production server will listen on `0.0.0.0:3000`. Set `NODE_ENV=production` to enable HSTS and secure cookies.

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fs from "fs";
import { PRODUCTS } from "./src/data/products.ts";

// Load routes
import apiRouter from "./src/server/api.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  // Redirect non-www to www and enforce HTTPS security headers
  app.use((req, res, next) => {
    const host = req.headers.host;
    if (host === 'inovexabd.com') {
      return res.redirect(301, `https://www.inovexabd.com${req.originalUrl}`);
    }

    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    if (process.env.NODE_ENV === 'production') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
    next();
  });

  // Connect to MongoDB if URI is provided
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        serverSelectionTimeoutMS: 5000
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
    }
  } else {
    console.warn('MONGODB_URI environment variable not set. Database features will not work.');
  }

  // API routes
  app.use("/api", apiRouter);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    
    // Serve static files
    app.use(express.static(distPath));

    // Dynamic Meta Injection for Product Detail pages
    app.get('/product/:id', (req, res) => {
      const productId = req.params.id;
      const product = PRODUCTS.find(p => String(p.id) === String(productId));
      const htmlPath = path.join(distPath, 'index.html');

      if (product && fs.existsSync(htmlPath)) {
        try {
          let html = fs.readFileSync(htmlPath, 'utf8');
          const title = `${product.name} | ISP, Enterprise Networking & Data Center Solutions | InovexaBD`;
          const desc = `Buy ${product.name} from InovexaBD. Trusted supplier of ISP equipment, enterprise networking hardware, servers, storage systems, fiber optic solutions, and data center infrastructure in Bangladesh.`;
          
          let finalImage = product.image;
          if (finalImage.startsWith('/')) {
            finalImage = `https://www.inovexabd.com${finalImage}`;
          }

          html = html.replace(/<title>.*?<\/title>/, `<title>${title}</title>`);
          html = html.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/, `<meta name="description" content="${desc}" />`);

          const ogTags = `
    <link rel="canonical" href="https://www.inovexabd.com/product/${product.id}" />
    <meta property="og:url" content="https://www.inovexabd.com/product/${product.id}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:type" content="product" />
    <meta property="og:site_name" content="InovexaBD" />
    <meta property="og:image" content="${finalImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${finalImage}" />
`;
          html = html.replace('</head>', `${ogTags}\n  </head>`);
          return res.send(html);
        } catch (err) {
          console.error("Error generating dynamic meta tags:", err);
        }
      }
      res.sendFile(htmlPath);
    });

    // Fallback for SPA routing
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

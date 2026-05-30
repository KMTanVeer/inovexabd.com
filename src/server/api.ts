import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import rateLimit from "express-rate-limit";
import { timingSafeEqual } from "crypto";
import { Product } from "./models/Product.js";

const ProductModel = Product as any;
const router = Router();

import { PRODUCTS } from "../data/products.ts";

let localStore: any[] = [...PRODUCTS].map(p => ({ ...p, _id: p.id }));
const ALLOWED_PRODUCT_CATEGORIES = ["switches", "routers", "ssds", "servers", "lan-cards"];
const shouldUseDatabase = () =>
  process.env.USE_MONGODB === "true" && Boolean(process.env.MONGODB_URI && mongoose.connection.readyState === 1);

const normalizeString = (value: unknown, maxLength = 500) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const toNumber = (value: unknown, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const toBoolean = (value: unknown, fallback = false) =>
  typeof value === "boolean" ? value : fallback;

const sanitizeProductPayload = (body: any) => {
  const specifications = Array.isArray(body?.specifications)
    ? body.specifications
        .map((spec: any) => ({
          key: normalizeString(spec?.key, 120),
          value: normalizeString(spec?.value, 500),
        }))
        .filter((spec: any) => spec.key && spec.value)
        .slice(0, 30)
    : [];

  const images = Array.isArray(body?.images)
    ? body.images
        .filter((url: unknown) => typeof url === "string")
        .map((url: string) => url.trim().slice(0, 2000))
        .filter(Boolean)
        .slice(0, 10)
    : [];

  return {
    name: normalizeString(body?.name, 200),
    price: toNumber(body?.price),
    category: normalizeString(body?.category, 120),
    brand: normalizeString(body?.brand, 120),
    stock: Math.max(0, Math.floor(toNumber(body?.stock))),
    description: normalizeString(body?.description, 4000),
    specifications,
    images,
    featured: toBoolean(body?.featured),
    rating: toNumber(body?.rating, 0),
  };
};

const isValidProductCategory = (category: string) => ALLOWED_PRODUCT_CATEGORIES.includes(category);

const safeStringCompare = (a: string, b: string) => {
  const aBuffer = Buffer.from(a);
  const bBuffer = Buffer.from(b);
  if (aBuffer.length !== bBuffer.length) return false;
  return timingSafeEqual(aBuffer, bBuffer);
};

const verifyAdminCredentials = async (email: string, password: string) => {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || (!adminPasswordHash && !adminPassword)) {
    return false;
  }

  const emailMatches = safeStringCompare(email.toLowerCase(), adminEmail.toLowerCase());
  if (!emailMatches) return false;

  if (adminPasswordHash) {
    return bcrypt.compare(password, adminPasswordHash);
  }

  return safeStringCompare(password, adminPassword || "");
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  return secret && secret.trim() ? secret : null;
};

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
});

router.use(apiLimiter);
router.use("/auth", authLimiter);

// Middleware to verify JWT
const verifyToken = (req: any, res: any, next: any) => {
  const secret = getJwtSecret();
  if (!secret) {
    return res.status(503).json({ error: "Authentication is not configured." });
  }

  const bearerHeader = req.headers.authorization;
  if (!bearerHeader || !bearerHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const bearerToken = bearerHeader.slice(7).trim();
  if (!bearerToken) return res.sendStatus(401);

  jwt.verify(bearerToken, secret, (err: any, authData: any) => {
    if (err) return res.sendStatus(401);
    req.authData = authData;
    next();
  });
};

// Auth routes
router.post("/auth/login", async (req, res) => {
  const secret = getJwtSecret();
  if (!secret) {
    return res.status(503).json({ error: "Authentication is not configured." });
  }

  const { email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Invalid request payload." });
  }

  const valid = await verifyAdminCredentials(email.trim(), password);
  if (valid) {
    const token = jwt.sign({ user: "admin" }, secret, { expiresIn: "12h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials." });
  }
});

router.get("/auth/verify", verifyToken, (req, res) => {
  res.json({ valid: true });
});

// Product Routes
router.get("/health/db", async (_req, res) => {
  res.json({
    connected: mongoose.connection.readyState === 1,
    readyState: mongoose.connection.readyState,
    usingDatabase: shouldUseDatabase(),
  });
});

router.get("/products", async (req, res) => {
  if (!shouldUseDatabase()) {
    return res.json(localStore);
  }
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.json(products.map((product: any) => ({ ...product.toObject(), isFeatured: product.featured })));
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/products", verifyToken, async (req, res) => {
  const payload = sanitizeProductPayload(req.body);
  const imageUrl = payload.images.length > 0 ? payload.images[0] : normalizeString(req.body?.image, 2000);
  if (!payload.name || !payload.category || !payload.brand || !payload.description) {
    return res.status(400).json({ error: "Missing required product fields." });
  }
  if (!isValidProductCategory(payload.category)) {
    return res.status(400).json({ error: `Invalid category. Allowed: ${ALLOWED_PRODUCT_CATEGORIES.join(", ")}` });
  }

  if (!shouldUseDatabase()) {
    const featured = payload.featured;
    const newProd = {
      _id: `prod_${Date.now()}`,
      ...payload,
      image: imageUrl,
      featured,
      isFeatured: featured,
      createdAt: new Date().toISOString()
    };
    localStore.unshift(newProd);
    return res.status(201).json(newProd);
  }
  try {
    const featured = payload.featured;
    const newProduct = new ProductModel({
      ...payload,
      image: imageUrl,
      featured
    });
    const saved = await newProduct.save();
    res.status(201).json({ ...saved.toObject(), isFeatured: saved.featured });
  } catch (err) {
    res.status(400).json({ error: "Failed to save product" });
  }
});

router.put("/products/:id", verifyToken, async (req, res) => {
  const payload = sanitizeProductPayload(req.body);
  if (!Object.prototype.hasOwnProperty.call(req.body ?? {}, "rating")) {
    delete payload.rating;
  }
  const imageUrl = payload.images.length > 0 ? payload.images[0] : normalizeString(req.body?.image, 2000);
  const featured = payload.featured;
  if (!payload.name || !payload.category || !payload.brand || !payload.description) {
    return res.status(400).json({ error: "Missing required product fields." });
  }
  if (!isValidProductCategory(payload.category)) {
    return res.status(400).json({ error: `Invalid category. Allowed: ${ALLOWED_PRODUCT_CATEGORIES.join(", ")}` });
  }

  if (!shouldUseDatabase()) {
    const id = req.params.id;
    const index = localStore.findIndex(p => p._id === id || p.id === id);
    if (index !== -1) {
      const nextProduct: any = {
        ...localStore[index],
        ...payload,
        featured,
        isFeatured: featured
      };
      if (imageUrl) {
        nextProduct.image = imageUrl;
      }
      localStore[index] = {
        ...nextProduct
      };
      return res.json(localStore[index]);
    }
    return res.status(404).json({ error: "Product not found" });
  }
  try {
    const updatePayload: any = {
      ...payload,
      featured
    };
    if (imageUrl) updatePayload.image = imageUrl;

    const updated = await ProductModel.findByIdAndUpdate(req.params.id, updatePayload, { new: true });
    if (!updated) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ ...updated.toObject(), isFeatured: updated.featured });
  } catch (err) {
    res.status(400).json({ error: "Failed to update product" });
  }
});

router.delete("/products/:id", verifyToken, async (req, res) => {
  if (!shouldUseDatabase()) {
    const id = req.params.id;
    localStore = localStore.filter(p => p._id !== id && p.id !== id);
    return res.json({ success: true });
  }
  try {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: "Failed to delete product" });
  }
});

export default router;

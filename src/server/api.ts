import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Product } from "./models/Product.js";

const ProductModel = Product as any;
const router = Router();

import { PRODUCTS } from "../data/products.ts";

let localStore: any[] = [...PRODUCTS].map(p => ({ ...p, _id: p.id }));

// Middleware to verify JWT
const verifyToken = (req: any, res: any, next: any) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET || 'your_jwt_secret_here', (err: any, authData: any) => {
      if (err) return res.sendStatus(403);
      req.authData = authData;
      next();
    });
  } else {
    res.sendStatus(403);
  }
};

// Rate limiting for admin login (IP-based, max 5 attempts per 15 minutes)
const loginAttempts = new Map<string, { count: number; resetTime: number }>();
const loginRateLimiter = (req: any, res: any, next: any) => {
  const ip = req.ip || req.connection.remoteAddress || "unknown_ip";
  const now = Date.now();
  const attempts = loginAttempts.get(ip);
  
  if (attempts && attempts.resetTime > now) {
    if (attempts.count >= 5) {
      return res.status(429).json({ error: "Too many login attempts. Please try again in 15 minutes." });
    }
    attempts.count++;
  } else {
    loginAttempts.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
  }
  next();
};

// Auth routes
router.post("/auth/login", loginRateLimiter, (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || "admin@inovexa.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  const isEmailValid = email === adminEmail;
  let isPasswordValid = false;

  if (adminPasswordHash) {
    isPasswordValid = bcrypt.compareSync(password, adminPasswordHash);
  } else {
    isPasswordValid = password === adminPassword;
  }

  if (isEmailValid && isPasswordValid) {
    const token = jwt.sign({ user: "admin" }, process.env.JWT_SECRET || 'your_jwt_secret_here', { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials." });
  }
});

router.get("/auth/verify", verifyToken, (req, res) => {
  res.json({ valid: true });
});

// Product Routes
router.get("/products", async (req, res) => {
  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
    return res.json(localStore);
  }
  try {
    const products = await ProductModel.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/products", verifyToken, async (req, res) => {
  const {
    id, name, description, shortDescription, price, category, subcategory,
    specifications, stockStatus, condition, rating, images, image, featured
  } = req.body;

  const imagesArray = images || [];
  const imageUrl = imagesArray.length > 0 ? imagesArray[0] : image;

  const safePayload = {
    id,
    name,
    description,
    shortDescription,
    price: Number(price) || 0,
    category,
    subcategory,
    specifications,
    stockStatus: stockStatus || 'In Stock',
    condition: condition || 'New',
    rating: Number(rating) || 5,
    image: imageUrl,
    isFeatured: !!featured
  };

  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
    const newProd = {
      _id: id || `prod_${Date.now()}`,
      ...safePayload,
      createdAt: new Date().toISOString()
    };
    localStore.unshift(newProd);
    return res.status(201).json(newProd);
  }
  try {
    const newProduct = new ProductModel(safePayload);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to save product" });
  }
});

router.put("/products/:id", verifyToken, async (req, res) => {
  const {
    name, description, shortDescription, price, category, subcategory,
    specifications, stockStatus, condition, rating, images, image, featured
  } = req.body;

  const imagesArray = images || [];
  const imageUrl = imagesArray.length > 0 ? imagesArray[0] : image;

  const safePayload = {
    name,
    description,
    shortDescription,
    price: Number(price) || 0,
    category,
    subcategory,
    specifications,
    stockStatus: stockStatus || 'In Stock',
    condition: condition || 'New',
    rating: Number(rating) || 5,
    image: imageUrl,
    isFeatured: !!featured
  };

  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
    const id = req.params.id;
    const index = localStore.findIndex(p => p._id === id || p.id === id);
    if (index !== -1) {
      localStore[index] = {
        ...localStore[index],
        ...safePayload
      };
      return res.json(localStore[index]);
    }
    return res.status(404).json({ error: "Product not found" });
  }
  try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.id, safePayload, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product" });
  }
});

router.delete("/products/:id", verifyToken, async (req, res) => {
  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
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

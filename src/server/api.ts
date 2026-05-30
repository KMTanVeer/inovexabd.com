import { Router } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
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

// Auth routes
router.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (email === "admin@inovexa.com" && password === "admin123") {
    const token = jwt.sign({ user: "admin" }, process.env.JWT_SECRET || 'your_jwt_secret_here', { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials. Use admin@inovexa.com and admin123." });
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
  const images = req.body.images || [];
  const imageUrl = images.length > 0 ? images[0] : req.body.image;

  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
    const newProd = {
      _id: `prod_${Date.now()}`,
      ...req.body,
      image: imageUrl,
      isFeatured: req.body.featured, // align database fields with ui expectations
      createdAt: new Date().toISOString()
    };
    localStore.unshift(newProd);
    return res.status(201).json(newProd);
  }
  try {
    const newProduct = new ProductModel({
      ...req.body,
      image: imageUrl,
      isFeatured: req.body.featured
    });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: "Failed to save product" });
  }
});

router.put("/products/:id", verifyToken, async (req, res) => {
  const images = req.body.images || [];
  const imageUrl = images.length > 0 ? images[0] : req.body.image;

  if (!process.env.MONGODB_URI || mongoose.connection.readyState !== 1) {
    const id = req.params.id;
    const index = localStore.findIndex(p => p._id === id || p.id === id);
    if (index !== -1) {
      localStore[index] = {
        ...localStore[index],
        ...req.body,
        image: imageUrl,
        isFeatured: req.body.featured
      };
      return res.json(localStore[index]);
    }
    return res.status(404).json({ error: "Product not found" });
  }
  try {
    const updated = await ProductModel.findByIdAndUpdate(req.params.id, {
      ...req.body,
      image: imageUrl,
      isFeatured: req.body.featured
    }, { new: true });
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

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
  specifications: [{ key: String, value: String }],
  featured: { type: Boolean, default: false },
  images: [{ type: String }],
}, { timestamps: true });

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

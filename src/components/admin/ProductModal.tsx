import { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

export function ProductModal({ isOpen, onClose, onSaved, editingProduct }: any) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    brand: '',
    stock: '',
    description: '',
    featured: false
  });
  
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([]);
  const [specKey, setSpecKey] = useState('');
  const [specValue, setSpecValue] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        price: editingProduct.price?.toString() || '',
        category: editingProduct.category || '',
        brand: editingProduct.brand || '',
        stock: editingProduct.stock?.toString() || '',
        description: editingProduct.description || '',
        featured: editingProduct.featured || editingProduct.isFeatured || false
      });
      
      const existingImages = editingProduct.images ? [...editingProduct.images] : [];
      if (editingProduct.image && existingImages.length === 0) {
        existingImages.push(editingProduct.image);
      }
      setImages(existingImages);
      
      let existingSpecs = editingProduct.specifications ? [...editingProduct.specifications] : [];
      if (existingSpecs.length === 0 && editingProduct.specs) {
        existingSpecs = Object.entries(editingProduct.specs).map(([k, v]) => ({ key: k, value: String(v) }));
      }
      setSpecifications(existingSpecs);
    } else {
      setFormData({
        name: '',
        price: '',
        category: '',
        brand: '',
        stock: '',
        description: '',
        featured: false
      });
      setImages(['https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80']);
      setSpecifications([]);
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      setImages([...images, imageUrl.trim()]);
      setImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddSpec = () => {
    if (specKey.trim() && specValue.trim()) {
      setSpecifications([...specifications, { key: specKey.trim(), value: specValue.trim() }]);
      setSpecKey('');
      setSpecValue('');
    }
  };

  const handleRemoveSpec = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem('admin_jwt_token');
    const url = editingProduct 
      ? `/api/products/${editingProduct._id || editingProduct.id}`
      : '/api/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          stock: Number(formData.stock),
          images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80'],
          specifications
        })
      });

      if (res.ok) {
        onSaved();
        onClose();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to save product");
      }
    } catch {
      alert("Failed to reach server to save product");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-zinc-900 w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl border border-black/10 dark:border-white/10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold font-display uppercase tracking-widest text-black dark:text-white">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-black dark:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black dark:text-white">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-black dark:text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Price ($)</label>
              <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-black dark:text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Category</label>
              <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-black dark:text-white bg-white dark:bg-zinc-900">
                <option value="">Select Category</option>
                <option value="switches">Switches</option>
                <option value="routers">Routers</option>
                <option value="ssds">SSDs</option>
                <option value="servers">Servers</option>
                <option value="lan-cards">LAN Cards</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Brand</label>
              <input required value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-black dark:text-white" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Stock Quantity</label>
              <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-black dark:text-white" />
            </div>

            <div className="space-y-2">
              <div className="h-5" /> {/* empty spacing to balance layouts */}
              <label className="flex items-center gap-3 cursor-pointer select-none py-3">
                <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-5 h-5 rounded border-black/10 dark:border-white/10" />
                <span className="font-bold text-sm">Featured Product (Show on Slider/Home)</span>
              </label>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold uppercase tracking-widest text-black/50 dark:text-white/50">Description</label>
              <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full min-h-[100px] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 text-black dark:text-white" />
            </div>

            {/* Images URL Management List */}
            <div className="space-y-4 md:col-span-2 border-t border-black/10 dark:border-white/10 pt-4">
              <h3 className="font-bold text-sm uppercase tracking-wider">Product Image URLs</h3>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Paste external image web url..." 
                  value={imageUrl} 
                  onChange={e => setImageUrl(e.target.value)} 
                  className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" 
                />
                <button 
                  type="button" 
                  onClick={handleAddImage}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-500 px-6 rounded-xl font-bold transition-all shrink-0 uppercase text-xs tracking-wider"
                >
                  Add Image
                </button>
              </div>

              {images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 bg-black/5 dark:bg-white/5 p-4 rounded-2xl">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-black/10 dark:border-white/10 bg-black/10 group">
                      <img src={img} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Specifications Management Board */}
            <div className="space-y-4 md:col-span-2 border-t border-black/10 dark:border-white/10 pt-4">
              <h3 className="font-bold text-sm uppercase tracking-wider">Specifications (e.g. Ports, Interface, Speed)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Specification Key (e.g. Ports)" 
                  value={specKey} 
                  onChange={e => setSpecKey(e.target.value)} 
                  className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" 
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Specification DescriptionValue" 
                    value={specValue} 
                    onChange={e => setSpecValue(e.target.value)} 
                    className="flex-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500" 
                  />
                  <button 
                    type="button" 
                    onClick={handleAddSpec}
                    className="bg-black dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-blue-500 px-6 rounded-xl font-bold transition-all shrink-0 uppercase text-xs tracking-wider"
                  >
                    Add
                  </button>
                </div>
              </div>

              {specifications.length > 0 && (
                <div className="bg-black/5 dark:bg-white/5 p-4 rounded-2xl space-y-2">
                  {specifications.map((spec, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm bg-white dark:bg-zinc-800 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                      <div className="flex gap-2">
                        <span className="font-bold text-blue-600 dark:text-blue-400">{spec.key}:</span>
                        <span>{spec.value}</span>
                      </div>
                      <button type="button" onClick={() => handleRemoveSpec(idx)} className="text-red-500 hover:text-red-600 p-1">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="flex justify-end gap-4 pt-6 border-t border-black/10 dark:border-white/10">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl font-bold text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="px-8 py-3 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-lg hover:shadow-blue-500/20">
              {editingProduct ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

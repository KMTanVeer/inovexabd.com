import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, CheckCircle, XCircle } from 'lucide-react';
import { ProductModal } from '@/src/components/admin/ProductModal.tsx';

export function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch {
      console.error("Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return;
    try {
      const token = localStorage.getItem('admin_jwt_token');
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProducts();
    } catch {
      console.error("Failed to delete");
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const term = searchQuery.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      product.brand?.toLowerCase().includes(term) ||
      product.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-display uppercase tracking-widest text-black dark:text-white">Products</h1>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-sm transition-colors cursor-pointer shadow-lg shadow-blue-500/20"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/10 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl pl-12 pr-4 py-2.5 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm uppercase tracking-wider text-black/60 dark:text-white/60">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium text-center">Featured</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-black/50 dark:text-white/50">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-black/50 dark:text-white/50">
                    No products found. Add your first product.
                  </td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product._id || product.id} className="border-b border-black/5 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-black/10 dark:bg-white/10 overflow-hidden shrink-0">
                          {(product.images?.[0] || product.image) && (
                            <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )}
                        </div>
                        <div className="font-semibold">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-black/60 dark:text-white/60 capitalize font-medium">{product.category}</td>
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">${product.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold whitespace-nowrap">
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {(product.featured || product.isFeatured) ? (
                        <CheckCircle size={18} className="mx-auto text-blue-500" />
                      ) : (
                        <XCircle size={18} className="mx-auto text-black/20 dark:text-white/20" />
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-blue-600 dark:text-blue-400 transition-colors cursor-pointer"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id || product.id)}
                          className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ProductModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingProduct(null); }} 
        onSaved={() => fetchProducts()} 
        editingProduct={editingProduct} 
      />
    </div>
  );
}

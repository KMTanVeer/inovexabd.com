import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, SlidersHorizontal, Grid, List as ListIcon, X, Phone, Info } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, Product, PRODUCTS } from '@/src/data/products.ts';
import { ProductCard } from '@/src/components/common/ProductCard.tsx';
import { GlassContainer } from '@/src/components/common/GlassContainer.tsx';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || null;

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const matchesPrice = (product.price || 0) >= priceRange[0] && (product.price || 0) <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange, products]);

  return (
    <div className="pt-32 pb-24 min-h-screen relative">
        <SEO
          title="Shop Networking Equipment, Switches, Routers, LAN Cards & SSDs"
          description="Browse enterprise networking equipment, switches, routers, LAN cards, SSDs, servers and accessories with category and search filters."
          keywords="shop networking equipment, router price, switch price, lan card, ssd, enterprise server, cisco, juniper, huawei"
          url="https://www.inovexabd.com/shop"
        />
        {/* BG Blurs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full" />
        </div>

        <div className="container mx-auto px-6">
            {/* Shop Header */}
            <div className="pt-8 pb-4 mb-4">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Full Collection</h1>
                    <p className="text-black/40 dark:text-white/40 max-w-md">Discover our entire range of futuristic IT solutions and networking equipment.</p>
                </div>
            </div>
            
            {/* Sticky Search bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-12 sticky top-[72px] z-40 bg-white/80 dark:bg-black/80 backdrop-blur-2xl py-4 px-6 border-b border-black/5 dark:border-white/10 -mx-6 sm:-mx-6 rounded-none sm:rounded-b-2xl shadow-sm transition-all duration-500">
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 dark:text-white/30 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="text" 
                            placeholder="Search products..." 
                            className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full pl-12 pr-6 py-3 text-sm text-black dark:text-white focus:outline-none focus:border-blue-500/50 w-[300px] lg:w-[400px] transition-all focus:bg-white dark:focus:bg-zinc-900"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 space-y-10 shrink-0 lg:sticky lg:top-[180px] h-fit overflow-y-auto max-h-[calc(100vh-14rem)] custom-scrollbar pb-6 pl-2">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-black dark:text-white font-bold uppercase tracking-widest text-xs">
                           <Filter size={14} className="text-blue-600 dark:text-blue-500" />
                           Category
                        </div>
                        <div className="space-y-2">
                             <button
                                onClick={() => setSelectedCategory(null)}
                                className={cn(
                                    "w-full text-left px-4 py-2 rounded-lg text-sm transition-all",
                                    !selectedCategory ? "bg-blue-600 text-white font-bold" : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                                )}
                             >
                                All Products
                             </button>
                             {CATEGORIES.map(cat => (
                                 <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={cn(
                                        "w-full text-left px-4 py-2 rounded-lg text-sm transition-all",
                                        selectedCategory === cat.id ? "bg-blue-600 text-white font-bold" : "text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                                    )}
                                 >
                                    {cat.name}
                                 </button>
                             ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-2 text-black dark:text-white font-bold uppercase tracking-widest text-xs">
                           <SlidersHorizontal size={14} className="text-blue-600 dark:text-blue-500" />
                           Price Range
                        </div>
                        <div className="space-y-4 px-2">
                            <input 
                                type="range" 
                                min="0" 
                                max="150000" 
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                className="w-full accent-blue-600 bg-black/10 dark:bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex items-center justify-between text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">
                                <span>0 ৳</span>
                                <span>{priceRange[1].toLocaleString()} ৳</span>
                            </div>
                        </div>
                    </div>

                    <GlassContainer className="p-6 bg-blue-600/5">
                        <h4 className="text-sm font-bold text-black dark:text-white mb-4">Promotions</h4>
                        <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed mb-4">
                            Get up to <span className="text-black dark:text-white font-bold">15% discount</span> on bulk orders for enterprise servers.
                        </p>
                        <button 
                            onClick={() => setShowPromoModal(true)}
                            className="w-full py-3 rounded-xl border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                        >
                            View Offer
                        </button>
                    </GlassContainer>
                </aside>

                {/* Promo Modal */}
                <AnimatePresence>
                    {showPromoModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowPromoModal(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-black/5 dark:border-white/10"
                            >
                                <button 
                                    onClick={() => setShowPromoModal(false)}
                                    className="absolute top-6 right-6 text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                                
                                <div className="space-y-6">
                                    <div className="w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 mx-auto">
                                        <Info size={32} />
                                    </div>
                                    
                                    <div className="text-center space-y-2">
                                        <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">Enterprise Offer</h3>
                                        <p className="text-black/50 dark:text-white/50 leading-relaxed">
                                            For bulk orders on enterprise servers and networking infrastructure, we offer specialized discounts up to 15%.
                                        </p>
                                    </div>
                                    
                                    <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-600/10 space-y-4">
                                        <p className="text-center text-sm font-medium text-black/70 dark:text-white/70">
                                            To claim your discount, please contact our enterprise sales team:
                                        </p>
                                        <a 
                                            href="tel:+8801813065665" 
                                            className="flex items-center justify-center gap-3 py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-all shadow-lg"
                                        >
                                            <Phone size={18} />
                                            +8801813065665
                                        </a>
                                    </div>
                                    
                                    <p className="text-center text-[10px] text-black/30 dark:text-white/30 font-bold uppercase tracking-widest">
                                        Support available 24/7/365
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Product Grid Area */}
                <div className="flex-1 space-y-8">
                    <div className="flex items-center justify-between border-b border-black/5 dark:border-white/5 pb-6">
                        <p className="text-sm text-black/40 dark:text-white/40 font-medium">
                            Showing <span className="text-black dark:text-white font-bold">{filteredProducts.length}</span> results
                        </p>
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setViewMode('grid')}
                                className={cn("p-2 rounded-lg transition-colors", viewMode === 'grid' ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white")}
                            >
                                <Grid size={18} />
                            </button>
                            <button 
                                onClick={() => setViewMode('list')}
                                className={cn("p-2 rounded-lg transition-colors", viewMode === 'list' ? "bg-black/10 dark:bg-white/10 text-black dark:text-white" : "text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white")}
                            >
                                <ListIcon size={18} />
                            </button>
                        </div>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className={cn(
                            "grid gap-8",
                            viewMode === 'grid' ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                        )}>
                            <AnimatePresence mode="popLayout">
                                {filteredProducts.map((product, index) => (
                                    <ProductCard key={`${(product as any)._id || product.id}-${index}`} product={product} index={index} viewMode={viewMode} />
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="py-24 text-center space-y-6">
                            <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto">
                                <X size={32} className="text-black/20 dark:text-white/20" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold text-black dark:text-white">No products found</h3>
                                <p className="text-black/40 dark:text-white/40">Try adjusting your search or filters to find what you're looking for.</p>
                            </div>
                            <button 
                                onClick={() => { setSearchQuery(''); setSelectedCategory(null); setPriceRange([0, 150000]); }}
                                className="px-8 py-3 rounded-full bg-blue-600 text-white font-bold"
                            >
                                Clear All Filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

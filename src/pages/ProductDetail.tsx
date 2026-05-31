import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Star, Heart, ShieldCheck, Truck, RotateCcw, Share2, ChevronRight, Zap, CheckCircle2 } from 'lucide-react';
import { type Product, PRODUCTS } from '@/src/data/products.ts';
import { GlassContainer } from '@/src/components/common/GlassContainer.tsx';
import { ProductCard } from '@/src/components/common/ProductCard.tsx';
import { SEO } from '@/src/components/common/SEO.tsx';

export function ProductDetail() {
  const { id } = useParams();
  const [allProducts] = useState<Product[]>(PRODUCTS);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews'>('specs');

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const foundProduct = allProducts.find((p: any) => String(p.id) === String(id) || String(p._id) === String(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImageIndex(0);
      window.scrollTo(0, 0);
    }
  }, [id, allProducts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-black transition-colors">
        <div className="text-center space-y-6">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
          <h2 className="text-2xl font-bold text-black dark:text-white">Loading innovative hardware...</h2>
          <Link to="/shop" className="text-blue-500 dark:text-blue-400 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 bg-white dark:bg-black transition-colors">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-black dark:text-white">Product not found.</h2>
          <Link to="/shop" className="text-blue-500 dark:text-blue-400 hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const relatedProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const productImages = ((product as any).images?.length ? (product as any).images : [product.image]).filter(Boolean);
  const activeImage = productImages[selectedImageIndex] || productImages[0] || '';

  return (
    <div className="pt-32 pb-24 min-h-screen relative overflow-hidden">
        <SEO
          title={`${product.name} | Enterprise Networking Equipment`}
          description={product.description}
          keywords={`${product.name}, ${product.category}, networking equipment, enterprise router, switch, lan card, ssd`}
          url={`https://inovexabd.com/product/${product.id}`}
          type="product"
          structuredData={{
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            category: product.category,
            image: product.image,
            brand: {
              '@type': 'Brand',
              name: 'Inovexa Technology',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'BDT',
              price: '0.00',
              availability: 'https://schema.org/InStock',
              url: `https://inovexabd.com/product/${product.id}`,
            },
          }}
        />
        {/* Glows */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-blue-600/5 blur-[160px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[140px] rounded-full -z-10" />

        <div className="container max-w-6xl mx-auto px-6">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-black/30 dark:text-white/30 mb-12">
                <Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
                <ChevronRight size={10} />
                <Link to="/shop" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shop</Link>
                <ChevronRight size={10} />
                <span className="text-black/60 dark:text-white/60">{product.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
                {/* Product Images */}
                <div className="lg:col-span-7 flex flex-col md:flex-row gap-5">
                    {/* Thumbnails - Left side on desktop */}
                    <div className="flex md:flex-col gap-3 order-2 md:order-1 w-full md:w-20 lg:w-24 shrink-0">
                        {productImages.map((image, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImageIndex(i)}
                                className={cn(
                                    "aspect-square rounded-xl border-2 transition-all p-1.5 bg-black/5 dark:bg-white/5",
                                    selectedImageIndex === i ? "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "border-black/10 dark:border-white/5 hover:border-black/30 dark:hover:border-white/20"
                                )}
                            >
                                <img 
                                  src={image} 
                                  alt="preview" 
                                  className="w-full h-full object-cover rounded-lg opacity-60 transition-opacity hover:opacity-100" 
                                  referrerPolicy="no-referrer"
                                />
                            </button>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative flex-1 group aspect-square rounded-[2rem] overflow-hidden border border-black/10 dark:border-white/5 bg-white/80 dark:bg-white/[0.02] backdrop-blur-3xl p-6 md:p-10 order-1 md:order-2"
                    >
                        <img 
                            src={activeImage} 
                            alt={product.name} 
                            className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_20px_40px_rgba(59,130,246,0.25)] group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                        />
                        
                        <div className="absolute top-5 right-5 flex flex-col gap-2">
                           <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all backdrop-blur-md">
                             <Share2 size={16} />
                           </button>
                           <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all backdrop-blur-md">
                             <Heart size={16} />
                           </button>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-30 pointer-events-none" />
                    </motion.div>
                </div>

                {/* Product Info */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 rounded-full bg-blue-600/10 border border-blue-600/20 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">
                                {product.category}
                            </span>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={12} className={cn("fill-yellow-500", i < Math.floor(product.rating || 5) ? "text-yellow-500" : "text-black/20 dark:text-white/20")} />
                                ))}
                                <span className="ml-2 text-xs font-bold text-black/40 dark:text-white/40">({product.rating || 5})</span>
                            </div>
                        </div>
                        
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-black dark:text-white leading-tight">{product.name}</h1>
                        
                        <div className="flex items-center gap-4 pt-1">
                            <span className="text-3xl font-bold text-black dark:text-white">
                                {product.price?.toLocaleString() || '0'}tk
                            </span>
                            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">In Stock</span>
                            </div>
                        </div>

                        <p className="text-black/60 dark:text-white/50 leading-relaxed text-sm pt-2">
                            {product.description}
                        </p>
                    </div>

                    {/* Features Matrix */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 py-6 border-y border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-600/10 border border-blue-600/20 text-blue-600 dark:text-blue-500 shrink-0">
                                <ShieldCheck size={20} />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="text-[11px] font-bold text-black dark:text-white uppercase tracking-wider">Lifetime Support</h4>
                                <p className="text-[9px] text-black/40 dark:text-white/40 font-medium">Expert assistance 24/7/365.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-purple-600/10 border border-purple-600/20 text-purple-600 dark:text-purple-500 shrink-0">
                                <Truck size={20} />
                            </div>
                            <div className="space-y-0.5">
                                <h4 className="text-[11px] font-bold text-black dark:text-white uppercase tracking-wider">Fast Shipping</h4>
                                <p className="text-[9px] text-black/40 dark:text-white/40 font-medium">Global delivery network.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <a 
                            href={`https://wa.me/8801813065665?text=Hello, I am interested in ${product!.name}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-8 py-4 rounded-xl bg-blue-600 text-white font-bold transition-all hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(37,99,235,0.3)] overflow-hidden text-center"
                        >
                            <div className="relative z-10 flex items-center justify-center gap-2">
                                Order via WhatsApp
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer" />
                        </a>
                        <a 
                            href="tel:+8801813065665"
                            className="px-8 py-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md text-center flex items-center justify-center gap-2"
                        >
                            <Zap size={18} className="text-blue-500" />
                            Call to Inquire
                        </a>
                    </div>

                    <div className="pt-6 border-t border-black/5 dark:border-white/5">
                        <div className="flex items-center gap-6 justify-center sm:justify-start">
                            <div className="flex items-center gap-2 text-[9px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">
                                <RotateCcw size={12} className="text-blue-500" />
                                30-Day Evaluation
                            </div>
                            <div className="flex items-center gap-2 text-[9px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">
                                <ShieldCheck size={12} className="text-blue-500" />
                                Secure Encryption
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Tabs */}
            <div className="mb-24">
                <div className="flex border-b border-black/5 dark:border-white/5 gap-12 mb-10 overflow-x-auto scrollbar-hide">
                    {['specs', 'description', 'reviews'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={cn(
                                "pb-6 text-sm font-bold uppercase tracking-[0.2em] transition-all relative",
                                activeTab === tab ? "text-blue-600 dark:text-blue-400" : "text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white"
                            )}
                        >
                            {tab}
                            {activeTab === tab && (
                                <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400 rounded-full" />
                            )}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {activeTab === 'specs' && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12"
                        >
                            {product.specs && Object.entries(product.specs).map(([label, value]) => (
                                <div key={label} className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] px-6 rounded-xl">
                                    <span className="text-xs font-bold text-black/30 dark:text-white/30 uppercase tracking-[0.15em]">{label}</span>
                                    <span className="text-sm font-bold text-black dark:text-white tracking-wide">{String(value)}</span>
                                </div>
                            ))}
                            {(product as any).specifications && (product as any).specifications.map((spec: any) => (
                                <div key={spec.key} className="flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] px-6 rounded-xl">
                                    <span className="text-xs font-bold text-black/30 dark:text-white/30 uppercase tracking-[0.15em]">{spec.key}</span>
                                    <span className="text-sm font-bold text-black dark:text-white tracking-wide">{spec.value}</span>
                                </div>
                            ))}
                        </motion.div>
                    )}
                    {activeTab === 'description' && (
                        <motion.div
                            key="description"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="max-w-4xl space-y-8"
                        >
                            <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight">Innovative Technology for Modern Challenges</h3>
                            <p className="text-black/60 dark:text-white/50 leading-relaxed text-lg">
                                The {product.name} represents a pinnacle of engineering from {product.category === 'networking' ? 'networking pioneers' : 'computing experts'}. 
                                Built with future-proof materials and cutting-edge silicon, this solution addresses the high-demand requirements of modern data centers and enterprise workflows.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400">
                                        <CheckCircle2 size={24} />
                                        <h4 className="font-bold text-black dark:text-white uppercase tracking-widest text-xs">Sustainability Built-in</h4>
                                    </div>
                                    <p className="text-sm text-black/50 dark:text-white/40 leading-relaxed">Our hardware is optimized for lower power consumption without sacrificing throughput performance.</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-purple-600 dark:text-purple-400">
                                        <Zap size={24} />
                                        <h4 className="font-bold text-black dark:text-white uppercase tracking-widest text-xs">Dynamic Response</h4>
                                    </div>
                                    <p className="text-sm text-black/50 dark:text-white/40 leading-relaxed">Intelligent architecture that handles bursty workloads with zero packet loss or latency spikes.</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {activeTab === 'reviews' && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-12"
                        >
                            <div className="flex items-center gap-8 py-10 px-8 rounded-3xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                                <div className="text-center space-y-2">
                                    <div className="text-6xl font-bold text-black dark:text-white">{product.rating || 5}</div>
                                    <div className="flex items-center justify-center gap-1 text-yellow-500">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <div className="text-[10px] font-bold text-black/30 dark:text-white/30 uppercase tracking-widest leading-loose">Based on 124 reviews</div>
                                </div>
                                <div className="flex-1 space-y-3">
                                   {[5, 4, 3, 2, 1].map((stars) => (
                                       <div key={stars} className="flex items-center gap-4">
                                           <span className="text-[10px] font-bold text-black/40 dark:text-white/40 w-4">{stars}</span>
                                           <div className="flex-1 h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                                               <div className="h-full bg-blue-600 dark:bg-blue-500" style={{ width: stars >= 4 ? '85%' : stars === 3 ? '10%' : '5%' }} />
                                           </div>
                                       </div>
                                   ))}
                                </div>
                            </div>
                            
                            <div className="space-y-8">
                                {[
                                    { user: 'Alex Thompson', comment: 'Integration was seamless with our existing Cisco core. Performance is exactly as advertised. The 10G throughput is rock solid even under peak loads.', rating: 5, date: '2 days ago' },
                                    { user: 'Sarah Chen', comment: 'Great product for the price. Huawei did a fantastic job with the thermal management on these cards. They stay cool in our dense rack configurations.', rating: 4, date: '1 week ago' }
                                ].map((review, i) => (
                                    <div key={i} className="space-y-4 p-8 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />
                                                <div>
                                                    <h5 className="font-bold text-black dark:text-white text-sm">{review.user}</h5>
                                                    <p className="text-[10px] text-black/30 dark:text-white/30 uppercase tracking-widest font-bold">{review.date}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                {[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                            </div>
                                        </div>
                                        <p className="text-black/50 dark:text-white/50 text-sm leading-relaxed">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Related Hardware */}
            <div className="space-y-12">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-black dark:text-white tracking-tight">Complete the Infrastructure</h2>
                    <Link to="/shop" className="text-blue-600 dark:text-blue-400 font-bold hover:text-blue-500 dark:hover:text-blue-300 transition-colors uppercase tracking-widest text-xs">
                        Explore More <ChevronRight size={16} className="inline ml-1" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {relatedProducts.map((p, i) => (
                        <ProductCard key={`${(p as any)._id || p.id}-${i}`} product={p} index={i} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}

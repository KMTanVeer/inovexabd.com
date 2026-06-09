import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle, Eye, Search, Star, ShoppingCart } from 'lucide-react';
import { type Product } from '@/src/data/products.ts';
import { cn } from '@/src/components/common/GlassContainer.tsx';
import { QuickViewModal } from '@/src/components/common/QuickViewModal.tsx';
import React, { useState, useEffect, useRef } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickViewChange?: (isOpen: boolean) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, onQuickViewChange, viewMode = 'grid' }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleQuickViewToggle = (e: React.MouseEvent | null, isOpen: boolean) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setIsQuickViewOpen(isOpen);
    if (onQuickViewChange) {
      onQuickViewChange(isOpen);
    }
  };

  useEffect(() => {
    if (!showActions) return;
    const handleOutsideClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setShowActions(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showActions]);

  const isList = viewMode === 'list';

  return (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        whileHover={{ y: -5 }}
        className="group h-full"
      >
        <div
          className={cn(
            "h-full flex transition-all duration-300 relative rounded-2xl overflow-hidden p-3 bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 backdrop-blur-xl border border-indigo-100/70 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_6px_20px_-5px_rgba(99,102,241,0.02)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.2)] hover:border-blue-500/40 dark:hover:border-blue-500/30 hover:bg-white/90 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_15px_30px_rgba(59,130,246,0.08)] dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.4)]",
            isList ? "flex-row gap-4" : "flex-col"
          )}
        >
          {/* Badge */}
          {product.isFeatured && (
            <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-blue-600/85 backdrop-blur-sm text-[9px] font-bold text-white uppercase tracking-widest">
              Featured
            </div>
          )}

          {/* Image Container */}
          <div className={cn(
            "relative overflow-hidden rounded-xl bg-zinc-100 dark:bg-[#161616] border border-black/5 dark:border-white/5 transition-colors duration-300",
            isList ? "w-24 h-24 sm:w-48 sm:h-48 aspect-square shrink-0" : "aspect-square w-full"
          )}>
            <Link
              to={`/product/${(product as any)._id || product.id}`}
              className="block w-full h-full"
              onClick={(e) => {
                if (!showActions) {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowActions(true);
                }
              }}
            >
              <img
                src={(product.images && product.images[0]) || product.image}
                alt={product.name}
                width={400}
                height={400}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </Link>

            {/* Overlay for buttons */}
            {!isList && (
              <>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowActions(false);
                  }}
                  className={cn(
                    "absolute inset-0 bg-black/60 transition-opacity duration-300 z-10 cursor-pointer",
                    showActions ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:pointer-events-auto"
                  )} 
                />
                
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 z-20",
                  showActions ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:pointer-events-auto"
                )}>
                  <a 
                    href={`https://wa.me/8801813065665?text=Hello, I am interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:inline-flex p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[#25D366] hover:border-[#25D366] hover:scale-110 active:scale-95 transition-all shadow-2xl"
                    title="Order on WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                  <button 
                    onClick={(e) => handleQuickViewToggle(e, true)}
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-blue-600 hover:border-blue-600 hover:scale-110 active:scale-95 transition-all shadow-2xl"
                    title="Quick View"
                  >
                    <Eye size={18} />
                  </button>
                  <Link 
                    onClick={(e) => e.stopPropagation()} 
                    to={`/product/${(product as any)._id || product.id}`} 
                    className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-blue-500 hover:scale-110 active:scale-95 transition-all shadow-2xl" 
                    title="View Details"
                  >
                    <Search size={18} />
                  </Link>
                </div>
              </>
            )}
            
            {/* Order Now Overlay Button (Grid View only) */}
            {!isList && (
              <a 
                href={`https://wa.me/8801813065665?text=${encodeURIComponent(`Hello, I am interested in ${product.name}`)}`}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                rel="noopener noreferrer"
                className="absolute bottom-0 right-0 z-30 p-3 rounded-tl-2xl bg-zinc-900 text-white hover:bg-blue-600 dark:bg-white dark:text-zinc-900 dark:hover:bg-blue-600 dark:hover:text-white active:bg-blue-700 active:text-white dark:active:bg-blue-700 dark:active:text-white transition-all hover:scale-105 active:scale-95 flex items-center justify-center"
                title="Order Now"
              >
                <ShoppingCart size={16} />
              </a>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col pt-3 pb-1 text-left items-start font-sans">
            <div className="flex items-center justify-between mb-1 sm:mb-2 w-full">
              <span className="text-[9px] sm:text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest opacity-80">
                {product.category}
              </span>
              <div className="flex items-center gap-1">
                <Star size={10} className="fill-yellow-500 text-yellow-500" />
                <span className="text-[10px] font-bold text-black/50 dark:text-white/50">{product.rating || 5}</span>
              </div>
            </div>

            <Link 
              to={`/product/${(product as any)._id || product.id}`}
              onClick={(e) => {
                if (!showActions) {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowActions(true);
                }
              }}
              className="block w-full"
            >
              <h3 className={cn(
                "font-medium text-black dark:text-white leading-tight hover:text-blue-500 transition-colors text-left",
                isList ? "text-sm sm:text-xl line-clamp-1 sm:line-clamp-2" : "text-xs sm:text-base line-clamp-2"
              )}>
                {product.name}
              </h3>
            </Link>

            {isList && (
              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-sm text-black/50 dark:text-white/50 text-left line-clamp-1 sm:line-clamp-3 mb-2 sm:mb-4">
                {product.description}
              </p>
            )}
            
            {isList && (
              <div className="mt-auto pt-2">
                <a 
                  href={`https://wa.me/8801813065665?text=${encodeURIComponent(`Hello, I am interested in ${product.name}`)}`}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
                >
                  Order Now
                </a>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => handleQuickViewToggle(null, false)} 
      />
    </>
  );
};

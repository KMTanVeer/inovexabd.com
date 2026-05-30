import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Star, MessageCircle, Eye, Search } from 'lucide-react';
import { type Product } from '@/src/data/products.ts';
import { GlassContainer } from '@/src/components/common/GlassContainer.tsx';
import { QuickViewModal } from '@/src/components/common/QuickViewModal.tsx';
import React, { useState } from 'react';

interface ProductCardProps {
  product: Product;
  index?: number;
  onQuickViewChange?: (isOpen: boolean) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0, onQuickViewChange }) => {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickViewToggle = (isOpen: boolean) => {
    setIsQuickViewOpen(isOpen);
    if (onQuickViewChange) {
      onQuickViewChange(isOpen);
    }
  };

  return (
    <>
      <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group"
    >
      <GlassContainer className="h-full flex flex-col p-3 bg-white/[0.02]" hoverGlow>
        {/* Badge */}
        {product.isFeatured && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-sm text-[9px] font-bold text-white uppercase tracking-widest">
            Featured
          </div>
        )}

        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg mb-4 bg-white/[0.03]">
          <Link to={`/product/${product.id}`} className="block w-full h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </Link>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <div className="absolute inset-0 flex items-center justify-center gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-500 z-20">
            <a 
              href={`https://wa.me/8801813065665?text=Hello, I am interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-[#25D366] hover:border-[#25D366] transition-all shadow-2xl"
              title="Order on WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <button 
              onClick={() => handleQuickViewToggle(true)}
              className="p-2.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-blue-600 hover:border-blue-600 transition-all shadow-2xl"
              title="Quick View"
            >
              <Eye size={16} />
            </button>
            <Link to={`/product/${product.id}`} className="p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-blue-500 transition-colors border border-white/20" title="View Details">
              <Search size={16} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest opacity-80">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star size={10} className="fill-yellow-500 text-yellow-500" />
              <span className="text-[10px] font-bold text-black/50 dark:text-white/50">{product.rating}</span>
            </div>
          </div>
          
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-bold text-black dark:text-white leading-tight hover:text-blue-500 transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <div className="pt-3 flex items-center justify-between border-t border-black/5 dark:border-white/5 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-black/40 dark:text-white/40 font-medium">Price</span>
              <span className="text-lg font-bold text-black dark:text-white">
                0.00tk
              </span>
            </div>
            <a 
              href={`https://wa.me/8801813065665?text=Hello, I am interested in ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[11px] font-bold hover:bg-blue-600 hover:text-white transition-all backdrop-blur-md"
            >
              Order Now
            </a>
          </div>
        </div>
      </GlassContainer>
    </motion.div>

    <QuickViewModal 
      product={product} 
      isOpen={isQuickViewOpen} 
      onClose={() => handleQuickViewToggle(false)} 
    />
  </>
);
}

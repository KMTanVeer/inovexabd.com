import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Info, CheckCircle2 } from 'lucide-react';
import { type Product } from '@/src/data/products.ts';
import { GlassContainer } from '@/src/components/common/GlassContainer.tsx';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 400 }}
            className="relative w-full max-w-5xl max-h-[95vh] flex flex-col overflow-hidden rounded-[2rem] shadow-[0_0_100px_rgba(37,99,235,0.2)] z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/10 dark:bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-black/20 dark:hover:bg-black/60 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden md:overflow-y-auto p-0 bg-gradient-to-b from-white/90 via-white/80 to-indigo-50/90 dark:from-zinc-950/90 dark:via-zinc-900/80 dark:to-neutral-950/70 border border-white/60 dark:border-white/10 rounded-[2rem] backdrop-blur-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              {/* Product Image Area (Desktop Only) */}
              <div className="hidden md:block md:w-1/2 relative bg-zinc-50 dark:bg-white/[0.02] shrink-0">
                <img
                  src={(product.images && product.images[0]) || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover md:aspect-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Product Details Area */}
              <div className="w-full md:w-1/2 p-3.5 md:p-12 flex flex-col justify-between md:justify-center gap-3 md:gap-6 shrink-0">
                {/* Mobile-only Header Row with Small Image */}
                <div className="flex gap-4 md:hidden">
                  <div className="w-20 h-20 rounded-xl bg-zinc-50 dark:bg-white/[0.02] border border-zinc-200 dark:border-white/10 overflow-hidden shrink-0">
                    <img
                      src={(product.images && product.images[0]) || product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-[8px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <Star size={9} className="fill-yellow-500 text-yellow-500" />
                        <span className="text-[10px] font-bold text-zinc-950 dark:text-white">{product.rating || 5}</span>
                      </div>
                    </div>
                    <h2 className="text-sm font-bold text-zinc-950 dark:text-white leading-tight line-clamp-2">
                      {product.name}
                    </h2>
                  </div>
                </div>

                {/* Desktop-only Header Section */}
                <div className="hidden md:block">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                    <span className="px-2 md:px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-[9px] md:text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-yellow-500 text-yellow-500 md:w-3.5 md:h-3.5" />
                      <span className="text-xs md:text-sm font-bold text-zinc-950 dark:text-white tracking-widest">{product.rating || 5}</span>
                    </div>
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-zinc-950 dark:text-white mb-2 md:mb-4 leading-tight">
                    {product.name}
                  </h2>
                </div>

                {/* Description */}
                <div>
                  <p className="text-zinc-600 dark:text-white/60 leading-relaxed text-xs md:text-base line-clamp-2 md:line-clamp-none">
                    {product.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-1.5 md:gap-4">
                  {product.specs && Object.entries(product.specs).map(([label, value]) => (
                    <div key={label} className="[&:nth-child(n+5)]:hidden md:[&:nth-child(n+5)]:block p-1.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/5 dark:via-zinc-900/20 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-500 dark:text-white/30 font-bold mb-0.5 truncate">{label}</span>
                      <span className="block text-[10px] md:text-sm text-zinc-900 dark:text-white font-medium truncate">{String(value)}</span>
                    </div>
                  ))}
                  {(product as any).specifications && (product as any).specifications.map((spec: any) => (
                    <div key={spec.key} className="[&:nth-child(n+5)]:hidden md:[&:nth-child(n+5)]:block p-1.5 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/5 dark:via-zinc-900/20 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                      <span className="block text-[8px] md:text-[10px] uppercase tracking-widest text-zinc-500 dark:text-white/30 font-bold mb-0.5 truncate">{spec.key}</span>
                      <span className="block text-[10px] md:text-sm text-zinc-900 dark:text-white font-medium truncate">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Section */}
                <div className="pt-2.5 md:pt-6 border-t border-zinc-100 dark:border-white/5 flex flex-row items-center justify-between gap-4 md:gap-6">
                  <div className="flex flex-col">
                    <span className="text-[9px] md:text-xs text-zinc-500 dark:text-white/40 font-medium">Retail Price</span>
                    <span className="text-sm md:text-3xl font-bold text-zinc-950 dark:text-white leading-none">{product.price?.toLocaleString() || '0'}tk</span>
                  </div>
                  <a
                    href={`https://wa.me/8801813065665?text=Hello, I am interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 md:py-4 rounded-xl bg-blue-600 text-white text-xs md:text-base font-bold text-center hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-1.5"
                  >
                    Order on WhatsApp
                  </a>
                </div>

                {/* Stock Info (Desktop Only) */}
                <div className="hidden md:flex items-center gap-2 text-green-600 dark:text-green-400 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 size={12} className="md:w-3.5 md:h-3.5" />
                  In Stock & Ready for Delivery
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

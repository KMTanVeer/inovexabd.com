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
            className="relative w-full max-w-5xl h-fit max-h-[95vh] overflow-hidden rounded-[2rem] shadow-[0_0_100px_rgba(37,99,235,0.2)] z-10"
          >
            <GlassContainer className="h-full flex flex-col md:flex-row overflow-y-auto md:overflow-hidden p-0 bg-[#050505]/95 border-white/10">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Product Image Area */}
              <div className="w-full md:w-1/2 relative bg-white/[0.02]">
                <img
                  src={(product.images && product.images[0]) || product.image}
                  alt={product.name}
                  className="w-full h-full object-cover aspect-square md:aspect-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              </div>

              {/* Product Details Area */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-bold text-white tracking-widest">{product.rating || 5}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                    {product.name}
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4">
                  {product.specs && Object.entries(product.specs).map(([label, value]) => (
                    <div key={label} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="block text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{label}</span>
                      <span className="block text-sm text-white font-medium">{String(value)}</span>
                    </div>
                  ))}
                  {(product as any).specifications && (product as any).specifications.map((spec: any) => (
                    <div key={spec.key} className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <span className="block text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{spec.key}</span>
                      <span className="block text-sm text-white font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between gap-6">
                  <div className="flex flex-col">
                    <span className="text-xs text-white/40 font-medium">Retail Price</span>
                    <span className="text-3xl font-bold text-white">{product.price?.toLocaleString() || '0'}tk</span>
                  </div>
                  <a
                    href={`https://wa.me/8801813065665?text=Hello, I am interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-4 rounded-xl bg-blue-600 text-white font-bold text-center hover:bg-blue-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2"
                  >
                    Order on WhatsApp
                  </a>
                </div>

                <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest">
                  <CheckCircle2 size={14} />
                  In Stock & Ready for Delivery
                </div>
              </div>
            </GlassContainer>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

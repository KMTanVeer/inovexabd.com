import React from 'react';
import { motion } from 'motion/react';
import { Truck, Globe, Box, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Shipping() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-black transition-colors">
      <SEO
        title="Shipping Policy"
        description="View Inovexa Technology shipping policy for enterprise networking equipment, routers, switches, LAN cards, SSDs, and server hardware."
        keywords="shipping policy networking equipment, router delivery, switch delivery, enterprise hardware logistics"
        url="https://inovexabd.com/shipping"
      />
      <div className="container max-w-4xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 mb-8 hover:underline">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Shipping Policy</h1>
            <p className="text-black/60 dark:text-white/50 text-lg leading-relaxed">
              Inovexa Technology provides reliable global shipping for enterprise hardware. We understand the urgency of infrastructure projects and offer expedited logistics options.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">Local Delivery</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">Next-day delivery available for in-stock items within Dhaka city.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                <Globe size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">International</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">Shipping to over 50 countries via DHL, FedEx, and UPS Express.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center text-green-600">
                <Box size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">Secure Packaging</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">Anti-static, impact-resistant packaging for all sensitive electronics.</p>
            </div>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-black/70 dark:text-white/60">
            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">1. Shipping Times</h2>
            <p>
              Orders for in-stock items placed before 2 PM BST are processed same-day. Regional deliveries usually take 2-4 business days, while international transit varies by customs processing times.
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">2. Tracking Information</h2>
            <p>
              Once your order is dispatched, a tracking number will be sent to your registered email address. You can monitor your shipment directly on the carrier's website.
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">3. Insurance & Damages</h2>
            <p>
              All high-value shipments are insured at no extra cost to you. If your package arrives damaged, please document the condition with photos and notify the carrier and our support team immediately.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

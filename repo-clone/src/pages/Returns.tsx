import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, RefreshCw, Clock, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Returns() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-black transition-colors">
      <SEO
        title="Returns & Warranty Policy"
        description="Read Inovexa Technology returns and warranty policy for networking equipment, switches, routers, servers, LAN cards and SSD products."
        keywords="returns policy, warranty policy, networking equipment warranty, router warranty, switch replacement"
        url="https://inovexabd.com/returns"
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Returns & Warranty Policy</h1>
            <p className="text-black/60 dark:text-white/50 text-lg leading-relaxed">
              At Inovexa Technology, we stand behind the quality of our enterprise hardware. Our returns and warranty policies are designed to minimize downtime and ensure your infrastructure remains operational.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">Standard Warranty</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">Most hardware components come with a 1-year manufacturer warranty as standard.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                <RefreshCw size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">Replacement</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">DOA (Dead on Arrival) units are eligible for instant replacement within 7 days.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center text-green-600">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">RMA Timeline</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">Standard RMA processing takes 10-15 business days depending on parts availability.</p>
            </div>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-black/70 dark:text-white/60">
            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">1. Warranty Coverage</h2>
            <p>
              Our warranty covers defects in materials and workmanship under normal use. It does not cover damage caused by power surges, physical impacts, liquid exposure, or unauthorized modifications.
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">2. Return Process</h2>
            <p>
              To initiate a return or warranty claim, please contact our support team at contact@inovexabd.com with your order number and a detailed description of the issue. A Return Merchandise Authorization (RMA) number will be issued.
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">3. Restocking Fees</h2>
            <p>
              Returns of non-defective items may be subject to a restocking fee of up to 15% to cover testing and certification costs. Items must be returned in their original packaging with all accessories.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

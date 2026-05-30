import React from 'react';
import { motion } from 'motion/react';
import { Lock, EyeOff, ShieldAlert, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Privacy() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-white dark:bg-black transition-colors">
      <SEO
        title="Privacy Policy"
        description="Review Inovexa Technology privacy policy for handling customer data related to networking equipment purchases and enterprise support."
        keywords="privacy policy, data protection, enterprise ecommerce privacy, networking supplier policy"
        url="https://inovexabd.com/privacy"
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
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Privacy Policy</h1>
            <p className="text-black/60 dark:text-white/50 text-lg leading-relaxed">
              Your trust is our most valuable asset. This policy outlines how Inovexa Technology collects, protects, and handles your data when you interact with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Lock size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">Data Security</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">All transactions and communications are encrypted with enterprise-grade SSL certificates.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                <EyeOff size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">No-Sale Policy</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">We never sell or rent your personal information to third-party marketing companies.</p>
            </div>
            <div className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center text-green-600">
                <ShieldAlert size={24} />
              </div>
              <h3 className="font-bold text-black dark:text-white">Transparency</h3>
              <p className="text-xs text-black/50 dark:text-white/40 leading-relaxed">Request access to your stored data or ask for its deletion at any time via support.</p>
            </div>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none space-y-6 text-black/70 dark:text-white/60">
            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">1. Information Collection</h2>
            <p>
              We collect information necessary to fulfill your orders and provide technical support. This includes your name, company details, email, phone number, and shipping address.
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">2. Usage of Data</h2>
            <p>
              Stored data is used for order processing, providing warranty support, and (with your consent) sending hardware update notifications and platform news.
            </p>

            <h2 className="text-2xl font-bold text-black dark:text-white mt-12">3. Third-Party Services</h2>
            <p>
              We share only essential data (like addresses) with shipping partners (DHL, FedEx) to ensure successful delivery. We use secure payment processors that adhere to PCI-DSS standards.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

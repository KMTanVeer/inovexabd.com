import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ShoppingBag, ArrowLeft, Search, HelpCircle, Server, Network, HardDrive, AlertTriangle } from 'lucide-react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function NotFound() {
  return (
    <div className="pt-36 pb-24 min-h-[85vh] relative overflow-hidden bg-white dark:bg-black flex items-center">
      <SEO 
        title="404 - Page Not Found" 
        description="The page you are looking for does not exist or has been moved. Explore InovexaBD server, networking, and storage catalog." 
      />
      
      {/* Background Decorative Blurs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-red-600/10 dark:bg-red-600/5 blur-[160px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/10 dark:bg-orange-600/5 blur-[140px] rounded-full" />
      </div>

      <div className="container max-w-4xl mx-auto px-6 text-center space-y-12 relative z-10">
        {/* Animated Error Code */}
        <div className="relative inline-block">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/5 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-widest mb-6">
            <AlertTriangle size={12} />
            <span>Connection Warning</span>
          </div>
          
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 80 }}
            className="text-[120px] md:text-[180px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 dark:from-red-500 dark:via-rose-500 dark:to-orange-500 font-display select-none filter drop-shadow-[0_0_30px_rgba(239,68,68,0.2)]"
          >
            404
          </motion.h1>
          
          {/* Subtle radar pulse effect behind 404 */}
          <div className="absolute inset-0 flex items-center justify-center -z-10">
            <span className="w-40 h-40 rounded-full bg-red-500/10 dark:bg-red-500/5 animate-ping" />
          </div>
        </div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-xl mx-auto"
        >
          <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white tracking-tight uppercase">
            Route Packet Lost
          </h2>
          <p className="text-sm md:text-base text-black/60 dark:text-white/50 leading-relaxed">
            The page you requested could not be routed. It might have been moved, deleted, or never existed in our data center index.
          </p>
        </motion.div>

        {/* Quick Action Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white dark:bg-red-500 dark:hover:bg-red-600 text-sm font-semibold flex items-center gap-2 shadow-[0_4px_20px_rgba(239,68,68,0.25)] hover:shadow-[0_6px_25px_rgba(239,68,68,0.35)] transition-all transform hover:-translate-y-0.5"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white text-sm font-semibold flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <ShoppingBag size={16} />
            Explore Shop
          </Link>
        </motion.div>

        {/* Category Navigation Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pt-10 border-t border-black/10 dark:border-white/10"
        >
          <h3 className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-[0.25em] mb-6">
            Or Jump Directly Into Core Collections
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              {
                title: 'Servers',
                icon: Server,
                path: '/shop?category=servers',
                desc: 'Rackmount & Tower Servers',
                color: 'from-blue-500/10 to-indigo-500/10 text-blue-600 dark:text-blue-400',
              },
              {
                title: 'Networking',
                icon: Network,
                path: '/shop?category=networking',
                desc: 'Switches, Routers, Uplinks',
                color: 'from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400',
              },
              {
                title: 'Storage & Accessories',
                icon: HardDrive,
                path: '/shop?category=storage',
                desc: 'Enterprise SSDs & SAS HDDs',
                color: 'from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400',
              },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to={cat.path}
                className="group relative block p-5 rounded-2xl border border-indigo-100/70 dark:border-white/10 bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_-5px_rgba(99,102,241,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.3)] hover:border-blue-500/50 dark:hover:border-blue-500/40 hover:scale-[1.03] transition-all duration-300 text-left"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <cat.icon size={20} />
                </div>
                <h4 className="text-sm font-bold text-black dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {cat.title}
                </h4>
                <p className="text-xs text-black/50 dark:text-white/40 leading-normal">
                  {cat.desc}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

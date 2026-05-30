import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/src/data/products.ts';
import { ChevronRight } from 'lucide-react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Categories() {
  return (
    <div className="pt-32 pb-24 min-h-screen relative">
      <SEO
        title="Networking Equipment Categories"
        description="Explore networking equipment categories including switches, routers, servers, storage, transceivers, LAN cards and enterprise components."
        keywords="networking categories, switches, routers, lan card, ssd storage, server hardware, enterprise infrastructure"
        url="https://inovexabd.com/categories"
      />
      <div className="container mx-auto px-6">
        <div className="max-w-4xl space-y-4 mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-black dark:text-white font-display">Hardware Categories</h1>
          <p className="text-black/40 dark:text-white/40 text-lg">Browse our specialized departments for mission-critical infrastructure equipment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={`/shop?category=${category.id}`} 
                  className="group relative block aspect-[16/10] overflow-hidden rounded-3xl border border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:border-blue-600 dark:hover:border-blue-500/50 transition-all"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-30 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40 dark:group-hover:opacity-50" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-black via-white/40 dark:via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end gap-2">
                    <div className="w-12 h-12 flex items-center justify-center rounded-2xl bg-blue-600/80 backdrop-blur-md text-white shadow-xl mb-2">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-black dark:text-white tracking-tight flex items-center gap-2">
                      {category.name} <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-black/40 dark:text-white/40 text-xs line-clamp-2">{category.description}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

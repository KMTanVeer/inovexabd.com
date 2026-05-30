import { Link } from 'react-router-dom';
import { CATEGORIES } from '@/src/data/products.ts';
import { SEO } from '@/src/components/common/SEO.tsx';
import { ArrowRight, Cpu, HardDrive, Network, Server, Wifi } from 'lucide-react';

const icons: Record<string, any> = {
  switches: Network,
  routers: Wifi,
  'lan-cards': Cpu,
  ssds: HardDrive,
  servers: Server
};

export function Categories() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO title="Categories" description="Explore modern specialized catalog listings." />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-wider">Device Categories</h1>
          <p className="text-black/60 dark:text-white/60 max-w-xl mx-auto font-light">
            Filter our production offerings down to technical specifications by equipment layer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map(category => {
            const Icon = icons[category.id] || Network;
            return (
              <div key={category.id} className="group bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-8 rounded-3xl flex flex-col justify-between h-64 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl w-fit">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight">{category.name}</h3>
                  <p className="text-black/50 dark:text-white/50 text-sm line-clamp-2">{category.description}</p>
                </div>

                <Link to={`/shop?category=${category.id}`} className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors pt-4 group">
                  Explore Products
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

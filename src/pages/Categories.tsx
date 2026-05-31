import { Link } from 'react-router-dom';
import { CATALOG_GROUPS } from '@/src/data/products.ts';
import { SEO } from '@/src/components/common/SEO.tsx';
import { ArrowRight } from 'lucide-react';

export function Categories() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO title="Categories" description="Explore modern specialized catalog listings." />
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-wider">Device Categories</h1>
          <p className="text-black/60 dark:text-white/60 max-w-xl mx-auto font-light">
            Explore our launch catalog grouped by product lines and infrastructure needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATALOG_GROUPS.map(group => {
            return (
              <div key={group.name} className="group bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 p-8 rounded-3xl flex flex-col justify-between min-h-64 hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold uppercase tracking-tight">{group.name}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Link to={`/shop?q=${encodeURIComponent(item)}`} className="text-sm text-black/60 dark:text-white/60 hover:text-blue-500 transition-colors">
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={`/shop?q=${encodeURIComponent(group.name)}`} className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors pt-4 group">
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

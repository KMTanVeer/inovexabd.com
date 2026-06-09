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
              <div key={group.name} className="group bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 backdrop-blur-xl p-8 rounded-3xl flex flex-col justify-between min-h-[16rem] hover:-translate-y-1 hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_20px_45px_rgba(99,102,241,0.08)] dark:hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_20px_45px_rgba(0,0,0,0.4)] transition-all duration-300">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold uppercase tracking-tight">{group.name}</h3>
                  <ul className="space-y-2">
                    {group.items.map((item) => (
                      <li key={item.path}>
                        <Link to={item.path} className="text-sm text-black/60 dark:text-white/60 hover:text-blue-500 transition-colors">
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link to={group.explorePath} className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors pt-4 group">
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

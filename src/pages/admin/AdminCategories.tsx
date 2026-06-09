import { Package, ShieldAlert, Cpu, HardDrive, Network, Server, Wifi } from 'lucide-react';
import { CATEGORIES } from '@/src/data/products.ts';

const icons: Record<string, any> = {
  switches: Network,
  routers: Wifi,
  'lan-cards': Cpu,
  ssds: HardDrive,
  servers: Server
};

export function AdminCategories() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto text-black dark:text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-display uppercase tracking-widest text-black dark:text-white">Categories & Brands</h1>
          <p className="text-sm text-black/50 dark:text-white/50">Device categorization layers and brand compliance controls.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Categories Panel */}
        <div className="bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 backdrop-blur-xl rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_-5px_rgba(99,102,241,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.3)] p-6 space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-black/5 dark:border-white/5">
            <Package className="text-blue-500" size={20} />
            <h2 className="text-xl font-bold uppercase tracking-wide">Category Layers</h2>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map(category => {
              const Icon = icons[category.id] || Network;
              return (
                <div key={category.id} className="flex items-start gap-4 p-4 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                  <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl shrink-0 h-fit">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm tracking-tight uppercase">{category.name}</h3>
                    <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed font-light mt-0.5">{category.description}</p>
                    <span className="inline-block mt-2 text-[10px] font-black uppercase text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                      System Locked Root
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Brands Panel */}
        <div className="bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 backdrop-blur-xl rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_-5px_rgba(99,102,241,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.3)] p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-black/5 dark:border-white/5">
              <ShieldAlert className="text-blue-500" size={20} />
              <h2 className="text-xl font-bold uppercase tracking-wide">Brand & Vendor Locking</h2>
            </div>

            <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed font-light">
              To guarantee extreme quality controls and compliance benchmarks across fiber layouts inside Bangladesh, this catalog is locked to official authorized enterprise equipment providers:
            </p>

            <div className="grid grid-cols-2 gap-4">
              {['Cisco Systems', 'Juniper Networks', 'Samsung Enterprise', 'Intel Corporation', 'Ubiquiti Networks', 'Huawei Technologies'].map((b, idx) => (
                <div key={idx} className="p-3 text-center rounded-xl bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/5 dark:via-zinc-900/20 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] font-bold uppercase text-xs tracking-wider">
                  {b}
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs font-medium text-black/40 dark:text-white/40 border-t border-black/5 dark:border-white/5 pt-4 mt-6 text-center">
            Modify brand rules securely inside Mongoose database validation rules.
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Package, ShoppingCart, DollarSign, AlertTriangle, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminDashboard() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => console.error("Error loaded stats:", err))
      .finally(() => setIsLoading(false));
  }, []);

  // Calculate dynamic stats
  const totalProductsCount = products.length;
  const totalStockCount = products.reduce((sum, p) => sum + (p.stock || 0), 0);
  const totalValuation = products.reduce((sum, p) => sum + ((p.price || 0) * (p.stock || 0)), 0);
  const lowStockItems = products.filter(p => (p.stock || 0) <= 5);

  const stats = [
    { name: 'Inventory Valuation', value: `$${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, change: 'Based on price × stock count', icon: DollarSign, color: 'text-green-500 bg-green-500/10' },
    { name: 'Total Products', value: totalProductsCount.toString(), change: 'Unique catalog SKUs', icon: Package, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Total Storage Units', value: totalStockCount.toLocaleString(), change: 'Accumulative warehouse units', icon: ShoppingCart, color: 'text-purple-500 bg-purple-500/10' },
    { name: 'Low Stock Alert items', value: lowStockItems.length.toString(), change: 'Stock count is 5 or fewer', icon: AlertTriangle, color: lowStockItems.length > 0 ? 'text-red-500 bg-red-500/10' : 'text-zinc-400 bg-zinc-500/10' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-black dark:text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold font-display uppercase tracking-widest text-black dark:text-white">Dashboard Overview</h1>
          <p className="text-sm text-black/50 dark:text-white/50">Real-time analytical summaries harvested from enterprise storage catalogs.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 text-blue-500 px-4 py-2 rounded-xl">
          <ShieldCheck size={16} />
          System Operational
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="p-6 rounded-2xl bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_20px_-5px_rgba(99,102,241,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.3)] hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <span className="text-black/60 dark:text-white/60 font-semibold text-sm">{stat.name}</span>
                <div className={`p-2.5 rounded-xl ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{isLoading ? 'Loading...' : stat.value}</h3>
                <p className="text-xs text-black/40 dark:text-white/40 font-medium">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Analytics grids */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Low Stock Items List */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_-5px_rgba(99,102,241,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.35)] overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold uppercase tracking-wider">Low Stock Inventory Warnings</h2>
              <p className="text-xs text-black/50 dark:text-white/50">Action required to preserve supply lines.</p>
            </div>
            <Link to="/admin/products" className="text-xs font-bold uppercase text-blue-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1">
              Restock Items
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12 text-black/40 dark:text-white/40 text-sm">Fetching stock reports...</div>
          ) : lowStockItems.length === 0 ? (
            <div className="text-center py-12 text-black/40 dark:text-white/40 text-sm flex flex-col items-center gap-2">
              <span className="text-green-500 text-2xl font-bold">✓</span>
              All catalog listings meet safety buffer levels (&gt; 5 units).
            </div>
          ) : (
            <div className="space-y-3">
              {lowStockItems.map((item) => (
                <div key={item._id || item.id} className="flex items-center justify-between p-4 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-black/10 dark:bg-white/10 overflow-hidden shrink-0">
                      {item.images?.[0] && <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm tracking-tight">{item.name}</h4>
                      <p className="text-xs text-black/50 dark:text-white/50 uppercase tracking-widest font-semibold">{item.brand}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-black uppercase px-3 py-1 rounded-full">
                      Only {item.stock} left
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Brand metrics info */}
        <div className="p-6 rounded-2xl bg-gradient-to-b from-white/40 via-indigo-50/15 to-indigo-100/30 dark:from-white/10 dark:via-zinc-900/40 dark:to-white/5 border border-indigo-100/70 dark:border-white/10 backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),0_10px_30px_-5px_rgba(99,102,241,0.05)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_15px_30px_rgba(0,0,0,0.35)]">
          <h2 className="text-lg font-bold uppercase tracking-wider mb-2">Vendor Distribution</h2>
          <p className="text-xs text-black/50 dark:text-white/50 mb-6">Device concentration by certified manufacturer brand.</p>

          {isLoading ? (
            <div className="text-center py-12 text-black/40 dark:text-white/40 text-sm">Aggregating brands...</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-black/40 dark:text-white/40 text-sm">Add catalog items to see graphs.</div>
          ) : (
            <div className="space-y-4">
              {(() => {
                const brandMap: Record<string, number> = {};
                products.forEach(p => {
                  const b = p.brand || 'Unbranded';
                  brandMap[b] = (brandMap[b] || 0) + 1;
                });
                return Object.entries(brandMap).map(([brand, count]) => {
                  const pct = Math.round((count / products.length) * 100);
                  return (
                    <div key={brand} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-bold uppercase">
                        <span>{brand}</span>
                        <span className="text-blue-500">{count} item{count > 1 ? 's' : ''} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-black/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

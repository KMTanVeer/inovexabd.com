import { NavLink } from 'react-router-dom';
import { Home, Package, ShoppingBag, LayoutDashboard, Settings } from 'lucide-react';
import { cn } from '@/src/components/common/GlassContainer.tsx';
import { BrandLogo } from '@/src/components/common/BrandLogo.tsx';

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ADMIN_LINKS = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Products', path: '/admin/products', icon: Package },
  { name: 'Categories', path: '/admin/categories', icon: ShoppingBag },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  return (
    <aside 
      className={cn(
        "fixed md:sticky top-0 z-30 h-screen bg-white dark:bg-zinc-950 border-r border-black/10 dark:border-white/10 transition-all duration-300 flex flex-col",
        isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full md:w-20 md:translate-x-0"
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-black/10 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <BrandLogo className="w-8 h-8 shrink-0" />
          <span className={cn(
            "font-display font-bold text-lg tracking-tighter truncate transition-opacity duration-300",
            !isOpen && "md:opacity-0"
          )}>
            ADMIN PANEL
          </span>
        </div>
      </div>

      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
        {ADMIN_LINKS.map(link => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === '/admin'}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors group",
                isActive 
                  ? "bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                  : "text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white"
              )}
            >
              <Icon size={20} className="shrink-0" />
              <span className={cn(
                "truncate transition-opacity duration-300",
                !isOpen && "md:opacity-0 md:w-0"
              )}>
                {link.name}
              </span>
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-black/10 dark:border-white/10">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5"
        >
          <Home size={20} className="shrink-0" />
          <span className={cn(
            "truncate transition-opacity duration-300",
            !isOpen && "md:opacity-0 md:w-0"
          )}>
            Storefront
          </span>
        </NavLink>
      </div>
    </aside>
  );
}

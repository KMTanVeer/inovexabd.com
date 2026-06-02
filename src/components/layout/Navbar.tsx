import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, ArrowRight, Sun, Moon, ChevronDown, Home, ShoppingBag, Mail, Package } from 'lucide-react';
import { cn } from '@/src/components/common/GlassContainer.tsx';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '@/src/components/common/BrandLogo.tsx';
import { useTheme } from '@/src/context/ThemeContext.tsx';
import { CATALOG_GROUPS } from '@/src/data/products.ts';

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: Home },
  { 
    name: 'Shop', 
    path: '/shop',
    icon: ShoppingBag,
    dropdownGroups: CATALOG_GROUPS.map((group) => ({
      name: group.name,
      items: group.items
    }))
  },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDesktopGroup, setActiveDesktopGroup] = useState<string | null>(null);
  const [activeMobileGroup, setActiveMobileGroup] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen) return;
    searchInputRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSearchOpen]);

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        (isScrolled || isMobileMenuOpen) 
          ? 'py-4 backdrop-blur-2xl bg-white/80 dark:bg-black/80 border-b border-black/5 dark:border-white/10' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <BrandLogo variant="topbar" showMark={false} highlightTopbarX className="transform transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return link.dropdownGroups ? (
              <div key={link.path} className="relative group/dropdown">
                <Link
                  to={link.path}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors hover:text-blue-500 flex items-center gap-1.5',
                    location.pathname === link.path ? 'text-blue-500' : 'text-black/70 dark:text-white/70'
                  )}
                >
                  <Icon size={16} />
                  {link.name}
                  <ChevronDown size={14} className="opacity-70 group-hover/dropdown:rotate-180 transition-transform duration-300" />
                </Link>
                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 pt-4 w-[320px] opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-3 backdrop-blur-xl">
                    {link.dropdownGroups.map((group) => (
                      <div key={group.name} className="px-4 py-2">
                        <button
                          type="button"
                          onClick={() => setActiveDesktopGroup((prev) => (prev === group.name ? null : group.name))}
                          className="w-full flex items-center justify-between px-2 py-1.5 text-sm font-semibold text-black/80 dark:text-white/80 hover:text-blue-500 transition-colors"
                        >
                          <span>{group.name}</span>
                          <ChevronDown
                            size={14}
                            className={cn(
                              "transition-transform duration-300",
                              activeDesktopGroup === group.name ? "rotate-0" : "-rotate-90"
                            )}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {activeDesktopGroup === group.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className="space-y-1 pl-2 pt-1">
                                {group.items.map((item) => (
                                  <Link
                                    key={item.path}
                                    to={item.path}
                                    className="block px-2 py-1.5 text-sm text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-500 rounded-md transition-colors"
                                  >
                                    {item.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium tracking-wide transition-colors hover:text-blue-500 flex items-center gap-1.5',
                  location.pathname === link.path ? 'text-blue-500' : 'text-black/70 dark:text-white/70'
                )}
              >
                <Icon size={16} />
                {link.name}
              </Link>
            )
          })}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="group relative p-2 md:p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
            <div className="relative transform group-hover:rotate-12 transition-transform duration-300">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </div>
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSearchOpen(true);
            }}
            aria-label="Open search"
            className="group relative p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-purple-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
            <div className="relative transform group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">
              <Search size={20} />
            </div>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-black dark:text-white p-2 -mr-2"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              aria-label="Close search"
              className="fixed inset-0 z-[55] bg-black/20 dark:bg-black/50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-20 md:top-24 left-1/2 z-[60] w-[calc(100%-1.5rem)] md:w-[min(760px,calc(100%-3rem))] -translate-x-1/2 rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl shadow-2xl"
            >
              <form onSubmit={handleSearch} className="p-4 md:p-6 space-y-5">
                <div className="flex items-center gap-2 md:gap-3 border border-black/10 dark:border-white/10 rounded-xl px-3 md:px-4 focus-within:border-blue-500 transition-colors">
                  <Search size={18} className="text-black/40 dark:text-white/40 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search infrastructure hardware..."
                    className="w-full bg-transparent py-3 md:py-4 text-base md:text-xl font-semibold text-black dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="p-2 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors"
                  >
                    <ArrowRight size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    aria-label="Close search panel"
                    className="p-2 rounded-lg text-black/40 dark:text-white/40 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <span className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mr-1 self-center">Quick Search:</span>
                  {['10G Card', 'Xeon', 'Supermicro', 'SFP+', 'Dell R640'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-xs text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 overflow-hidden md:hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
          >
            <div className="py-8 px-6 flex flex-col gap-6">
              {NAV_LINKS.map((link, i) => {
                const Icon = link.icon;
                return (
                 <motion.div
                   key={link.path}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.1 + i * 0.1 }}
                   className="flex flex-col gap-4"
                 >
                   {link.dropdownGroups ? (
                     <button
                       type="button"
                       onClick={() => {
                         navigate(link.path);
                         setIsMobileMenuOpen(false);
                       }}
                       className={cn(
                         "w-full text-xl font-bold tracking-tight transition-colors flex items-center justify-between",
                         "text-black/70 dark:text-white/70 hover:text-blue-500 dark:hover:text-white"
                       )}
                     >
                       <div className="flex items-center gap-3">
                         <Icon size={20} />
                         {link.name}
                       </div>
                     </button>
                   ) : (
                     <Link
                       to={link.path}
                       className={cn(
                         "text-xl font-bold tracking-tight transition-colors flex items-center justify-between",
                         location.pathname === link.path ? "text-blue-500" : "text-black/70 dark:text-white/70 hover:text-blue-500 dark:hover:text-white"
                       )}
                       onClick={() => setIsMobileMenuOpen(false)}
                     >
                       <div className="flex items-center gap-3">
                         <Icon size={20} />
                         {link.name}
                       </div>
                     </Link>
                   )}
                   {link.dropdownGroups && (
                     <div className="flex flex-col gap-3 pl-8 border-l-2 border-black/5 dark:border-white/10 ml-2">
                       {link.dropdownGroups.map((group) => (
                         <div key={group.name} className="space-y-2">
                           <button
                             type="button"
                             onClick={() => setActiveMobileGroup((prev) => (prev === group.name ? null : group.name))}
                             className="w-full flex items-center justify-between text-left text-base font-semibold text-black/70 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-400"
                           >
                             <span>{group.name}</span>
                             <ChevronDown
                               size={16}
                               className={cn(
                                 "transition-transform duration-300",
                                 activeMobileGroup === group.name ? "rotate-0" : "-rotate-90"
                               )}
                             />
                           </button>
                           <AnimatePresence initial={false}>
                             {activeMobileGroup === group.name && (
                               <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 transition={{ duration: 0.25, ease: 'easeInOut' }}
                                 className="overflow-hidden"
                               >
                                 <div className="space-y-2 pl-2">
                                   {group.items.map((item) => (
                                     <Link
                                       key={item.path}
                                       to={item.path}
                                       onClick={() => setIsMobileMenuOpen(false)}
                                       className="block text-base text-black/60 dark:text-white/60 hover:text-blue-500 dark:hover:text-blue-400"
                                     >
                                       {item.name}
                                     </Link>
                                   ))}
                                 </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
                       ))}
                     </div>
                   )}
                 </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

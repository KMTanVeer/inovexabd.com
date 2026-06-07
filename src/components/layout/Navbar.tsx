import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, ArrowRight, Sun, Moon, ChevronDown, Home, ShoppingBag, Mail, Package, ChevronRight } from 'lucide-react';
import { cn } from '@/src/components/common/GlassContainer.tsx';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '@/src/components/common/BrandLogo.tsx';
import { useTheme } from '@/src/context/ThemeContext.tsx';
import { CATALOG_GROUPS, PRODUCTS } from '@/src/data/products.ts';

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

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      (p.specs.Brand && p.specs.Brand.toLowerCase().includes(query)) ||
      (p.specs.Model && p.specs.Model.toLowerCase().includes(query))
    ).slice(0, 5);
  }, [searchQuery]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    navigate(query ? `/shop?q=${encodeURIComponent(query)}` : '/shop');
    setIsSearchOpen(false);
    setSearchQuery('');
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
    
    // Lock body scrolling when search overlay is active
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    searchInputRef.current?.focus();

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      // Restore body scrolling on close
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen]);

  return (
    <>
      {/* Backdrop overlay covering the rest of the screen to close menu on outside click (rendered outside nav to avoid layout/blur bugs) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/25 dark:bg-black/60 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>

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
          <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 group shrink-0">
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
                  onClick={link.path === '/' ? handleLogoClick : undefined}
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
            {/* Desktop Search Pill Button */}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              aria-label="Open search"
              className="hidden md:block relative h-9 w-[132px] group/search cursor-pointer focus:outline-none hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 select-none"
            >
              {/* Left Part (Pill with cutout) */}
              <div className="absolute left-0 top-0 w-[112px] h-9 pointer-events-none">
                <svg width="112" height="36" viewBox="0 0 112 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path d="M18 0C8.05888 0 0 8.05888 0 18C0 27.9411 8.05888 36 18 36H99C95.5 31 93 25 93 18C93 11 95.5 5 99 0H18Z" fill="url(#search-left-grad)" />
                  <defs>
                    <linearGradient id="search-left-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00A3FF" />
                      <stop offset="100%" stopColor="#7B5CFF" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Text Overlay */}
                <span className="absolute inset-y-0 left-0 pl-5 flex items-center text-white text-[13px] font-semibold select-none">
                  Search...
                </span>
              </div>

              {/* Right Part (Circle button) */}
              <div className="absolute left-[96px] top-0 w-9 h-9 rounded-full bg-gradient-to-br from-[#7B5CFF] to-[#9D4EDD] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover/search:shadow-indigo-500/40 transition-all duration-300">
                <Search size={15} strokeWidth={2.5} />
              </div>
            </button>

            {/* Mobile Search Icon Button */}
            <button 
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              aria-label="Open search"
              className="md:hidden group relative p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300"
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
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setIsSearchOpen(false);
                        }
                      }}
                      placeholder="Search infrastructure hardware..."
                      className="w-full bg-transparent py-3 md:py-4 text-base md:text-xl font-semibold text-black dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none"
                    />
                    <button
                      type="submit"
                      aria-label="Submit search"
                      className="relative w-10 h-10 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 duration-200 shrink-0 cursor-pointer focus:outline-none"
                    >
                      {/* Rosette Background SVG */}
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full fill-zinc-100 dark:fill-zinc-800 transition-colors duration-300" xmlns="http://www.w3.org/2000/svg">
                        <path d="M 50 5 C 53.9 10 59.8 11.6 62.9 15.3 C 66 19 66.2 25.4 70.4 28.3 C 74.6 31.2 80.9 30.5 83.9 34.6 C 86.9 38.7 86.2 45.1 88 50 C 86.2 54.9 86.9 61.3 83.9 65.4 C 80.9 69.5 74.6 68.8 70.4 71.7 C 66.2 74.6 66 81 62.9 84.7 C 59.8 88.4 53.9 90 50 95 C 46.1 90 40.2 88.4 37.1 84.7 C 34 81 33.8 74.6 29.6 71.7 C 25.4 68.8 19.1 69.5 16.1 65.4 C 13.1 61.3 13.8 54.9 12 50 C 13.8 45.1 13.1 38.7 16.1 34.6 C 19.1 30.5 25.4 31.2 29.6 28.3 C 33.8 25.4 34 19 37.1 15.3 C 40.2 11.6 46.1 10 50 5 Z" />
                      </svg>
                      <Search size={16} className="relative z-10 text-zinc-900 dark:text-white" />
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
                  {searchQuery.trim() && (
                    <div className="space-y-1.5 border-t border-black/5 dark:border-white/5 pt-3 max-h-[260px] overflow-y-auto">
                      {suggestions.length > 0 ? (
                        <>
                          <div className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest px-2 mb-1">Suggested Products</div>
                          {suggestions.map((p) => (
                            <Link
                              key={p.id}
                              to={`/product/${p.id}`}
                              onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                              }}
                              className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white border border-black/10 dark:border-white/10 flex items-center justify-center p-1 shrink-0">
                                <img src={p.image} alt={p.name} className="max-w-full max-h-full object-contain" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-black dark:text-white truncate group-hover:text-blue-500 transition-colors font-medium">
                                  {p.name}
                                </div>
                                <div className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-wider">
                                  {p.specs.Brand || 'Enterprise'} • {p.category}
                                </div>
                              </div>
                              <ChevronRight size={14} className="text-black/30 dark:text-white/30 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          ))}
                        </>
                      ) : (
                        <div className="p-3 text-center text-xs text-black/40 dark:text-white/40">
                          No matches found. Press Enter to search.
                        </div>
                      )}
                    </div>
                  )}
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

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="absolute top-full left-0 w-full bg-white/95 dark:bg-black/95 backdrop-blur-2xl border-b border-black/5 dark:border-white/10 overflow-hidden md:hidden shadow-[0_40px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_40px_80px_rgba(0,0,0,0.7)] z-50"
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
                         onClick={(e) => {
                           if (link.path === '/' && location.pathname === '/') {
                             handleLogoClick(e);
                           }
                           setIsMobileMenuOpen(false);
                         }}
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
    </>
  );
}

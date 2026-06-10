import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
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
  const [isShopScrolled, setIsShopScrolled] = useState(false);
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
  const [searchParams, setSearchParams] = useSearchParams();
  const isShopPage = location.pathname === '/shop';
  const [showInlineSuggestions, setShowInlineSuggestions] = useState(false);
  const navbarInlineQuery = searchParams.get('q') || '';
  const inlineSuggestions = useMemo(() => {
    const q = navbarInlineQuery.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.category.toLowerCase().includes(q) ||
      (p.specs.Brand && p.specs.Brand.toLowerCase().includes(q)) ||
      (p.specs.Model && p.specs.Model.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [navbarInlineQuery]);

  const [placeholderText, setPlaceholderText] = useState("Search");
  useEffect(() => {
    const updatePlaceholder = () => {
      setPlaceholderText(window.innerWidth < 640 ? "Search" : "Search products...");
    };
    updatePlaceholder();
    window.addEventListener('resize', updatePlaceholder);
    return () => window.removeEventListener('resize', updatePlaceholder);
  }, []);

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

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsShopScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isSearchOpen && !isMobileMenuOpen) return;
    
    // Lock body scrolling when search overlay or mobile menu is active
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseSearch();
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => {
      // Restore body scrolling on close
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isSearchOpen, isMobileMenuOpen]);

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

      {/* Search Overlay & Backdrop (rendered outside nav to avoid layout/blur bugs) */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
             <motion.button
               type="button"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={handleCloseSearch}
               aria-label="Close search"
               className="fixed inset-0 z-[55] bg-black/30 dark:bg-black/60 backdrop-blur-md cursor-default focus:outline-none"
             />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed top-20 md:top-24 left-1/2 z-[60] w-[calc(100%-1.5rem)] md:w-[min(760px,calc(100%-3rem))] -translate-x-1/2 rounded-2xl border border-white/60 dark:border-white/10 bg-gradient-to-b from-white/80 via-white/60 to-indigo-50/70 dark:from-zinc-950/80 dark:via-zinc-900/60 dark:to-neutral-950/50 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_25px_50px_rgba(0,0,0,0.4)]"
            >
              <form onSubmit={handleSearch} className="p-4 md:p-6 space-y-5">
                <div className="flex items-center gap-2 md:gap-3 bg-zinc-50/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-xl px-3 md:px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] focus-within:border-indigo-500/80 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.2)] dark:focus-within:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all duration-300">
                  <Search size={18} className="text-black/40 dark:text-white/40 shrink-0" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        handleCloseSearch();
                      }
                    }}
                    placeholder="Search infrastructure hardware..."
                    className="w-full bg-transparent py-3 md:py-4 text-base md:text-xl font-semibold text-black dark:text-white placeholder:text-black/35 dark:placeholder:text-white/35 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95 duration-200 shrink-0 cursor-pointer focus:outline-none"
                  >
                    <Search size={16} className="text-zinc-900 dark:text-white" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCloseSearch}
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

      <nav
        className={cn(
          'fixed top-0 z-50 w-full transition-all duration-500',
          (isScrolled || isMobileMenuOpen) 
            ? 'py-4 backdrop-blur-xl bg-gradient-to-b from-white/50 via-white/25 to-indigo-50/30 dark:from-zinc-900/30 dark:via-black/20 dark:to-zinc-900/10 border-b border-white/60 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_15px_40px_rgba(0,0,0,0.3)]' 
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
                      'text-sm font-medium tracking-wide transition-colors hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5',
                      location.pathname === link.path ? 'text-blue-700 dark:text-blue-300 font-semibold' : 'text-zinc-800 dark:text-zinc-200'
                    )}
                  >
                    <Icon size={16} />
                    {link.name}
                    <ChevronDown size={14} className="opacity-70 group-hover/dropdown:rotate-180 transition-transform duration-300" />
                  </Link>
                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 pt-4 w-[320px] opacity-0 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:pointer-events-auto transition-opacity duration-300 z-50">
                    <div className="bg-gradient-to-b from-white/80 via-white/60 to-indigo-50/70 dark:from-zinc-950/80 dark:via-zinc-900/60 dark:to-neutral-950/50 border border-white/60 dark:border-white/10 rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_15px_40px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_25px_50px_rgba(0,0,0,0.4)] overflow-hidden py-3 backdrop-blur-3xl">
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
                                      className="block px-2 py-1.5 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-700 dark:hover:text-blue-300 rounded-md transition-colors"
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
                    'text-sm font-medium tracking-wide transition-colors hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1.5',
                    location.pathname === link.path ? 'text-blue-700 dark:text-blue-300 font-semibold' : 'text-zinc-800 dark:text-zinc-200'
                  )}
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Icons */}
          <motion.div layout className="flex items-center gap-2 md:gap-5">
            <motion.button
              layout
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="group relative p-2 md:p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
              <div className="relative transform group-hover:rotate-12 transition-transform duration-300">
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </motion.button>
            <AnimatePresence mode="wait">
              {isShopPage && isShopScrolled ? (
                <motion.div
                  key="navbar-inline-search"
                  layout
                  initial={{ opacity: 0, scale: 0.95, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: 20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="relative flex items-center"
                >
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-black/40 dark:text-white/40" size={13} />
                  <input
                    type="text"
                    placeholder={placeholderText}
                    value={searchParams.get('q') || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      const newParams = new URLSearchParams(searchParams);
                      if (val) {
                        newParams.set('q', val);
                      } else {
                        newParams.delete('q');
                      }
                      setSearchParams(newParams);
                    }}
                    onFocus={() => setShowInlineSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowInlineSuggestions(false), 200)}
                    className="bg-zinc-50/50 dark:bg-zinc-900/50 border border-black/10 dark:border-white/10 rounded-full pl-7 pr-3 py-1.5 text-xs text-black dark:text-white focus:outline-none focus:border-blue-500/80 w-[85px] xs:w-[110px] sm:w-[170px] md:w-[132px] lg:w-[132px] focus:w-[110px] xs:focus:w-[140px] sm:focus:w-[200px] md:focus:w-[132px] lg:focus:w-[132px] transition-all focus:bg-white dark:focus:bg-zinc-950 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] focus:shadow-[0_4px_12px_rgba(59,130,246,0.15)] dark:focus:shadow-[0_4px_12px_rgba(59,130,246,0.25)]"
                  />
                  <AnimatePresence>
                    {showInlineSuggestions && inlineSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 w-[280px] xs:w-[320px] sm:w-[360px] md:w-[400px] z-[70] bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-3 max-h-[320px] overflow-y-auto space-y-1.5"
                      >
                        <div className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest px-2 mb-1">
                          Suggested Products
                        </div>
                        {inlineSuggestions.map((p) => (
                          <Link
                            key={p.id}
                            to={`/product/${p.id}`}
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
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <motion.div
                  key="navbar-search-pill"
                  layout
                  initial={{ opacity: 0, scale: 0.95, x: -20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95, x: -20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex items-center"
                >
                  {/* Desktop Search Pill Button */}
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsSearchOpen(true);
                    }}
                    aria-label="Open search"
                    className="hidden md:flex items-center relative h-9 w-[132px] rounded-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.06)] dark:shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.4)] hover:border-indigo-500/50 hover:shadow-[0_4px_12px_rgba(123,92,255,0.15)] dark:hover:shadow-[0_4px_12px_rgba(123,92,255,0.25)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 select-none group/search cursor-text focus:outline-none"
                  >
                    {/* Text Overlay & Caret */}
                    <div className="relative pl-4 flex items-center h-full">
                      <span className="text-zinc-500 dark:text-zinc-300 text-[13px] font-medium select-none transition-opacity duration-200 group-hover/search:opacity-0">
                        Search...
                      </span>
                      <span className="absolute left-4 w-[1.5px] h-4 bg-indigo-600 dark:bg-indigo-400 opacity-0 group-hover/search:opacity-100 group-hover/search:animate-blink pointer-events-none transition-opacity duration-200" />
                    </div>

                    {/* Right Part (Circle button) */}
                    <div className="absolute -right-[1px] top-[-1px] w-9 h-9 rounded-full bg-gradient-to-br from-[#7B5CFF] to-[#9D4EDD] flex items-center justify-center text-white border border-white/10 shadow-md shadow-indigo-500/20 group-hover/search:shadow-indigo-500/40 transition-all duration-300 pointer-events-none">
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
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Mobile Menu Toggle */}
            <motion.button
              layout
              className="md:hidden text-black dark:text-white p-2 mr-0.5"
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </motion.div>
        </div>



        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
              className="absolute top-full left-0 w-full bg-gradient-to-b from-white/50 via-white/25 to-indigo-50/30 dark:from-zinc-900/30 dark:via-black/20 dark:to-zinc-900/10 backdrop-blur-3xl border-b border-white/60 dark:border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_40px_80px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_40px_80px_rgba(0,0,0,0.6)] overflow-y-auto max-h-[calc(100vh-5rem)] md:hidden z-50"
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
                           "text-zinc-800 dark:text-zinc-200 hover:text-blue-700 dark:hover:text-blue-300"
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
                           location.pathname === link.path ? "text-blue-700 dark:text-blue-300 font-semibold" : "text-zinc-800 dark:text-zinc-200 hover:text-blue-700 dark:hover:text-blue-300"
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
                               className="w-full flex items-center justify-between text-left text-base font-semibold text-zinc-800 dark:text-zinc-200 hover:text-blue-700 dark:hover:text-blue-300"
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
                                         className="block text-base text-zinc-700 dark:text-zinc-300 hover:text-blue-700 dark:hover:text-blue-300"
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

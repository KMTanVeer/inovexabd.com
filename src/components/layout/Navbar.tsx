import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Menu, X, ArrowRight, Sun, Moon, ChevronDown, Home, ShoppingBag, Mail, Package } from 'lucide-react';
import { cn } from '@/src/components/common/GlassContainer.tsx';
import { useNavigate } from 'react-router-dom';
import { BrandLogo } from '@/src/components/common/BrandLogo.tsx';
import { useTheme } from '@/src/context/ThemeContext.tsx';
import { CATEGORIES } from '@/src/data/products.ts';

const NAV_LINKS = [
  { name: 'Home', path: '/', icon: Home },
  { 
    name: 'Shop', 
    path: '/shop',
    icon: ShoppingBag,
    dropdown: CATEGORIES.map(c => ({ name: c.name, path: `/shop?category=${c.id}` }))
  },
  { name: 'Contact', path: '/contact', icon: Mail },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        (isScrolled || isMobileMenuOpen) 
          ? 'py-4 backdrop-blur-2xl bg-white/80 dark:bg-black/80 border-b border-black/5 dark:border-white/10' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <BrandLogo variant="topbar" className="transform transition-transform group-hover:scale-105" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            return link.dropdown ? (
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
                <div className="absolute top-full left-0 pt-4 w-48 opacity-0 translate-y-2 pointer-events-none group-hover/dropdown:opacity-100 group-hover/dropdown:translate-y-0 group-hover/dropdown:pointer-events-auto transition-all duration-300 z-50">
                  <div className="bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/10 rounded-xl shadow-xl overflow-hidden py-2 backdrop-blur-xl">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="block px-4 py-2 text-sm text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-blue-500 transition-colors"
                      >
                        {item.name}
                      </Link>
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
        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="group relative p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-blue-500 dark:hover:text-blue-400 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-blue-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
            <div className="relative transform group-hover:rotate-12 transition-transform duration-300">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </div>
          </button>
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="group relative p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-black/70 dark:text-white/70 hover:text-purple-500 dark:hover:text-purple-400 transition-all duration-300"
          >
            <div className="absolute inset-0 rounded-full bg-purple-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none" />
            <div className="relative transform group-hover:-rotate-12 group-hover:scale-110 transition-transform duration-300">
              <Search size={20} />
            </div>
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-black dark:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/95 dark:bg-black/95 backdrop-blur-2xl flex items-center justify-center px-6"
          >
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-8 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
            >
              <X size={32} />
            </button>
            <form onSubmit={handleSearch} className="w-full max-w-2xl space-y-8">
              <div className="relative group">
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search infrastructure hardware..."
                  className="w-full bg-transparent border-b-2 border-black/10 dark:border-white/10 py-4 text-3xl md:text-5xl font-bold text-black dark:text-white placeholder:text-black/10 dark:placeholder:text-white/10 focus:outline-none focus:border-blue-500 transition-all"
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-blue-500">
                  <ArrowRight size={32} />
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mr-2">Quick Search:</span>
                {['10G Card', 'Xeon', 'Supermicro', 'SFP+', 'Dell R640'].map(tag => (
                   <button 
                    key={tag}
                    type="button"
                    onClick={() => {
                      setSearchQuery(tag);
                      // Optionally auto-submit or just focus
                    }} 
                    className="px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-xs text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                   >
                     {tag}
                   </button>
                ))}
              </div>
            </form>
          </motion.div>
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
                   {link.dropdown && (
                     <div className="flex flex-col gap-3 pl-8 border-l-2 border-black/5 dark:border-white/10 ml-2">
                       {link.dropdown.map((item) => (
                         <Link
                           key={item.path}
                           to={item.path}
                           onClick={() => setIsMobileMenuOpen(false)}
                           className="text-base text-black/60 dark:text-white/60 hover:text-blue-500 dark:hover:text-blue-400"
                         >
                           {item.name}
                         </Link>
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

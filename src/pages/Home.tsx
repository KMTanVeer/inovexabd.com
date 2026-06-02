import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Zap, Shield, Cpu, Globe, Server, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, Product, PRODUCTS } from '@/src/data/products.ts';
import { ProductCard } from '@/src/components/common/ProductCard.tsx';
import { GlassContainer } from '@/src/components/common/GlassContainer.tsx';
import { SEO } from '@/src/components/common/SEO.tsx';
import { useState, useEffect, useMemo } from 'react';

// Import Hero Images
import dellServerHero from '@/src/assets/Hero-images/dell-server-hero.png';
import ciscoHero from '@/src/assets/Hero-images/cisco-hero.png';
import intelSsdHero from '@/src/assets/Hero-images/intel-ssd-hero.png';
import juniperHero from '@/src/assets/Hero-images/juniper-hero.png';

const BANNERS = [
  {
    id: 'cisco-nexus-93180yc-ex',
    title: 'Cisco Nexus N9K-C93180YC-EX',
    subtitle: 'High-Performance Data Center Switching for Modern Enterprise Infrastructure',
    image: ciscoHero,
    features: [
      '100G High-Speed Networking',
      'Enterprise Grade Reliability',
      'Ultra-Low Latency',
      'Scalable Architecture'
    ],
    accent: 'blue'
  },
  {
    id: 'juniper-mx80',
    title: 'Juniper MX80 Universal Router',
    subtitle: 'Reliable Routing Performance for Scalable Enterprise Networks',
    image: juniperHero,
    features: [
      'Carrier Grade Stability',
      'Advanced Routing Performance',
      'Secure Enterprise Connectivity',
      'Optimized for ISP & Data Center'
    ],
    accent: 'purple'
  }
];

const HERO_SHOWCASE = [
  {
    id: 'server',
    name: 'Dell PowerEdge Server',
    category: 'Enterprise Server',
    tag: 'MISSION CRITICAL',
    image: dellServerHero,
    color: 'purple'
  },
  {
    id: 'switch-cisco',
    name: 'Cisco Nexus Switch',
    category: 'Data Center Switch',
    tag: 'ULTRA LOW LATENCY',
    image: ciscoHero,
    color: 'blue'
  },
  {
    id: 'ssd',
    name: 'Intel Enterprise SSD',
    category: 'Data Center Storage',
    tag: 'EXTREME RELIABILITY',
    image: intelSsdHero,
    color: 'blue'
  },
  {
    id: 'switch-juniper',
    name: 'Juniper Networks',
    category: 'Enterprise Router',
    tag: 'HIGH PERFORMANCE',
    image: juniperHero,
    color: 'purple'
  }
] as const;

export function Home() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const featuredProducts = useMemo(
    () => products.filter(p => p.isFeatured || (p as any).featured).slice(0, 8),
    [products]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeBanner, setActiveBanner] = useState(0);
  const [heroShowcaseIndex, setHeroShowcaseIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const [isQuickViewActive, setIsQuickViewActive] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play for Hero Showcase (4s)
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroShowcaseIndex((prev) => (prev + 1) % HERO_SHOWCASE.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Auto-play for product slider
  useEffect(() => {
    if (isSliderPaused || isQuickViewActive) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (featuredProducts.length - (itemsPerView - 1)));
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredProducts.length, isSliderPaused, isQuickViewActive, itemsPerView]);

  // Auto-play for banners (4.5s)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => setActiveBanner((prev) => (prev + 1) % BANNERS.length);
  const prevBanner = () => setActiveBanner((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
  const isBlueBanner = BANNERS[activeBanner].accent === 'blue';
  const bannerAccentOverlayClass = isBlueBanner ? 'bg-blue-600/10 dark:bg-blue-600/5' : 'bg-purple-600/10 dark:bg-purple-600/5';
  const bannerAccentTextClass = isBlueBanner ? 'text-blue-500/90' : 'text-purple-500/90';
  const bannerAccentDotClass = isBlueBanner ? 'bg-blue-500' : 'bg-purple-500';
  const bannerAccentButtonClass = isBlueBanner
    ? 'bg-blue-600 hover:bg-blue-500 md:bg-blue-700 md:hover:bg-blue-600 shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:shadow-[0_0_60px_rgba(37,99,235,0.5)]'
    : 'bg-purple-600 hover:bg-purple-500 md:bg-purple-700 md:hover:bg-purple-600 shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:shadow-[0_0_60px_rgba(147,51,234,0.5)]';
  const isBlueShowcase = HERO_SHOWCASE[heroShowcaseIndex].color === 'blue';
  const showcaseGlowClass = isBlueShowcase ? 'bg-blue-500/10' : 'bg-purple-500/10';
  const showcaseBadgeClass = isBlueShowcase
    ? 'bg-blue-600/20 border-blue-500/30 text-blue-400'
    : 'bg-purple-600/20 border-purple-500/30 text-purple-400';
  const showcaseDotPrimaryClass = isBlueShowcase ? 'bg-blue-500' : 'bg-purple-500';
  const showcaseDotSecondaryClass = isBlueShowcase ? 'bg-blue-500/30' : 'bg-purple-500/30';
  const showcaseCategoryClass = isBlueShowcase ? 'text-blue-400/60' : 'text-purple-400/60';
  const showcaseImageClass = 'w-full h-full object-contain brightness-110 contrast-110 drop-shadow-[0_18px_36px_rgba(15,23,42,0.6)] dark:drop-shadow-[0_18px_36px_rgba(255,255,255,0.2)] hover:scale-[1.03] transition-transform duration-700';
  const bannerOrderButtonBaseClass = 'px-8 py-4 md:px-10 md:py-5 rounded-xl text-white font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 text-sm md:text-base';
  const bannerDetailsButtonClass = 'px-8 py-4 md:px-10 md:py-5 rounded-xl bg-white/70 dark:bg-white/5 border border-black/15 dark:border-white/10 text-black dark:text-white font-black uppercase tracking-widest transition-all hover:bg-white dark:hover:bg-white/10 backdrop-blur-xl text-sm md:text-base';
  const bannerContactHoverClass = isBlueBanner ? 'hover:text-blue-600 dark:hover:text-blue-400' : 'hover:text-purple-600 dark:hover:text-purple-400';

  return (
    <div className="relative overflow-hidden bg-white dark:bg-black transition-colors duration-300">
      <SEO
        title="InovexaBD | ISP Equipment, Enterprise Networking & Data Center Solutions"
        disableTitleSuffix={true}
        description="Buy ISP equipment, enterprise networking hardware, Dell PowerEdge servers, Cisco switches, Huawei routers, storage systems, fiber optic solutions, and data center infrastructure from InovexaBD Bangladesh."
        keywords="ISP Equipment Bangladesh, Enterprise Networking Bangladesh, Cisco Switch Bangladesh, Huawei Router Bangladesh, Dell PowerEdge Server Bangladesh, Fiber Optic Equipment, Data Center Solutions Bangladesh, Network Infrastructure Bangladesh, Server Hardware Bangladesh"
        url="https://inovexabd.com/"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Inovexa Technologies',
            url: 'https://inovexabd.com/',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://inovexabd.com/shop?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Inovexa Technologies',
            url: 'https://inovexabd.com/',
            logo: 'https://inovexabd.com/inovexabd-logo.png',
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+8801813065665',
              contactType: 'sales',
              email: 'info@inovexabd.com'
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Asadgate, Shyamoli',
              addressLocality: 'Dhaka',
              addressCountry: 'BD'
            }
          }
        ]}
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/20 blur-[130px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="flex flex-col gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm md:text-base">
                  ISP Equipment, Enterprise Networking & Data Center Solutions
                </span>
                <span className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-black dark:text-white font-stylish flex flex-col">
                  <span>Inovexa</span>
                  <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                    Technologies
                  </span>
                </span>
              </h1>
            </div>

            <p className="text-lg md:text-xl text-black/75 dark:text-white/55 leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
              Inovexa Technologies is a modern IT infrastructure and networking solutions company specializing in <Link to="/categories" className="text-blue-600 dark:text-blue-400 hover:underline">enterprise networking</Link>, <Link to="/shop" className="text-blue-600 dark:text-blue-400 hover:underline">server solutions</Link>, ISP equipment, and smart security systems in Bangladesh.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-5"
            >
              <Link
                to="/shop"
                className="group relative px-8 py-4 rounded-full bg-blue-600 text-white font-bold transition-all hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-2">
                  Shop Now <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer" />
              </Link>
              <Link
                to="/categories"
                className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black dark:text-white font-bold hover:bg-black/10 dark:hover:bg-white/10 transition-all backdrop-blur-md"
              >
                Explore Collection
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-black/5 dark:border-white/5"
            >
              {[
                { label: 'NETWORK POWER', value: '100G+' },
                { label: 'TRUSTED PARTNERS', value: '250+' },
                { label: 'CORE TECHNOLOGY', value: '99.9%' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-2xl font-bold text-black dark:text-white tracking-tight">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-black/70 dark:text-white/70 font-bold">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 w-[45%] h-full items-center justify-center pointer-events-none pr-12">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroShowcaseIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", damping: 25, stiffness: 120 }}
                className="relative z-10 w-full flex flex-col items-center"
              >
                <div className="relative group w-[400px]">
                  {/* Shadow/Glow behind product */}
                  <div className={`absolute inset-0 ${showcaseGlowClass} blur-[120px] rounded-full opacity-40 group-hover:opacity-60 transition-opacity`} />
                  
                  <div className="relative flex flex-col items-center text-center">
                    <div className="relative w-full aspect-video flex items-center justify-center mb-8">
                      <img 
                        src={HERO_SHOWCASE[heroShowcaseIndex].image} 
                        alt={HERO_SHOWCASE[heroShowcaseIndex].name} 
                        className={showcaseImageClass}
                        loading="eager"
                        decoding="async"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center gap-3">
                         <span className={`px-2 py-0.5 rounded border text-[10px] font-black uppercase tracking-widest ${showcaseBadgeClass}`}>
                           {HERO_SHOWCASE[heroShowcaseIndex].tag}
                          </span>
                          <div className="flex gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${showcaseDotPrimaryClass} animate-pulse`} />
                          <div className={`w-1.5 h-1.5 rounded-full ${showcaseDotSecondaryClass}`} />
                         </div>
                       </div>
                      <h2 className="text-3xl font-black text-black dark:text-white tracking-tight leading-tight">
                        {HERO_SHOWCASE[heroShowcaseIndex].name}
                      </h2>
                      <p className={`text-xs ${showcaseCategoryClass} font-black uppercase tracking-[0.4em]`}>
                        {HERO_SHOWCASE[heroShowcaseIndex].category}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Full-Screen Promotional Banner Slider */}
      <section className="relative min-h-[100vh] md:h-screen w-full overflow-hidden bg-white dark:bg-black transition-colors duration-300 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBanner}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="relative md:absolute md:inset-0 w-full min-h-screen flex items-center py-20 md:py-0"
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={BANNERS[activeBanner].image} 
                alt={BANNERS[activeBanner].title}
                className="w-full h-full object-cover opacity-40 dark:opacity-30 scale-105"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/45 dark:from-black dark:via-black/80 dark:to-transparent" />
              <div className={`absolute inset-0 ${bannerAccentOverlayClass} mix-blend-multiply dark:mix-blend-overlay`} />
            </div>

            <div className="container mx-auto px-6 h-full flex items-center relative z-10">
              <div className="max-w-4xl space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="space-y-4"
                >
                  <h2 className="text-4xl md:text-7xl font-bold text-black dark:text-white tracking-tighter leading-tight">
                    {BANNERS[activeBanner].title.split(' ').map((word, i) => (
                      <span key={i} className={i >= 2 ? bannerAccentTextClass : ''}>
                        {word}{' '}
                      </span>
                    ))}
                  </h2>
                  <p className="text-xl md:text-2xl text-black/70 dark:text-white/60 font-medium max-w-2xl">
                    {BANNERS[activeBanner].subtitle}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl"
                >
                  {BANNERS[activeBanner].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${bannerAccentDotClass} animate-pulse`} />
                      <span className="text-sm md:text-base text-black/65 dark:text-white/45 tracking-wider uppercase font-bold">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <a 
                      href="https://wa.me/8801813065665"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${bannerOrderButtonBaseClass} ${bannerAccentButtonClass}`}
                    >
                      Order Now
                    </a>
                    <Link 
                      to={`/product/${BANNERS[activeBanner].id}`}
                      className={bannerDetailsButtonClass}
                    >
                      More Details
                    </Link>
                  </div>
                  <div className="flex flex-col border-l border-black/15 dark:border-white/10 pl-6 sm:border-l-0 sm:pl-0 lg:border-l lg:pl-6">
                    <span className="text-[10px] text-black/45 dark:text-white/30 font-bold uppercase tracking-[0.2em] mb-1">Enquire Now</span>
                    <a href="tel:+8801813065665" className={`text-lg md:text-xl font-bold text-black dark:text-white transition-colors ${bannerContactHoverClass}`}>
                      +8801813065665
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={prevBanner}
          aria-label="Previous banner"
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center rounded-full bg-white/70 dark:bg-white/5 border border-black/15 dark:border-white/10 text-black dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all backdrop-blur-md opacity-0 hover:opacity-100 group-hover:opacity-100"
        >
          <ChevronLeft size={32} />
        </button>
        <button 
          onClick={nextBanner}
          aria-label="Next banner"
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 flex items-center justify-center rounded-full bg-white/70 dark:bg-white/5 border border-black/15 dark:border-white/10 text-black dark:text-white hover:bg-white dark:hover:bg-white/10 transition-all backdrop-blur-md opacity-0 hover:opacity-100 group-hover:opacity-100"
        >
          <ChevronRight size={32} />
        </button>

        {/* Progress Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveBanner(i)}
              aria-label={`Go to banner ${i + 1}`}
              aria-current={activeBanner === i ? 'true' : undefined}
              className="w-11 h-11 flex items-center justify-center focus:outline-none"
            >
              <div className={`h-1 rounded-full transition-all duration-500 ${activeBanner === i ? `w-20 ${bannerAccentDotClass}` : 'w-8 bg-black/20 dark:bg-white/20'}`} />
            </button>
          ))}
        </div>
      </section>

      {/* Featured Hardware - SLIDER VERSION */}
      <section 
        className="py-24 relative overflow-hidden"
        onMouseEnter={() => setIsSliderPaused(true)}
        onMouseLeave={() => setIsSliderPaused(false)}
      >
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-16">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Featured Hardware</h2>
                <p className="text-black/70 dark:text-white/60 max-w-lg">Engineered for performance. Built for scale. Discover our most popular enterprise solutions.</p>
              </div>
              <Link to="/shop" className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-bold hover:text-blue-800 dark:hover:text-blue-300 transition-colors uppercase tracking-widest text-xs">
                Browse Full Catalog <ChevronRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <motion.div 
                className="flex gap-6"
                animate={{ x: `calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (1.5 / itemsPerView)}rem)` }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {featuredProducts.map((product, index) => (
                  <div key={`${(product as any)._id || product.id}-${index}`} className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.125rem)] shrink-0">
                    <ProductCard 
                      product={product} 
                      index={index % 4} 
                      onQuickViewChange={(isOpen) => setIsQuickViewActive(isOpen)}
                    />
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center gap-1 mt-8">
              {Array.from({ length: featuredProducts.length - (itemsPerView - 1) }).map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className="w-11 h-11 flex items-center justify-center focus:outline-none"
                >
                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${currentIndex === i ? 'bg-blue-600 dark:bg-blue-500 w-4' : 'bg-black/20 dark:bg-white/20'}`} />
                </button>
              ))}
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <GlassContainer className="p-12 md:p-24 bg-blue-600/5 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-tight">Ready to Upgrade Your <br />Infrastructure?</h2>
              <p className="text-black/70 dark:text-white/60 text-lg">
                Join hundreds of enterprises trust Inovexa Technologies for their mission-critical networking and server requirements.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link to="/contact" className="px-10 py-5 rounded-full bg-white text-black font-bold hover:bg-blue-600 hover:text-white transition-all">
                  Contact Sales Specialist
                </Link>
                <Link to="/contact" className="px-10 py-5 rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                  About Inovexa
                </Link>
              </div>
            </div>
          </GlassContainer>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-black/5 dark:bg-black/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'Enterprise Security', desc: 'Pre-vetted hardware and robust smart security systems for your enterprise protection.' },
              { icon: Cpu, title: 'High Performance', desc: 'Latest generation components optimized for maximum throughput and reliability.' },
              { icon: Globe, title: 'Global Delivery', desc: 'Efficient logistics network ensuring your hardware arrives safely, anywhere in the world.' },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className="space-y-3">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-blue-600 dark:text-blue-500">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-black dark:text-white tracking-tight">{feature.title}</h3>
                  <p className="text-black/60 dark:text-white/50 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

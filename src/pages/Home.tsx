import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Zap, Shield, Cpu, Globe, Server, ChevronLeft, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES, Product, PRODUCTS } from '@/src/data/products.ts';
import { ProductCard } from '@/src/components/common/ProductCard.tsx';
import { GlassContainer } from '@/src/components/common/GlassContainer.tsx';
import { SEO } from '@/src/components/common/SEO.tsx';
import { useState, useEffect, useMemo, useRef } from 'react';

// Hero Image Static Paths
const dellServerHero = '/Hero-images/dell-server-hero.webp';
const dellServerHeroSmall = '/Hero-images/dell-server-hero-small.webp';
const ciscoHero = '/Hero-images/cisco-hero.webp';
const ciscoHeroSmall = '/Hero-images/cisco-hero-small.webp';
const intelSsdHero = '/Hero-images/intel-ssd-hero.webp';
const intelSsdHeroSmall = '/Hero-images/intel-ssd-hero-small.webp';
const juniperHero = '/Hero-images/juniper-hero.webp';
const juniperHeroSmall = '/Hero-images/juniper-hero-small.webp';

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
    imageSmall: dellServerHeroSmall,
    color: 'purple'
  },
  {
    id: 'switch-cisco',
    name: 'Cisco Nexus Switch',
    category: 'Data Center Switch',
    tag: 'ULTRA LOW LATENCY',
    image: ciscoHero,
    imageSmall: ciscoHeroSmall,
    color: 'blue'
  },
  {
    id: 'ssd',
    name: 'Intel Enterprise SSD',
    category: 'Data Center Storage',
    tag: 'EXTREME RELIABILITY',
    image: intelSsdHero,
    imageSmall: intelSsdHeroSmall,
    color: 'blue'
  },
  {
    id: 'switch-juniper',
    name: 'Juniper Networks',
    category: 'Enterprise Router',
    tag: 'HIGH PERFORMANCE',
    image: juniperHero,
    imageSmall: juniperHeroSmall,
    color: 'purple'
  }
] as const;



const POPULAR_SEARCHES = ['Nexus Switch', 'PowerEdge Server', 'SFP28 Lan Card', 'Enterprise SSD', 'Fiber Patch Cord'];

const SCOPES = [
  'ISP & Fiber Equipment',
  'Enterprise Networking',
  'Data Center Solutions',
  'Server Hardware'
];

// Vector Logos for trusted technology partners
const CiscoLogo = () => (
  <svg className="h-7 w-auto fill-current text-zinc-500 hover:text-[#049FD9] transition-colors duration-300" viewBox="0 0 115 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24v-6.5h2v6.5h-2zm5.5 0v-9h2v9h-2zm5.5 0v-11.5h2V24h-2zm5.5 0V7.5h2V24h-2zm5.5 0v-11.5h2V24h-2zm5.5 0v-9h2v9h-2zm5.5 0v-6.5h2v6.5h-2z" />
    <text x="50" y="22" className="font-extrabold tracking-wide" fontSize="16" fontFamily="sans-serif">CISCO</text>
  </svg>
);

const MikrotikLogo = () => (
  <svg className="h-7 w-auto fill-current text-zinc-500 hover:text-[#E2231A] transition-colors duration-300" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="8" width="16" height="16" rx="2" fill="currentColor" />
    <path d="M4 14l3 3 5-5" stroke="#121212" strokeWidth="2.5" fill="none" />
    <text x="24" y="22" className="font-black tracking-normal" fontSize="16" fontFamily="sans-serif">mikrotik</text>
  </svg>
);

const UbiquitiLogo = () => (
  <svg className="h-7 w-auto fill-current text-zinc-500 hover:text-[#0594D0] transition-colors duration-300" viewBox="0 0 140 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 13c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z" />
    <path d="M12 9c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" />
    <text x="28" y="22" className="font-black tracking-widest" fontSize="15" fontFamily="sans-serif">UBIQUITI</text>
  </svg>
);

const TplinkLogo = () => (
  <svg className="h-6 w-auto fill-current text-zinc-500 hover:text-[#4ACBD6] transition-colors duration-300" viewBox="0 0 130 32" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="16" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path d="M12 11v10M7 16h10" stroke="currentColor" strokeWidth="2.5" />
    <text x="28" y="22" className="font-bold tracking-tighter" fontSize="18" fontFamily="sans-serif">tp-link</text>
  </svg>
);

const IntelLogo = () => (
  <svg className="h-7 w-auto fill-current text-zinc-500 hover:text-[#0071C5] transition-colors duration-300" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="23" className="font-bold tracking-tighter italic" fontSize="24" fontFamily="sans-serif">intel</text>
    <path d="M6 6c10-5 30-5 40 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M8 26c10 5 30 5 40 0" stroke="currentColor" strokeWidth="1.5" fill="none" />
  </svg>
);

const DellLogo = () => (
  <svg className="h-7 w-auto text-zinc-500 hover:text-[#007DB8] transition-colors duration-300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0c-8.01 0-15.264-3.249-20.516-8.505a28.9 28.9 0 0 1-8.501-20.516 28.9 28.9 0 0 1 8.501-20.507C-15.264-54.777-8.01-58.032 0-58.032c8.012 0 15.27 3.255 20.514 8.504a28.9 28.9 0 0 1 8.492 20.507c0 8.014-3.24 15.272-8.492 20.516A28.9 28.9 0 0 1 0 0m0 3.516c17.965 0 32.531-14.568 32.531-32.537C32.531-46.984 17.965-61.55 0-61.55c-17.963 0-32.535 14.566-32.535 32.529C-32.535-11.052-17.963 3.516 0 3.516" fill="currentColor" transform="matrix(4.57996 0 0 -4.57996 150.01 17.103)"/>
    <path d="M0 0c0 1.896-1.258 2.973-3.039 2.973h-1.09v-5.948h1.059C-1.414-2.975 0-2.075 0 0m19.389-2.14-8.03-6.323L4.02-2.685C2.961-5.229.402-6.996-2.545-6.996h-6.281V6.996h6.281c3.293 0 5.666-2.094 6.563-4.325l7.341 5.772 2.719-2.14L7.35 1.015 8.643.003l6.726 5.285 2.723-2.134-6.727-5.294 1.291-1.014 6.733 5.295v4.855h4.881v-9.908h4.869v-4.101h-9.75zm15.933-.774h4.867v-4.099h-9.753V6.996h4.886z" fill="currentColor" transform="matrix(4.57996 0 0 -4.57996 79.539 148.804)"/>
  </svg>
);

const SupermicroLogo = () => (
  <svg className="h-6 w-auto transition-colors duration-300 group" viewBox="0 0 231.7 122.9" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="118.9" cy="56.2" rx="100.8" ry="50.5" className="fill-zinc-50 dark:fill-[#030303] group-hover:fill-white transition-colors duration-300" transform="matrix(.9961 -.08771 .08771 .9961 -4.472 10.65)"/>
    <path d="M220.2 45.9c3.9 31.4-42.3 62.9-103.2 70.4S4.1 104.4.2 73s42-62.9 102.9-70.4 113.3 11.9 117.1 43.3m-105.7-40C59 10.8 16 37.3 18.5 65.1s49.4 46.4 104.9 41.5 98.5-31.4 96-59.2C216.9 19.5 170 1 114.5 5.9" className="fill-zinc-500 group-hover:fill-[#00953b] transition-colors duration-300"/>
    <circle cx="218.9" cy="61.6" r="11.6" className="fill-zinc-500 group-hover:fill-[#d7282f] transition-colors duration-300"/>
    <path d="M215.5 19.9c.5 0 .9.1 1.4.4.4.2.8.6 1 1 .3.5.4.9.4 1.4s-.1 1-.4 1.4c-.2.4-.6.8-1 1s-.9.4-1.4.4-1-.1-1.4-.4c-.4-.2-.8-.6-1-1s-.4-.9-.4-1.4.1-1 .4-1.4.6-.8 1.1-1c.4-.3.9-.4 1.3-.4m0 .2c-.4 0-.8.1-1.3.3s-.7.5-1 .9c-.2.4-.3.8-.3 1.3 0 .4.1.9.3 1.3q.3.6.9.9c.4.2.8.3 1.3.3.4 0 .9-.1 1.3-.3q.6-.3.9-.9c.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3s-.5-.7-1-.9-.6-.3-1.1-.3m-1.5.8h1.5q.6 0 .9.3c.3.3.3.4.3.6s-.1.4-.2.5c-.1.2-.4.3-.7.3l.8 1.2.3.3c.1 0 .1.1.2.1v.1h-.7l-1.2-1.6h-.3V24c0 .1.1.2.1.2.1 0 .2.1.4.1v.1h-1.5v-.1h.3c.1 0 .1-.1.1-.1v-2.8c0-.1-.1-.1-.1-.1h-.3v-.4zm.9 1.7c.3 0 .5 0 .7-.1.1-.1.3-.1.3-.3.1-.1.1-.2.1-.4s-.1-.4-.2-.5-.3-.2-.6-.2c-.1 0-.2 0-.3.1z" className="fill-zinc-500 group-hover:fill-[#003a70] dark:group-hover:fill-zinc-400 transition-colors duration-300"/>
    <g className="fill-zinc-500 group-hover:fill-[#003a70] dark:group-hover:fill-white transition-colors duration-300">
      <path d="M59.3 51.8h.4c1.3.1 1.9.5 2.1.7s.5.9.5 3v8.4c0 2-.2 3.5-.7 4.4-.8 1.6-2.4 2.4-4.9 2.4-2.2 0-3.7-.8-4.5-2.3-.4-.9-.6-2.1-.6-3.8V54.2c0-1.4.3-1.8.4-1.9.2-.1.7-.4 2.1-.5h.4v-1.5H44.4v1.5h.4c1.5.1 1.9.4 2.1.5.1.1.4.5.4 1.9v10.1c0 2.1.4 3.8 1.1 5.1 1.4 2.4 3.9 3.7 7.6 3.7s6.3-1.2 7.6-3.7c.7-1.3 1.1-3.2 1.1-5.5v-8.4c0-2.1.3-2.7.5-2.9.2-.3.7-.6 2.1-.7h.4v-1.5h-8.5v1.4zm-21 5.4L34.8 55c-1.3-.8-2.2-1.5-2.8-2.2-.6-.6-.8-1.4-.8-2.3 0-1 .3-1.8 1-2.3.7-.6 1.6-.9 2.6-.9 1.3 0 2.6.5 4 1.4 1.3.9 2.3 2.7 2.9 5.1l.1.4h1.9l-1-9.4H41v.3c-.1.4-.2.6-.4.8-.1.1-.3.2-.6.2 0 0-.4-.1-2.1-.6-1.3-.5-2.5-.7-3.4-.7q-3.45 0-5.7 2.1-2.1 2.1-2.1 5.4 0 2.4 1.8 4.5c.6.7 1.5 1.4 2.5 2.1l3.4 2.1c1.9 1.2 3.2 2.1 3.8 2.7.9.9 1.3 1.9 1.3 3.1q0 1.95-1.2 3c-.8.7-1.8 1.1-3 1.1-2.2 0-4-.9-5.5-2.6-.9-1-1.6-2.4-2.3-4.1l-.1-.3h-1.8l1.3 9.5h1.7l.1-.4c0-.3.1-.5.3-.8.1-.1.3-.2.5-.2 0 0 .4 0 2.2.7 1.4.5 2.8.7 4 .7 2.6 0 4.7-.8 6.4-2.2 1.7-1.5 2.5-3.4 2.5-5.6 0-1.7-.5-3.1-1.4-4.3-1.1-1.5-2.6-2.8-4.9-4.1m38.1 6.1h1.4c2.5 0 4.6-.5 6.3-1.6 1.8-1.1 2.6-2.8 2.6-5.2 0-1.9-.8-3.4-2.4-4.6-1.5-1.1-3.7-1.7-6.6-1.7h-9v1.5h.4c1.4.1 1.8.4 1.9.5s.4.6.4 1.9v14c0 1.6-.2 2.1-.3 2.3-.1.1-.5.4-2 .6h-.4v1.5h10V71h-.4c-1.6-.1-2.1-.4-2.2-.5s-.4-.5-.4-1.9v-5.4c.2 0 .4.1.7.1M75.7 53c0-.4.1-.5.1-.5s.2-.1.9-.1q1.95 0 3.3.6c1.5.7 2.3 1.9 2.3 3.6q0 2.85-2.1 3.9-1.2.6-3.3.6h-.5c-.1 0-.4 0-.7-.1z"/>
      <path d="m103.2 66.2-.1.3c-.8 1.7-1.6 2.8-2.6 3.2s-2.5.7-4.7.7c-2.6 0-3.3-.1-3.5-.2-.1 0-.3-.1-.3-.7V62h4.5c1.6 0 2.1.3 2.3.5s.5.8.8 2.3l.1.4h1.6v-8.4h-1.6l-.1.4c-.3 1.4-.6 2-.8 2.2s-.7.5-2.3.5H92V53c0-.4.1-.5 0-.5 0 0 .2-.1.5-.1h4.4c2.3 0 3.1.3 3.4.5s.7.9 1.1 2.5l.1.4h1.7l-.1-5.6H85v1.5h.4c1.4.1 1.9.4 2.1.5s.4.6.4 1.9v14.4c0 1.5-.3 1.8-.4 1.9-.2.1-.6.4-2.1.5h-.4v1.5h18.4L105 66h-1.8z"/>
      <path d="M124.2 70.7c-.4-.2-.7-.5-1.1-1l-6.2-7.6c1.5-.3 2.8-.9 3.7-1.7 1.2-1 1.8-2.3 1.8-4.1q0-3.9-3.9-5.4c-1.3-.5-2.9-.7-4.8-.7h-9.5v1.5h.4c1.4.1 1.8.4 2 .5.1.1.4.6.4 1.9v14c0 1.7-.2 2.1-.3 2.3-.1.1-.5.4-2 .6h-.4v1.5h10V71h-.4c-1.5-.1-1.9-.4-2.1-.5-.1-.1-.4-.5-.4-1.9v-5.9h.7l8.1 10h5.9v-1.5h-.4c-.6-.2-1.1-.3-1.5-.5m-12.9-10.2V53c0-.4.1-.5.1-.5s.3-.1 1.4-.1c1.3 0 2.3.2 3.1.5 1.4.6 2 1.7 2 3.4s-.7 2.9-2.3 3.5c-.8.4-2.3.7-4.3.7m30.1 5.2-7.1-15.5h-7.2v1.5h.5c1.6.1 2.1.4 2.2.5.2.1.4.6.4 1.9v13.2c0 2.1-.3 2.7-.5 3-.2.2-.7.6-2.3.7h-.4v1.5h8.6V71h-.4c-1.4-.1-1.8-.4-2-.6-.3-.3-.6-1.1-.6-3.1V56.7l7.4 16h1.1l7.5-16.7v12.3c0 1.7-.3 2.2-.4 2.3s-.5.4-2.1.5h-.4v1.5h10v-1.5h-.4c-1.4-.1-1.9-.4-2-.5s-.4-.5-.4-1.9V54.2c0-1.3.2-1.8.4-1.9.1-.1.6-.4 2-.5h.4v-1.5h-7.2zm23 4.9c-.1-.1-.4-.4-.4-1.9V54.2c0-1.4.3-1.8.4-1.9.2-.2.7-.4 2.3-.5h.5v-1.5h-10.5v1.5h.5c1.6.1 2.1.3 2.3.5.1.1.4.5.4 1.9v14.4c0 1.5-.3 1.9-.4 1.9-.2.1-.7.4-2.3.5h-.4v1.5h10.5V71h-.4c-1.8 0-2.4-.3-2.5-.4"/>
      <path d="M184.3 67.6c-.9.9-1.8 1.6-2.6 2-1.3.8-2.8 1.1-4.4 1.1q-3.3 0-5.4-2.4c-1.4-1.6-2.2-3.8-2.2-6.6 0-3 .7-5.4 2.1-7.1s3.1-2.5 5.2-2.5 3.7.8 5 2.3c.7.8 1.2 2 1.6 3.3l.1.3h1.6l-.3-8.2h-1.5l-.1.3c-.1.2-.2.4-.4.5s-.4.2-.6.2c-.1 0-.4-.1-2-.5-1.3-.4-2.5-.5-3.7-.5-3.5 0-6.4 1.2-8.5 3.5-2.1 2.2-3.1 5-3.1 8.3 0 3.2 1 5.9 3 8 2.1 2.3 5 3.5 8.6 3.5 2.2 0 4.3-.6 6.2-1.8 1.1-.7 2-1.6 2.8-2.5l.3-.3-1.2-1.2zm23 3.5c-.6-.1-1-.2-1.4-.4s-.7-.5-1.1-1l-6.2-7.6c1.5-.3 2.8-.9 3.7-1.7 1.2-1 1.8-2.3 1.8-4.1q0-3.9-3.9-5.4c-1.3-.5-2.9-.7-4.8-.7H186v1.5h.4c1.4.1 1.8.4 2 .5.1.1.4.6.4 1.9v14c0 1.7-.2 2.1-.3 2.3-.1.1-.5.4-2 .6h-.4v1.5h10V71h-.4c-1.5-.1-1.9-.4-2.1-.5-.1-.1-.4-.5-.4-1.9v-5.9h.7l8.1 10h5.9v-1.5zM193 60.5V53c0-.4.1-.5.1-.5s.3-.1 1.4-.1c1.3 0 2.3.2 3.1.5 1.4.6 2 1.7 2 3.4s-.7 2.9-2.3 3.5c-.8.4-2.3.7-4.3.7"/>
    </g>
  </svg>
);

const HpeLogo = () => (
  <svg className="h-6 w-auto fill-current text-zinc-500 hover:text-[#00B060] transition-colors duration-300" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="6" width="30" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <text x="38" y="22" className="font-black tracking-wide" fontSize="16" fontFamily="sans-serif">HPE</text>
  </svg>
);

const JuniperLogo = () => (
  <svg className="h-6 w-auto fill-current text-zinc-500 hover:text-[#C8102E] transition-colors duration-300" viewBox="0 0 130 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4 L22 24 L2 24 Z" fill="currentColor" />
    <text x="32" y="22" className="font-black tracking-widest" fontSize="16" fontFamily="sans-serif">JUNIPER</text>
  </svg>
);

const HuaweiLogo = () => (
  <svg className="h-6 w-auto fill-current text-zinc-500 hover:text-[#ED1C24] transition-colors duration-300" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 6 C10 6 6 10 6 16 C6 22 10 26 16 26" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <text x="32" y="22" className="font-bold tracking-widest" fontSize="14" fontFamily="sans-serif">HUAWEI</text>
  </svg>
);

interface CategorySliderProps {
  title: string;
  description: string;
  products: Product[];
  itemsPerView: number;
  gapRem: number;
  onQuickViewChange: (isOpen: boolean) => void;
  isQuickViewActive: boolean;
}

function CategorySlider({
  title,
  description,
  products,
  itemsPerView,
  gapRem,
  onQuickViewChange,
  isQuickViewActive,
}: CategorySliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageHeight, setImageHeight] = useState<number>(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateImageHeight = () => {
      if (sliderRef.current) {
        const imgContainer = sliderRef.current.querySelector('.aspect-square');
        if (imgContainer) {
          setImageHeight(imgContainer.clientHeight);
        }
      }
    };

    updateImageHeight();

    let resizeObserver: ResizeObserver | null = null;
    if (sliderRef.current && typeof ResizeObserver !== 'undefined') {
      const imgContainer = sliderRef.current.querySelector('.aspect-square');
      if (imgContainer) {
        resizeObserver = new ResizeObserver(() => {
          updateImageHeight();
        });
        resizeObserver.observe(imgContainer);
      }
    }

    window.addEventListener('resize', updateImageHeight);
    const timer = setTimeout(updateImageHeight, 100);

    return () => {
      window.removeEventListener('resize', updateImageHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      clearTimeout(timer);
    };
  }, [products, itemsPerView]);

  useEffect(() => {
    if (isSliderPaused || isQuickViewActive) return;
    const maxIndex = Math.max(0, products.length - itemsPerView);
    if (maxIndex === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [products.length, isSliderPaused, isQuickViewActive, itemsPerView]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      setCurrentIndex((prev) => Math.min(prev + 1, Math.max(0, products.length - itemsPerView)));
    } else if (distance < -minSwipeDistance) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handlePrev = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView);
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  const handleNext = () => {
    const maxIndex = Math.max(0, products.length - itemsPerView);
    if (maxIndex === 0) return;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const showArrows = products.length > itemsPerView;

  return (
    <div 
      className="mb-16 last:mb-0"
      onMouseEnter={() => setIsSliderPaused(true)}
      onMouseLeave={() => setIsSliderPaused(false)}
    >
      <div className="mb-6 flex flex-col items-center text-center">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-black dark:text-white mb-2">{title}</h3>
        <p className="text-sm text-black/60 dark:text-white/60 max-w-xl text-center">{description}</p>
      </div>

      <div className="relative px-4 sm:px-12" ref={sliderRef}>
        <div 
          className="relative overflow-hidden touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div 
            className={`flex gap-4 sm:gap-6 ${products.length < itemsPerView ? 'justify-center w-full' : ''}`}
            animate={{ x: `calc(-${currentIndex * (100 / itemsPerView)}% - ${currentIndex * (gapRem / itemsPerView)}rem)` }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            {products.map((product, index) => (
              <div key={`${(product as any)._id || product.id}-${index}`} className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)] shrink-0">
                <ProductCard 
                  product={product} 
                  index={index % 4} 
                  onQuickViewChange={onQuickViewChange}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {showArrows && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous products"
              className="absolute left-0 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/95 dark:bg-black/95 border border-black/10 dark:border-white/10 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none cursor-pointer -translate-y-1/2"
              style={{ top: imageHeight ? `${imageHeight / 2}px` : '50%' }}
            >
              <ChevronLeft size={18} className="sm:hidden" />
              <ChevronLeft size={20} className="hidden sm:block" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next products"
              className="absolute right-0 z-10 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/95 dark:bg-black/95 border border-black/10 dark:border-white/10 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none cursor-pointer -translate-y-1/2"
              style={{ top: imageHeight ? `${imageHeight / 2}px` : '50%' }}
            >
              <ChevronRight size={18} className="sm:hidden" />
              <ChevronRight size={20} className="hidden sm:block" />
            </button>
          </>
        )}
      </div>

      <div className="flex justify-center gap-1 mt-6">
        {Array.from({ length: Math.max(0, products.length - (itemsPerView - 1)) }).map((_, i) => (
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
  );
}

export function Home() {
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  
  const serverProducts = useMemo(() => {
    const categoryProducts = products.filter(p => p.category === 'servers');
    const featured = categoryProducts.filter(p => p.isFeatured || (p as any).featured);
    const nonFeatured = categoryProducts.filter(p => !p.isFeatured && !(p as any).featured);
    return [...featured, ...nonFeatured].slice(0, 5);
  }, [products]);

  const networkingProducts = useMemo(() => {
    const categoryProducts = products.filter(p => p.category === 'networking');
    const featured = categoryProducts.filter(p => p.isFeatured || (p as any).featured);
    const nonFeatured = categoryProducts.filter(p => !p.isFeatured && !(p as any).featured);
    return [...featured, ...nonFeatured].slice(0, 5);
  }, [products]);

  const storageProducts = useMemo(() => {
    const categoryProducts = products.filter(p => p.category === 'storage');
    const featured = categoryProducts.filter(p => p.isFeatured || (p as any).featured);
    const nonFeatured = categoryProducts.filter(p => !p.isFeatured && !(p as any).featured);
    return [...featured, ...nonFeatured].slice(0, 5);
  }, [products]);

  const categoryDescriptions = {
    servers: 'High-performance rack-mountable servers and hardware optimized for enterprise workloads, database management, and cloud virtualization.',
    networking: 'Carrier-grade switches, edge routers, transceivers, and optical patch cords designed for ISP networks and data center connectivity.',
    storage: 'Enterprise solid-state drives, hard disk drives, and components offering extreme endurance and speed for data warehousing.'
  };

  const [activeBanner, setActiveBanner] = useState(0);
  const [heroShowcaseIndex, setHeroShowcaseIndex] = useState(0);
  const [scopeIndex, setScopeIndex] = useState(0);
  const [isQuickViewActive, setIsQuickViewActive] = useState(false);

  // Rotating scope text index (every 3s)
  useEffect(() => {
    const interval = setInterval(() => {
      setScopeIndex((prev) => (prev + 1) % SCOPES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [gapRem, setGapRem] = useState(1.5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(2);
        setGapRem(1.0);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
        setGapRem(1.5);
      } else {
        setItemsPerView(4);
        setGapRem(1.5);
      }
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
    <div className="relative overflow-hidden bg-white dark:bg-black">
      <h1 className="sr-only">InovexaBD | ISP Equipment, Enterprise Networking & Data Center Solutions</h1>
      <SEO
        title="InovexaBD | ISP Equipment, Enterprise Networking & Data Center Solutions"
        disableTitleSuffix={true}
        description="Buy ISP equipment, enterprise networking hardware, Dell PowerEdge servers, Cisco switches, Huawei routers, storage systems, fiber optic solutions, and data center infrastructure from InovexaBD Bangladesh."
        keywords="ISP Equipment Bangladesh, Enterprise Networking Bangladesh, Cisco Switch Bangladesh, Huawei Router Bangladesh, Dell PowerEdge Server Bangladesh, Fiber Optic Equipment, Data Center Solutions Bangladesh, Network Infrastructure Bangladesh, Server Hardware Bangladesh"
        url="https://www.inovexabd.com/"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Inovexa Technologies',
            url: 'https://www.inovexabd.com/',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://www.inovexabd.com/shop?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Inovexa Technologies',
            url: 'https://www.inovexabd.com/',
            logo: 'https://www.inovexabd.com/inovexabd-logo.png',
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
      <section className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-28 pb-0 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/15 blur-[130px] rounded-full animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-cyan-600/10 dark:bg-cyan-600/10 blur-[150px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow py-8 md:py-12">
          
          {/* Left Column: Solution and CTAs */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              

              
              {/* Solution-Focused Heading with text rotators */}
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-black dark:text-white font-sans">
                Bangladesh's Source for
                <div className="h-[1.2em] sm:h-[1.15em] relative overflow-hidden block mt-2 text-blue-600 dark:text-blue-400">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={scopeIndex}
                      initial={{ y: 25, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -25, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 220, damping: 20 }}
                      className="absolute inset-x-0 block whitespace-nowrap truncate"
                    >
                      {SCOPES[scopeIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h2>
            </div>

            {/* B2B-oriented Sub-headline */}
            <p className="text-base sm:text-lg text-black/70 dark:text-white/60 leading-relaxed max-w-2xl font-light">
              Inovexa Technologies is a modern IT infrastructure and networking solutions company specializing in{' '}
              <Link to="/shop?category=networking" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                enterprise networking
              </Link>
              ,{' '}
              <Link to="/shop?category=servers" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                server solutions
              </Link>
              , ISP equipment, and smart security systems in Bangladesh.
            </p>

            {/* B2B CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/shop"
                className="group relative px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all hover:shadow-[0_0_30px_rgba(37,99,235,0.35)] overflow-hidden flex items-center gap-2"
              >
                <span>Shop Now</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-shimmer" />
              </Link>
              <a
                href="https://wa.me/8801813065665"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-black dark:text-white font-bold transition-all border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 cursor-pointer"
              >
                <span>Get a Quote</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dynamic Spec-Badge Product Showcase (25% larger container) */}
          <div className="lg:col-span-5 flex items-center justify-center relative min-h-[480px] lg:min-h-[580px]">
            
            {/* Animated Network Lines and Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M -20,120 C 80,40 180,240 320,120" 
                fill="none" 
                stroke="url(#grad-blue)" 
                strokeWidth="2" 
                strokeDasharray="6 6"
                className="opacity-25 dark:opacity-15"
              />
              <path 
                d="M 50,420 C 180,330 250,490 420,380" 
                fill="none" 
                stroke="url(#grad-purple)" 
                strokeWidth="2" 
                strokeDasharray="6 6"
                className="opacity-25 dark:opacity-15"
              />
              <path 
                d="M -10,280 L 450,330" 
                fill="none" 
                stroke="url(#grad-cyan)" 
                strokeWidth="1.5" 
                strokeDasharray="5 5"
                className="opacity-20 dark:opacity-10"
              />

              <defs>
                <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="grad-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
                </linearGradient>
                <linearGradient id="grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
                </linearGradient>
              </defs>

              <circle cx="80" cy="88" r="4.5" className="fill-blue-500/50 animate-pulse-node" />
              <circle cx="320" cy="120" r="5" className="fill-blue-600/60 animate-pulse-node" />
              <circle cx="120" cy="370" r="4.5" className="fill-purple-500/50 animate-pulse-node" />
              <circle cx="420" cy="380" r="5.5" className="fill-purple-600/60 animate-pulse-node" />
              <circle cx="40" cy="285" r="3.5" className="fill-cyan-500/40 animate-pulse-node" />
              <circle cx="380" cy="320" r="4" className="fill-cyan-600/50 animate-pulse-node" />
            </svg>

            {/* Subtle Floating Networking Equipment Icons */}
            <div className="absolute top-[5%] left-[2%] z-10 pointer-events-none animate-float opacity-30 dark:opacity-20">
              <Server size={32} className="text-blue-500 dark:text-blue-400" />
            </div>
            <div className="absolute bottom-[8%] right-[5%] z-10 pointer-events-none animate-float-delayed opacity-30 dark:opacity-20">
              <Cpu size={28} className="text-purple-500 dark:text-purple-400" />
            </div>
            <div className="absolute top-[35%] right-[-8%] z-10 pointer-events-none animate-float opacity-25 dark:opacity-15">
              <Globe size={30} className="text-cyan-500 dark:text-cyan-400" />
            </div>

            <div className="relative w-full max-w-xl aspect-square flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={heroShowcaseIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative z-10 w-full flex flex-col items-center"
                >
                  <div className="relative group w-[370px] sm:w-[490px]">
                    
                    {/* Tech Grid Background Graphics Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.06)_1px,transparent_1px)] bg-[size:24px_24px] rounded-full pointer-events-none -z-10" />
                    
                    {/* Glowing color disc behind item */}
                    <div className={`absolute inset-0 ${showcaseGlowClass} blur-[120px] rounded-full opacity-50 group-hover:opacity-75 transition-opacity`} />
                    
                    <div className="relative flex flex-col items-center text-center">
                      
                      {/* Product Image Frame */}
                      <div className="relative w-full aspect-video flex items-center justify-center mb-8 px-4">
                        <img 
                          src={HERO_SHOWCASE[heroShowcaseIndex].imageSmall} 
                          srcSet={`${HERO_SHOWCASE[heroShowcaseIndex].imageSmall} 400w, ${HERO_SHOWCASE[heroShowcaseIndex].image} 800w`}
                          sizes="(max-width: 640px) 100vw, 490px"
                          alt={HERO_SHOWCASE[heroShowcaseIndex].name} 
                          width={490}
                          height={327}
                          className={showcaseImageClass}
                          loading="eager"
                          decoding="async"
                          fetchPriority="high"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Info & Micro-navigation dots */}
                      <div className="space-y-2 relative z-10">
                        <div className="flex items-center justify-center gap-3">
                           <span className={`px-2 py-0.5 rounded border text-[9px] font-bold uppercase tracking-widest ${showcaseBadgeClass}`}>
                             {HERO_SHOWCASE[heroShowcaseIndex].tag}
                            </span>
                            <div className="flex gap-1.5">
                              {HERO_SHOWCASE.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setHeroShowcaseIndex(i)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all focus:outline-none cursor-pointer ${heroShowcaseIndex === i ? `${showcaseDotPrimaryClass} w-3` : showcaseDotSecondaryClass}`}
                                  aria-label={`Go to showcase ${i + 1}`}
                               />
                              ))}
                           </div>
                         </div>
                        <h3 className="text-2xl sm:text-3xl font-black text-black dark:text-white tracking-tight leading-tight">
                          {HERO_SHOWCASE[heroShowcaseIndex].name}
                        </h3>
                        <p className={`text-[10px] ${showcaseCategoryClass} font-bold uppercase tracking-[0.4em]`}>
                          {HERO_SHOWCASE[heroShowcaseIndex].category}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
            </div>
          </div>

        </div>

        {/* Trusted Technology Partners Logos (Brand Trust Signals) - Scrolling Marquee style matching screenshot */}
        <div className="w-full py-6 bg-white/15 dark:bg-white/5 border-t border-b border-white/20 dark:border-white/10 overflow-hidden z-20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="relative w-full overflow-hidden">
              {/* Fade overlays on sides */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white/15 dark:from-white/5 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white/15 dark:from-white/5 to-transparent z-10 pointer-events-none" />
              
              <div className="flex w-full overflow-hidden">
                <div className="animate-marquee flex items-center gap-16 whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity duration-500 dark:opacity-70 dark:hover:opacity-100">
                  <CiscoLogo />
                  <MikrotikLogo />
                  <UbiquitiLogo />
                  <JuniperLogo />
                  <HuaweiLogo />
                  <DellLogo />
                  <IntelLogo />
                  <HpeLogo />
                  <SupermicroLogo />
                  <TplinkLogo />
                  
                  {/* Duplicate list to allow seamless loop */}
                  <CiscoLogo />
                  <MikrotikLogo />
                  <UbiquitiLogo />
                  <JuniperLogo />
                  <HuaweiLogo />
                  <DellLogo />
                  <IntelLogo />
                  <HpeLogo />
                  <SupermicroLogo />
                  <TplinkLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Promotional Banner Slider */}
      <section className="relative min-h-[100vh] md:h-screen w-full overflow-hidden bg-white dark:bg-black flex items-center">
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
                width={1920}
                height={1080}
                className="w-full h-full object-cover opacity-65 dark:opacity-30 scale-105"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/30 dark:from-black dark:via-black/80 dark:to-transparent" />
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

      {/* Featured Hardware - STACKED CATEGORIES VERSION */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />
         <div className="container mx-auto px-6">
            <div className="flex flex-col items-center justify-center gap-4 mb-16 border-b border-black/5 dark:border-white/10 pb-8 text-center">
              <div className="space-y-3 flex flex-col items-center">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">Featured Products</h2>
                <p className="text-black/70 dark:text-white/60 max-w-2xl text-center">Engineered for performance. Built for scale. Discover our most popular enterprise solutions.</p>
              </div>
              <Link to="/shop" className="flex items-center justify-center gap-2 text-blue-700 dark:text-blue-400 font-bold hover:text-blue-800 dark:hover:text-blue-300 transition-colors uppercase tracking-widest text-xs">
                Browse Full Catalog <ChevronRight size={16} />
              </Link>
            </div>

            <div className="space-y-20 max-w-6xl mx-auto">
              <CategorySlider
                title="Servers"
                description={categoryDescriptions.servers}
                products={serverProducts}
                itemsPerView={itemsPerView}
                gapRem={gapRem}
                onQuickViewChange={(isOpen) => setIsQuickViewActive(isOpen)}
                isQuickViewActive={isQuickViewActive}
              />
              <CategorySlider
                title="Networking"
                description={categoryDescriptions.networking}
                products={networkingProducts}
                itemsPerView={itemsPerView}
                gapRem={gapRem}
                onQuickViewChange={(isOpen) => setIsQuickViewActive(isOpen)}
                isQuickViewActive={isQuickViewActive}
              />
              <CategorySlider
                title="Storage"
                description={categoryDescriptions.storage}
                products={storageProducts}
                itemsPerView={itemsPerView}
                gapRem={gapRem}
                onQuickViewChange={(isOpen) => setIsQuickViewActive(isOpen)}
                isQuickViewActive={isQuickViewActive}
              />
            </div>
         </div>
      </section>

      {/* Search Engine Optimization (SEO) Content Block */}
      <section className="py-16 relative overflow-hidden border-t border-zinc-200/85 dark:border-white/5 bg-zinc-50/50 dark:bg-[#080808]/40">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="space-y-6 text-left">
            <h2 className="text-2xl font-bold tracking-tight text-black dark:text-white">
              Leading ISP Equipment & Enterprise IT Infrastructure Provider in Bangladesh
            </h2>
            <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed">
              Inovexa Technologies (InovexaBD) is a premier supplier of mission-critical networking hardware, data center components, and server solutions in Bangladesh. We specialize in providing high-performance, pre-vetted IT hardware designed to help ISPs, corporate offices, and data centers build scalable, future-ready infrastructure.
            </p>
            <p className="text-sm text-black/70 dark:text-white/60 leading-relaxed">
              Our extensive inventory features industry-leading brands such as Cisco, Juniper Networks, Dell PowerEdge, Intel, Mellanox, and Huawei. From carrier-grade edge routers to high-speed optical transceivers and storage components, we offer the most competitive prices and robust after-sales support in the BD market.
            </p>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <GlassContainer className="p-12 md:p-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:bg-blue-600/5 border-blue-200/40 dark:border-white/5 overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover opacity-80 dark:opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-tight">Ready to Upgrade Your <br />Infrastructure?</h2>
              <p className="text-black/70 dark:text-white/60 text-lg">
                Join hundreds of enterprises trust Inovexa Technologies for their mission-critical networking and server requirements.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-6">
                <Link to="/contact" className="px-10 py-5 rounded-full bg-white text-black font-bold hover:bg-blue-600 hover:text-white transition-all border border-zinc-200 dark:border-transparent">
                  Contact Sales Specialist
                </Link>
                <Link to="/about" className="px-10 py-5 rounded-full border border-black/20 dark:border-white/20 text-black dark:text-white font-bold hover:bg-black/5 dark:hover:bg-white/10 transition-all">
                  About Inovexa
                </Link>
              </div>
            </div>
          </GlassContainer>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-zinc-100/40 dark:bg-black/40 border-t border-zinc-200/50 dark:border-none">
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

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
  <svg className="h-7 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 115 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24v-6.5h2v6.5h-2zm5.5 0v-9h2v9h-2zm5.5 0v-11.5h2V24h-2zm5.5 0V7.5h2V24h-2zm5.5 0v-11.5h2V24h-2zm5.5 0v-9h2v9h-2zm5.5 0v-6.5h2v6.5h-2z" fill="#049FD9" />
    <text x="50" y="22" className="font-extrabold tracking-wide fill-black dark:fill-white transition-colors duration-300" fontSize="16" fontFamily="sans-serif">CISCO</text>
  </svg>
);

const MikrotikLogo = () => (
  <svg className="h-6 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 140 24" xmlns="http://www.w3.org/2000/svg">
    <g fill="#E2231A" transform="scale(0.8) translate(0, 2)">
      <path d="M23.041 6.188a1.404 1.404 0 0 0-.218-.36c-.24-.296-.634-.586-1.14-.864l-4.052-2.22L13.576.519C13.074.243 12.61.065 12.22.013A1.772 1.772 0 0 0 12 0c-.432 0-.974.192-1.576.52L6.37 2.74 2.317 4.96c-.504.279-.9.569-1.14.867a1.59 1.59 0 0 0-.122.17 1.654 1.654 0 0 0-.096.19c-.15.348-.22.816-.22 1.368v8.887c0 .66.1 1.2.316 1.558.216.356.66.706 1.262 1.036l4.054 2.22 4.053 2.223c.504.276.966.456 1.36.506.145.02.291.02.436 0 .39-.05.852-.228 1.356-.506l8.107-4.443c.6-.33 1.046-.68 1.262-1.036.036-.06.068-.123.096-.188.15-.348.22-.818.22-1.37V7.556c0-.552-.07-1.02-.22-1.368zM7.233 16.618c0 .2-.218.33-.396.233l-1.45-.796a1.066 1.066 0 0 1-.552-.934v-4.296c0-.2.216-.33.394-.235l1.728.947a.53.53 0 0 1 .276.468v4.612zm11.934-1.497c0 .39-.213.748-.554.936l-1.45.794a.266.266 0 0 1-.394-.234v-5.692c0-.2-.217-.33-.395-.232l-2.62 1.434c-.34.187-.552.545-.552.934v5.646a.532.532 0 0 1-.278.468l-.41.224c-.32.176-.707.176-1.026 0l-.408-.224a.532.532 0 0 1-.278-.468v-5.646c0-.389-.212-.747-.552-.934L4.835 9.16v-.28c0-.388.212-.746.552-.934l.6-.328a1.064 1.064 0 0 1 1.022 0l4.48 2.452c.318.176.704.176 1.021 0l2.07-1.134a.266.266 0 0 0 0-.468L9.932 5.922a.266.266 0 0 1 0-.468l1.556-.852c.32-.176.707-.176 1.026 0l6.1 3.34c.342.188.554.547.553.936v6.243z" />
    </g>
    <text x="24" y="17" className="font-extrabold tracking-tight fill-black dark:fill-white transition-colors duration-300" fontSize="16" fontFamily="sans-serif">mikrotik</text>
  </svg>
);

const UbiquitiLogo = () => (
  <svg className="h-6 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 110 24" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(0.8) translate(0, 2)" fill="#0594D0">
      <path d="M23.1627 0h-1.4882v1.4882h1.4882zm-5.2072 10.4226V7.4409l.0007.001h2.9755v2.9762h2.9756v.9433c0 1.0906-.0927 2.3827-.306 3.3973-.1194.5672-.3004 1.1308-.5127 1.672-.2175.5537-.468 1.0841-.7408 1.5595a11.6795 11.6795 0 0 1-1.2456 1.7762l-.0253.0294-.0417.0488c-.1148.1347-.2283.2679-.3531.398a11.7612 11.7612 0 0 1-.4494.4492c-1.9046 1.8343-4.3861 2.98-6.9808 3.243-.3122.032-.939.0652-1.2519.0652-.3139-.001-.9397-.0331-1.252-.0651-2.5946-.263-5.0761-1.4097-6.9806-3.243a11.75 11.75 0 0 1-.4495-.4494c-.131-.1356-.249-.2748-.3683-.4154l-.0006-.0004-.0512-.0603a11.6576 11.6576 0 0 1-1.2456-1.7762c-.2727-.4763-.5233-1.0058-.7408-1.5595-.2123-.5414-.3933-1.1048-.5128-1.6718C.1854 13.743.0927 12.452.0927 11.3616V.1864h5.9518v10.2362s0 .7847.0099 1.0415l.0022.0599v.0004c.0127.332.0247.6575.0594.9812.098.919.3014 1.7913.7203 2.5288.1213.213.2443.42.3915.616.8953 1.1939 2.2577 2.0901 3.9573 2.3398.2022.0294.6108.0552.8149.0552.204 0 .6125-.0258.8149-.0552 1.6996-.2497 3.062-1.146 3.9573-2.3398.148-.196.2701-.403.3914-.616.419-.7375.6224-1.6095.7204-2.5288.0346-.3243.047-.6503.0594-.9831l.0022-.0584c.0099-.2568.0099-1.0415.0099-1.0415zm.7427-8.19h2.2326v2.2319h2.9764v2.9764h-2.9764V4.4654h-2.2326V2.2328Z" />
    </g>
    <text x="24" y="17" className="font-black tracking-wider fill-black dark:fill-white transition-colors duration-300" fontSize="13" fontFamily="sans-serif">UBIQUITI</text>
  </svg>
);

const TplinkLogo = () => (
  <svg className="h-6 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 110 24" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(0.8) translate(0, 2)" fill="#19B4B9">
      <path d="M15.185 0C10.218 0 6.25 3.984 6.25 8.903V10.8h4.99V8.903c0-2.135 1.736-3.863 3.946-3.863 2.187 0 3.708 1.536 3.708 3.815 0 2.257-1.64 3.912-3.827 3.912h-1.878v5.039h1.878c4.874 0 8.819-4.007 8.819-8.952C23.885 3.72 20.2 0 15.185 0zM.115 12.6v4.103c0 .624.523 1.248 1.236 1.248h4.753v4.801c0 .624.523 1.248 1.236 1.248h4.065V12.6Z" />
    </g>
    <text x="26" y="17" className="font-black tracking-tight fill-black dark:fill-white transition-colors duration-300" fontSize="16" fontFamily="sans-serif">tp-link</text>
  </svg>
);

const IntelLogo = () => (
  <svg className="h-7 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
    <g fill="#127cc1">
      <path d="M98.495 18.916C94.833 1.082 60.334-.06 38.095 13.53v1.513C60.307 3.577 91.808 3.63 94.7 20.057c.955 5.44-2.07 11.093-7.537 14.357v4.273c6.555-2.415 13.27-10.217 11.332-19.77M58.05 50.125c-15.34 1.433-31.34-.823-33.57-12.844-1.115-5.918 1.592-12.207 5.175-16.135V19.05c-6.45 5.68-9.952 12.844-7.908 21.283C24.322 51.186 38.042 57.343 58.98 55.3c8.306-.796 19.16-3.476 26.67-7.643V41.74c-6.847 4.113-18.152 7.5-27.6 8.386z"/>
      <path d="M84.43 16.315h-4.034v17.993c0 2.123 1.008 3.954 4.034 4.246M36.502 22.897h-4.007v11.756c0 2.123 1.008 3.954 4.034 4.246m-4.034-22.026h4.034v3.82h-4.034zm28.13 21.84c-3.264 0-4.644-2.282-4.644-4.5V18.57h3.98v4.326h3.025v3.238H59.96v7.802c0 .93.45 1.433 1.38 1.433h1.62v3.344h-2.335M71.188 25.95c-1.353 0-2.415.717-2.84 1.672-.265.584-.345 1.008-.398 1.725h6.157c-.08-1.752-.876-3.397-2.92-3.397m-3.238 6.104c0 2.043 1.274 3.556 3.53 3.556 1.778 0 2.654-.504 3.662-1.513l2.468 2.362c-1.592 1.566-3.238 2.52-6.157 2.52-3.82 0-7.484-2.097-7.484-8.2 0-5.2 3.185-8.147 7.378-8.147 4.246 0 6.688 3.45 6.688 7.988v1.433H67.95m-20.593-5.92c1.168 0 1.645.584 1.645 1.513v11.066h3.98V27.647c0-2.256-1.194-4.75-4.697-4.75H40.06V38.74h3.98V26.134"/>
    </g>
  </svg>
);

const DellLogo = () => (
  <svg className="h-7 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.963 14.6V9.324h1.222v4.204h2.14v1.07h-3.362zm-9.784-3.288l2.98-2.292c.281.228.56.458.841.687l-2.827 2.14.611.535 2.827-2.216c.281.228.56.458.841.688a295.83 295.83 0 0 1-2.827 2.216l.61.536 2.83-2.295-.001-1.986h1.223v4.204h2.216v1.07h-3.362v-1.987c-.995.763-1.987 1.529-2.981 2.292l-2.981-2.292c-.144.729-.653 1.36-1.312 1.694-.285.147-.597.24-.915.276-.183.022-.367.017-.551.017H3.516V9.325H5.69a2.544 2.544 0 0 1 1.563.557c.454.36.778.872.927 1.43m-3.516-.917v3.21l.953-.001a1.377 1.377 0 0 0 1.036-.523 1.74 1.74 0 0 0 .182-1.889 1.494 1.494 0 0 0-.976-.766c-.166-.04-.338-.03-.507-.032h-.688zM11.82 0h.337a11.94 11.94 0 0 1 5.405 1.373 12.101 12.101 0 0 1 4.126 3.557A11.93 11.93 0 0 1 24 11.82v.36a11.963 11.963 0 0 1-3.236 8.033A11.967 11.967 0 0 1 12.182 24h-.361a11.993 11.993 0 0 1-4.145-.806 12.04 12.04 0 0 1-4.274-2.836A12.057 12.057 0 0 1 .576 15.67 12.006 12.006 0 0 1 0 12.181v-.361a11.924 11.924 0 0 1 1.992-6.396 12.211 12.211 0 0 1 4.71-4.172A11.875 11.875 0 0 1 11.82 0m-.153 1.23a10.724 10.724 0 0 0-6.43 2.375 10.78 10.78 0 0 0-3.319 4.573 10.858 10.858 0 0 0 .193 8.12 10.788 10.788 0 0 0 3.546 4.421 10.698 10.698 0 0 0 4.786 1.946c1.456.209 2.955.124 4.376-.26a10.756 10.756 0 0 0 5.075-3.062 10.742 10.742 0 0 0 2.686-5.28 10.915 10.915 0 0 0-.122-4.682 10.77 10.77 0 0 0-7.098-7.626 10.78 10.78 0 0 0-3.693-.525z" fill="#007DB8" />
  </svg>
);

const SupermicroLogo = () => (
  <svg className="h-6 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 231.7 122.9" xmlns="http://www.w3.org/2000/svg">
    <path d="M220.2 45.9c3.9 31.4-42.3 62.9-103.2 70.4S4.1 104.4.2 73s42-62.9 102.9-70.4 113.3 11.9 117.1 43.3m-105.7-40C59 10.8 16 37.3 18.5 65.1s49.4 46.4 104.9 41.5 98.5-31.4 96-59.2C216.9 19.5 170 1 114.5 5.9" fill="#00953b"/>
    <circle cx="218.9" cy="61.6" r="11.6" fill="#d7282f"/>
    <path d="M215.5 19.9c.5 0 .9.1 1.4.4.4.2.8.6 1 1 .3.5.4.9.4 1.4s-.1 1-.4 1.4c-.2.4-.6.8-1 1s-.9.4-1.4.4-1-.1-1.4-.4c-.4-.2-.8-.6-1-1s-.4-.9-.4-1.4.1-1 .4-1.4.6-.8 1.1-1c.4-.3.9-.4 1.3-.4m0 .2c-.4 0-.8.1-1.3.3s-.7.5-1 .9c-.2.4-.3.8-.3 1.3 0 .4.1.9.3 1.3q.3.6.9.9c.4.2.8.3 1.3.3.4 0 .9-.1 1.3-.3q.6-.3.9-.9c.2-.4.3-.8.3-1.3 0-.4-.1-.9-.3-1.3s-.5-.7-1-.9-.6-.3-1.1-.3m-1.5.8h1.5q.6 0 .9.3c.3.3.3.4.3.6s-.1.4-.2.5c-.1.2-.4.3-.7.3l.8 1.2.3.3c.1 0 .1.1.2.1v.1h-.7l-1.2-1.6h-.3V24c0 .1.1.2.1.2.1 0 .2.1.4.1v.1h-1.5v-.1h.3c.1 0 .1-.1.1-.1v-2.8c0-.1-.1-.1-.1-.1h-.3v-.4zm.9 1.7c.3 0 .5 0 .7-.1.1-.1.3-.1.3-.3.1-.1.1-.2.1-.4s-.1-.4-.2-.5-.3-.2-.6-.2c-.1 0-.2 0-.3.1z" fill="#003a70"/>
    <g className="fill-black dark:fill-white transition-colors duration-300">
      <path d="M59.3 51.8h.4c1.3.1 1.9.5 2.1.7s.5.9.5 3v8.4c0 2-.2 3.5-.7 4.4-.8 1.6-2.4 2.4-4.9 2.4-2.2 0-3.7-.8-4.5-2.3-.4-.9-.6-2.1-.6-3.8V54.2c0-1.4.3-1.8.4-1.9.2-.1.7-.4 2.1-.5h.4v-1.5H44.4v1.5h.4c1.5.1 1.9.4 2.1.5.1.1.4.5.4 1.9v10.1c0 2.1.4 3.8 1.1 5.1 1.4 2.4 3.9 3.7 7.6 3.7s6.3-1.2 7.6-3.7c.7-1.3 1.1-3.2 1.1-5.5v-8.4c0-2.1.3-2.7.5-2.9.2-.3.7-.6 2.1-.7h.4v-1.5h-8.5v1.4zm-21 5.4L34.8 55c-1.3-.8-2.2-1.5-2.8-2.2-.6-.6-.8-1.4-.8-2.3 0-1 .3-1.8 1-2.3.7-.6 1.6-.9 2.6-.9 1.3 0 2.6.5 4 1.4 1.3.9 2.3 2.7 2.9 5.1l.1.4h1.9l-1-9.4H41v.3c-.1.4-.2.6-.4.8-.1.1-.3.2-.6.2 0 0-.4-.1-2.1-.6-1.3-.5-2.5-.7-3.4-.7q-3.45 0-5.7 2.1-2.1 2.1-2.1 5.4 0 2.4 1.8 4.5c.6.7 1.5 1.4 2.5 2.1l3.4 2.1c1.9 1.2 3.2 2.1 3.8 2.7.9.9 1.3 1.9 1.3 3.1q0 1.95-1.2 3c-.8.7-1.8 1.1-3 1.1-2.2 0-4-.9-5.5-2.6-.9-1-1.6-2.4-2.3-4.1l-.1-.3h-1.8l1.3 9.5h1.7l.1-.4c0-.3.1-.5.3-.8.1-.1.3-.2.5-.2 0 0 .4 0 2.2.7 1.4.5 2.8.7 4 .7 2.6 0 4.7-.8 6.4-2.2 1.7-1.5 2.5-3.4 2.5-5.6 0-1.7-.5-3.1-1.4-4.3-1.1-1.5-2.6-2.8-4.9-4.1m38.1 6.1h1.4c2.5 0 4.6-.5 6.3-1.6 1.8-1.1 2.6-2.8 2.6-5.2 0-1.9-.8-3.4-2.4-4.6-1.5-1.1-3.7-1.7-6.6-1.7h-9v1.5h.4c1.4.1 1.8.4 1.9.5s.4.6.4 1.9v14c0 1.6-.2 2.1-.3 2.3-.1.1-.5.4-2 .6h-.4v1.5h10V71h-.4c-1.6-.1-2.1-.4-2.2-.5s-.4-.5-.4-1.9v-5.4c.2 0 .4.1.7.1M75.7 53c0-.4.1-.5.1-.5s.2-.1.9-.1q1.95 0 3.3.6c1.5.7 2.3 1.9 2.3 3.6q0 2.85-2.1 3.9-1.2.6-3.3.6h-.5c-.1 0-.4 0-.7-.1z"/>
      <path d="m103.2 66.2-.1.3c-.8 1.7-1.6 2.8-2.6 3.2s-2.5.7-4.7.7c-2.6 0-3.3-.1-3.5-.2-.1 0-.3-.1-.3-.7V62h4.5c1.6 0 2.1.3 2.3.5s.5.8.8 2.3l.1.4h1.6v-8.4h-1.6l-.1.4c-.3 1.4-.6 2-.8 2.2s-.7.5-2.3.5H92V53c0-.4.1-.5 0-.5 0 0 .2-.1.5-.1h4.4c2.3 0 3.1.3 3.4.5s.7.9 1.1 2.5l.1.4h1.7l-.1-5.6H85v1.5h.4c1.4.1 1.9.4 2.1.5s.4.6.4 1.9v14.4c0 1.5-.3 1.8-.4 1.9-.2.1-.6.4-2.1.5h-.4v1.5h18.4L105 66h-1.8z"/>
      <path d="M124.2 70.7c-.4-.2-.7-.5-1.1-1l-6.2-7.6c1.5-.3 2.8-.9 3.7-1.7 1.2-1 1.8-2.3 1.8-4.1q0-3.9-3.9-5.4c-1.3-.5-2.9-.7-4.8-.7h-9.5v1.5h.4c1.4.1 1.8.4 2 .5.1.1.4.6.4 1.9v14c0 1.7-.2 2.1-.3 2.3-.1.1-.5.4-2 .6h-.4v1.5h10V71h-.4c-1.5-.1-1.9-.4-2.1-.5-.1-.1-.4-.5-.4-1.9v-5.9h.7l8.1 10h5.9v-1.5h-.4c-.6-.2-1.1-.3-1.5-.5m-12.9-10.2V53c0-.4.1-.5.1-.5s.3-.1 1.4-.1c1.3 0 2.3.2 3.1.5 1.4.6 2 1.7 2 3.4s-.7 2.9-2.3 3.5c-.8.4-2.3.7-4.3.7m30.1 5.2-7.1-15.5h-7.2v1.5h.5c1.6.1 2.1.4 2.2.5.2.1.4.6.4 1.9v13.2c0 2.1-.3 2.7-.5 3-.2.2-.7.6-2.3.7h-.4v1.5h8.6V71h-.4c-1.4-.1-1.8-.4-2-.6-.3-.3-.6-1.1-.6-3.1V56.7l7.4 16h1.1l7.5-16.7v12.3c0 1.7-.3 2.2-.4 2.3s-.5.4-2.1.5h-.4v1.5h10v-1.5h-.4c-1.4-.1-1.9-.4-2-.5s-.4-.5-.4-1.9V54.2c0-1.3.2-1.8.4-1.9.1-.1.6-.4 2-.5h.4v-1.5h-7.2zm23 4.9c-.1-.1-.4-.4-.4-1.9V54.2c0-1.4.3-1.8.4-1.9.2-.2.7-.4 2.3-.5h.5v-1.5h-10.5v1.5h.5c1.6.1 2.1.3 2.3.5.1.1.4.5.4 1.9v14.4c0 1.5-.3 1.9-.4 1.9-.2.1-.7.4-2.3.5h-.4v1.5h10.5V71h-.4c-1.8 0-2.4-.3-2.5-.4"/>
      <path d="M184.3 67.6c-.9.9-1.8 1.6-2.6 2-1.3.8-2.8 1.1-4.4 1.1q-3.3 0-5.4-2.4c-1.4-1.6-2.2-3.8-2.2-6.6 0-3 .7-5.4 2.1-7.1s3.1-2.5 5.2-2.5 3.7.8 5 2.3c.7.8 1.2 2 1.6 3.3l.1.3h1.6l-.3-8.2h-1.5l-.1.3c-.1.2-.2.4-.4.5s-.4.2-.6.2c-.1 0-.4-.1-2-.5-1.3-.4-2.5-.5-3.7-.5-3.5 0-6.4 1.2-8.5 3.5-2.1 2.2-3.1 5-3.1 8.3 0 3.2 1 5.9 3 8 2.1 2.3 5 3.5 8.6 3.5 2.2 0 4.3-.6 6.2-1.8 1.1-.7 2-1.6 2.8-2.5l.3-.3-1.2-1.2zm23 3.5c-.6-.1-1-.2-1.4-.4s-.7-.5-1.1-1l-6.2-7.6c1.5-.3 2.8-.9 3.7-1.7 1.2-1 1.8-2.3 1.8-4.1q0-3.9-3.9-5.4c-1.3-.5-2.9-.7-4.8-.7H186v1.5h.4c1.4.1 1.8.4 2 .5.1.1.4.6.4 1.9v14c0 1.7-.2 2.1-.3 2.3-.1.1-.5.4-2 .6h-.4v1.5h10V71h-.4c-1.5-.1-1.9-.4-2.1-.5-.1-.1-.4-.5-.4-1.9v-5.9h.7l8.1 10h5.9v-1.5zM193 60.5V53c0-.4.1-.5.1-.5s.3-.1 1.4-.1c1.3 0 2.3.2 3.1.5 1.4.6 2 1.7 2 3.4s-.7 2.9-2.3 3.5c-.8.4-2.3.7-4.3.7"/>
    </g>
  </svg>
);

const HynixLogo = () => (
  <svg className="h-7 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 28.452518 15.028476" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(-17.656035,-115.48443)">
      <g transform="translate(0.13229139,-0.13228507)">
        <g fill="#e31837">
          <path d="m 20.156528,125.50815 c -0.472722,-0.22119 -0.860778,-0.3997 -0.860778,-0.76059 0,-0.27622 0.221192,-0.47695 0.657225,-0.47695 0.160514,0 0.291747,0.019 0.427567,0.0437 0.07091,0.0123 0.146403,0.0226 0.208844,0.0226 0.381353,0 0.596548,-0.22719 0.739775,-0.65864 l 0.05891,-0.17603 c -0.06103,-0.0247 -0.683683,-0.29845 -1.495425,-0.29845 -1.291872,0 -1.973791,0.82867 -1.973439,1.68804 0,0.43356 0.13582,0.74789 0.348545,0.99554 0.273755,0.31785 0.663928,0.52599 1.029053,0.70449 0.532341,0.26106 1.012472,0.45403 1.012472,0.84103 3.53e-4,0.3436 -0.354542,0.53869 -0.829028,0.53869 -0.650169,0 -1.218142,-0.37113 -1.290461,-0.41593 l -0.533753,1.00013 c 0.09455,0.054 0.782108,0.49001 1.913467,0.49001 1.205441,-7.1e-4 2.11843,-0.6918 2.11843,-1.75543 0,-1.05798 -0.845961,-1.45027 -1.531408,-1.78223" />
          <path d="m 24.871861,126.00197 2.186517,-2.68111 h -1.557867 l -1.744133,2.31387 h -0.02611 v -2.31387 h -1.284464 l 7.06e-4,5.67972 h 0.0762 c 0.555272,0 1.216025,-0.25717 1.216025,-1.18427 v -1.30422 h 0.02611 l 1.778,2.41758 h 1.63442 z" />
          <path d="m 27.131227,117.23664 c -0.452261,0.0854 -1.122539,0.49601 -1.120069,1.22167 0.0014,0.65899 0.540455,1.05869 0.542219,1.92193 0.0025,0.64982 -0.3556,1.08762 -0.74295,1.32997 0.156633,-0.0138 0.328083,-0.0229 0.516467,-0.0233 0.395816,-10e-4 0.634294,0.0367 0.649111,0.0392 l 2.028472,-2.4892 c -0.563386,-0.84349 -1.221317,-1.49789 -1.87325,-2.00025" />
          <path d="m 28.835143,123.95875 c 0.255764,-0.39758 0.287867,-1.03117 0.309386,-1.67605 0.02434,-0.60219 0.149578,-1.05516 0.95497,-1.05798 0.178152,-3.5e-4 0.348191,0.024 0.655813,0.0233 1.179689,-0.005 1.949803,-0.41134 2.428875,-0.67804 -0.978605,-0.62407 -2.407355,-1.26154 -4.179711,-1.33315 -0.115711,0.32597 -1.013883,2.82363 -1.081969,3.02542 0.01023,0.012 0.167569,0.18803 0.364067,0.53199 0.289983,0.47237 0.445558,0.87242 0.548569,1.16452" />
        </g>
        <g fill="#f58025">
          <path d="m 24.550904,121.91874 c -0.102658,3.5e-4 -0.153811,-0.0677 -0.167569,-0.18591 -0.01305,-0.11713 -0.5207,-4.75862 -0.595842,-5.461 -0.01094,-0.10266 -0.03634,-0.29105 -0.03669,-0.35807 -3.53e-4,-0.10795 0.0702,-0.1644 0.153106,-0.16475 0.240241,-0.001 1.550458,0.30586 2.940402,1.28058 -0.400755,0.11254 -1.125008,0.52917 -1.121833,1.39171 0.0028,0.76377 0.549275,1.18392 0.552097,1.9498 0.0046,1.24566 -1.427339,1.54693 -1.723672,1.54764" />
          <path d="m 28.95163,124.29001 c 0.02187,0.0579 0.04233,0.10654 0.06315,0.14041 0.0321,0.054 0.07338,0.0787 0.124884,0.0787 0.0321,-3.5e-4 0.07161,-0.0113 0.115711,-0.031 0.106891,-0.0494 4.342694,-2.02106 4.981575,-2.31563 0.09243,-0.0444 0.268463,-0.12312 0.325966,-0.15699 0.05997,-0.0342 0.08749,-0.084 0.08749,-0.13476 -3.53e-4,-0.0286 -0.0085,-0.0572 -0.02469,-0.0833 -0.08008,-0.12911 -0.489656,-0.56409 -1.17475,-1.03928 -0.543984,0.29951 -1.393473,0.76271 -2.657122,0.76765 -0.309739,7e-4 -0.379589,-0.0201 -0.591256,-0.0194 -0.616656,0.002 -0.770819,0.266 -0.793397,0.80681 -0.0035,0.1023 -0.0056,0.23953 -0.01164,0.39052 -0.0194,0.48331 -0.07655,1.15006 -0.445911,1.59632" />
          <path d="m 35.569424,129.07745 c -0.470253,1.27106 -1.075972,1.43545 -1.595614,1.43545 -0.367242,0 -0.637117,-0.13123 -0.665339,-0.14569 l 0.196145,-0.59479 c 0.01552,0.008 0.214136,0.11501 0.434975,0.11501 0.41275,0 0.671689,-0.22931 0.900641,-0.94756 0,0 -1.402997,-3.054 -1.419577,-3.0921 0.02575,-0.008 0.193675,-0.0593 0.385233,-0.0593 0.454025,0 0.554214,0.28364 0.670983,0.56692 0.09878,0.23777 0.74542,1.79705 0.74542,1.79705 h 0.02152 l 0.748947,-2.3047 h 0.776817 z" />
          <path d="m 45.843971,128.92466 -1.08585,-1.57762 1.063272,-1.54411 h -0.916516 l -0.740128,1.13206 c -0.19932,-0.31291 -0.38735,-0.60819 -0.445559,-0.69991 -0.148166,-0.22754 -0.281516,-0.4572 -0.61983,-0.45049 -0.0448,0.001 -0.09207,0.005 -0.142875,0.0155 -0.188736,0.0346 -0.344311,0.11571 -0.367947,0.1277 0.01199,0.0191 0.5207,0.74013 1.007533,1.44145 l -1.069622,1.5554 h 0.915458 l 0.743656,-1.13594 0.743655,1.13594 z" />
          <path d="m 37.400376,126.86169 v 2.06798 h 0.776464 v -2.14947 c 0.04233,-0.0388 0.318558,-0.30233 0.624417,-0.30233 0.399344,0 0.606425,0.28928 0.606425,0.66604 v 1.78576 h 0.775758 v -1.98014 c 0,-0.9398 -0.723547,-1.14794 -1.127125,-1.14794 -0.485422,0 -0.830792,0.30586 -0.93345,0.40746 -0.03316,-0.12594 -0.180975,-0.33902 -0.519995,-0.33902 -0.119591,0 -0.275872,0.0353 -0.290336,0.0392 0.02364,0.11677 0.08784,0.3937 0.08784,0.9525" />
          <path d="m 41.914697,124.91241 c 0,0.25647 -0.213783,0.46426 -0.478719,0.46426 -0.264584,0 -0.478367,-0.20779 -0.478367,-0.46426 0,-0.25753 0.213783,-0.46637 0.478367,-0.46637 0.264936,0 0.478719,0.20884 0.478719,0.46637" />
          <path d="m 41.820581,128.92526 h -0.76977 v -3.0794 h 0.76977 z" />
          <path d="m 30.94232,126.20146 c 0.05433,-0.0455 0.450144,-0.4131 1.000831,-0.4131 0.602544,0 1.047044,0.31432 1.047044,1.0802 v 2.06128 h -0.804333 v -1.84079 c 0,-0.33902 -0.186973,-0.60184 -0.540809,-0.60184 -0.33655,0 -0.621947,0.26564 -0.702733,0.33232 v 2.11031 h -0.798689 v -4.70147 h 0.169333 c 0.382764,0 0.629356,0.27835 0.629356,0.64912 z" />
        </g>
      </g>
    </g>
  </svg>
);

const JuniperLogo = () => (
  <svg className="h-6 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.0864 13.1643c.0456 0 .0717-.0132.0717-.062 0-.0482-.0254-.0593-.0731-.0593h-.1023v.1213zm-.1037.0417v.1285h-.0445v-.334h.1487c.0846 0 .1172.0347.1172.1006 0 .054-.0229.0912-.0806.102l.0755.1314h-.0484l-.0746-.1285zm.0746-.2918a.2535.2535 0 0 0-.2533.2531c0 .1395.1136.2532.2533.2532a.2535.2535 0 0 0 .253-.2532.2534.2534 0 0 0-.253-.2531zm-.291.2531a.2912.2912 0 0 1 .291-.2908.291.291 0 0 1 .2905.2908.291.291 0 0 1-.2905.2907.2912.2912 0 0 1-.291-.2907zm-20.7445-.6602V8.8304h-.4212v3.6767c0 .8506.0337 1.5332-1.4404 1.5332A4.029 4.029 0 0 1 0 14.0369v.397a6.215 6.215 0 0 0 .1602.0022c1.7858 0 1.8616-.8002 1.8616-1.929zm15.5404-1.6972h3.1334c-.042-.918-.1011-1.7014-1.4404-1.7014-1.2887 0-1.6425.6992-1.693 1.7014zm1.7016-2.0889c1.794 0 1.853 1.2045 1.8447 2.4764h-3.5548c.0085 1.1204.2863 1.9544 1.7436 1.9544.775 0 1.1288-.2107 1.5079-.4886l.2357.3116c-.421.3117-.918.556-1.7436.556-1.8194 0-2.1565-1.053-2.1565-2.4091 0-1.356.3877-2.4007 2.123-2.4007zm-4.1484 2.7055c.7439 0 1.1135-.3625 1.1135-1.0949 0-.7322-.3988-1.0798-1.132-1.0798h-1.7285v2.1747zM15.109 8.839c1.0678 0 1.5519.5307 1.5519 1.474 0 .9497-.478 1.527-1.5578 1.527h-1.7348v1.5981h-.4124V8.839zm-2.9253 0v4.5991h-.4122V8.839zm-1.1939 4.5991h-.4296v-2.8134c0-.8086.0084-1.491-1.474-1.491-1.4743 0-1.4405.6824-1.4405 1.5331v2.7713h-.4212v-2.7713c0-1.1288.076-1.9289 1.8616-1.9289 1.7943 0 1.9037.8001 1.9037 1.8952zM2.7466 8.8304h.4297v2.8134c0 .8088-.0084 1.491 1.474 1.491 1.4742 0 1.4405-.6822 1.4405-1.533V8.8303h.4212v2.7713c0 1.1289-.0759 1.929-1.8616 1.929-1.7943 0-1.9038-.8001-1.9038-1.8952zm18.9675 1.8364v2.7713h.421v-2.7713c0-.8507-.0336-1.533 1.4407-1.533.1579 0 .298.0083.4242.023v-.4012a4.8535 4.8535 0 0 0-.4242-.0177c-1.7859 0-1.8617.8001-1.8617 1.929zm-.4315 4.3602c.1525.096.3017.1286.4542.1286.2624 0 .3789-.0737.3789-.2486 0-.18-.1508-.2057-.3789-.2468-.2743-.048-.4594-.0944-.4594-.3514 0-.2453.1577-.3413.4594-.3413.199 0 .3412.0447.4423.1132l-.072.1097c-.0908-.06-.2263-.0995-.3703-.0995-.228 0-.3257.0636-.3257.2144 0 .1612.132.192.3584.233.2776.0499.4782.091.4782.3635 0 .2521-.1612.3737-.5074.3737-.192 0-.3652-.0393-.5263-.1456zm-.7886-.4423l-.2538.2777v.396h-.132v-1.2703h.132v.7012l.643-.7012h.156l-.456.4989.5176.7715h-.1525l-.4543-.6738m-1.1006.0326c.18 0 .2914-.0549.2914-.2555 0-.1971-.108-.2485-.2965-.2485h-.4132v.504zm-.0377.1234h-.3806v.5178h-.132V13.988h.5486c.2948 0 .4286.1183.4286.3703 0 .2194-.1046.348-.3258.377l.3068.523h-.1439l-.3017-.5177m-.924-.1166c0-.3429-.1594-.528-.5058-.528-.3446 0-.5023.1851-.5023.528 0 .3446.1577.5298.5023.5298.3464 0 .5058-.1852.5058-.5298zm-.5058-.6566c.408 0 .6412.2024.6412.655 0 .4542-.2332.6565-.6412.6565-.4063 0-.6377-.2023-.6377-.6566 0-.4525.2314-.6549.6377-.6549zm-2.3571.0206l.3342 1.0508.3412-1.0508h.1166l.3394 1.0508.336-1.0508h.1303l-.408 1.2789h-.1165l-.343-1.0577-.341 1.0577h-.1183l-.4098-1.2789zm-1.392.1286v-.1286h1.0886v.1286h-.4766v1.1418h-.1355v-1.1418zm-.204-.1286v.1286h-.7046v.42h.6874v.127h-.6874v.4713h.7114v.1235h-.8468V13.988zm-2.0539 0l.7596 1.0475V13.988h.1303v1.2704h-.1235l-.7835-1.0784v1.0784h-.1303V13.988Z" fill="#C8102E" />
  </svg>
);

const HuaweiLogo = () => (
  <svg className="h-6 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 110 24" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(0.8) translate(0, 2)" fill="#ED1C24">
      <path d="M3.67 6.14S1.82 7.91 1.72 9.78v.35c.08 1.51 1.22 2.4 1.22 2.4 1.83 1.79 6.26 4.04 7.3 4.55 0 0 .06.03.1-.01l.02-.04v-.04C7.52 10.8 3.67 6.14 3.67 6.14zM9.65 18.6c-.02-.08-.1-.08-.1-.08l-7.38.26c.8 1.43 2.15 2.53 3.56 2.2.96-.25 3.16-1.78 3.88-2.3.06-.05.04-.09.04-.09zm.08-.78C6.49 15.63.21 12.28.21 12.28c-.15.46-.2.9-.21 1.3v.07c0 1.07.4 1.82.4 1.82.8 1.69 2.34 2.2 2.34 2.2.7.3 1.4.31 1.4.31.12.02 4.4 0 5.54 0 .05 0 .08-.05.08-.05v-.06c0-.03-.03-.05-.03-.05zM9.06 3.19a3.42 3.42 0 00-2.57 3.15v.41c.03.6.16 1.05.16 1.05.66 2.9 3.86 7.65 4.55 8.65.05.05.1.03.1.03a.1.1 0 00.06-.1c1.06-10.6-1.11-13.42-1.11-13.42-.32.02-1.19.23-1.19.23zm8.299 2.27s-.49-1.8-2.44-2.28c0 0-.57-.14-1.17-.22 0 0-2.18 2.81-1.12 13.43.01.07.06.08.06.08.07.03.1-.03.1-.03.72-1.03 3.9-5.76 4.55-8.64 0 0 .36-1.4.02-2.34zm-2.92 13.07s-.07 0-.09.05c0 0-.01.07.03.1.7.51 2.85 2 3.88 2.3 0 0 .16.05.43.06h.14c.69-.02 1.9-.37 3-2.26l-7.4-.25zm7.83-8.41c.14-2.06-1.94-3.97-1.94-3.98 0 0-3.85 4.66-6.67 10.8 0 0-.03.08.02.13l.04.01h.06c1.06-.53 5.46-2.77 7.28-4.54 0 0 1.15-.93 1.21-2.42zm1.52 2.14s-6.28 3.37-9.52 5.55c0 0-.05.04-.03.11 0 0 .03.06.07.06 1.16 0 5.56 0 5.67-.02 0 0 .57-.02 1.27-.29 0 0 1.56-.5 2.37-2.27 0 0 .73-1.45.17-3.14z"/>
    </g>
    <text x="24" y="17" className="font-extrabold tracking-widest fill-black dark:fill-white transition-colors duration-300" fontSize="13" fontFamily="sans-serif">HUAWEI</text>
  </svg>
);

const NvidiaLogo = () => (
  <svg className="h-6 w-auto transition-transform duration-300 hover:scale-105" viewBox="0 0 110 24" xmlns="http://www.w3.org/2000/svg">
    <g transform="scale(0.8) translate(0, 2)" fill="#76B900">
      <path d="M8.948 8.798v-1.43a6.7 6.7 0 0 1 .424-.018c3.922-.124 6.493 3.374 6.493 3.374s-2.774 3.851-5.75 3.851c-.398 0-.787-.062-1.158-.185v-4.346c1.528.185 1.837.857 2.747 2.385l2.04-1.714s-1.492-1.952-4-1.952a6.016 6.016 0 0 0-.796.035m0-4.735v2.138l.424-.027c5.45-.185 9.01 4.47 9.01 4.47s-4.08 4.964-8.33 4.964c-.37 0-.733-.035-1.095-.097v1.325c.3.035.61.062.91.062 3.957 0 6.82-2.023 9.593-4.408.459.371 2.34 1.263 2.73 1.652-2.633 2.208-8.772 3.984-12.253 3.984-.335 0-.653-.018-.971-.053v1.864H24V4.063zm0 10.326v1.131c-3.657-.654-4.673-4.46-4.673-4.46s1.758-1.944 4.673-2.262v1.237H8.94c-1.528-.186-2.73 1.245-2.73 1.245s.68 2.412 2.739 3.11M2.456 10.9s2.164-3.197 6.5-3.533V6.201C4.153 6.59 0 10.653 0 10.653s2.35 6.802 8.948 7.42v-1.237c-4.84-.6-6.492-5.936-6.492-5.936z"/>
    </g>
    <text x="26" y="17" className="font-extrabold tracking-widest fill-black dark:fill-white transition-colors duration-300" fontSize="14" fontFamily="sans-serif">NVIDIA</text>
  </svg>
);

const HikvisionLogo = () => (
  <svg className="h-[13px] w-auto transition-transform duration-300 hover:scale-105" viewBox="-0.59919663 -0.59919663 158.69985326 21.17161426" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M 7.2207,0.1927 0,19.7747 l 5.88476,0 3.45313,-9.3652 7.00586,0 -3.45313,9.3652 4.59766,0 c 0.7775,0 1.44554,-0.4908 1.71679,-1.1758 0.003,-0.01 0.006,-0.013 0.01,-0.018 l 6.7793,-18.3887 -5.88477,0 -2.7793,7.5391 -7.00586,0 2.7793,-7.5391 -5.88281,0 z m 22.51367,0 -7.21875,19.582 5.88281,0 7.21875,-19.582 -0.16992,0 -5.54101,0 -0.17188,0 z m 9.88672,0 -7.21875,19.582 5.88281,0 2.76758,-7.5098 1.4707,-1.1289 3.90235,7.5664 0.002,-0.01 c 0.005,0.01 0.007,0.013 0.01,0.018 0.32,0.6638 1.02257,1.1014 1.79882,1.0489 -0.0137,0 -0.0287,0.01 -0.0449,0.01 l 4.9961,0 -6.21485,-12.0508 9.80274,-7.5274 -4.39649,0 -9.58984,7.3633 2.71484,-7.3633 -5.88281,0 z"
      fill="#d71820"
    />
    <path
      d="m 123.11718,0.0091 c -3.76375,-0.125 -7.83367,2.0416 -9.76367,6.1191 -1.1975,2.3013 -2.11125,4.8639 -2.71875,7.3789 -0.055,0.2225 -0.10484,0.4448 -0.15234,0.666 -0.0612,0.3575 -0.0657,0.8164 -0.0332,1.2852 0.14875,1.98 1.90719,4.3735 4.80469,4.5098 l 1.95899,0 0.0215,0 1.45703,0 c 3.7625,0.125 7.83047,-2.0417 9.76172,-6.1192 1.1975,-2.3025 2.11125,-4.8671 2.71875,-7.3808 0.0537,-0.2238 0.1061,-0.4461 0.15234,-0.6661 0.0625,-0.3587 0.067,-0.8164 0.0332,-1.2851 -0.14875,-1.9813 -1.90719,-4.3728 -4.80469,-4.5078 l -1.98242,0 -1.45313,0 z m -64.5332,0.1836 1.53906,19.582 0.95703,0 1.92969,0 0.19922,0 c -0.005,-10e-4 -0.0126,0 -0.0176,0 0.0213,0 0.0425,0 0.0625,0 l 0.11914,0 c 0.61375,-0.019 1.16203,-0.3394 1.48828,-0.8281 l 0.002,0 12.58203,-18.7539 -3.25391,0 -9.01367,13.4609 -1.05664,-13.4609 -5.53711,0 z m 21.10938,0 -7.22071,19.582 5.54297,0 7.21875,-19.582 -5.54101,0 z m 13.00585,0 c -4.97874,0.061 -7.17898,5.5997 -4.45898,9.1484 1.38,1.685 3.35039,3.4323 4.46289,5.2773 0.705,0.9975 -0.049,2.6615 -1.39648,2.6778 l -2.73633,0 -6.05469,0 -0.91015,2.4785 11.13085,0 c 4.3625,-0.013 7.31422,-5.1498 4.38672,-9.0898 -1.35125,-1.9963 -3.49422,-3.3586 -4.76172,-5.3086 -0.75375,-1.0175 0.004,-2.6876 1.36524,-2.7051 l 2.82226,0 5.35938,0 0.91211,-2.4785 -10.1211,0 z m 13.95704,0 -7.2168,19.582 5.54102,0 7.21874,-19.582 -5.54296,0 z m 29.91796,0 -7.25,19.582 2.85547,0 4.9961,-13.4961 0.0254,0.2422 4.48828,12.1211 c 0.26875,0.6375 0.88633,1.094 1.61133,1.1328 l 2.61133,0 7.25195,-19.582 -2.85547,0 -4.90039,13.2343 -5.2168,-13.2343 -0.76172,0 -2.85547,0 z m -12.1914,1.8418 c 1.045,0.08 1.875,0.9591 1.875,2.0254 l 0,0 c 0.008,0.2625 -0.0373,0.5215 -0.13477,0.7578 l -3.66211,9.9726 c -0.73875,1.9138 -2.45609,3.0865 -4.49609,3.1465 l -0.54102,0 c -1.045,-0.08 -1.875,-0.9591 -1.875,-2.0254 l 0,0 c -0.008,-0.2625 0.038,-0.5247 0.13672,-0.7597 L 119.3457,5.179 c 0.74,-1.9138 2.4575,-3.0838 4.5,-3.1426 l 0.53711,0 z"
      className="fill-black dark:fill-white transition-colors duration-300"
    />
    <path
      d="m 157.50146,1.9237 c 0,1.0913 -0.85625,1.9463 -1.97,1.9463 -1.1025,0 -1.98125,-0.855 -1.98125,-1.9463 0,-1.0675 0.87875,-1.9237 1.98125,-1.9237 1.11375,0 1.97,0.8562 1.97,1.9237 m -3.45875,0 c 0,0.8563 0.6325,1.5363 1.5,1.5363 0.845,0 1.46625,-0.68 1.46625,-1.525 0,-0.855 -0.62125,-1.5475 -1.4775,-1.5475 -0.85625,0 -1.48875,0.6925 -1.48875,1.5362 m 1.18375,1.0088 -0.445,0 0,-1.9238 c 0.175,-0.035 0.42125,-0.059 0.73875,-0.059 0.3625,0 0.5275,0.059 0.6675,0.1412 0.10625,0.082 0.1875,0.235 0.1875,0.4225 0,0.2113 -0.16375,0.375 -0.39875,0.445 l 0,0.024 c 0.1875,0.07 0.29375,0.2112 0.3525,0.4687 0.0588,0.2938 0.0937,0.4113 0.14,0.4813 l -0.48,0 c -0.0588,-0.07 -0.0937,-0.2463 -0.1525,-0.4688 -0.035,-0.2112 -0.1525,-0.305 -0.39875,-0.305 l -0.21125,0 0,0.7738 z m 0.0112,-1.0913 0.21125,0 c 0.24625,0 0.44625,-0.081 0.44625,-0.2812 0,-0.175 -0.12875,-0.2925 -0.41125,-0.2925 -0.11625,0 -0.19875,0.011 -0.24625,0.023 l 0,0.5512 z"
      className="fill-black dark:fill-white transition-colors duration-300"
    />
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

      <div className="relative px-0 sm:px-12" ref={sliderRef}>
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
              className="absolute left-0 z-10 w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center rounded-full bg-white/95 dark:bg-black/95 border border-black/10 dark:border-white/10 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none cursor-pointer -translate-y-1/2"
              style={{ top: imageHeight ? `${imageHeight / 2}px` : '50%' }}
            >
              <ChevronLeft size={18} className="sm:hidden" />
              <ChevronLeft size={20} className="hidden sm:block" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next products"
              className="absolute right-0 z-10 w-8 h-8 sm:w-10 sm:h-10 hidden sm:flex items-center justify-center rounded-full bg-white/95 dark:bg-black/95 border border-black/10 dark:border-white/10 text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-500 hover:scale-105 active:scale-95 transition-all shadow-md focus:outline-none cursor-pointer -translate-y-1/2"
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
            className="w-12 h-12 flex items-center justify-center focus:outline-none cursor-pointer"
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
  const [isMarqueeReversed, setIsMarqueeReversed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const xRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isReversedRef = useRef(false);

  useEffect(() => {
    isReversedRef.current = isMarqueeReversed;
  }, [isMarqueeReversed]);

  useEffect(() => {
    let animationFrameId: number;
    const speed = 0.8; // pixels per frame (about 48px/s at 60fps)

    const animate = () => {
      if (!scrollRef.current) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }

      const halfWidth = scrollRef.current.offsetWidth / 2;
      if (halfWidth > 0) {
        if (!isHoveredRef.current) {
          if (isReversedRef.current) {
            xRef.current += speed;
            if (xRef.current >= 0) {
              xRef.current -= halfWidth;
            }
          } else {
            xRef.current -= speed;
            if (xRef.current <= -halfWidth) {
              xRef.current += halfWidth;
            }
          }
          scrollRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);
  
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
    <div className="relative overflow-hidden bg-zinc-50 dark:bg-black">
      <h1 className="sr-only">InovexaBD | ISP Equipment, Enterprise Networking & Data Center Solutions</h1>
      <SEO
        title="INOVEXA Technologies | ISP Equipment, Enterprise Networking & Data Center Solutions"
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
              <Link to="/shop?category=networking" className="text-blue-700 dark:text-blue-400 font-semibold hover:underline">
                enterprise networking
              </Link>
              ,{' '}
              <Link to="/shop?category=servers" className="text-blue-700 dark:text-blue-400 font-semibold hover:underline">
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
                            <div className="flex items-center gap-0">
                              {HERO_SHOWCASE.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setHeroShowcaseIndex(i)}
                                  className="w-12 h-12 flex items-center justify-center focus:outline-none cursor-pointer"
                                  aria-label={`Go to showcase ${i + 1}`}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full transition-all ${heroShowcaseIndex === i ? `${showcaseDotPrimaryClass} w-3` : showcaseDotSecondaryClass}`} />
                                </button>
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

        {/* Trusted Technology Partners Logos (Brand Trust Signals) - Floating Plain Marquee */}
        <div className="container mx-auto px-[2%] md:px-6 max-w-6xl mb-12 relative z-20">
          <div className="relative w-full py-6 px-0 md:px-12 overflow-hidden">
            <div className="relative w-full overflow-hidden">
              <div className="flex w-full overflow-hidden">
                <div 
                  ref={scrollRef}
                  onClick={() => setIsMarqueeReversed(!isMarqueeReversed)}
                  onMouseEnter={() => { isHoveredRef.current = true; }}
                  onMouseLeave={() => { isHoveredRef.current = false; }}
                  className="flex items-center gap-16 whitespace-nowrap opacity-70 hover:opacity-100 transition-opacity duration-500 dark:opacity-80 dark:hover:opacity-100 cursor-pointer select-none w-max will-change-transform"
                >
                  <CiscoLogo />
                  <MikrotikLogo />
                  <UbiquitiLogo />
                  <JuniperLogo />
                  <HuaweiLogo />
                  <DellLogo />
                  <IntelLogo />
                  <HynixLogo />
                  <NvidiaLogo />
                  <HikvisionLogo />
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
                  <HynixLogo />
                  <NvidiaLogo />
                  <HikvisionLogo />
                  <SupermicroLogo />
                  <TplinkLogo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Screen Promotional Banner Slider */}
      <section className="relative min-h-[100vh] md:h-screen w-full overflow-hidden bg-zinc-50 dark:bg-black flex items-center">
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
         <div className="container mx-auto px-[3%] sm:px-6">
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
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop')] bg-cover opacity-15 dark:opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold text-black dark:text-white tracking-tight">Ready to Upgrade Your <br />Infrastructure?</h2>
              <p className="text-black/85 dark:text-white/75 text-lg">
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

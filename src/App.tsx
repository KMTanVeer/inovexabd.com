/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/src/context/ThemeContext.tsx';
import { Navbar } from '@/src/components/layout/Navbar.tsx';
import { Footer } from '@/src/components/layout/Footer.tsx';
import { BrandLogo } from '@/src/components/common/BrandLogo.tsx';
import { FloatingWhatsApp } from '@/src/components/common/FloatingWhatsApp.tsx';
import { CookieConsent } from '@/src/components/common/CookieConsent.tsx';
import { Home } from '@/src/pages/Home.tsx';
import { AdminLayout } from '@/src/components/layout/AdminLayout.tsx';

// Lazy-loaded components
const Shop = React.lazy(() => import('@/src/pages/Shop.tsx').then(m => ({ default: m.Shop })));
const ProductDetail = React.lazy(() => import('@/src/pages/ProductDetail.tsx').then(m => ({ default: m.ProductDetail })));
const Contact = React.lazy(() => import('@/src/pages/Contact.tsx').then(m => ({ default: m.Contact })));
const Categories = React.lazy(() => import('@/src/pages/Categories.tsx').then(m => ({ default: m.Categories })));
const Returns = React.lazy(() => import('@/src/pages/Returns.tsx').then(m => ({ default: m.Returns })));
const Shipping = React.lazy(() => import('@/src/pages/Shipping.tsx').then(m => ({ default: m.Shipping })));
const Privacy = React.lazy(() => import('@/src/pages/Privacy.tsx').then(m => ({ default: m.Privacy })));
const About = React.lazy(() => import('@/src/pages/About.tsx').then(m => ({ default: m.About })));
const NotFound = React.lazy(() => import('@/src/pages/NotFound.tsx').then(m => ({ default: m.NotFound })));
const AdminLogin = React.lazy(() => import('@/src/pages/admin/AdminLogin.tsx').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = React.lazy(() => import('@/src/pages/admin/AdminDashboard.tsx').then(m => ({ default: m.AdminDashboard })));
const AdminProducts = React.lazy(() => import('@/src/pages/admin/AdminProducts.tsx').then(m => ({ default: m.AdminProducts })));
const AdminCategories = React.lazy(() => import('@/src/pages/admin/AdminCategories.tsx').then(m => ({ default: m.AdminCategories })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTo(0, 0);
      document.body.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(t);
  }, [pathname]);
  return null;
}

// Lightweight loading fallback
function LoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black text-black dark:text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="animate-pulse">
          <BrandLogo variant="mark" className="scale-150" />
        </div>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-black/50 dark:text-white/50">
            Loading
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 animate-bounce" />
        </div>
      </div>
    </div>
  );
}

// Store Layout Component
function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50 text-black dark:bg-black dark:text-white">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="categories" element={<AdminCategories />} />
              </Route>
              
              {/* Public Store Routes */}
              <Route path="/*" element={
                <StoreLayout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </StoreLayout>
              } />
            </Routes>
          </Suspense>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@/src/context/ThemeContext.tsx';
import { Navbar } from '@/src/components/layout/Navbar.tsx';
import { Footer } from '@/src/components/layout/Footer.tsx';
import { FloatingWhatsApp } from '@/src/components/common/FloatingWhatsApp.tsx';
import { Home } from '@/src/pages/Home.tsx';
import { Shop } from '@/src/pages/Shop.tsx';
import { ProductDetail } from '@/src/pages/ProductDetail.tsx';
import { Contact } from '@/src/pages/Contact.tsx';
import { Categories } from '@/src/pages/Categories.tsx';
import { Returns } from '@/src/pages/Returns.tsx';
import { Shipping } from '@/src/pages/Shipping.tsx';
import { Privacy } from '@/src/pages/Privacy.tsx';
import { AdminLayout } from '@/src/components/layout/AdminLayout.tsx';
import { AdminLogin } from '@/src/pages/admin/AdminLogin.tsx';
import { AdminDashboard } from '@/src/pages/admin/AdminDashboard.tsx';
import { AdminProducts } from '@/src/pages/admin/AdminProducts.tsx';
import { AdminCategories } from '@/src/pages/admin/AdminCategories.tsx';

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

// Store Layout Component
function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <HelmetProvider>
        <Router>
          <ScrollToTop />
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
                  <Route path="/returns" element={<Returns />} />
                  <Route path="/shipping" element={<Shipping />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="*" element={<Home />} />
                </Routes>
              </StoreLayout>
            } />
          </Routes>
        </Router>
      </HelmetProvider>
    </ThemeProvider>
  );
}

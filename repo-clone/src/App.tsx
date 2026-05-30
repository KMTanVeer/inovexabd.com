/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
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

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
          <Navbar />
          <main>
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
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
    </HelmetProvider>
  );
}

import React from 'react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Shipping() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO title="Shipping & Delivery" description="Shipping timelines and networks across Bangladesh." url="https://inovexabd.com/shipping" />
      <div className="container mx-auto px-6 max-w-3xl space-y-6 leading-relaxed font-light">
        <h1 className="text-3xl font-bold font-display uppercase tracking-wider mb-8">Shipping & Delivery</h1>
        <p>Inovexa BD offers secure shipping across all divisions in Bangladesh, including specialized secure-handling transport for critical data center chassis.</p>
        <h3 className="text-xl font-bold uppercase tracking-wide pt-4">Dhaka Division</h3>
        <p>Delivery inside Dhaka is typically fulfilled within 24 to 48 hours via our dedicated logistics fleet.</p>
        <h3 className="text-xl font-bold uppercase tracking-wide pt-4">Other Divisions</h3>
        <p>For Chattogram, Sylhet, Khulna, Rajshahi, Rangpur, Barishal, and Mymensingh, we dispatch via premium couriers with insured tracking. Timeline: 2 to 4 business days.</p>
      </div>
    </div>
  );
}

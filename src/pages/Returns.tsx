import React from 'react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Returns() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO title="Returns & Refunds" description="Our return and refund policies at Inovexa BD." url="https://inovexabd.com/returns" />
      <div className="container mx-auto px-6 max-w-3xl space-y-6 leading-relaxed font-light">
        <h1 className="text-3xl font-bold font-display uppercase tracking-wider mb-8">Returns & Refunds</h1>
        <p>At Inovexa BD, customer satisfaction is our top priority. We offer dedicated return and replacement services for enterprise hardware.</p>
        <h3 className="text-xl font-bold uppercase tracking-wide pt-4">1. Return Timeline</h3>
        <p>Products can be submitted for diagnosis or return registration within 7 days of commercial receipt. All hardware must remain in original undamaged packaging.</p>
        <h3 className="text-xl font-bold uppercase tracking-wide pt-4">2. Technical Diagnostic</h3>
        <p>Since we stock professional-grade hardware, all return requests are subject to physical component auditing to prevent ESD static damage and firmware modification checks.</p>
      </div>
    </div>
  );
}

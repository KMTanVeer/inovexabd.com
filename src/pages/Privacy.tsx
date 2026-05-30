import React from 'react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Privacy() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO title="Privacy Policy" description="Information privacy commitment at Inovexa BD." url="https://inovexabd.com/privacy" />
      <div className="container mx-auto px-6 max-w-3xl space-y-6 leading-relaxed font-light">
        <h1 className="text-3xl font-bold font-display uppercase tracking-wider mb-8">Privacy Policy</h1>
        <p>Inovexa BD takes data confidentiality and cybersecurity seriously. This policy delineates how customer and procurement logs are managed.</p>
        <h3 className="text-xl font-bold uppercase tracking-wide pt-4">Data Collection</h3>
        <p>We log transaction names, phone numbers, and operational feedback when requested through our forms to assist in technical quote matching.</p>
        <h3 className="text-xl font-bold uppercase tracking-wide pt-4">Corporate Sharing</h3>
        <p>Under no circumstance do we trade, lease, or license consumer or commercial procurement details to external analytics trackers.</p>
      </div>
    </div>
  );
}

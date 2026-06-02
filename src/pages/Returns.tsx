import React from 'react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Returns() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
  <SEO
    title="Returns & Refunds"
    description="Returns, replacement, warranty, and refund policy for Inovexa Technologies."
  />

  <div className="container mx-auto px-6 max-w-4xl space-y-6 leading-relaxed font-light">
    <h1 className="text-3xl font-bold font-display uppercase tracking-wider mb-8">
      Returns & Refunds
    </h1>

    <p>
      At Inovexa Technologies, we strive to ensure every customer receives reliable,
      enterprise-grade hardware. If you encounter any issues with your purchase,
      please review our return and refund policy below.
    </p>

    <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
      1. Return Eligibility
    </h2>

    <p>
      Products may be reported for return, replacement, or technical inspection
      within 3 calendar days from the date of delivery.
    </p>

    <ul className="list-disc pl-6 space-y-2">
      <li>The product must be in its original condition.</li>
      <li>All accessories, manuals, cables, and packaging must be included.</li>
      <li>The product must not show signs of physical damage, misuse, or modification.</li>
      <li>Proof of purchase is required.</li>
    </ul>

    <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
      2. Technical Inspection
    </h2>

    <p>
      All returned products undergo technical inspection by our engineers.
      Enterprise hardware such as servers, network adapters, switches,
      storage devices, and transceivers are tested for:
    </p>

    <ul className="list-disc pl-6 space-y-2">
      <li>Physical damage</li>
      <li>Electrical or ESD damage</li>
      <li>Firmware modifications</li>
      <li>Component replacement or tampering</li>
      <li>Operational defects</li>
    </ul>

    <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
      3. Replacement Policy
    </h2>

    <p>
      If a product is confirmed defective and falls within the eligible return
      period, Inovexa Technologies may provide a replacement unit of the same model or an
      equivalent alternative, subject to stock availability.
    </p>

    <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
      4. Refund Policy
    </h2>

    <p>
      Refunds are only issued when a replacement cannot be provided or when
      approved by management after technical verification. Approved refunds are
      processed through the original payment method whenever possible.
    </p>

    <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
      5. Non-Returnable Items
    </h2>

    <ul className="list-disc pl-6 space-y-2">
      <li>Products damaged by misuse or improper installation.</li>
      <li>Products modified by unauthorized personnel.</li>
      <li>Items with missing accessories or packaging.</li>
      <li>Custom-configured hardware unless covered by warranty.</li>
    </ul>

    <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
      6. Contact Us
    </h2>

    <p>
      For return authorization or warranty support, please contact our support
      team before shipping any product. Unauthorized returns may be refused.
    </p>

    <p>
      Email: info@inovexabd.com
      <br />
      Website: www.inovexabd.com
    </p>
  </div>
</div>
  );
}

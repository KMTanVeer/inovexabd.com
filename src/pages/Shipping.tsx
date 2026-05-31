import React from 'react';
import { SEO } from '@/src/components/common/SEO.tsx';

export function Shipping() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <SEO
        title="Shipping & Delivery Policy"
        description="Shipping, delivery timelines, and logistics information for Inovexa Technologies."
      />

      <div className="container mx-auto px-6 max-w-5xl space-y-6 leading-relaxed font-light">
        <h1 className="text-3xl font-bold font-display uppercase tracking-wider mb-8">
          Shipping & Delivery
        </h1>

        <p>
          Inovexa Technologies provides reliable shipping services throughout
          Bangladesh for enterprise hardware, networking equipment, servers,
          storage systems, and related technology products.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          1. Order Processing
        </h2>

        <p>
          Orders are typically processed within 1 business day after payment
          confirmation and stock verification. Large enterprise orders may
          require additional preparation time depending on inventory,
          configuration, and testing requirements.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          2. Delivery Within Dhaka
        </h2>

        <p>
          Deliveries within Dhaka are generally completed within 24–48 hours,
          depending on product availability and delivery location.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          3. Delivery Outside Dhaka
        </h2>

        <p>
          Deliveries to Chattogram, Sylhet, Rajshahi, Khulna, Rangpur,
          Barishal, and Mymensingh are dispatched through trusted courier and
          logistics partners with tracking support.
        </p>

        <p>
          Estimated delivery time: 2–5 business days.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          4. Shipping Charges
        </h2>

        <p>
          Shipping charges may vary depending on package weight, dimensions,
          destination, and special handling requirements. Applicable shipping
          costs will be communicated before order confirmation.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          5. Enterprise & Bulk Orders
        </h2>

        <p>
          Large-scale enterprise deployments, server racks, storage arrays,
          networking infrastructure, and data-center equipment may require
          custom delivery arrangements, freight handling, and installation
          scheduling.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          6. Delivery Delays
        </h2>

        <p>
          While we strive to meet all estimated delivery times, delays may
          occur due to weather conditions, transportation disruptions, customs
          clearance, courier issues, public holidays, or other circumstances
          beyond our reasonable control.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          7. Delivery Inspection
        </h2>

        <p>
          Customers are encouraged to inspect packages upon delivery. Any
          visible damage, missing items, or shipping discrepancies should be
          reported within 24 hours of receiving the shipment.
        </p>

        <h2 className="text-xl font-bold uppercase tracking-wide pt-4">
          8. Contact Us
        </h2>

        <p>
          For shipping inquiries, order tracking, delivery assistance, or
          logistics-related questions, please contact Inovexa Technologies.
        </p>

        <p>
          Email: support@inovexabd.com
          <br />
          Website: www.inovexabd.com
        </p>

        <p className="text-sm opacity-70 pt-6">
          Last Updated: May 31, 2026
        </p>
      </div>
    </div>
  );
}

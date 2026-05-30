import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  keywords?: string;
  type?: 'website' | 'product' | 'article';
  structuredData?: Record<string, unknown>;
}

export function SEO({
  title = 'Inovexa Technology | Enterprise Networking Equipment',
  description = 'Inovexa Technology supplies enterprise networking equipment including switches, routers, LAN cards, SSD storage, servers, and data center hardware.',
  keywords = 'networking equipment, enterprise switches, routers, lan card, ssd, server hardware, bangladesh',
  url = 'https://inovexabd.com/',
  image = 'https://inovexabd.com/Hero-images/dell-server-hero.png',
  type = 'website',
  structuredData,
}: SEOProps) {
  const siteTitle = title.includes('Inovexa') ? title : `${title} | Inovexa BD`;

  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Inovexa BD" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Inovexa BD" />
      <meta property="og:locale" content="en_BD" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}

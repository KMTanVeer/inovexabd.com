import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  structuredData?: Record<string, unknown>;
}

export function SEO({ 
  title = "Inovexa Technology | Enterprise IT Infrastructure & Networking Solutions", 
  description = "Inovexa Technology is Bangladesh's leading provider of next-generation IT infrastructure, enterprise networking, and datacenter solutions.", 
  keywords = "Inovexa, networking equipment, switches, routers, LAN card, SSD, servers, datacenter solutions, enterprise networking, Bangladesh",
  image = "https://images.unsplash.com/photo-1558489106-2d6ec42da696?auto=format&fit=crop&q=80",
  url = "https://inovexabd.com",
  type = 'website',
  structuredData
}: SEOProps) {
  const siteTitle = title.includes('Inovexa') ? title : `${title} | Inovexa Technology`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Inovexa Technology" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Inovexa Technology" />
      <meta property="og:locale" content="en_BD" />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@inovexatech" />

      {/* Canonical Link */}
      <link rel="canonical" href={url} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

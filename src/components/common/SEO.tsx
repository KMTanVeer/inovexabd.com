import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string;
  type?: string;
  structuredData?: any;
  ogTitle?: string;
  ogDescription?: string;
  disableTitleSuffix?: boolean;
}

export function SEO({ title, description, url, image, keywords, type, structuredData, ogTitle, ogDescription, disableTitleSuffix }: SEOProps) {
  const fullTitle = disableTitleSuffix ? title : `${title} | InovexaBD`;
  const siteUrl = url || "https://www.inovexabd.com";
  let finalImage = image || "https://www.inovexabd.com/og-image.webp";
  if (finalImage.startsWith('/')) {
    finalImage = `https://www.inovexabd.com${finalImage}`;
  }

  const finalOgTitle = ogTitle || fullTitle;
  const finalOgDesc = ogDescription || description;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={siteUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDesc} />
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:site_name" content="InovexaBD" />
      <meta property="og:image" content={finalImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDesc} />
      <meta name="twitter:image" content={finalImage} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}

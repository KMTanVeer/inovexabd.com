import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
  keywords?: string;
  type?: string;
  structuredData?: any;
}

export function SEO({ title, description, url, image, keywords, type, structuredData }: SEOProps) {
  const fullTitle = `${title} | Inovexa BD`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type || 'website'} />
      <meta property="og:site_name" content="Inovexa BD" />
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

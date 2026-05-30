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
  return (
    <Helmet>
      <title>{title} | Inovexa BD</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {url && <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}

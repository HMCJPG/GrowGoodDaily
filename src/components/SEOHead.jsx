import { Helmet } from 'react-helmet-async';

/**
 * SEOHead — reusable per-page <head> meta component.
 *
 * Props:
 *   title        – page <title>
 *   description  – meta description (≤160 chars recommended)
 *   canonical    – canonical URL for the page
 *   ogType       – Open Graph type (default "website")
 *   ogImage      – absolute URL for og:image
 *   jsonLd       – optional additional JSON-LD structured data object
 *   noIndex      – if true, adds noindex directive
 */
export default function SEOHead({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = 'https://growgooddaily.com/images/hero-banner.png',
  jsonLd,
  noIndex = false,
  keywords,
}) {
  const siteName = 'Grow Good Daily';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD — accepts a single schema object or an array of them */}
      {jsonLd &&
        (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
    </Helmet>
  );
}

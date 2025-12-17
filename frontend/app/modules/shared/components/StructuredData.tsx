import { useEffect } from 'react';

interface StructuredDataProps {
  data: object | object[];
}

/**
 * StructuredData Component
 * 
 * Renders JSON-LD structured data in a script tag for SEO
 */
export default function StructuredData({ data }: StructuredDataProps) {
  useEffect(() => {
    // Structured data is rendered via script tag in the document
    // This component just ensures the data is available
  }, [data]);

  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(item, null, 0),
          }}
        />
      ))}
    </>
  );
}


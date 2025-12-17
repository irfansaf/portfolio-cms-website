import { Link } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb Navigation Component
 * 
 * Provides navigation hierarchy and improves SEO with BreadcrumbList structured data
 */
export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [
    { label: 'Home', href: '/' },
    ...items,
  ];

  // Generate structured data for BreadcrumbList
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${typeof window !== 'undefined' ? window.location.origin : ''}${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData, null, 0),
        }}
      />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          {allItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-muted-foreground" aria-hidden="true" />
              )}
              {item.href && index < allItems.length - 1 ? (
                <Link
                  to={item.href}
                  className="hover:text-primary transition-colors flex items-center gap-1"
                >
                  {index === 0 && <Home className="w-4 h-4" />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="text-foreground font-medium flex items-center gap-1" aria-current="page">
                  {index === 0 && <Home className="w-4 h-4" />}
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}


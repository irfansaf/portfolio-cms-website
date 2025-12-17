import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { initGoogleAnalytics, trackPageView } from '@/modules/shared/lib/analytics';

interface GoogleAnalyticsProps {
  measurementId?: string;
  enabled?: boolean;
}

/**
 * Google Analytics Component
 * 
 * Initializes Google Analytics and tracks page views
 * Set GA_MEASUREMENT_ID environment variable to enable
 */
export default function GoogleAnalytics({ 
  measurementId, 
  enabled = true 
}: GoogleAnalyticsProps) {
  const location = useLocation();
  
  // Get measurement ID from env or prop
  const gaId = measurementId || import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!enabled || !gaId || typeof window === 'undefined') return;

    // Initialize GA on mount
    initGoogleAnalytics(gaId);
  }, [gaId, enabled]);

  useEffect(() => {
    if (!enabled || !gaId || typeof window === 'undefined' || !window.gtag) return;

    // Track page view on route change
    trackPageView(location.pathname + location.search, document.title);
  }, [location, gaId, enabled]);

  return null;
}


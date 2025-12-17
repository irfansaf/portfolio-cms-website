/**
 * Analytics Utility Functions
 * 
 * Google Analytics and performance tracking utilities
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Initialize Google Analytics
 */
export function initGoogleAnalytics(measurementId: string) {
  if (typeof window === 'undefined' || !measurementId) return;

  // Load gtag script
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(...args: any[]) {
    window.dataLayer!.push(args);
  };

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    page_path: window.location.pathname,
  });
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', window.gtag, {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  eventName: string,
  eventParams?: {
    event_category?: string;
    event_label?: string;
    value?: number;
    [key: string]: any;
  }
) {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, eventParams);
}

/**
 * Track button click
 */
export function trackButtonClick(buttonName: string, location?: string) {
  trackEvent('button_click', {
    event_category: 'engagement',
    event_label: buttonName,
    location: location || window.location.pathname,
  });
}

/**
 * Track link click
 */
export function trackLinkClick(url: string, linkText?: string) {
  trackEvent('link_click', {
    event_category: 'outbound',
    event_label: linkText || url,
    link_url: url,
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean = true) {
  trackEvent('form_submit', {
    event_category: 'engagement',
    event_label: formName,
    value: success ? 1 : 0,
  });
}

/**
 * Track search
 */
export function trackSearch(searchTerm: string, resultsCount?: number) {
  trackEvent('search', {
    event_category: 'engagement',
    event_label: searchTerm,
    value: resultsCount,
  });
}

/**
 * Track download
 */
export function trackDownload(fileName: string, fileType?: string) {
  trackEvent('file_download', {
    event_category: 'engagement',
    event_label: fileName,
    file_type: fileType,
  });
}


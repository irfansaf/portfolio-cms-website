/**
 * Performance Monitoring Utilities
 * 
 * Core Web Vitals and performance tracking
 */

import type { Metric } from 'web-vitals';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export interface WebVitalsMetric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

/**
 * Get Core Web Vitals thresholds
 */
function getThresholds(metricName: string): { good: number; poor: number } {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
    FID: { good: 100, poor: 300 }, // First Input Delay
    CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
    FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
    TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  };

  return thresholds[metricName] || { good: 0, poor: Infinity };
}

/**
 * Rate a metric value
 */
function rateMetric(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const { good, poor } = getThresholds(metricName);
  
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Track Core Web Vitals
 */
export function trackWebVitals(
  onMetric: (metric: WebVitalsMetric) => void,
  analyticsId?: string
) {
  if (typeof window === 'undefined') return;

  type WebVitalsModule = {
    onCLS: (callback: (metric: Metric) => void) => void;
    onFID: (callback: (metric: Metric) => void) => void;
    onFCP: (callback: (metric: Metric) => void) => void;
    onLCP: (callback: (metric: Metric) => void) => void;
    onTTFB: (callback: (metric: Metric) => void) => void;
    onINP?: (callback: (metric: Metric) => void) => void;
  };

  import('web-vitals').then((webVitals: WebVitalsModule) => {
    const { onCLS, onFID, onFCP, onLCP, onTTFB, onINP } = webVitals;
    // Largest Contentful Paint
    onLCP((metric: Metric) => {
      const rating = rateMetric('LCP', metric.value);
      onMetric({
        name: 'LCP',
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating,
      });

      // Send to analytics if available
      if (analyticsId && window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(metric.value),
          non_interaction: true,
        });
      }
    });

    // First Input Delay / Interaction to Next Paint
    if (onINP) {
      onINP((metric: Metric) => {
        const rating = rateMetric('INP', metric.value);
        onMetric({
          name: 'INP',
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          rating,
        });
      });
    } else if (onFID) {
      onFID((metric: Metric) => {
        const rating = rateMetric('FID', metric.value);
        onMetric({
          name: 'FID',
          value: metric.value,
          id: metric.id,
          delta: metric.delta,
          rating,
        });
      });
    }

    // Cumulative Layout Shift
    onCLS((metric: Metric) => {
      const rating = rateMetric('CLS', metric.value);
      onMetric({
        name: 'CLS',
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating,
      });
    });

    // First Contentful Paint
    onFCP((metric: Metric) => {
      const rating = rateMetric('FCP', metric.value);
      onMetric({
        name: 'FCP',
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating,
      });
    });

    // Time to First Byte
    onTTFB((metric: Metric) => {
      const rating = rateMetric('TTFB', metric.value);
      onMetric({
        name: 'TTFB',
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
        rating,
      });
    });
  }).catch((error) => {
    if (import.meta.env.DEV) {
      console.warn(
        '⚠️ web-vitals package not found. Install it with: npm install web-vitals',
        error
      );
    }
  });
}

/**
 * Get performance timing metrics
 */
export function getPerformanceMetrics(): PerformanceMetric[] {
  if (typeof window === 'undefined' || !window.performance) {
    return [];
  }

  const timing = window.performance.timing;

  const metrics: PerformanceMetric[] = [];

  // DNS lookup time
  if (timing.domainLookupEnd && timing.domainLookupStart) {
    metrics.push({
      name: 'DNS Lookup',
      value: timing.domainLookupEnd - timing.domainLookupStart,
      unit: 'ms',
    });
  }

  // Connection time
  if (timing.connectEnd && timing.connectStart) {
    metrics.push({
      name: 'Connection Time',
      value: timing.connectEnd - timing.connectStart,
      unit: 'ms',
    });
  }

  // Time to First Byte
  if (timing.responseStart && timing.requestStart) {
    metrics.push({
      name: 'TTFB',
      value: timing.responseStart - timing.requestStart,
      unit: 'ms',
    });
  }

  // DOM Content Loaded
  if (timing.domContentLoadedEventEnd && timing.navigationStart) {
    metrics.push({
      name: 'DOM Content Loaded',
      value: timing.domContentLoadedEventEnd - timing.navigationStart,
      unit: 'ms',
    });
  }

  // Page Load
  if (timing.loadEventEnd && timing.navigationStart) {
    metrics.push({
      name: 'Page Load',
      value: timing.loadEventEnd - timing.navigationStart,
      unit: 'ms',
    });
  }

  return metrics;
}

/**
 * Log performance metrics to console (dev only)
 */
export function logPerformanceMetrics() {
  if (import.meta.env.DEV && typeof window !== 'undefined') {
    const metrics = getPerformanceMetrics();
    console.group('🚀 Performance Metrics');
    metrics.forEach((metric) => {
      console.log(`${metric.name}: ${metric.value}${metric.unit}`);
    });
    console.groupEnd();
  }
}


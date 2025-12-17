import { useEffect } from 'react';
import { trackWebVitals, logPerformanceMetrics } from '@/modules/shared/lib/performance';

interface PerformanceMonitorProps {
  enabled?: boolean;
  sendToAnalytics?: boolean;
  analyticsId?: string;
  logToConsole?: boolean;
}

/**
 * Performance Monitor Component
 * 
 * Tracks Core Web Vitals and performance metrics
 * Can send to Google Analytics and/or log to console
 */
export default function PerformanceMonitor({
  enabled = true,
  sendToAnalytics = false,
  analyticsId,
  logToConsole = import.meta.env.DEV,
}: PerformanceMonitorProps) {
  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // Log basic performance metrics
    if (logToConsole) {
      logPerformanceMetrics();
    }

    // Track Core Web Vitals
    trackWebVitals(
      (metric) => {
        // Log to console in dev
        if (logToConsole) {
          const emoji = metric.rating === 'good' ? '✅' : metric.rating === 'needs-improvement' ? '⚠️' : '❌';
          console.log(
            `${emoji} ${metric.name}: ${Math.round(metric.value)}${metric.name === 'CLS' ? '' : 'ms'} (${metric.rating})`
          );
        }

        // Send to analytics if enabled
        if (sendToAnalytics && analyticsId && window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: metric.name,
            value: Math.round(metric.value),
            metric_rating: metric.rating,
            non_interaction: true,
          });
        }
      },
      sendToAnalytics ? analyticsId : undefined
    );
  }, [enabled, sendToAnalytics, analyticsId, logToConsole]);

  return null;
}


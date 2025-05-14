import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag as a global function
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer: any[];
  }
}

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'G-XG9FF7XG1G', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventParams);
  }
};
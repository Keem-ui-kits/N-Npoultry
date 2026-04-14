'use client';

import { useState, useEffect } from 'react';

export function useSiteLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    
    if (document.readyState === 'complete') {
      setIsLoaded(true);
      return undefined;
    } else {
      const handleLoad = () => setIsLoaded(true);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return isLoaded;
}

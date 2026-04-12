'use client';

import { useEffect } from 'react';

export function HashScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (!target) return;
      // Calculate offset: navbar height (80px) + extra padding (40px)
      const offset = 120;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    };

    const id = setTimeout(scrollToHash, 500);
    window.addEventListener('hashchange', scrollToHash);
    return () => {
      clearTimeout(id);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, []);

  return null;
}

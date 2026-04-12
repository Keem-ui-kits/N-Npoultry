'use client';

import { useEffect } from 'react';

export function HashScrollHandler() {
  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const target = document.querySelector(hash);
      if (!target) return;
      const offsetPosition = target.getBoundingClientRect().top + window.pageYOffset - 120;
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

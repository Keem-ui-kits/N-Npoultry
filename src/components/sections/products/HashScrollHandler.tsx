'use client';

import { useEffect } from 'react';

export function HashScrollHandler() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    // Navbar height (h-20 = 80px when scrolled) + breathing room
    const NAVBAR = 88;

    const jump = () => {
      const el = document.getElementById(id);
      if (!el) return false;
      const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR;
      window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
      return true;
    };

    if (jump()) return;

    // Element not in DOM yet — poll until it appears (max ~1s)
    let attempts = 0;
    const interval = setInterval(() => {
      if (jump() || ++attempts > 20) clearInterval(interval);
    }, 50);

    return () => { clearInterval(interval); };
  }, []);

  return null;
}

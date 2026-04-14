'use client';

import { useState, useEffect } from 'react';

/**
 * Returns true after the component has mounted on the client.
 * Use this to avoid SSR/hydration mismatches for client-only content,
 * NOT as a gate on window.load (which blocks content until everything loads).
 */
export function useSiteLoaded() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}

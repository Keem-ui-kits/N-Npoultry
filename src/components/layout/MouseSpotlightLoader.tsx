'use client';

import dynamic from 'next/dynamic';

const MouseSpotlight = dynamic(() => import('./MouseSpotlight'), { ssr: false });

export function MouseSpotlightLoader() {
  return <MouseSpotlight />;
}

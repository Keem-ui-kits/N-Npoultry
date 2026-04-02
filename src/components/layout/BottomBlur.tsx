'use client';

import React from 'react';

/**
 * A fixed-bottom overlay that provides a "gradual blur" effect.
 * Content scrolling underneath will gradually blur as it reaches the bottom edge.
 */
export default function BottomBlur() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => { window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 h-24 sm:h-32 md:h-40 pointer-events-none z-[9999] backdrop-blur-md transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
      style={{
        WebkitMaskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0) 100%)',
        maskImage: 'linear-gradient(to top, black 0%, rgba(0,0,0,0) 100%)',
      }}
    />
  );
}

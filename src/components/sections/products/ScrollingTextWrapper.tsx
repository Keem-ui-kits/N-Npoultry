'use client';

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useState, useEffect } from 'react';
import ScrollingBackgroundText from '@/components/layout/ScrollingBackgroundText';

interface ScrollingTextWrapperProps {
  containerRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ScrollingTextWrapper({
  containerRef,
  children,
  className,
  style,
}: ScrollingTextWrapperProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [containerRef]);

  return (
    <ScrollingBackgroundText progress={progress} className={className} style={style}>
      {children}
    </ScrollingBackgroundText>
  );
}

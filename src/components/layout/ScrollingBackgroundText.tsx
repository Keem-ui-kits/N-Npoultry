'use client';

import React from 'react';

interface ScrollingBackgroundTextProps {
  progress: number;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function ScrollingBackgroundText({
  progress,
  className,
  style,
  children,
}: ScrollingBackgroundTextProps) {
  const xOffset = -progress * 50;

  return (
    <div
      className={className}
      style={{
        ...style,
        transform: `translateX(${xOffset.toString()}%)`,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

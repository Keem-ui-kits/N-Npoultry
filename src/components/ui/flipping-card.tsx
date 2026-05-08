import React from "react";
import { cn } from "@/lib/utils";

interface FlippingCardProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 300,
  width = 350,
}: FlippingCardProps) {
  return (
    <div
      className="group/flipping-card [perspective:1000px] w-full"
      style={
        {
          "--height": typeof height === 'number' ? `${height}px` : height,
          "--width": typeof width === 'number' ? `${width}px` : width,
        } as React.CSSProperties
      }
    >
      <div
        className={cn(
          "relative rounded-[2.5rem] border border-white/8 bg-white/5 shadow-2xl transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)]",
          "h-[var(--height)] w-[var(--width)] max-w-full",
          className
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] overflow-hidden bg-background text-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)]">
          <div className="h-full w-full">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] overflow-hidden bg-background text-foreground [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="h-full w-full">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}

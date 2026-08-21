"use client";

import { useEffect, useRef } from "react";
import { EASE_EDITORIAL, DURATION, STAGGER, prefersReducedMotion } from "@/lib/motion";

type RevealProps = React.PropsWithChildren<{
  className?: string;
  /** rise distance in px */
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  id?: string;
}>;

/** Fades + lifts a section on scroll entry. 2–7 direct children stagger automatically. */
export function Reveal({ className, y = 30, as = "div", style, id, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const kids = Array.from(el.children) as HTMLElement[];
    const inStagger = (n: HTMLElement[]) => n.length >= 2 && n.length <= 7;
    const nested = kids.length === 1 ? (Array.from(kids[0].children) as HTMLElement[]) : null;
    const targets = inStagger(kids) ? kids : nested && inStagger(nested) ? nested : [el];

    targets.forEach((t) => {
      t.style.opacity = "0";
      t.style.transform = `translateY(${y}px)`;
      t.style.transition = `opacity ${DURATION.editorial}s ${EASE_EDITORIAL}, transform ${DURATION.editorial}s ${EASE_EDITORIAL}`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          targets.forEach((t, i) => {
            window.setTimeout(() => {
              t.style.opacity = "1";
              t.style.transform = "none";
            }, i * STAGGER * 1000);
          });
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [y]);

  const Comp = as as React.ElementType;
  return (
    <Comp ref={ref} className={className} style={style} id={id}>
      {children}
    </Comp>
  );
}

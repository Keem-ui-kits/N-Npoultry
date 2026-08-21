"use client";

import { useEffect, useRef } from "react";
import { EASE_EDITORIAL, DURATION, prefersReducedMotion } from "@/lib/motion";

type ChapterProps = React.PropsWithChildren<{
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  style?: React.CSSProperties;
  id?: string;
}>;

const RULE_MS = DURATION.editorial * 1000 + 100;
const IMAGE_MS = DURATION.sequence * 1000 - 200;

/**
 * Product-chapter entrance, per motion.js `armChapter`: the accent rule grows from
 * zero, the lead image settles from scale(1.05), and the block fades in.
 */
export function Chapter({ className, as = "article", style, id, children }: ChapterProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const rule = el.querySelector<HTMLElement>("[data-accent-rule]");
    const img = el.querySelector<HTMLImageElement>("img");

    const ruleWidth = rule ? rule.getBoundingClientRect().width || 34 : 0;
    if (rule) {
      rule.style.width = "0px";
      rule.style.transition = `width ${RULE_MS}ms ${EASE_EDITORIAL}`;
    }
    if (img) {
      img.style.transform = "scale(1.05)";
      img.style.transition = `transform ${IMAGE_MS}ms ${EASE_EDITORIAL}`;
    }
    el.style.opacity = "0";
    el.style.transition = `opacity ${DURATION.editorial * 1000}ms ${EASE_EDITORIAL}`;

    let ruleTimer = 0;
    let imgTimer = 0;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          el.style.opacity = "1";
          if (rule) {
            ruleTimer = window.setTimeout(() => {
              rule.style.width = `${ruleWidth}px`;
            }, 120);
          }
          if (img) {
            img.style.transform = "scale(1)";
            // Hand the image back to the CSS hover-zoom once it has settled;
            // leaving the inline transform in place would outrank :hover.
            imgTimer = window.setTimeout(() => {
              img.style.transform = "";
              img.style.transition = "";
            }, IMAGE_MS + 50);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(ruleTimer);
      window.clearTimeout(imgTimer);
    };
  }, []);

  const Comp = as as React.ElementType;
  return (
    <Comp ref={ref} className={className} style={style} id={id}>
      {children}
    </Comp>
  );
}

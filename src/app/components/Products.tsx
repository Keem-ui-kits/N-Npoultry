"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import ScrollingBackgroundText from "./ScrollingBackgroundText";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: "table-eggs",
    title: "Table",
    titleAccent: "Eggs",
    description: "Fresh eggs, collected from the farm, delivered the same day. Table eggs: sold by 30pc trays — ideal for home cooks and food businesses. Inspected and hygienically packed.",
    details: [
      "Available in 30pc egg trays",
      "Bulk cases for commercial buyers",
    ],
    image: "/8d43f32ee29ce1ba7b0a00df4df0e6f74b348bc7.png",
    color: "#eccc74",
    gradient: "from-[#eccc74] to-[#f59268]",
  },
  {
    id: "poultry-manure",
    title: "Poultry",
    titleAccent: "Manure",
    description: "Bagged organic fertilizer — nutrient-rich for gardens, farms, and commercial agriculture. Available in bulk sacks for large-scale operations.",
    details: [
      "Rich in nitrogen & phosphorus",
      "Ideal for gardens & commercial farms",
      "Available in 70kg bulk sacks and FH truck",
    ],
    image: "/manure-bags.png",
    color: "#4ade80",
    gradient: "from-[#4ade80] to-[#059669]",
  },
  {
    id: "ex-layer-hens",
    title: "Ex-Layer",
    titleAccent: "Hens",
    description: "Healthy hens sold at end of laying cycle — suitable for meat use or re-homing. Our hens are raised with care, fed nutritious feed, and housed in clean, well-ventilated environments.",
    details: [
      "Well-fed & veterinary-inspected",
      "Sold live for meat or rehoming",
      "Bulk lots available for businesses",
    ],
    image: "/chicken-meat-hen-poule-pondeuse-rooster-chicken-f462ed313cbf18f43a239a49cbb07f74.png",
    color: "#ef4444",
    gradient: "from-[#ef4444] to-[#e11d48]",
  },
];

interface ProductCardProps {
  product: typeof products[0];
  index: number;
  isMobile: boolean;
}

function ProductCard({ product, index, isMobile }: ProductCardProps) {
  const rangeStart = index * 0.3;
  const rangeEnd = (index + 1) * 0.3;

  const enterStart = index === 0 ? (isMobile ? 0.02 : 0.02) : (isMobile ? rangeStart - 0.05 : rangeStart - 0.1);
  const enterEnd = index === 0 ? (isMobile ? 0.12 : 0.15) : (isMobile ? rangeStart + 0.03 : rangeStart + 0.05);
  const exitStart = isMobile ? rangeEnd - 0.03 : rangeEnd - 0.05;
  const exitEnd = isMobile ? rangeEnd + 0.05 : rangeEnd + 0.05;

  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const mousePos = useRef({ x: 0, y: 0 });
  const contentRotateX = useRef(0);
  const contentRotateY = useRef(0);

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;
  const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
    if (value <= inMin) return outMin;
    if (value >= inMax) return outMax;
    const t = (value - inMin) / (inMax - inMin);
    return lerp(outMin, outMax, t);
  };

  const getValue = (progress: number, ranges: number[], values: number[]) => {
    if (progress <= ranges[0]) return values[0];
    if (progress >= ranges[ranges.length - 1]) return values[values.length - 1];

    for (let i = 0; i < ranges.length - 1; i++) {
      if (progress >= ranges[i] && progress <= ranges[i + 1]) {
        return mapRange(progress, ranges[i], ranges[i + 1], values[i], values[i + 1]);
      }
    }
    return values[0];
  };

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      const container = cardRef.current?.closest("section");
      if (!container) return;

      let targetRotateX = 0;
      let targetRotateY = 0;
      let rafId: number | null = null;

      const updateMouseRotation = () => {
        if (contentRef.current && !isMobile) {
          contentRotateX.current = lerp(contentRotateX.current, targetRotateX, 0.1);
          contentRotateY.current = lerp(contentRotateY.current, targetRotateY, 0.1);

          gsap.set(contentRef.current, {
            rotateX: contentRotateX.current,
            rotateY: contentRotateY.current,
          });
        }

        if (Math.abs(contentRotateX.current - targetRotateX) > 0.01 || Math.abs(contentRotateY.current - targetRotateY) > 0.01) {
          rafId = requestAnimationFrame(updateMouseRotation);
        } else {
          rafId = null;
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef.current || isMobile) return;

        if (!rafId) {
          rafId = requestAnimationFrame(() => {
            if (!cardRef.current) return;

            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            mousePos.current = {
              x: e.clientX - centerX,
              y: e.clientY - centerY,
            };

            targetRotateX = mapRange(mousePos.current.y, -300, 300, 5, -5);
            targetRotateY = mapRange(mousePos.current.x, -300, 300, -5, 5);

            updateMouseRotation();
            rafId = null;
          });
        }
      };

      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;

          const opacity = getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [0, 1, 1, 0]);
          
          const x = isMobile ? 0 : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [1920, 96, -96, -1920]);
          const y = isMobile ? getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [100, 0, 0, -100]) : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [540, 22, -22, -540]);
          const rotateY = isMobile ? 0 : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [45, 5, -5, -45]);
          const rotateZ = isMobile ? 0 : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [10, 2, -2, -10]);
          const z = isMobile ? 0 : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [-1200, 0, 100, -1200]);
          const scale = isMobile ? getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [0.9, 1, 1, 0.9]) : getValue(p, [enterStart, enterEnd, exitStart, exitEnd], [0.6, 1, 1.05, 0.6]);

          const contentParallaxX = isMobile ? 0 : mapRange(p, enterStart, exitEnd, 100, -100);
          const titleParallaxX = isMobile ? 0 : mapRange(p, enterStart, exitEnd, 200, -200);

          if (cardRef.current) {
            gsap.set(cardRef.current, {
              opacity,
              x,
              y,
              rotateY,
              rotateZ,
              z,
              scale,
              transformPerspective: 1000,
              zIndex: 10 - index,
            });
          }

          if (titleRef.current) {
            gsap.set(titleRef.current, {
              x: titleParallaxX,
              translateZ: 40,
            });
          }

          if (paraRef.current) {
            gsap.set(paraRef.current, {
              x: contentParallaxX,
              translateZ: 30,
            });
          }

          if (detailsRef.current) {
            gsap.set(detailsRef.current, {
              x: contentParallaxX,
              translateZ: 25,
            });
          }

          if (imageRef.current) {
            gsap.set(imageRef.current, {
              translateZ: 50,
              rotateY: contentParallaxX / 10,
            });
          }
        },
      });

      if (cardRef.current && !isMobile) {
        cardRef.current.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      return () => {
        if (cardRef.current) {
          cardRef.current.removeEventListener("mousemove", handleMouseMove);
        }
        if (rafId) {
          cancelAnimationFrame(rafId);
        }
      };
    }, cardRef);

    return () => ctx.revert();
  }, [index, isMobile]);

  return (
    <div
      ref={cardRef}
      className="absolute top-20 md:top-auto w-[92vw] sm:w-[85vw] max-w-6xl h-auto md:h-[65vh] flex flex-col md:flex-row overflow-visible rounded-3xl bg-[#f8f8f8] shadow-2xl origin-center perspective-1000 border border-gray-200"
      style={{
        willChange: "transform, opacity",
        transformStyle: "preserve-3d",
      }}
    >
      <div
        ref={contentRef}
        className="flex-1 p-8 md:p-12 flex flex-col justify-center relative z-10"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h3
          ref={titleRef}
          className="text-[#133240] text-3xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight"
          style={{ transformStyle: "preserve-3d" }}
        >
          {product.title}{" "}
          <span className="text-transparent" style={{ WebkitTextStroke: "1px #133240" }}>
            {product.titleAccent}
          </span>
        </h3>

        <p
          ref={paraRef}
          className="text-[#133240] text-base md:text-lg lg:text-xl leading-relaxed mb-6 md:mb-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          {product.description}
        </p>

        <div
          ref={detailsRef}
          className="flex flex-col gap-3"
          style={{ transformStyle: "preserve-3d" }}
        >
          {product.details.map((detail, i) => (
            <div key={i} className="flex items-start gap-3 text-[#133240] text-sm md:text-base lg:text-lg font-medium">
              <span className="mt-1">✦</span>
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden md:overflow-visible" style={{ transformStyle: "preserve-3d" }}>
         <div ref={imageRef} className="relative w-full h-[300px] md:h-full flex items-center justify-center pointer-events-none drop-shadow-2xl">
           <img
             src={product.image}
             alt={product.title}
             className="object-contain max-w-[120%] max-h-[120%] scale-110"
           />
         </div>
      </div>
    </div>
  );
}

interface NavigationDotProps {
  product: typeof products[0];
  index: number;
  containerRef: React.RefObject<HTMLElement | null>;
}

function NavigationDot({ product, index, containerRef }: NavigationDotProps) {
  const dotRef = useRef<HTMLDivElement>(null);
  const rangeStart = index * 0.3;
  const rangeEnd = index * 0.3 + 0.3;

  const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

  useEffect(() => {
    if (!dotRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom-=150vh top",
        scrub: true,
        onUpdate: (self) => {
          if (!dotRef.current) return;

          const p = self.progress;
          const centerProgress = (rangeStart + rangeEnd) / 2;
          const distanceFromCenter = Math.abs(p - centerProgress);
          const maxDistance = (rangeEnd - rangeStart) / 2;

          const mappedProgress = Math.max(0, Math.min(1, 1 - distanceFromCenter / maxDistance));
          const easedProgress = Math.pow(mappedProgress, 0.7);

          const scale = lerp(1, 1.5, easedProgress);
          const r1 = parseInt(product.color.slice(1, 3), 16);
          const g1 = parseInt(product.color.slice(3, 5), 16);
          const b1 = parseInt(product.color.slice(5, 7), 16);

          const r = Math.round(lerp(200, r1, easedProgress));
          const g = Math.round(lerp(200, g1, easedProgress));
          const b = Math.round(lerp(200, b1, easedProgress));
          const a = lerp(0.3, 1, easedProgress);

          gsap.set(dotRef.current, {
            scale: scale,
            backgroundColor: `rgba(${r},${g},${b},${a})`,
          });
        },
      });
    }, dotRef);

    return () => ctx.revert();
  }, [index, product.color]);

  return (
    <button key={product.id} className="relative group cursor-default">
      <div
        ref={dotRef}
        className="w-3 h-3 rounded-full bg-black/20 group-hover:bg-black/40 transition-colors"
      />
      <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono whitespace-nowrap bg-white px-2 py-1 rounded shadow-md border border-gray-200 text-[#133240]">
        {product.title}
      </div>
    </button>
  );
}

function ScrollingBackgroundTextWrapper({
  containerRef,
  children,
  className,
  style,
}: {
  containerRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    return () => scrollTrigger.kill();
  }, [containerRef]);

  return (
    <ScrollingBackgroundText progress={progress} className={className} style={style}>
      {children}
    </ScrollingBackgroundText>
  );
}

export function Products() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);

    if (containerRef.current && titleRef.current) {
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "top+=15% top",
          scrub: true,
        },
        opacity: 0,
        y: -150,
        scale: 0.9,
        filter: "blur(4px)",
      });
    }

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="products" 
      className="relative h-[600vh] w-full bg-gradient-to-b from-white to-[#f8f9fa] dark:from-background dark:to-muted/20"
    >
      <div className="sticky overflow-hidden top-0 h-screen flex items-center justify-center">
        
        {/* Navigation Dots */}
        <div className="absolute bottom-6 sm:bottom-12 left-4 sm:left-1/2 sm:-translate-x-1/2 z-50 flex items-center gap-4 bg-white/40 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/50">
          {products.map((product, index) => (
            <NavigationDot
              key={product.id}
              product={product}
              index={index}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Scrolling Background Text */}
        <ScrollingBackgroundTextWrapper
          containerRef={containerRef}
          className="absolute bottom-0 h-full leading-[100vh] flex justify-center whitespace-nowrap text-[15vh] sm:text-[25vw] md:text-[35vw] font-black text-transparent select-none pointer-events-none left-0 opacity-10"
          style={{
            WebkitTextStroke: "2px #133240",
            y: "10%"
          }}
        >
          N&amp;N POULTRY PALACE &bull; N&amp;N POULTRY PALACE &bull;{" "}
        </ScrollingBackgroundTextWrapper>

        {/* Section Title (pinned briefly) */}
        <div ref={titleRef} className="absolute top-12 md:top-24 left-4 md:left-12 z-20">
          <h2 className="text-[#133240] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight uppercase">
            THREE PRODUCTS, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#eccc74] to-[#f59268]">ONE TRUSTED</span> SOURCE
          </h2>
        </div>

        {/* 3D Product Cards */}
        <div className="relative w-full h-full flex items-center justify-center perspective-distant overflow-visible pt-16">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isMobile={isMobile}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

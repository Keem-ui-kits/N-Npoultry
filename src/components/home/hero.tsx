"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowButton } from "@/components/ui/arrow-button";
import { StatusDot } from "@/components/ui/status-dot";
import { Container } from "@/components/ui/container";
import { useNairobiTime } from "@/components/ui/use-nairobi-time";
import { prefersReducedMotion } from "@/lib/motion";

const slides = [
  {
    slug: "table-eggs",
    title: (
      <>
        <span>Every egg, every day, </span>
        <br className="hidden md:inline" />
        <span>done right.</span>
      </>
    ),
    eyebrow: "01 / Table Eggs",
    description: "Eggs laid here, graded here, dispatched from here. No cold storage, no middlemen — a family farm in Machakos County that has been getting the ordinary thing right since 2021.",
    accent: "var(--color-gold)",
    imageUrl: "/assets/education/grading-of-eggs.jpeg",
    primaryCta: "/order",
    primaryText: "Order Table Eggs",
    secondaryCta: "/inside-the-farm",
    secondaryText: "Explore the Farm",
  },
  {
    slug: "poultry-manure",
    title: (
      <>
        <span>What the barn </span>
        <br className="hidden md:inline" />
        <span>gives the soil.</span>
      </>
    ),
    eyebrow: "02 / Poultry Manure",
    description: "Bagged organic fertilizer, nutrient-rich for gardens, farms and commercial agriculture. Naturally sun-dried, with nothing added — a circular farm in Machakos.",
    accent: "var(--color-sage)",
    imageUrl: "/assets/education/poultry-manure.png",
    primaryCta: "/order",
    primaryText: "Order Manure",
    secondaryCta: "/products#poultry-manure",
    secondaryText: "Manure Details",
  },
  {
    slug: "ex-layer-hens",
    title: (
      <>
        <span>The end of </span>
        <br className="hidden md:inline" />
        <span>a good cycle.</span>
      </>
    ),
    eyebrow: "03 / Ex-Layer Hens",
    description: "Healthy hens sold at the end of their laying cycle — suitable for meat use or traditional cooking. Raised with care, fed well, housed clean on our family farm.",
    accent: "var(--color-terracotta)",
    imageUrl: "/assets/education/layer-hens.jpeg",
    primaryCta: "/order",
    primaryText: "Enquire on Hens",
    secondaryCta: "/products#ex-layer-hens",
    secondaryText: "Hens Details",
  },
];

export function HomeHero() {
  const imgRef = useRef<HTMLDivElement>(null);
  const time = useNairobiTime();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const SLIDE_DURATION = 6000;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = imgRef.current;
    if (!el) return;
    const amt = 24;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        if (window.innerWidth < 900) return;
        const prog = window.scrollY / window.innerHeight;
        el.style.transform = `translate3d(0, ${(prog * amt).toFixed(2)}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const slideTimeout = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => {
      clearInterval(slideTimeout);
    };
  }, [currentIndex, isPaused, nextSlide]);

  const currentSlide = slides[currentIndex];

  return (
    <section
      className="relative flex flex-col justify-end overflow-hidden"
      style={{ minHeight: "100dvh", background: "var(--color-dark)" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic Full Screen Backgrounds with elegant Cross-Fade */}
      <div ref={imgRef} className="absolute" style={{ inset: "-34px 0" }}>
        {slides.map((slide, i) => (
          <div
            key={slide.slug}
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              opacity: i === currentIndex ? 1 : 0,
              zIndex: i === currentIndex ? 1 : 0,
              transform: i === currentIndex ? "scale(1)" : "scale(1.05)",
            }}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.slug}
              fill
              priority={i === 0}
              sizes="100vw"
              style={{
                objectFit: "cover",
                objectPosition: "50% 50%",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(17,17,17,.92) 0%, rgba(17,17,17,.68) 44%, rgba(17,17,17,.2) 78%, rgba(17,17,17,.3) 100%)",
              }}
            />
          </div>
        ))}
      </div>

      <div
        className="relative grid grid-cols-12 gap-8"
        style={{
          padding: "clamp(110px, 14vh, 180px) clamp(20px, 4vw, 56px) clamp(28px, 4vh, 40px)",
          alignContent: "center",
          flex: 1,
          maxWidth: "var(--container-site)",
          margin: "0 auto",
          width: "100%",
          zIndex: 10,
        }}
      >
        <div className="col-span-12 md:col-span-10 lg:col-span-9 xl:col-span-8">
          {/* Eyebrow / Slug */}
          <div 
            key={`eyebrow-${currentIndex}`}
            className="nn-hero-in flex items-center gap-3.5" 
            style={{ marginBottom: "clamp(18px, 2.5vh, 34px)", animationDelay: ".15s" }}
          >
            <span style={{ width: 44, height: 1, background: currentSlide.accent, display: "inline-block", transition: "background-color 0.8s ease" }} />
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".24em", color: currentSlide.accent, transition: "color 0.8s ease" }}>
              {currentSlide.eyebrow}
            </span>
          </div>

          {/* Dynamic Title */}
          <h1
            key={`title-${currentIndex}`}
            className="nn-hero-in"
            style={{
              margin: 0,
              fontSize: "clamp(34px, 7vw, 100px)",
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: "-.038em",
              color: "var(--color-cream)",
              textWrap: "pretty",
              animationDelay: ".25s",
            }}
          >
            {currentSlide.title}
          </h1>

          {/* Dynamic Description */}
          <p
            key={`desc-${currentIndex}`}
            className="nn-hero-in"
            style={{
              marginTop: "clamp(16px, 2.4vh, 28px)",
              maxWidth: "46ch",
              fontSize: "clamp(15px, 1.3vw, 21px)",
              lineHeight: 1.55,
              color: "rgba(245,240,232,.75)",
              animationDelay: ".35s",
            }}
          >
            {currentSlide.description}
          </p>

          {/* Dynamic Action Buttons */}
          <div 
            key={`buttons-${currentIndex}`}
            className="nn-hero-in flex flex-wrap gap-3.5 md:gap-4" 
            style={{ marginTop: "clamp(22px, 3.2vh, 38px)", animationDelay: ".45s" }}
          >
            <ArrowButton href={currentSlide.primaryCta} variant="primary" size="hero">
              {currentSlide.primaryText}
            </ArrowButton>
            <ArrowButton href={currentSlide.secondaryCta} variant="secondary" size="hero" onDark>
              {currentSlide.secondaryText}
            </ArrowButton>
          </div>
        </div>


      </div>

      {/* Farm Status bottom strip (desktop only, omitted on mobile so hero fits in 1 screen) */}
      <div
        className="relative hidden md:block"
        style={{
          borderTop: "1px solid rgba(245,240,232,.12)",
          background: "rgba(17,17,17,.62)",
          zIndex: 10,
        }}
      >
        <Container
          className="flex flex-wrap items-center justify-between"
          style={{ padding: "20px clamp(20px, 4vw, 56px)", gap: "14px 44px" }}
        >
          <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".24em", color: "var(--color-gold)" }}>
            Farm Status
          </span>
          <div className="flex flex-wrap items-center" style={{ gap: "14px 36px" }}>
            {[
              { label: "Table eggs — Available", delay: "0s" },
              { label: "Manure — Available", delay: ".4s" },
              { label: "Ex-layers — Available", delay: ".8s" },
            ].map((item) => (
              <span
                key={item.label}
                className="font-mono uppercase inline-flex items-center gap-2.5"
                style={{ fontSize: 11, letterSpacing: ".16em", color: "rgba(245,240,232,.8)" }}
              >
                <StatusDot delay={item.delay} />
                {item.label}
              </span>
            ))}
          </div>
          <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".18em", color: "rgba(245,240,232,.45)" }}>
            {time ? `Updated ${time} EAT` : " "}
          </span>
        </Container>
      </div>
    </section>
  );
}

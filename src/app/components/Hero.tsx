"use client";
import { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  const h1Ref = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useGSAP(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    // Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Nav entrance
    tl.fromTo(logoRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8 }, 0);
    tl.fromTo(linksRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.2);

    // Initial 3D Setup for Content
    gsap.set([h1Ref.current, p1Ref.current, p2Ref.current, btnRef.current, statsRef.current], {
      transformPerspective: 1500,
      opacity: 0,
      rotateX: 20,
      z: -100,
      y: 30
    });

    tl.to(p1Ref.current, { opacity: 1, rotateX: 0, z: 0, y: 0, duration: 1, ease: "back.out(1.2)" }, 0.4)
      .to(h1Ref.current, { opacity: 1, rotateX: 0, z: 0, y: 0, duration: 1, ease: "back.out(1.2)" }, 0.5)
      .to(p2Ref.current, { opacity: 1, rotateX: 0, z: 0, y: 0, duration: 1, ease: "back.out(1.2)" }, 0.6)
      .to(btnRef.current, { opacity: 1, rotateX: 0, z: 0, y: 0, duration: 1, ease: "back.out(1.2)" }, 0.7)
      .to(statsRef.current, { opacity: 1, rotateX: 0, z: 0, y: 0, duration: 1, ease: "back.out(1.2)" }, 0.8);

    // ScrollTrigger Parallax & Fade
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        if (contentWrapRef.current) {
          gsap.set(contentWrapRef.current, { y: progress * 150 });
        }
        if (h1Ref.current) {
          gsap.set(h1Ref.current, {
            rotateX: progress * 20,
            y: progress * 50,
            opacity: 1 - progress * 1.5,
          });
        }
        if (btnRef.current) {
          gsap.set(btnRef.current, { opacity: 1 - progress * 2 });
        }
      }
    });

    // Mouse Reactivity for Content
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !contentWrapRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Small 3D tilt
      gsap.to(contentWrapRef.current, {
        rotateY: x / 100,
        rotateX: -y / 100,
        duration: 1,
        ease: "power2.out",
        transformPerspective: 1500
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);

  }, { scope: containerRef, dependencies: [prefersReducedMotion] });

  // hover animations for stats
  const handleStatEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: -5, scale: 1.05, duration: 0.3, ease: "power2.out" });
  };
  const handleStatLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden perspective-1000">
      <img
        alt=""
        className="absolute inset-0 object-cover w-full h-full"
        src="/b97db64e01246d9d544acf6da34d5d9c0c03881b.png"
      />

      {/* Navigation */}
      <nav ref={navRef} className="absolute top-0 left-0 right-0 backdrop-blur-md bg-black/20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 md:h-24">
            <img
              ref={logoRef}
              alt="Logo"
              className="h-12 md:h-16 w-auto opacity-0"
              src="/f05a8416be46c845b2cc564f11cec0d15aac5ab1.png"
            />

            <div
              ref={linksRef}
              className="hidden md:flex items-center gap-8 text-base lg:text-lg opacity-0"
            >
              <a href="#home" className="bg-gradient-to-r from-[#eccc74] to-[#f59268] bg-clip-text text-transparent font-semibold relative">
                Home
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#eccc74] to-[#f59268]" />
              </a>
              <a href="#products" className="text-[#133240] font-semibold hover:text-[#eccc74] transition-colors">
                Products
              </a>
              <a href="#about" className="text-[#133240] font-semibold hover:text-[#eccc74] transition-colors">
                About
              </a>
              <a href="#testimonials" className="text-[#133240] font-semibold hover:text-[#eccc74] transition-colors">
                Testimonials
              </a>
              <a
                href="#contact"
                className="px-6 py-2 bg-gradient-to-r from-[#eccc74] to-[#f59268] text-[#133240] rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Quote
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div ref={contentWrapRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 md:pt-0" style={{ transformStyle: 'preserve-3d' }}>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="md:col-start-2 ml-auto flex flex-col items-end">
            <p
              ref={p1Ref}
              className="text-[#133240]/60 text-lg md:text-xl mb-4 text-right opacity-0"
            >
              A supplier you can trust
            </p>

            <h1
              ref={h1Ref}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-[900] leading-[1] md:leading-[0.9] mb-6 md:mb-8 text-right opacity-0 tracking-tighter text-[#133240]"
            >
              FARM-FRESH
              <br />
              NUTRITIOUS{" "}
              <span className="text-[#f59268]">
                eggs
              </span>
            </h1>

            <p
              ref={p2Ref}
              className="text-[#133240] text-base md:text-lg lg:text-xl mb-8 max-w-lg text-right opacity-0"
            >
              From day-collected table eggs to organic farm nutrients,
              everything you need from a supplier you can trust.
            </p>

            <a
              ref={btnRef}
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#f59268] text-[#133240] rounded-full font-semibold text-lg md:text-xl shadow-lg hover:shadow-xl transition-all group opacity-0"
            >
              Order Now
              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <div
              ref={statsRef}
              className="flex gap-8 md:gap-12 mt-12 opacity-0"
            >
              <div onMouseEnter={handleStatEnter} onMouseLeave={handleStatLeave} className="cursor-default">
                <p className="text-[#133240] text-4xl md:text-5xl lg:text-6xl font-black">5+</p>
                <p className="text-[#133240] text-sm md:text-base mt-1">Years Experience</p>
              </div>
              <div onMouseEnter={handleStatEnter} onMouseLeave={handleStatLeave} className="cursor-default">
                <p className="text-[#133240] text-4xl md:text-5xl lg:text-6xl font-black">100%</p>
                <p className="text-[#133240] text-sm md:text-base mt-1">Client satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

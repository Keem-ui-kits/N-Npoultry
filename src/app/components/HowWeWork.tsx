"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, ClipboardList, Truck, ShieldCheck, LucideIcon } from "lucide-react";
import { MouseEvent, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const steps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Phone,
    title: "Inquire",
    description:
      "Reach out via phone or form. Tell us what you need — eggs, manure, or hens — and we'll guide you.",
  },
  {
    icon: ClipboardList,
    title: "Order",
    description:
      "We confirm quantities, pricing, and delivery schedule tailored to your needs.",
  },
  {
    icon: Truck,
    title: "Deliver",
    description:
      "Farm-fresh products dispatched same-day, with careful packaging and reliable transport.",
  },
  {
    icon: ShieldCheck,
    title: "Guarantee",
    description:
      "Every product is inspected and quality-assured. Your satisfaction is our standard.",
  },
];

function StepCard({
  step,
  index,
  isMobile,
}: {
  step: (typeof steps)[0];
  index: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const lastUpdate = useRef(0);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, {
        opacity: 0,
        y: 50,
        rotateY: 30,
      });

      ScrollTrigger.create({
        trigger: cardRef.current,
        start: "top bottom-=100px",
        onEnter: () => {
          gsap.to(cardRef.current, {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: "back.out(1.7)",
          });
        },
      });

      if (!isMobile && cardRef.current) {
        const card = cardRef.current;

        const handleMouseEnter = () => {
          gsap.to(card, { scale: 1.05, duration: 0.3, ease: "power2.out" });
          if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
          if (glowRef.current) gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
          gsap.to(card, { scale: 1, rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
          if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
          if (glowRef.current) gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      }
    }, cardRef);

    return () => ctx.revert();
  }, [index, isMobile]);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: MouseEvent<HTMLDivElement>) {
    if (isMobile || !cardRef.current) return;

    const now = performance.now();
    if (now - lastUpdate.current < 32) return;
    lastUpdate.current = now;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      const rect = currentTarget.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      gsap.to(cardRef.current, {
        rotateX: (y - 0.5) * -16,
        rotateY: (x - 0.5) * 16,
        translateZ: (y - 0.5) * 40,
        duration: 0.3,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      if (spotlightRef.current) {
        gsap.set(spotlightRef.current, {
          background: `radial-gradient(400px circle at ${x * 100}% ${y * 100}%, rgba(236,204,116,0.2), transparent 70%)`,
        });
      }

      if (glowRef.current) {
        gsap.set(glowRef.current, {
          background: `radial-gradient(300px circle at ${x * 100}% ${y * 100}%, rgba(236,204,116,0.15), transparent 60%)`,
        });
      }
    });
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className="group relative p-6 md:p-8 rounded-2xl md:rounded-3xl bg-[#133240] border border-white/10 hover:bg-[#1a3f50] transition-colors backdrop-blur-sm cursor-pointer"
    >
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 rounded-2xl md:rounded-3xl"
      />
      <div
        ref={glowRef}
        className="pointer-events-none absolute -inset-1 opacity-0 rounded-2xl md:rounded-3xl"
        style={{ transform: "translateZ(-10px)" }}
      />

      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="w-12 h-12 bg-gradient-to-br from-[#eccc74]/20 to-[#f59268]/20 rounded-2xl flex items-center justify-center text-[#eccc74] mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
          <step.icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg md:text-xl font-black mb-2 md:mb-3 text-white">
          {step.title}
        </h3>
        <p className="text-sm md:text-base text-gray-400 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  );
}

export function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const span1Ref = useRef<HTMLSpanElement>(null);
  const span2Ref = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const paraRef = useRef<HTMLParagraphElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (!isMobile) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            if (titleRef.current) {
              gsap.set(titleRef.current, {
                rotateX: 18 - progress * 36,
                rotateY: -12 + progress * 24,
                y: 60 - progress * 120,
                translateZ: -60 + progress * 120,
                scale: 0.92 + (progress < 0.5 ? progress * 0.22 : (1 - progress) * 0.22),
                transformPerspective: 1200,
              });
            }

            if (span1Ref.current) {
              gsap.set(span1Ref.current, { translateZ: progress * 40 });
            }

            if (span2Ref.current) {
              gsap.set(span2Ref.current, {
                translateZ: 40 - progress * 80,
                rotateY: -8 + progress * 16,
              });
            }

            if (paraRef.current) {
              gsap.set(paraRef.current, {
                rotateX: 10 - progress * 20,
                y: 30 - progress * 60,
                translateZ: -30 + progress * 60,
              });
            }
          },
        });
      }

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { width: 0 },
          {
            width: "100%",
            duration: 1.5,
            ease: "power2.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top bottom-=100px",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { opacity: 0.4 },
          {
            opacity: 0.7,
            duration: 1.5,
            delay: 0.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      className="py-16 sm:py-24 md:py-32 overflow-hidden relative z-20 bg-[#0d1a21]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="mb-12 md:mb-16 lg:mb-20 text-center">
          <h2
            ref={titleRef}
            style={{
              transformStyle: isMobile ? "flat" : "preserve-3d",
              perspective: isMobile ? "none" : "1200px",
            }}
            className="max-w-68 mx-auto sm:mx-0 sm:max-w-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 relative"
          >
            <span
              ref={span1Ref}
              style={{
                display: "inline-block",
                transformStyle: isMobile ? "flat" : "preserve-3d",
              }}
              className="relative z-10 text-white"
            >
              Farm to table.
            </span>
            <br />
            <span
              ref={span2Ref}
              style={{
                display: "inline-block",
                transformStyle: isMobile ? "flat" : "preserve-3d",
              }}
              className="relative z-10 text-white"
            >
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-[#eccc74] to-[#f59268] bg-clip-text text-transparent">
                  Done right.
                </span>

              </span>
            </span>
          </h2>
          <p
            ref={paraRef}
            style={{ transformStyle: isMobile ? "flat" : "preserve-3d" }}
            className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4"
          >
            A simple, transparent process from your first inquiry to doorstep delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/10 -z-10">
            <div ref={lineRef} className="h-full bg-gradient-to-r from-[#eccc74]/30 to-[#f59268]/30" />
          </div>

          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} isMobile={isMobile} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// Trust Section (Why N&N)
// ============================================
// Company values and trust pillars with GSAP animations

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trustPillars } from '@/cms/settings';

gsap.registerPlugin(ScrollTrigger);

const Trust = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        '.trust-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true
          }
        }
      );

      // Right images animation
      gsap.fromTo(
        '.trust-image',
        { opacity: 0, x: 50, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        }
      );

      // Pillars animation
      gsap.fromTo(
        '.trust-pillar',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trust-pillars',
            start: 'top 85%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="why-nn"
      className="section-padding relative overflow-hidden bg-dark-lighter"
    >
      {/* Background Decoration */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

      <div className="container-custom relative z-10">
        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Content */}
          <div className="trust-left">
            <p className="eyebrow flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-gold" />
              The N&N Standard
            </p>
            <h2 className="section-title text-white mb-6">
              Quality & Care <br />
              <span className="text-outline">At Every Step</span>
            </h2>
            <div className="space-y-4 text-white/70 leading-relaxed">
              <p>
                N&N Poultry Palace is a family-run heritage in Machakos. We collect fresh eggs daily and deliver to homes and businesses — maintaining the highest standards of hygiene and traceability from farm to your door.
              </p>
              <p>
                Our hens are raised with care, fed nutritious feed, and housed in clean, well-ventilated environments. Every egg is gently handled, candled for quality, and packed in hygienic cartons before leaving the farm.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="#order"
                onClick={(e) => handleNavClick(e, '#order')}
                className="btn-primary"
              >
                Order Fresh Eggs
              </a>
              <a
                href="#order"
                onClick={(e) => handleNavClick(e, '#order')}
                className="btn-outline-gold"
              >
                Wholesale Quote
              </a>
            </div>
          </div>

          {/* Right: Images */}
          <div className="grid grid-rows-2 gap-4">
            <div className="trust-image relative aspect-video rounded-xl overflow-hidden border border-gold/10 shadow-dark">
              <img
                src="/images/lifestyle_hen_care.jpeg"
                alt="Farm worker collecting eggs"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="trust-image relative aspect-video rounded-xl overflow-hidden border border-gold/10 shadow-dark">
              <img
                src="/images/lifestyle_packing.png"
                alt="Eggs being carefully packed"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Trust Pillars */}
        <div className="trust-pillars grid md:grid-cols-3 gap-6">
          {trustPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="trust-pillar text-center p-8 rounded-xl bg-white/[0.03] border border-gold/10 transition-all duration-500 hover:bg-gold/5 hover:-translate-y-1"
            >
              <span className="text-4xl mb-4 block" role="img" aria-label={pillar.title}>
                {pillar.icon}
              </span>
              <h4 className="font-serif text-gold text-lg mb-3">
                {pillar.title}
              </h4>
              <p className="text-sm text-white/60 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;

// ============================================
// Hero Section
// ============================================
// Full-screen hero with GSAP animations

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { heroContent } from '@/cms/settings';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-micro', { opacity: 0, y: 30 });
      gsap.set('.hero-title-line', { opacity: 0, y: 60, rotateX: -15 });
      gsap.set('.hero-description', { opacity: 0, y: 30 });
      gsap.set('.hero-buttons', { opacity: 0, y: 30 });
      gsap.set('.scroll-indicator', { opacity: 0 });

      // Animation timeline
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        delay: 0.3
      });

      tl.to('.hero-micro', {
        opacity: 1,
        y: 0,
        duration: 0.8
      })
      .to('.hero-title-line', {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.15
      }, '-=0.4')
      .to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.6')
      .to('.hero-buttons', {
        opacity: 1,
        y: 0,
        duration: 0.8
      }, '-=0.5')
      .to('.scroll-indicator', {
        opacity: 0.6,
        duration: 0.8
      }, '-=0.3');

      // Parallax effect on scroll
      gsap.to('.hero-bg-image', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // Content fade on scroll
      gsap.to(content, {
        opacity: 0,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '50% top',
          scrub: true
        }
      });
    }, container);

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
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="hero-bg-image absolute inset-0 scale-110">
          <img
            src={heroContent.backgroundImage}
            alt="Fresh farm eggs"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark/40 to-dark" />
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="container-custom relative z-10 pt-24 pb-16"
      >
        <div className="max-w-3xl">
          {/* Micro Headline */}
          <p className="hero-micro eyebrow flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            {heroContent.microHeadline}
          </p>

          {/* Title */}
          <h1 className="hero-title mb-8" style={{ perspective: '1000px' }}>
            <span className="hero-title-line block text-white">
              {heroContent.title.line1}
            </span>
            <span className="hero-title-line block text-outline">
              {heroContent.title.line2}
            </span>
            <span className="hero-title-line block text-gold">
              {heroContent.title.line3}
            </span>
          </h1>

          {/* Description */}
          <p className="hero-description text-lg md:text-xl text-white/85 max-w-xl mb-10 leading-relaxed">
            {heroContent.description}
          </p>

          {/* Buttons */}
          <div className="hero-buttons flex flex-wrap gap-4">
            <a
              href={heroContent.primaryCta.link}
              onClick={(e) => handleNavClick(e, heroContent.primaryCta.link)}
              className="btn-primary"
            >
              {heroContent.primaryCta.text}
            </a>
            <a
              href={heroContent.secondaryCta.link}
              onClick={(e) => handleNavClick(e, heroContent.secondaryCta.link)}
              className="btn-outline-gold"
            >
              {heroContent.secondaryCta.text}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-white animate-scroll-line" />
        </div>
        <span className="text-[0.65rem] font-bold tracking-[0.2em] uppercase text-white/60">
          Scroll to Discover
        </span>
      </div>
    </section>
  );
};

export default Hero;

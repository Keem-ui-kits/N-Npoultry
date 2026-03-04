// ============================================
// GSAP Scroll Animation Hook
// ============================================
// Provides scroll-triggered animations using GSAP

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
  once?: boolean;
}

// Hook for revealing elements on scroll
export const useScrollReveal = (
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = 'top 85%',
      toggleActions = 'play none none none',
      once = true
    } = options;

    // Set initial state
    gsap.set(element, { 
      opacity: 0, 
      y: 40 
    });

    const animation = gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions,
        once,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element) {
          st.kill();
        }
      });
    };
  }, [options]);

  return ref;
};

// Hook for staggered children reveal
export const useStaggerReveal = (
  childSelector: string,
  options: ScrollAnimationOptions & { stagger?: number } = {}
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const {
      start = 'top 80%',
      toggleActions = 'play none none none',
      stagger = 0.15,
      once = true
    } = options;

    // Set initial state
    gsap.set(children, { 
      opacity: 0, 
      y: 50 
    });

    const animation = gsap.to(children, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container,
        start,
        toggleActions,
        once,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === container) {
          st.kill();
        }
      });
    };
  }, [childSelector, options]);

  return containerRef;
};

// Hook for parallax effect
export const useParallax = (
  speed: number = 0.5,
  options: ScrollAnimationOptions = {}
) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = 'top bottom',
      end = 'bottom top',
      scrub = true
    } = options;

    const animation = gsap.to(element, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element) {
          st.kill();
        }
      });
    };
  }, [speed, options]);

  return ref;
};

// Hook for header scroll behavior
export const useHeaderScroll = () => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      if (window.scrollY > 60) {
        header.classList.add('scrolled');
        header.classList.add('glass');
        header.classList.add('shadow-dark');
      } else {
        header.classList.remove('scrolled');
        header.classList.remove('glass');
        header.classList.remove('shadow-dark');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return headerRef;
};

// Hook for hero animations
export const useHeroAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate hero elements
    tl.fromTo(
      container.querySelector('.hero-micro'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(
      container.querySelector('.hero-title'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.5'
    )
    .fromTo(
      container.querySelector('.hero-description'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .fromTo(
      container.querySelector('.hero-buttons'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return containerRef;
};

// Hook for clip-path reveal animation
export const useClipReveal = (options: ScrollAnimationOptions = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      start = 'top 80%',
      toggleActions = 'play none none none',
      once = true
    } = options;

    gsap.set(element, {
      clipPath: 'inset(100% 0 0 0)',
      opacity: 1
    });

    const animation = gsap.to(element, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power4.inOut',
      scrollTrigger: {
        trigger: element,
        start,
        toggleActions,
        once,
      }
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === element) {
          st.kill();
        }
      });
    };
  }, [options]);

  return ref;
};

// Cleanup utility
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(st => st.kill());
};

export default useScrollReveal;

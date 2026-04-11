'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ReactNode } from 'react';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface AboutClientWrapperProps {
  children: ReactNode;
}

export function AboutClientWrapper({ children }: AboutClientWrapperProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const heroText = containerRef.current.querySelector('[data-hero-text]');
      const heroSub = containerRef.current.querySelector('[data-hero-sub]');
      const heroGlow = containerRef.current.querySelector('[data-hero-glow]');
      
      // Hero Animations
      if (heroText) {
        gsap.fromTo(
          heroText,
          { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 }
        );
      }
      if (heroSub) {
        gsap.fromTo(
          heroSub,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.6 }
        );
      }
      if (heroGlow) {
        gsap.to(heroGlow, {
          opacity: 0.8,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: 'sine.inOut'
        });
      }

      // Parallax for Hero Background
      const heroBg = containerRef.current.querySelector('[data-hero-bg]');
      if (heroBg) {
        gsap.to(heroBg, {
          yPercent: 30,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current.querySelector('[data-section="hero"]'),
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
        });
      }

      // Story Section
      const storyContainer = containerRef.current.querySelector('[data-section="story"]');
      if (storyContainer) {
        const image = storyContainer.querySelector('[data-story-image]');
        const text = storyContainer.querySelector('[data-story-text]');

        if (image) {
          gsap.fromTo(image, 
            { scale: 1.2, yPercent: -10 },
            {
              scale: 1,
              yPercent: 10,
              ease: 'none',
              scrollTrigger: {
                trigger: storyContainer.querySelector('[data-story-image-container]'),
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );
        }

        if (text) {
          gsap.fromTo(text,
            { opacity: 0, x: 50 },
            {
              opacity: 1, x: 0, duration: 1, ease: 'power3.out',
              scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      }

      // Mission Section Scroll Reveal
      const missionContainer = containerRef.current.querySelector('[data-section="mission"]');
      if (missionContainer) {
        const missionItems = missionContainer.querySelectorAll('[data-mission-item]');
        
        missionItems.forEach((item) => {
          const words = item.querySelectorAll('[data-mission-word]');
          if (words.length > 0) {
            gsap.to(words, {
              opacity: 1,
              stagger: 0.1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: true
              }
            });
          } else {
            // Standard fade if no words
            gsap.fromTo(item,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse'
                }
              }
            );
          }
        });

        const missionBg = missionContainer.querySelector('[data-mission-bg]');
        if (missionBg) {
          gsap.fromTo(missionBg,
            { scale: 0.8, opacity: 0.1 },
            { scale: 1.2, opacity: 0.3, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' }
          );
        }
      }

      // Values Section Stagger
      const valuesSection = containerRef.current.querySelector('[data-section="values"]');
      if (valuesSection) {
        const cards = valuesSection.querySelectorAll('[data-value-card]');
        if (cards.length > 0) {
          gsap.fromTo(cards,
            { opacity: 0, y: 100 },
            {
              opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)',
              scrollTrigger: {
                trigger: valuesSection,
                start: 'top 70%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      }
      
    },
    { scope: containerRef }
  );

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-gradient-to-b from-[#030213] to-black min-h-screen overflow-hidden text-white font-sans">
      {children}
    </section>
  );
}

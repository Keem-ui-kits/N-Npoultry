'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShieldCheck, Truck, Users } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { AboutClientWrapper } from './AboutClientWrapper';

const farmPlaceholder = '/nn-poultry-logo.png'; // Updated to use logo as requested

const pillarContent = [
  {
    title: 'Integrity',
    icon: ShieldCheck,
    description: siteConfig.companyInfo.values[0]
  },
  {
    title: 'Reliability',
    icon: Truck,
    description: siteConfig.companyInfo.values[1]
  },
  {
    title: 'Teamwork',
    icon: Users,
    description: siteConfig.companyInfo.values[2]
  }
];

export function About() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          // Play only if not already playing, handle promise to avoid AbortError
          const playPromise = video.play();
          playPromise.catch((error: unknown) => {
            if (error instanceof Error && error.name !== 'AbortError') {
              console.error('Video play error:', error);
            }
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(video);
    
    return () => { 
      observer.disconnect(); 
      video.pause();
    };
  }, []);

  return (
    <AboutClientWrapper>
      {/* Background grain texture */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[#030213]" /> {/* Dark base */}
        <div className="svg-grain absolute inset-0 opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 w-full text-white pb-32">
        {/* Section 1: The N&N Standard (Hero Reveal) */}
        <section data-section="hero" className="min-h-[70vh] md:min-h-[90vh] flex flex-col items-center justify-center relative overflow-hidden px-4 md:px-8 bg-transparent">
          <div className="text-center w-full max-w-5xl relative z-10 pt-20">
            <h1 data-hero-text className="text-5xl md:text-7xl lg:text-8xl xl:text-[9rem] font-black mb-6 uppercase tracking-tighter leading-[0.9]">
              <span className="block italic text-brand-gold/60 text-2xl md:text-4xl lg:text-5xl mb-4 lowercase opacity-80 font-serif font-light tracking-wide">the</span>
              <span className="relative inline-block">
                <span className="gradient-brand-text">N&N</span>
                <span aria-hidden="true" data-hero-glow className="absolute inset-0 gradient-brand-text blur-3xl opacity-60">N&N</span>
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">STANDARD</span>
            </h1>
            <p data-hero-sub className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light max-w-3xl mx-auto tracking-wide mt-12 bg-black/30 backdrop-blur-sm p-4 rounded-2xl border border-white/5 inline-block">
              Rooted in <span className="text-white font-medium">Machakos</span>. Committed to <span className="text-brand-gold">excellence</span>.
            </p>
          </div>
          
          <div data-hero-bg className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-b from-transparent via-[#030213]/80 to-[#030213]">
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="none"
              poster="/assets/video-poster.jpg"
              aria-hidden="true"
              className="w-full h-full object-cover opacity-20 mix-blend-screen"
            >
              <source src="/upscaled-video.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        {/* Section 2: Our Roots (The Machakos Story) */}
        <section data-section="story" className="py-12 md:py-32 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Split layout: parallax image on one side, side-scrolling text on the other */}
            <div data-story-image-container className="relative h-[50vh] lg:h-[70vh] rounded-[2.5rem] overflow-hidden glass shadow-[0_0_50px_rgba(0,0,0,0.5)] order-2 lg:order-1 flex items-center justify-center p-12">
               <div className="absolute inset-0 bg-gradient-to-t from-[#030213]/90 via-brand-dark/20 to-transparent"></div>
               <Image
                 src={farmPlaceholder}
                 alt="N&N Poultry Palace Logo"
                 fill
                 sizes="(max-width: 1024px) 100vw, 50vw"
                 data-story-image
                 className="object-contain p-12 lg:p-24 drop-shadow-2xl opacity-90"
               />
               <div className="absolute inset-0 bg-brand-dark/30 mix-blend-multiply"></div>
            </div>

            <div className="space-y-10 order-1 lg:order-2" data-story-text>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight">
                Our <span className="text-brand-gold italic font-serif font-light">Roots</span>
              </h2>
              <div className="text-lg md:text-xl lg:text-2xl text-white/70 font-light leading-relaxed space-y-8">
                <p>
                  <strong className="text-white font-medium">{siteConfig.name}</strong> is a family-run poultry business rooted in Machakos, built on a commitment to quality, trust, and community.
                </p>
                <div className="w-16 h-1 bg-brand-gold/50 rounded-full"></div>
                <p className="mb-8">
                  Guided by a clear vision to lead in sustainable poultry production, we combine modern husbandry practices, rigorous quality control, and environmentally responsible methods to ensure every product meets our exacting standards.
                </p>
                <p className="italic border-l-4 border-brand-orange pl-8 text-white/90 text-xl font-serif">
                  &ldquo;Fresh and Nutritious&rdquo; isn't just a tagline &mdash; it's our promise to deliver wholesome, responsibly produced products that people can trust.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Vision & Mission (The Core Pillars) */}
        <section data-section="mission" className="py-16 md:py-48 relative overflow-hidden my-16 bg-[#0a0a0a]">
          <div className="absolute inset-0 border-y border-white/5 pointer-events-none"></div>
          <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 w-full">
              <div data-mission-item className="space-y-8 relative">
                <div className="text-brand-gold font-mono tracking-[0.2em] text-sm uppercase flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-brand-orange"></span>
                  01 // The Vision
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] text-white">
                  {siteConfig.companyInfo.vision.split(' ').map((word, i) => (
                    <span key={i} className="inline-block mr-[0.3em] opacity-30 transition-opacity duration-300" data-mission-word>{word}</span>
                  ))}
                </h3>
              </div>
              
              <div data-mission-item className="space-y-8 relative pt-16 lg:pt-32">
                 <div className="text-brand-gold font-mono tracking-[0.2em] text-sm uppercase flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-brand-gold"></span>
                  02 // The Mission
                 </div>
                 <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium leading-[1.2] text-white">
                    {siteConfig.companyInfo.mission.split(' ').map((word, i) => (
                      <span key={i} className="inline-block mr-[0.3em] opacity-30 transition-opacity duration-300" data-mission-word>{word}</span>
                    ))}
                 </h3>
              </div>
            </div>
          </div>

          <div data-mission-bg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none z-0" />
        </section>

        {/* Section 4: The Pillars of Excellence (Core Values) */}
        <section data-section="values" className="py-12 md:py-32 px-4 sm:px-6 lg:px-8 max-w-[90rem] mx-auto relative z-10">
          <div className="mb-20 md:mb-28 text-center max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
              Pillars of <span className="gradient-brand-text">Excellence</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/50 font-light">The foundational principles that drive our standard everyday.</p>
          </div>

          {/* Uniform Grid (Mobile Style) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillarContent.map((item, i) => {
              const Icon = item.icon;
              
              return (
                <div 
                  key={i} 
                  data-value-card
                  className="glass rounded-[2rem] p-8 md:p-12 flex flex-col group relative overflow-hidden hover:bg-white/[0.05] hover:border-brand-gold/30 transition-all duration-700 h-full"
                >
                  {/* Watermark Number */}
                  <div className="absolute -bottom-4 -right-4 text-[10rem] font-black text-white/[0.03] select-none pointer-events-none group-hover:text-brand-gold/[0.05] transition-colors duration-700 leading-none">
                    0{i + 1}
                  </div>
                  
                  {/* Icon with background treatment */}
                  <div className="mb-auto relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-brand-gold/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-700 relative z-10 border border-brand-gold/10">
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-brand-gold" />
                    </div>
                    {/* Background glow for icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-brand-gold/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  </div>

                  {/* Subtle hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/0 via-brand-gold/0 to-brand-gold/15 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                  
                  <div className="relative z-10 translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                    <div className="text-brand-gold/60 font-mono text-xs mb-3 tracking-[0.3em] uppercase">Value 0{i + 1}</div>
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-white/50 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-xl font-light">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </AboutClientWrapper>
  );
}

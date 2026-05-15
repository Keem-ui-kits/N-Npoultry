'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, ClipboardList, Truck, ShieldCheck } from 'lucide-react';
import { HowWeWorkClientWrapper } from './HowWeWorkClientWrapper';
import { cn } from '@/lib/utils';
import type { HomeConfig } from '@/sanity/lib/queries';


export function HowWeWork({ howWeWorkConfig }: { howWeWorkConfig?: HomeConfig['howWeWork'] }) {
  const [activeTab, setActiveTab] = useState<string>('0');
  const [isHovered, setIsHovered] = useState(false);
  const hww = howWeWorkConfig;

  const steps = [
    {
      icon: Phone,
      title: hww?.step1Title ?? 'Inquire',
      description: hww?.step1Description ?? 'Message us on WhatsApp with what you need — eggs, manure, or hens. We reply within minutes, not hours.',
    },
    {
      icon: ClipboardList,
      title: hww?.step2Title ?? 'Order',
      description: hww?.step2Description ?? 'We confirm your quantity, current price, and the next available delivery slot. Simple and transparent.',
    },
    {
      icon: Truck,
      title: hww?.step3Title ?? 'Deliver',
      description: hww?.step3Description ?? 'Your order is packed fresh and dispatched on our daily route. We cover Machakos Town, Syokimau, Athi River, and beyond.',
    },
    {
      icon: ShieldCheck,
      title: hww?.step4Title ?? 'Guarantee',
      description: hww?.step4Description ?? 'Every tray is shell-checked before it leaves the farm. If something is wrong when it arrives, we make it right.',
    },
  ];

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setActiveTab((current) => ((parseInt(current) + 1) % steps.length).toString());
    }, 5000);
    return () => { clearInterval(interval); };
  }, [isHovered, steps.length]);

  return (
    <HowWeWorkClientWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Left-aligned editorial header */}
        <motion.div 
          data-hww-header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
            <ClipboardList className="w-3 h-3 text-brand-gold" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
              How we work
            </span>
          </div>
          <h2
            data-hww-title
            style={{ transformStyle: 'preserve-3d' }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] uppercase"
          >
            <span
              data-hww-span1
              style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
              className="text-white"
            >
              {hww?.headlinePrimary ?? 'Order today.'}
            </span>
            <br />
            <span
              data-hww-span2
              style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
              className="gradient-brand-text"
            >
              {hww?.headlineAccent ?? 'Delivered tomorrow.'}
            </span>
          </h2>
          <p
            data-hww-para
            style={{ transformStyle: 'preserve-3d' }}
            className="text-base md:text-lg text-white/45 max-w-xl mt-5 leading-relaxed"
          >
            {hww?.description ?? 'Send a WhatsApp message, get your price and slot confirmed in minutes, and receive your order the next morning. Most of Machakos County is on our daily route.'}
          </p>
        </motion.div>

        {/* Animated Tabs */}
        <div 
          className="w-full mt-10 md:mt-16 max-w-5xl"
          onMouseEnter={() => { setIsHovered(true); }}
          onMouseLeave={() => { setIsHovered(false); }}
        >
          <div className="flex gap-2 sm:gap-3 flex-wrap mb-6 bg-white/[0.03] backdrop-blur-sm p-1.5 rounded-xl border border-white/[0.05] w-fit">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => { setActiveTab(index.toString()); }}
                className={cn(
                  "relative px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-bold rounded-lg outline-none transition-colors",
                  activeTab === index.toString() ? "text-brand-gold" : "text-white/60 hover:text-white"
                )}
              >
                {activeTab === index.toString() && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-white/[0.08] shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-md rounded-lg border border-brand-gold/20"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span className={cn("text-[10px] font-black", activeTab === index.toString() ? "text-brand-gold/60" : "text-white/30")}>0{index + 1}</span>
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          <div className="p-6 sm:p-10 md:p-12 bg-white/[0.02] shadow-[0_8px_32px_rgba(0,0,0,0.3)] text-white backdrop-blur-md rounded-2xl border border-white/[0.08] min-h-[350px] flex items-center relative overflow-hidden group">
            <AnimatePresence mode="wait">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return activeTab === index.toString() && (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.98, x: -10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, x: 10, filter: "blur(5px)" }}
                    transition={{ duration: 0.4, ease: "circInOut" }}
                    className="relative z-10 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 w-full items-center"
                  >
                    {/* Left: Graphic representation without photo */}
                    <div className="flex flex-col items-center justify-center bg-white/[0.03] rounded-xl border border-white/[0.05] p-10 h-full min-h-[220px] relative overflow-hidden transition-colors duration-500 group-hover:bg-white/[0.05]">
                      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at center, var(--brand-gold), transparent 70%)' }} />
                      <Icon className="w-24 h-24 text-brand-gold relative z-10 opacity-90 drop-shadow-[0_0_40px_rgba(236,204,116,0.3)]" />
                      
                      {/* Ghost number in background */}
                      <span className="absolute -bottom-10 -right-4 text-[14rem] font-black text-white/[0.02] leading-none select-none pointer-events-none">
                        {index + 1}
                      </span>
                    </div>

                    {/* Right: Text content */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-gold/10 text-brand-gold text-sm font-black border border-brand-gold/20 shadow-[0_0_15px_rgba(236,204,116,0.15)]">
                          {index + 1}
                        </span>
                        <h3 className="text-3xl md:text-4xl font-black text-white m-0 uppercase tracking-tight">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg m-0">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </HowWeWorkClientWrapper>
  );
}

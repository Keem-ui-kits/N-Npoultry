'use client';

import { Phone, ClipboardList, Truck, ShieldCheck } from 'lucide-react';
import { HowWeWorkClientWrapper } from './HowWeWorkClientWrapper';
import { StepCard } from './StepCard';

const steps = [
  {
    icon: Phone,
    title: 'Inquire',
    description:
      'Message us on WhatsApp with what you need — eggs, manure, or hens. We reply within minutes, not hours.',
  },
  {
    icon: ClipboardList,
    title: 'Order',
    description: 'We confirm your quantity, current price, and the next available delivery slot. Simple and transparent.',
  },
  {
    icon: Truck,
    title: 'Deliver',
    description:
      'Your order is packed fresh and dispatched on our daily route. We cover Machakos Town, Syokimau, Athi River, and beyond.',
  },
  {
    icon: ShieldCheck,
    title: 'Guarantee',
    description:
      'Every tray is shell-checked before it leaves the farm. If something is wrong when it arrives, we make it right.',
  },
];

export function HowWeWork() {
  return (
    <HowWeWorkClientWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Left-aligned editorial header */}
        <div data-hww-header className="mb-14 md:mb-20">
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
              Order today.
            </span>
            <br />
            <span
              data-hww-span2
              style={{ display: 'inline-block', transformStyle: 'preserve-3d' }}
              className="gradient-brand-text"
            >
              Delivered tomorrow.
            </span>
          </h2>
          <p
            data-hww-para
            style={{ transformStyle: 'preserve-3d' }}
            className="text-base md:text-lg text-white/45 max-w-xl mt-5 leading-relaxed"
          >
            Send a WhatsApp message, get your price and slot confirmed in minutes, and receive your order the next morning. Most of Machakos County is on our daily route.
          </p>
        </div>

        {/* Step cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 relative">
          {/* Desktop connector line */}
          <div className="hidden lg:block absolute top-14 left-0 w-full h-px bg-white/[0.04] -z-10">
            <div
              data-hww-line
              className="h-full bg-gradient-to-r from-brand-gold/25 via-brand-orange/20 to-transparent"
            />
          </div>

          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} />
          ))}
        </div>
      </div>
    </HowWeWorkClientWrapper>
  );
}

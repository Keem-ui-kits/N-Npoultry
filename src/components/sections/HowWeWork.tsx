'use client';

import { Phone, ClipboardList, Truck, ShieldCheck } from 'lucide-react';
import { HowWeWorkClientWrapper } from './HowWeWorkClientWrapper';
import { StepCard } from './StepCard';

const steps = [
  {
    icon: Phone,
    title: 'Inquire',
    description:
      "Reach out via phone or form. Tell us what you need — eggs, manure, or hens — and we'll guide you.",
  },
  {
    icon: ClipboardList,
    title: 'Order',
    description: 'We confirm quantities, pricing, and delivery schedule tailored to your needs.',
  },
  {
    icon: Truck,
    title: 'Deliver',
    description:
      'Farm-fresh products dispatched same-day, with careful packaging and reliable transport.',
  },
  {
    icon: ShieldCheck,
    title: 'Guarantee',
    description:
      'Every product is inspected and quality-assured. Your satisfaction is our standard.',
  },
];

export function HowWeWork() {
  return (
    <HowWeWorkClientWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div data-hww-header className="mb-12 md:mb-16 lg:mb-20 text-center">
          <h2
            data-hww-title
            style={{ transformStyle: 'preserve-3d' }}
            className="max-w-68 mx-auto sm:mx-0 sm:max-w-none text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 relative"
          >
            <span
              data-hww-span1
              style={{
                display: 'inline-block',
                transformStyle: 'preserve-3d',
              }}
              className="relative z-10 text-white"
            >
              Farm to table.
            </span>
            <br />
            <span
              data-hww-span2
              style={{
                display: 'inline-block',
                transformStyle: 'preserve-3d',
              }}
              className="relative z-10 text-white"
            >
              <span className="relative inline-block">
                <span className="gradient-brand-text">Done right.</span>
              </span>
            </span>
          </h2>
          <p
            data-hww-para
            style={{ transformStyle: 'preserve-3d' }}
            className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto px-4"
          >
            A simple, transparent process from your first inquiry to doorstep delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-white/10 -z-10">
            <div
              data-hww-line
              className="h-full bg-gradient-to-r from-brand-gold/30 to-brand-orange/30"
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

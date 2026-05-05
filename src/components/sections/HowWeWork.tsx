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
              Order today.
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
                <span className="gradient-brand-text">Delivered tomorrow.</span>
              </span>
            </span>
          </h2>
          <p
            data-hww-para
            style={{ transformStyle: 'preserve-3d' }}
            className="text-base sm:text-lg md:text-xl text-white/50 max-w-2xl mx-auto px-4"
          >
            Four steps from your first message to fresh eggs at your door. No guesswork, no delays.
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

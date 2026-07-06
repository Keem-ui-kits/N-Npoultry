'use client';

import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { OrderSheetButton } from '@/components/ui/OrderSheetButton';
import type { HomeConfig } from '@/sanity/lib/queries';

const FALLBACK_WHATSAPP = '254113377623';
const FALLBACK_PHONE = '0113377623';

export function ContactCTA({
  whatsapp,
  phone,
  contactCtaConfig,
}: {
  whatsapp?: string;
  phone?: string;
  contactCtaConfig?: HomeConfig['contactCta'];
}) {
  const cta = contactCtaConfig;
  const number = whatsapp ?? FALLBACK_WHATSAPP;
  const displayPhone = phone ?? FALLBACK_PHONE;

  return (
    <motion.section 
      id="contact-cta" 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="py-24 md:py-32 bg-brand-dark relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.08] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, #eccc74, transparent 65%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[360px] h-[360px] rounded-full blur-[120px] opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse, #f59268, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Gold accent bar */}
        <div className="w-12 h-1 bg-brand-gold mb-14 md:mb-20" />

        {/* Order CTA */}
        <div>
          {/* Order CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 mb-7 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.08]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
              </span>
              <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
                Open for orders
              </span>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[0.88] mb-6 max-w-4xl">
              {cta?.headlinePre ?? "Let's sort"}{' '}
              <span className="text-brand-gold">{cta?.headlineAccent ?? 'your first'}</span>{' '}
              {cta?.headlinePost ?? 'order.'}
            </h2>

            <p className="text-base md:text-lg text-white/55 max-w-2xl leading-relaxed mb-10">
              {cta?.description ?? "Daily delivery to Machakos Town, Syokimau, Athi River, Mlolongo, and beyond. Message us your quantity — we'll confirm the price and slot within minutes."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <OrderSheetButton
                whatsapp={number}
                className="flex items-center justify-center gap-3 px-8 py-4 gradient-brand text-brand-dark rounded-full font-black text-base transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] flex-1 sm:flex-none"
              >
                <MessageCircle className="w-5 h-5" />
                {cta?.ctaPrimary ?? 'Order on WhatsApp'}
              </OrderSheetButton>

              <a
                href={`tel:${displayPhone}`}
                className="flex items-center justify-center gap-3 px-8 py-4 border border-white/15 bg-white/[0.05] text-white rounded-full font-bold text-base hover:bg-white/[0.1] hover:border-white/25 transition-all duration-200 active:scale-[0.98] flex-1 sm:flex-none"
              >
                <Phone className="w-5 h-5" />
                Call {displayPhone}
              </a>

              <p className="text-sm text-white/30 text-center pt-1">
                Prefer a form?{' '}
                <Link
                  href="/contact"
                  className="text-brand-gold/60 hover:text-brand-gold underline underline-offset-2 transition-colors"
                >
                  Send us a message
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

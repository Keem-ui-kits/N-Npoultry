'use client';

import Link from 'next/link';
import { MessageCircle, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/content/site';

const FALLBACK_WHATSAPP = '254113377623';
const WA_MESSAGE = encodeURIComponent(
  "Hi N&N, I'd like to place an order:\n- Product: ___\n- Quantity: ___\n- Delivery to: ___\n- Preferred time: ___"
);

export function ContactCTA({ whatsapp }: { whatsapp?: string }) {
  const number = whatsapp ?? FALLBACK_WHATSAPP;
  const waUrl = `https://wa.me/${number}?text=${WA_MESSAGE}`;
  const phone = siteConfig.contacts.phones[0];

  return (
    <section id="contact-cta" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-tr from-brand-dark/80 to-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] p-10 md:p-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/15 bg-white/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
                Open for orders
              </span>
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase leading-tight">
              Let&apos;s sort <span className="gradient-brand-text">your first</span>{' '}
              <br className="hidden md:block" /> order.
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-4 font-medium">
              Daily delivery to Machakos Town, Syokimau, Athi River, Mlolongo, and beyond.
            </p>
            <p className="text-base text-white/45 max-w-xl mx-auto mb-12">
              Message us your quantity — we&apos;ll confirm the price and slot within minutes. For bulk or commercial orders, use the contact form.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 gradient-brand text-brand-dark rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_32px_rgba(236,204,116,0.4)]"
              >
                <MessageCircle className="w-5 h-5" />
                Order on WhatsApp
              </a>
              <a
                href={`tel:${phone}`}
                className="w-full sm:w-auto px-10 py-4 border border-white/20 bg-white/5 backdrop-blur-sm text-white rounded-full font-bold text-lg hover:bg-white/10 hover:border-white/35 hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                <Phone className="w-5 h-5" />
                Call {phone}
              </a>
            </div>

            <p className="mt-8 text-sm text-white/30">
              Prefer a form?{' '}
              <Link href="/quote" className="text-brand-gold/70 hover:text-brand-gold underline underline-offset-2 transition-colors">
                Request a quote online
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { MessageCircle } from 'lucide-react';

const BROADCAST_MESSAGE = encodeURIComponent(
  'Hi N&N — please add me to your weekly WhatsApp broadcast list for surplus egg alerts.'
);

export function BroadcastSignup({ whatsapp }: { whatsapp?: string }) {
  const number = whatsapp ?? '254113377623';
  const href = `https://wa.me/${number}?text=${BROADCAST_MESSAGE}`;

  return (
    <section
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-t border-white/5"
      aria-label="WhatsApp broadcast sign-up"
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[11px] font-bold tracking-widest uppercase text-white/35 mb-3">
          Never miss a batch
        </p>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
          Get on our WhatsApp Broadcast
        </h2>
        <p className="text-white/55 mb-7 text-sm md:text-base leading-relaxed max-w-md mx-auto">
          We send weekly updates when stock is high, prices change, or we have surplus.
          No spam — just real farm news straight from us.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base transition-all hover:scale-105"
          style={{
            background: 'rgba(37,211,102,0.12)',
            color: '#25D366',
            border: '1px solid rgba(37,211,102,0.25)',
          }}
        >
          <MessageCircle className="w-5 h-5" />
          Add me to your broadcast list
        </a>
        <p className="mt-4 text-xs text-white/30">
          Opens WhatsApp with a pre-written message. You just hit send.
        </p>
      </div>
    </section>
  );
}

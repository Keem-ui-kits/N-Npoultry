'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { FounderConfig } from '@/sanity/lib/queries';

const PLACEHOLDER: FounderConfig = {
  founderName: 'The N&N Family',
  founderRole: 'Founders & Farm Managers',
  yearsOnFarm: 5,
  founderPhotoUrl: '/nn-poultry-logo.png',
  founderQuote:
    "Farming isn't something we do for a living. It's something we do because we can't imagine doing anything else.",
  founderStory: [
    'Every flock teaches you something different. After five years on this land, we still find ourselves learning — about the birds, about the soil, about the rhythms of a Machakos morning. That knowledge doesn\'t come from a textbook. It comes from being here, daily.',
    "What keeps us going isn't the business side. It's the moment a customer tells us their family has been buying from us for two years and their kids won't eat any other eggs. That's the part you can't measure.",
  ],
};

export function FounderStory({ founder }: { founder?: FounderConfig | null }) {
  const data = founder ?? PLACEHOLDER;

  return (
    <section
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative"
      aria-label="Meet the farmers"
    >
      {/* Ambient glow — matches the About page's orange ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[40vw] max-w-[700px] rounded-full blur-[120px] pointer-events-none opacity-[0.07]"
        style={{ background: 'radial-gradient(ellipse, var(--brand-gold), var(--brand-orange), transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-4"
        >
          <span className="w-8 h-px bg-brand-gold/50" aria-hidden="true" />
          <span className="text-brand-gold/70 font-mono tracking-[0.2em] text-xs uppercase">
            The People Behind It
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-[2.5rem] overflow-hidden border border-white/8 shadow-2xl"
          style={{ background: 'rgba(255,255,255,0.025)', backdropFilter: 'blur(12px)' }}
        >
          <div className="grid md:grid-cols-2">

            {/* Photo */}
            <div className="relative h-72 md:h-auto min-h-[420px] order-2 md:order-1">
              <Image
                src={data.founderPhotoUrl ?? '/nn-poultry-logo.png'}
                alt={`${data.founderName ?? 'Founder'} — ${data.founderRole ?? 'N&N Poultry Palace'}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Gradient overlay on photo for depth */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, transparent 60%, rgba(3,2,19,0.6))',
                }}
                aria-hidden="true"
              />
              {/* Bottom fade for mobile */}
              <div
                className="absolute inset-x-0 bottom-0 h-24 md:hidden"
                style={{ background: 'linear-gradient(to top, rgba(3,2,19,0.9), transparent)' }}
                aria-hidden="true"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 lg:p-14 flex flex-col justify-center order-1 md:order-2">

              {data.founderQuote && (
                <blockquote className="mb-8">
                  <span
                    className="text-3xl leading-none select-none"
                    style={{ color: 'var(--brand-gold)', opacity: 0.4 }}
                    aria-hidden="true"
                  >&ldquo;</span>
                  <p
                    className="text-xl md:text-2xl font-serif italic leading-relaxed mt-1 text-white/90"
                  >
                    {data.founderQuote}
                  </p>
                </blockquote>
              )}

              {data.founderStory && data.founderStory.length > 0 && (
                <div className="space-y-4 mb-8">
                  {data.founderStory.map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-sm md:text-base leading-relaxed text-white/60"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              <div className="pt-6 border-t border-white/10">
                <p className="font-bold text-base text-white">
                  {data.founderName}
                </p>
                <p className="text-sm mt-0.5 text-brand-gold/70">
                  {data.founderRole}
                  {data.yearsOnFarm ? ` · ${data.yearsOnFarm} years farming` : ''}
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

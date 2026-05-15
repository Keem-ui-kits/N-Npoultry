'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FlippingCard } from '@/components/ui/flipping-card';
import type { FounderConfig } from '@/sanity/lib/queries';

const PLACEHOLDER: FounderConfig = {
  founderName: 'The Kyalos',
  founderRole: 'Founder & Directors',
  yearsOnFarm: 5,
  founderPhotoUrl: '/nn-poultry-logo.png',
  founderQuote: 'Integrity, teamwork and consistency are our guiding principles.',
  founderStory: [
    'We started N&N in 2021 during the Covid19 era with broiler chicken just as a backyard project. Due to lack of market for broilers after controlled movement to eateries, we decided to venture into layers breed from 2022 and that is when the company was officially registered.\nWith disease challenges, we became more resilient through online training and seminars organized by Kenchic and other poultry input traders.\nWe also made considerable research in poultry farming; not mentioning the several visits to a number of farms.',
    'The name N&N comes from a family setup - our two daughters bear the initials. \nThe first year was hard. We lost batches, we made mistakes, we learned. But we never compromised on the quality of what we sent out.',
    "Today, when a kiosk owner in Athi River tells me our eggs are the only ones her customers ask for by name — that's what it's all about. That trust is everything we've worked for.\n\n\"Every egg, every day, done right.\"",
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

        {/* --- DESKTOP LAYOUT --- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hidden md:block rounded-[2.5rem] overflow-hidden border border-white/8 shadow-2xl"
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
                  {data.yearsOnFarm ? ` · ${String(data.yearsOnFarm)} years farming` : ''}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- MOBILE LAYOUT (FLIPPING CARD) --- */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="block md:hidden"
        >
          <FlippingCard
            width="100%"
            height="520px"
            frontContent={
              <div className="relative h-full w-full group">
                <Image
                  src={data.founderPhotoUrl ?? '/nn-poultry-logo.png'}
                  alt={data.founderName ?? 'Founder'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute bottom-8 left-6 right-6 flex flex-col items-center text-center">
                  <p className="font-bold text-2xl text-white tracking-tight">
                    {data.founderName}
                  </p>
                  <p className="text-sm mt-2 font-medium text-brand-gold border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-[0_0_15px_rgba(236,204,116,0.2)]">
                    Tap to read our story
                  </p>
                </div>
              </div>
            }
            backContent={
              <div className="flex flex-col h-full w-full p-6 bg-background border border-white/8 rounded-[inherit] overflow-y-auto no-scrollbar relative">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ background: 'radial-gradient(circle at center, var(--brand-gold), transparent 70%)' }} />
                
                <div className="relative z-10 flex-1 flex flex-col">
                  {data.founderQuote && (
                    <blockquote className="mb-6 relative">
                      <span className="absolute -top-4 -left-2 text-4xl text-brand-gold/20 font-serif leading-none">"</span>
                      <p className="text-lg font-serif italic leading-relaxed text-white/90 relative z-10 pl-4 border-l-2 border-brand-gold/50">
                        {data.founderQuote}
                      </p>
                    </blockquote>
                  )}

                  {data.founderStory && data.founderStory.length > 0 && (
                    <div className="space-y-3 mb-6">
                      {data.founderStory.map((paragraph, i) => (
                        <p key={i} className="text-sm leading-relaxed text-white/60">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="pt-5 border-t border-white/10 mt-auto">
                    <p className="font-bold text-base text-white">
                      {data.founderName}
                    </p>
                    <p className="text-xs mt-0.5 text-brand-gold/70">
                      {data.founderRole}
                      {data.yearsOnFarm ? ` · ${String(data.yearsOnFarm)} years farming` : ''}
                    </p>
                  </div>
                </div>
              </div>
            }
          />
        </motion.div>

      </div>
    </section>
  );
}

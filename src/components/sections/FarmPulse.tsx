'use client';

import { motion } from 'framer-motion';
import { Egg, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';

const FALLBACK_WHATSAPP = '254113377623';
const FALLBACK_ZONES = ['Machakos Town', 'Syokimau', 'Athi River', 'Mlolongo', 'Katoloni', 'Mwala'];
const WA_MESSAGE = encodeURIComponent("Hi N&N, I'd like to order:\n- 30pc tray of table eggs x ___\n- Delivery to: ___\n- Preferred time: ___");

function getFarmBadge(): string {
  const hour = parseInt(
    new Intl.DateTimeFormat('en-KE', { timeZone: 'Africa/Nairobi', hour: 'numeric', hour12: false }).format(new Date()),
    10
  );
  if (hour < 12) return 'Collected this morning';
  if (hour < 15) return 'Dispatching now';
  return "Tomorrow's batch ready";
}

export function FarmPulse({
  deliveryZones,
  whatsapp,
}: {
  deliveryZones?: string[];
  whatsapp?: string;
}) {
  const zones = deliveryZones && deliveryZones.length > 0 ? deliveryZones : FALLBACK_ZONES;
  const waUrl = `https://wa.me/${whatsapp ?? FALLBACK_WHATSAPP}?text=${WA_MESSAGE}`;

  const pulseCards = [
    {
      icon: Egg,
      color: '#eccc74',
      badge: getFarmBadge(),
      title: "Today's batch — Collection starts at 2pm",
      body: "Hens lay from dawn to slightly past midday. Collection and grading start from 2pm to 4pm. Previous day's collection is sold in the local market every day to retain quality and freshness.",
      stat: '24–48hrs',
      statLabel: 'Farm to delivery',
    },
    {
      icon: MapPin,
      color: '#f59268',
      badge: 'Active',
      title: 'We Deliver Across the Region',
      body: 'From Machakos Town to Athi River and beyond — we run daily delivery routes so you get fresh product without travelling to the farm.',
      zones,
    },
    {
      icon: CheckCircle2,
      color: '#4ade80',
      badge: 'Our Standard',
      title: 'Inspected Before It Leaves the Farm',
      body: 'Every tray is checked for cracks, size consistency, and shell quality before packing. We reject anything that does not meet our standard — not you.',
    },
    {
      icon: MessageCircle,
      color: '#38bdf8',
      badge: 'Always Open',
      title: 'WhatsApp Is How Most Customers Order',
      body: "No forms, no waiting. Send us a message with what you need and we'll confirm quantities and your next delivery slot — usually within minutes.",
      cta: { label: 'Message us on WhatsApp', href: waUrl },
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Left-aligned header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 md:mb-20 max-w-2xl"
        >
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
            </span>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
              Farm Pulse
            </span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] uppercase text-white">
            What&apos;s{' '}
            <span className="gradient-brand-text">Happening</span>
            <br />at the Farm
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/45 max-w-xl leading-relaxed">
            Every egg you order was laid here, graded here, and dispatched from here. No cold storage, no middlemen — just our farm in Machakos County.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {pulseCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 }}
                className="group flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 md:p-8 transition-colors duration-300 hover:bg-white/[0.05]"
              >
                {/* Icon + badge */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${card.color}12`, border: `1px solid ${card.color}28` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: card.color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 rounded-full"
                    style={{ color: card.color, background: `${card.color}10`, border: `1px solid ${card.color}22` }}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-black text-white leading-snug">
                  {card.title}
                </h3>

                {/* Body */}
                <p className="text-sm md:text-base text-white/50 leading-relaxed flex-1">{card.body}</p>

                {/* Meta */}
                {'stat' in card && card.stat && (
                  <div className="flex items-baseline gap-2 mt-auto pt-2">
                    <span className="text-2xl md:text-3xl font-black" style={{ color: card.color }}>
                      {card.stat}
                    </span>
                    <span className="text-[10px] text-white/35 font-bold uppercase tracking-widest">
                      {card.statLabel}
                    </span>
                  </div>
                )}

                {'zones' in card && card.zones && (
                  <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                    {card.zones.map((zone) => (
                      <span
                        key={zone}
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                        style={{ color: card.color, background: `${card.color}10`, border: `1px solid ${card.color}20` }}
                      >
                        {zone}
                      </span>
                    ))}
                  </div>
                )}

                {'cta' in card && card.cta && (
                  <a
                    href={card.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 group-hover:gap-3 active:scale-[0.98] mt-auto pt-2"
                    style={{ color: card.color }}
                  >
                    {card.cta.label}
                    <span className="text-base">→</span>
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

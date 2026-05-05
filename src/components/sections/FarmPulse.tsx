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
      title: "Today's batch — collected at 6:30am",
      body: "Our hens lay through the night and we collect at dawn. By the time your order is confirmed, the eggs haven't been sitting for more than a few hours.",
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
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Subtle ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #eccc74, #f59268, transparent)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-white/15 bg-white/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold" />
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-brand-gold">
              Farm Pulse
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95] uppercase text-white">
            What&apos;s <span className="gradient-brand-text">Happening</span>{' '}
            at the Farm
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl leading-relaxed">
            This is a real working farm — here&apos;s a window into how we operate every day.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {pulseCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: i * 0.08 }}
                className="group relative rounded-[2rem] border border-white/8 bg-white/[0.025] p-7 md:p-8 hover:border-white/16 hover:bg-white/[0.05] transition-all duration-300 overflow-hidden"
              >
                {/* Subtle corner accent */}
                <div
                  className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-[0.06] pointer-events-none"
                  style={{ background: card.color }}
                  aria-hidden="true"
                />

                {/* Top row */}
                <div className="flex items-center justify-between mb-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `${card.color}1a`, border: `1px solid ${card.color}33` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: card.color }} />
                  </div>
                  <span
                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                    style={{
                      background: `${card.color}15`,
                      color: card.color,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    {card.badge}
                  </span>
                </div>

                <h3 className="text-xl font-black text-white mb-3 leading-snug">{card.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{card.body}</p>

                {/* Stat or zones or CTA */}
                {'stat' in card && card.stat !== undefined && (
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black" style={{ color: card.color }}>
                      {card.stat}
                    </span>
                    <span className="text-xs text-white/40 font-medium">{card.statLabel}</span>
                  </div>
                )}

                {'zones' in card && card.zones && (
                  <div className="flex flex-wrap gap-2">
                    {card.zones.map((zone) => (
                      <span
                        key={zone}
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{
                          background: `${card.color}12`,
                          color: card.color,
                          border: `1px solid ${card.color}25`,
                        }}
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
                    className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3"
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

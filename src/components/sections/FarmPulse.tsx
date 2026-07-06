'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Egg, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { HomeConfig } from '@/sanity/lib/queries';

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
  farmPulseConfig,
}: {
  deliveryZones?: string[];
  whatsapp?: string;
  farmPulseConfig?: HomeConfig['farmPulse'];
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => { setIsDesktop(window.innerWidth >= 1024); };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

// Auto-reveal removed per user request

  const fp = farmPulseConfig;
  const zones = deliveryZones && deliveryZones.length > 0 ? deliveryZones : FALLBACK_ZONES;
  const waUrl = `https://wa.me/${whatsapp ?? FALLBACK_WHATSAPP}?text=${WA_MESSAGE}`;

  const pulseCards = [
    {
      icon: Egg,
      color: '#eccc74',
      badge: fp?.card1Badge ?? getFarmBadge(),
      title: fp?.card1Title ?? "Today's batch — Collection starts at 2pm",
      body: fp?.card1Body ?? "Hens lay from dawn to slightly past midday. Collection and grading start from 2pm to 4pm. Previous day's collection is sold in the local market every day to retain quality and freshness.",
      stat: fp?.card1Stat ?? '24–48hrs',
      statLabel: fp?.card1StatLabel ?? 'Farm to delivery',
    },
    {
      icon: MapPin,
      color: '#f59268',
      badge: fp?.card2Badge ?? 'Active',
      title: fp?.card2Title ?? 'We Deliver Across the Region',
      body: fp?.card2Body ?? 'From Machakos Town to Athi River and beyond — we run daily delivery routes so you get fresh product without travelling to the farm.',
      zones,
    },
    {
      icon: CheckCircle2,
      color: '#4ade80',
      badge: fp?.card3Badge ?? 'Our Standard',
      title: fp?.card3Title ?? 'Inspected Before It Leaves the Farm',
      body: fp?.card3Body ?? 'Every tray is checked for cracks, size consistency, and shell quality before packing. We reject anything that does not meet our standard — not you.',
    },
    {
      icon: MessageCircle,
      color: '#38bdf8',
      badge: fp?.card4Badge ?? 'Always Open',
      title: fp?.card4Title ?? 'WhatsApp Is How Most Customers Order',
      body: fp?.card4Body ?? "No forms, no waiting. Send us a message with what you need and we'll confirm quantities and your next delivery slot — usually within minutes.",
      cta: { label: fp?.card4CtaLabel ?? 'Message us on WhatsApp', href: waUrl },
    },
  ];

  const gridStyle = useMemo(() => {
    if (activeIndex === null || isDesktop) return {};
    
    const rows = pulseCards
      .map((_, index) => (index === activeIndex ? "7fr" : "1fr"))
      .join(" ");
    return { gridTemplateRows: rows };
  }, [activeIndex, pulseCards.length, isDesktop]);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative py-24 md:py-32 bg-background overflow-hidden"
    >
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
            {fp?.headingPre ?? "What's"}{' '}
            <span className="text-brand-gold">{fp?.headingAccent ?? 'Happening'}</span>
            <br />{fp?.headingPost ?? 'at the Farm'}
          </h2>
          <p className="mt-5 text-base md:text-lg text-white/45 max-w-xl leading-relaxed">
            {fp?.description ?? 'Every egg you order was laid here, graded here, and dispatched from here. No cold storage, no middlemen — just our farm in Machakos County.'}
          </p>
        </motion.div>

        {/* Expanding Cards (Mobile) / Grid (Desktop) */}
        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "w-full gap-4 grid transition-[grid-template-rows] duration-500 ease-out",
            "h-[600px] lg:h-auto lg:grid-cols-2"
          )}
          style={{
            ...gridStyle,
            ...(isDesktop ? {} : { gridTemplateColumns: '1fr' })
          }}
        >
          {pulseCards.map((card, index) => {
            const Icon = card.icon;
            const isActive = isDesktop || activeIndex === index;
            
            return (
              <li
                key={index}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] lg:bg-white/[0.03] shadow-sm transition-colors hover:bg-white/[0.05]",
                  "min-h-0 min-w-0 flex flex-col",
                  isDesktop ? "cursor-default" : "cursor-pointer"
                )}
                onClick={() => { if (!isDesktop) setActiveIndex(index); }}
                data-active={isActive}
              >
                {/* Background glow tint when active */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-20 mix-blend-screen pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at center, ${card.color}, transparent 70%)` }}
                />

                {/* --- Collapsed Horizontal Title (Mobile Only) --- */}
                <div className="absolute inset-0 flex lg:hidden items-center px-6 opacity-100 transition-opacity duration-300 group-data-[active=true]:opacity-0 pointer-events-none">
                  <div className="flex items-center gap-4 w-full">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/10 shrink-0">
                      <Icon className="w-4 h-4 text-white/50" />
                    </div>
                    <h3 className="text-sm font-bold text-white/80 truncate pr-4">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* --- Expanded Content (Absolute on Mobile, Relative on Desktop) --- */}
                <article
                  className="absolute inset-0 lg:relative flex flex-col p-6 lg:p-8 opacity-0 transition-opacity duration-500 delay-150 group-data-[active=true]:opacity-100 pointer-events-none group-data-[active=true]:pointer-events-auto overflow-y-auto lg:overflow-visible no-scrollbar"
                >
                  <div className="flex flex-col h-full min-w-[280px]">
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${card.color}15`, border: `1px solid ${card.color}30` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: card.color }} />
                      </div>
                      <span
                        className="text-[10px] font-bold tracking-[0.16em] uppercase px-3 py-1.5 rounded-full"
                        style={{ color: card.color, background: `${card.color}10`, border: `1px solid ${card.color}25` }}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <h3 className="text-xl lg:text-2xl font-black text-white leading-tight mb-3">
                      {card.title}
                    </h3>

                    <p className="text-sm lg:text-base text-white/55 leading-relaxed flex-1">
                      {card.body}
                    </p>

                    {/* Meta section locked to bottom */}
                    <div className="mt-6 pt-4 border-t border-white/10 shrink-0">
                      {'stat' in card && card.stat && (
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl lg:text-3xl font-black" style={{ color: card.color }}>
                            {card.stat}
                          </span>
                          <span className="text-[10px] text-white/35 font-bold uppercase tracking-widest">
                            {card.statLabel}
                          </span>
                        </div>
                      )}

                      {'zones' in card && card.zones && (
                        <div className="flex flex-wrap gap-1.5">
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
                          className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3 active:scale-[0.98]"
                          style={{ color: card.color }}
                        >
                          {card.cta.label}
                          <span className="text-base">→</span>
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}

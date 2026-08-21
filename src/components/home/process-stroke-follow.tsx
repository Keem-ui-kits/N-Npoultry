"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionEyebrow } from "@/components/ui/eyebrow";

export interface ProcessStep {
  n: string;
  title: string;
  body: string;
  detail?: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    n: "01",
    title: "Care",
    body: "A walk-through of the flock before anything else. You learn to read a bird.",
    detail: "6:00 AM — First house inspection before morning feeding.",
  },
  {
    n: "02",
    title: "Collect",
    body: "Three times a day at peak. Frequency is what keeps eggs clean and uncracked.",
    detail: "10:00 AM & 2:00 PM — Gentle hand-collection into cushioned trays.",
  },
  {
    n: "03",
    title: "Grade",
    body: "Shell integrity and size consistency, checked by hand between two and four.",
    detail: "2:00 PM - 4:00 PM — Candling and weight classification.",
  },
  {
    n: "04",
    title: "Pack",
    body: "Sealed into 30pc trays by five, labelled with the day they were collected.",
    detail: "5:00 PM — Food-grade carton sealing with collection date stamp.",
  },
  {
    n: "05",
    title: "Deliver",
    body: "On the morning route, Monday to Saturday, across six zones of the county.",
    detail: "Next Day 7:00 AM — Climate-safe doorstep delivery in Machakos.",
  },
];

/**
 * Continuous organic side-to-side looping trajectory calibrated across the 5 process zones
 * in a 1200x1920 coordinate space.
 *
 * Trajectory sweeps broadly from side to side across the canvas with wide expansive loops,
 * running directly underneath the process cards (Cards are opaque z-20 so the stroke
 * disappears under each card and re-emerges on the other side):
 * - Top header loop -> Far top-right sweep (X: 1040, Y: 80)
 * - Sweeps across to far upper-left (X: 120, Y: 230)
 * - Sweeps right under Card 01 (Care - X: 672..1080, Y: 324..460) -> Loops wide out to right (X: 1150, Y: 540)
 * - Sweeps across left under Card 02 (Collect - X: 96..500, Y: 648..790) -> Loops left (X: 220, Y: 860)
 * - Center wave -> Sweeps right under Card 03 (Grade - X: 672..1080, Y: 972..1110) -> Loops wide right (X: 1140, Y: 1100)
 * - Sweeps across left under Card 04 (Pack - X: 96..500, Y: 1278..1420) -> Loops left (X: 240, Y: 1490)
 * - Center wave -> Sweeps right under Card 05 (Deliver - X: 672..1080, Y: 1548..1690) -> Loops bottom-right (X: 1110, Y: 1680)
 * - Sweeps across to bottom-left exit (X: 40, Y: 1920), fading out into the next section.
 */
const DESKTOP_SVG_PATH =
  "M 520 80 " +
  "C 580 30, 680 40, 660 110 " +
  "C 640 160, 480 150, 490 90 " +
  "C 500 30, 780 40, 1040 80 " +
  "C 1180 100, 1190 210, 1020 230 " +
  "C 750 250, 320 180, 120 230 " +
  "C 20 260, 30 390, 160 410 " +
  "C 360 430, 600 360, 840 370 " +
  "C 1000 380, 1180 430, 1150 540 " +
  "C 1120 630, 960 610, 760 620 " +
  "C 520 630, 320 690, 160 710 " +
  "C 40 730, 60 840, 220 860 " +
  "C 400 880, 560 780, 700 810 " +
  "C 800 830, 740 960, 850 1010 " +
  "C 980 1060, 1180 970, 1140 1100 " +
  "C 1100 1200, 920 1170, 720 1190 " +
  "C 480 1210, 300 1310, 150 1330 " +
  "C 40 1350, 70 1470, 240 1490 " +
  "C 420 1510, 580 1420, 720 1470 " +
  "C 820 1510, 750 1600, 870 1620 " +
  "C 1000 1640, 1160 1560, 1110 1680 " +
  "C 1060 1780, 850 1760, 620 1780 " +
  "C 380 1800, 180 1860, 40 1920";

/**
 * Mobile-specific side-to-side looped path across 400x1500 coordinates
 * that passes behind the mobile cards.
 */
const MOBILE_SVG_PATH =
  "M 200 40 " +
  "C 280 20, 360 80, 330 150 " +
  "C 300 220, 120 180, 60 250 " +
  "C 10 320, 80 400, 220 380 " +
  "C 340 360, 370 480, 310 560 " +
  "C 250 640, 90 600, 50 690 " +
  "C 10 780, 110 860, 250 840 " +
  "C 370 820, 370 960, 290 1030 " +
  "C 210 1100, 70 1080, 50 1170 " +
  "C 30 1260, 140 1330, 260 1320 " +
  "C 360 1310, 340 1430, 220 1490 " +
  "C 140 1530, 80 1580, 30 1640";

// Calibrated path checkpoints where the stroke arrives under each process card
const DESKTOP_CHECKPOINTS = [0.18, 0.38, 0.58, 0.76, 0.90];
const MOBILE_CHECKPOINTS = [0.15, 0.35, 0.55, 0.75, 0.90];

export function ProcessStrokeFollow({
  steps = DEFAULT_STEPS,
}: {
  steps?: ProcessStep[];
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (pathRef.current) {
      try {
        const length = pathRef.current.getTotalLength();
        if (length > 0) {
          pathRef.current.setAttribute("data-length", String(Math.round(length)));
        }
      } catch {
        // Fallback for non-SVG measuring environments
      }
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 70%"],
  });

  // Animated stroke drawing mapped to scroll progress (0.0 to 1.0)
  const pathLength = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [1, 1] : [0, 1]
  );
  const strokeDashoffset = useTransform(pathLength, (value) => 1 - value);

  return (
    <section
      ref={containerRef}
      id="farm-process"
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--color-cream)",
        color: "var(--color-dark)",
        padding: "clamp(56px, 6vw, 84px) clamp(20px, 4vw, 56px) clamp(80px, 8vw, 120px)",
      }}
    >
      <div
        className="mx-auto relative z-10"
        style={{ maxWidth: "var(--container-site)" }}
      >
        {/* Desktop Layout: Integrated Organic Follow Stroke with Protected Card Pockets */}
        <div
          className="relative hidden md:block"
          style={{
            minHeight: "clamp(1680px, 125vw, 1960px)",
            width: "100%",
          }}
        >
          {/* Continuous Organic SVG Follow Stroke */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1200 1960"
              fill="none"
              overflow="visible"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                {/* Vertical Fade Mask: Smoothly disappears into the next section below */}
                <mask id="processBottomFadeMask">
                  <linearGradient id="processMaskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="85%" stopColor="white" />
                    <stop offset="97%" stopColor="#555555" />
                    <stop offset="100%" stopColor="black" />
                  </linearGradient>
                  <rect x="-200" y="-100" width="1600" height="2200" fill="url(#processMaskGrad)" />
                </mask>

                {/* Navbar CTA Button Gradient (Gold -> Orange -> Terracotta -> Transparent Tail) */}
                <linearGradient
                  id="processCtaStrokeGrad"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ECCC74" stopOpacity="1" />
                  <stop offset="45%" stopColor="#F59268" stopOpacity="1" />
                  <stop offset="88%" stopColor="#C0613B" stopOpacity="1" />
                  <stop offset="98%" stopColor="#C0613B" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#C0613B" stopOpacity="0" />
                </linearGradient>

                {/* Translucent Background Guide Stroke */}
                <linearGradient
                  id="processCtaGuideGrad"
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ECCC74" stopOpacity="0.25" />
                  <stop offset="45%" stopColor="#F59268" stopOpacity="0.22" />
                  <stop offset="88%" stopColor="#C0613B" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#C0613B" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g mask="url(#processBottomFadeMask)">
                {/* Guide Track (Subtle background path) */}
                <path
                  d={DESKTOP_SVG_PATH}
                  stroke="url(#processCtaGuideGrad)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Dynamic Scroll-Drawn Progress Stroke */}
                <motion.path
                  ref={pathRef}
                  d={DESKTOP_SVG_PATH}
                  stroke="url(#processCtaStrokeGrad)"
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    pathLength,
                    strokeDashoffset,
                    filter: "drop-shadow(0 4px 18px rgba(245, 146, 104, 0.45))",
                  }}
                />
              </g>
            </svg>
          </div>

          {/* Section Header */}
          <div className="relative z-10 pt-2 mb-8 pointer-events-auto">
            <div className="grid grid-cols-12 gap-6 items-start">
              <div className="col-span-12 md:col-span-3">
                <SectionEyebrow color="var(--color-terracotta)">
                  Daily Standards
                </SectionEyebrow>
              </div>
              <div className="col-span-12 md:col-span-9">
                <h2
                  style={{
                    margin: 0,
                    fontSize: "clamp(34px, 4.2vw, 56px)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: "-.032em",
                  }}
                >
                  Care, collect, grade,
                  <br />
                  pack, deliver.
                </h2>
                <p
                  style={{
                    margin: "18px 0 0",
                    fontSize: "clamp(15px, 1.2vw, 18px)",
                    lineHeight: 1.6,
                    color: "rgba(17,17,17,0.78)",
                    maxWidth: "52ch",
                  }}
                >
                  Every single egg follows this unbroken five-stage protocol from morning inspection to county-wide doorstep dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Step 01: Care (Upper-Right, stroke passes underneath) */}
          <StepRevealItem
            step={steps[0]}
            scrollYProgress={scrollYProgress}
            checkpoint={DESKTOP_CHECKPOINTS[0]}
            positionStyle={{
              position: "absolute",
              top: "16%",
              left: "56%",
              maxWidth: "420px",
            }}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Step 02: Collect (Mid-Left, stroke passes underneath) */}
          <StepRevealItem
            step={steps[1]}
            scrollYProgress={scrollYProgress}
            checkpoint={DESKTOP_CHECKPOINTS[1]}
            positionStyle={{
              position: "absolute",
              top: "33%",
              left: "7%",
              maxWidth: "420px",
            }}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Step 03: Grade (Center-Right, stroke passes underneath) */}
          <StepRevealItem
            step={steps[2]}
            scrollYProgress={scrollYProgress}
            checkpoint={DESKTOP_CHECKPOINTS[2]}
            positionStyle={{
              position: "absolute",
              top: "49%",
              left: "54%",
              maxWidth: "420px",
            }}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Step 04: Pack (Lower-Left, stroke passes underneath) */}
          <StepRevealItem
            step={steps[3]}
            scrollYProgress={scrollYProgress}
            checkpoint={DESKTOP_CHECKPOINTS[3]}
            positionStyle={{
              position: "absolute",
              top: "66%",
              left: "7%",
              maxWidth: "420px",
            }}
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Step 05: Deliver (Lower-Right, stroke passes underneath) */}
          <StepRevealItem
            step={steps[4]}
            scrollYProgress={scrollYProgress}
            checkpoint={DESKTOP_CHECKPOINTS[4]}
            positionStyle={{
              position: "absolute",
              top: "82%",
              left: "54%",
              maxWidth: "420px",
            }}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        {/* Mobile Layout: Responsive Vertical Sequence with Looping Follow Stroke */}
        <div className="relative block md:hidden" style={{ minHeight: 1300 }}>
          {/* Mobile Header */}
          <div className="relative z-10 mb-8 pt-2">
            <SectionEyebrow color="var(--color-terracotta)">
              Daily Standards
            </SectionEyebrow>
            <h2 className="text-3xl font-bold tracking-tight text-dark mt-2 leading-tight">
              Care, collect, grade,
              <br />
              pack, deliver.
            </h2>
            <p className="mt-3 text-sm text-dark/75 leading-relaxed">
              Every single egg follows this unbroken five-stage protocol from morning inspection to county-wide doorstep dispatch.
            </p>
          </div>

          {/* Mobile SVG Stroke (Side-to-side sweeping and looped behind cards) */}
          <div className="absolute top-[130px] inset-x-0 bottom-0 pointer-events-none z-0">
            <svg
              viewBox="0 0 400 1650"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full overflow-visible"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <mask id="mobileBottomFadeMask">
                  <linearGradient id="mobileMaskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="white" />
                    <stop offset="85%" stopColor="white" />
                    <stop offset="98%" stopColor="#555555" />
                    <stop offset="100%" stopColor="black" />
                  </linearGradient>
                  <rect x="0" y="0" width="400" height="1750" fill="url(#mobileMaskGrad)" />
                </mask>

                <linearGradient id="mobileProcessStrokeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ECCC74" stopOpacity="1" />
                  <stop offset="45%" stopColor="#F59268" stopOpacity="1" />
                  <stop offset="88%" stopColor="#C0613B" stopOpacity="1" />
                  <stop offset="100%" stopColor="#C0613B" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="mobileProcessGuideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ECCC74" stopOpacity="0.25" />
                  <stop offset="45%" stopColor="#F59268" stopOpacity="0.2" />
                  <stop offset="88%" stopColor="#C0613B" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#C0613B" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g mask="url(#mobileBottomFadeMask)">
                <path
                  d={MOBILE_SVG_PATH}
                  stroke="url(#mobileProcessGuideGrad)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <motion.path
                  d={MOBILE_SVG_PATH}
                  stroke="url(#mobileProcessStrokeGrad)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  style={{
                    pathLength,
                    strokeDashoffset,
                    filter: "drop-shadow(0 2px 10px rgba(245, 146, 104, 0.4))",
                  }}
                />
              </g>
            </svg>
          </div>

          {/* Mobile Process Cards (Solid background so stroke disappears underneath) */}
          <div className="relative z-10 space-y-12 pt-2 px-1">
            {steps.map((step, idx) => (
              <MobileStepRevealItem
                key={step.n}
                step={step}
                scrollYProgress={scrollYProgress}
                checkpoint={MOBILE_CHECKPOINTS[idx]}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Fade Gradient for pristine transition into next dark section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, rgba(245,240,232,0) 0%, rgba(245,240,232,0.8) 70%, rgba(245,240,232,1) 100%)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}

function StepRevealItem({
  step,
  scrollYProgress,
  checkpoint,
  positionStyle,
  shouldReduceMotion,
}: {
  step: ProcessStep;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollYProgress: any;
  checkpoint: number;
  positionStyle: React.CSSProperties;
  shouldReduceMotion?: boolean | null;
}) {
  // Reveal window triggered around the stroke arrival at this checkpoint
  const startTrigger = Math.max(0, checkpoint - 0.06);
  const activeTrigger = Math.min(1, checkpoint + 0.02);

  const opacity = useTransform(
    scrollYProgress,
    [startTrigger, activeTrigger],
    shouldReduceMotion ? [1, 1] : [0.2, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [startTrigger, activeTrigger],
    shouldReduceMotion ? [0, 0] : [14, 0]
  );

  const scale = useTransform(
    scrollYProgress,
    [startTrigger, activeTrigger],
    shouldReduceMotion ? [1, 1] : [0.97, 1]
  );

  return (
    <motion.div
      style={{
        ...positionStyle,
        opacity,
        y,
        scale,
      }}
      className="z-20 select-none pointer-events-auto"
    >
      {/* Solid Opaque Card Container so stroke disappears completely underneath */}
      <div className="relative p-5 lg:p-6 rounded-2xl bg-[#F5F0E8] border border-[var(--color-terracotta)]/20 shadow-[0_10px_35px_rgba(17,17,17,0.06)] transition-all duration-300 hover:border-[var(--color-terracotta)]/40 hover:shadow-[0_14px_42px_rgba(192,97,59,0.12)]">
        {/* Step Index Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)] font-mono text-xs font-semibold tracking-[0.16em] uppercase mb-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)]" />
          STAGE {step.n}
        </div>

        {/* Step Title */}
        <h3 className="text-3xl lg:text-[34px] font-bold tracking-tight text-dark mb-2 leading-[1.1]">
          {step.title}
        </h3>

        {/* Step Body */}
        <p className="text-base lg:text-[17px] text-dark/85 leading-[1.55] font-normal">
          {step.body}
        </p>

        {/* Detail Timestamp */}
        {step.detail && (
          <div className="mt-3 pt-3 border-t border-[var(--color-dark)]/8 text-xs font-mono text-dark/60 tracking-wider uppercase flex items-center gap-1.5">
            <span className="text-[var(--color-terracotta)]">⏱</span>
            {step.detail}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MobileStepRevealItem({
  step,
  scrollYProgress,
  checkpoint,
  shouldReduceMotion,
}: {
  step: ProcessStep;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scrollYProgress: any;
  checkpoint: number;
  shouldReduceMotion?: boolean | null;
}) {
  const startTrigger = Math.max(0, checkpoint - 0.06);
  const activeTrigger = Math.min(1, checkpoint + 0.02);

  const opacity = useTransform(
    scrollYProgress,
    [startTrigger, activeTrigger],
    shouldReduceMotion ? [1, 1] : [0.3, 1]
  );

  const y = useTransform(
    scrollYProgress,
    [startTrigger, activeTrigger],
    shouldReduceMotion ? [0, 0] : [12, 0]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="relative z-10"
    >
      <div className="p-4 rounded-xl bg-[#F5F0E8] border border-[var(--color-terracotta)]/20 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[var(--color-terracotta)]/10 text-[var(--color-terracotta)] font-mono text-[11px] font-semibold tracking-wider uppercase mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)]" />
          STAGE {step.n}
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-dark mb-1.5">
          {step.title}
        </h3>
        <p className="text-sm text-dark/85 leading-relaxed">
          {step.body}
        </p>
        {step.detail && (
          <div className="mt-2.5 pt-2 border-t border-[var(--color-dark)]/8 text-[11px] font-mono text-dark/60 tracking-wider uppercase">
            {step.detail}
          </div>
        )}
      </div>
    </motion.div>
  );
}

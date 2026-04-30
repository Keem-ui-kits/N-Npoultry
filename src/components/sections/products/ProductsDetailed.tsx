'use client';

import type { Product } from '@/types/product';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

function resolveAccent(color: string): string {
  if (color === 'var(--brand-gold)') return '#eccc74';
  // Secondary products use brand-orange — red/green are off-brand
  if (color === 'var(--product-green)' || color === 'var(--product-red)') return '#f59268';
  return color;
}

// ─── Shared mobile/tablet layout — identical for all products ────────────────
function MobileProductLayout({ product, badge }: { product: Product; badge: string }) {
  const accentHex = resolveAccent(product.color);

  return (
    <div className="lg:hidden space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3"
            style={{ color: accentHex, background: `${accentHex}18`, border: `1px solid ${accentHex}40` }}
          >
            <span className="w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: accentHex }} />
            {badge}
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none text-foreground">
            {product.title}{' '}
            <span style={{ color: accentHex }}>{product.titleAccent}</span>
          </h2>
        </div>
        <div
          className="relative shrink-0 w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border shadow-[0_8px_40px_-8px_rgba(0,0,0,0.7)]"
          style={{ borderColor: `${accentHex}30` }}
        >
          <div
            className="absolute inset-0 z-10 opacity-25"
            style={{ background: `radial-gradient(ellipse at center, ${accentHex}, transparent 70%)` }}
          />
          <Image
            src={product.image}
            alt={`${product.title} ${product.titleAccent}`}
            fill
            className="object-contain p-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            sizes="(max-width: 640px) 112px, 144px"
          />
        </div>
      </div>

      <motion.p
        className="text-base sm:text-lg text-muted-foreground leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        {product.fullDescription ?? product.description}
      </motion.p>

      {product.features && product.features.length > 0 && (
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: `${accentHex}80` }}>
            Key Features
          </p>
          <ul className="space-y-2">
            {product.features.map((f, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-2.5 text-sm sm:text-base font-medium text-foreground/90"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accentHex }} />
                {f}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}

// ─── Primary hero row — full-width, dominant treatment for Table Eggs ────────
function PrimaryProductRow({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageYMotion = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);
  const imageY = prefersReduced ? undefined : imageYMotion;
  const accentHex = resolveAccent(product.color);

  return (
    <div id={product.id}>
    <div ref={ref}>

      {/* Mobile / Tablet */}
      <MobileProductLayout product={product} badge="Main Product" />

      {/* Desktop — full-width split with oversized image panel */}
      <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] gap-20 items-stretch">
        {/* Content */}
        <div className="flex flex-col justify-center space-y-8">
          {/* Primary badge */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full w-fit"
            style={{ color: accentHex, background: `${accentHex}18`, border: `1px solid ${accentHex}40` }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: accentHex }} />
            <span className="text-xs font-black tracking-widest uppercase">Main Product</span>
          </motion.div>

          {/* Ghost number */}
          <span
            className="absolute -top-2 -left-10 text-[11rem] font-black leading-none select-none pointer-events-none opacity-[0.03]"
            style={{ WebkitTextStroke: '2px white', WebkitTextFillColor: 'transparent' }}
            aria-hidden="true"
          >01</span>

          <h2
            className="text-6xl xl:text-7xl 2xl:text-8xl font-black uppercase tracking-tight leading-[0.9] text-foreground"
          >
            {product.title}{' '}
            <span style={{ color: accentHex, textShadow: `0 0 60px ${accentHex}60` }}>
              {product.titleAccent}
            </span>
          </h2>

          <motion.p
            className="text-xl text-muted-foreground leading-relaxed max-w-lg"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.28 }}
          >
            {product.fullDescription ?? product.description}
          </motion.p>

          {product.features && product.features.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest" style={{ color: `${accentHex}80` }}>
                Key Features
              </p>
              <ul className="space-y-2.5">
                {product.features.map((f, i) => (
                  <motion.li
                    key={i}
                    className="flex items-center gap-3 text-lg font-medium text-foreground/90"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.34 + i * 0.07 }}
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: accentHex }} />
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Large image panel */}
        <div
          style={{ borderColor: `${accentHex}20` }}
          className="relative lg:min-h-[580px] rounded-[3rem] overflow-hidden group shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] border"
        >
          <div
            className="absolute inset-0 opacity-30 z-10"
            style={{ background: `radial-gradient(ellipse at 55% 35%, ${accentHex}, transparent 65%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
          <Image
            src={product.image}
            alt={`${product.title} ${product.titleAccent}`}
            fill
            className="object-contain p-10 transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_32px_64px_rgba(0,0,0,0.6)]"
            sizes="55vw"
            priority
            fetchPriority="high"
          />
          {/* "Our hero" label */}
          <div className="absolute bottom-8 left-8 z-20">
            <span
              className="text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border"
              style={{ color: accentHex, borderColor: `${accentHex}40` }}
            >
              Our Star Product
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

// ─── Secondary compact row — for Ex-Layer Hens & Poultry Manure ──────────────
function SecondaryProductRow({ product, index }: { product: Product; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const accentHex = resolveAccent(product.color);

  return (
    <div id={product.id}>
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
      className="flex flex-col h-full"
    >
      {/* Mobile / Tablet — identical layout to primary */}
      <MobileProductLayout product={product} badge="Also Available" />

      {/* Desktop — compact card with image on top */}
      <div className="hidden lg:flex lg:flex-col h-full">
        <motion.div
          className="relative w-full h-64 xl:h-72 rounded-3xl overflow-hidden group border shadow-[0_16px_48px_-12px_rgba(0,0,0,0.5)] mb-6"
          style={{ borderColor: `${accentHex}20` }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="absolute inset-0 opacity-20 z-10"
            style={{ background: `radial-gradient(ellipse at 60% 40%, ${accentHex}, transparent 65%)` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <Image
            src={product.image}
            alt={`${product.title} ${product.titleAccent}`}
            fill
            className="object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-105 drop-shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            sizes="40vw"
          />
        </motion.div>

        <div className="space-y-3 flex-1">
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest"
            style={{ color: `${accentHex}80` }}
          >
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: accentHex }} />
            Also Available
          </span>
          <h3 className="text-3xl font-black uppercase tracking-tight leading-tight text-foreground">
            {product.title}{' '}
            <span style={{ color: accentHex }}>{product.titleAccent}</span>
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed">
            {product.fullDescription ?? product.description}
          </p>
          {product.features && product.features.length > 0 && (
            <ul className="space-y-2 pt-1">
              {product.features.map((f, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-2.5 text-sm font-medium text-foreground/80"
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.06 }}
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: accentHex }} />
                  {f}
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
    </div>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function ProductDivider({ color }: { color: string }) {
  return (
    <motion.div
      className="relative flex items-center gap-4 py-2"
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <div className="flex-1 h-px bg-white/8" />
      <div className="w-2 h-2 rounded-full opacity-50" style={{ backgroundColor: color }} />
      <div className="flex-1 h-px bg-white/8" />
    </motion.div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export function ProductsDetailed({ products }: { products: Product[] }) {
  const primary = products.find((p) => p.id === 'table-eggs');
  const secondaries = products.filter((p) => p.id !== 'table-eggs');

  // Fallback: if Sanity doesn't have table-eggs yet, treat first as primary
  const heroProduct = primary ?? products[0];
  const secondaryProducts = primary ? secondaries : products.slice(1);

  return (
    <section id="products" className="py-16 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32">

        {/* ── Primary: Table Eggs ─────────────────────────────────────────── */}
        {heroProduct && <PrimaryProductRow product={heroProduct} />}

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        {secondaryProducts.length > 0 && heroProduct && (
          <>
            <ProductDivider color={resolveAccent(heroProduct.color)} />

            {/* ── Secondary label ─────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="-mt-8 md:-mt-12"
            >
              <p className="text-xs font-black uppercase tracking-widest text-white/25 mb-8 md:mb-12">
                Also Available
              </p>

              {/* ── Secondary products grid ─────────────────────────────── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-14">
                {secondaryProducts.map((product, i) => (
                  <SecondaryProductRow key={product.id} product={product} index={i} />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

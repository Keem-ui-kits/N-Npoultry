'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { ChevronRight, MapPin, MessageCircle } from 'lucide-react';
import { WhatsAppOrderSheet } from '@/components/ui/WhatsAppOrderSheet';
import { AvailabilityStrip } from './AvailabilityStrip';

interface AvailabilityData {
  tableEggs?: number | null;
  manure?: number | null;
  exLayerHens?: number | null;
  lastUpdated?: string | null;
  note?: string | null;
}

const BrandParticles = dynamic(() => import('@/components/BrandParticles'), { ssr: false });

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function Hero({ whatsapp, availability }: { whatsapp?: string; availability?: AvailabilityData | null }) {
  const [orderSheetOpen, setOrderSheetOpen] = useState(false);

  return (
    <div className="relative min-h-[95vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030213]">
      <BrandParticles />
      
      {/* Background Image & Overlay */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.7 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/images/hero-bg.jpeg"
          alt="Freshly collected eggs on N&N Poultry Palace farm in Machakos, Kenya"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030213] via-[#030213]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030213] via-transparent to-[#030213]/50" />
      </motion.div>

      {/* Ambient Visuals */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none" 
      />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.7 }}
        className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none" 
      />

      {/* Hero Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center px-4 max-w-7xl mx-auto pt-24 pb-20"
      >
        
        {/* Location badge */}
        <motion.div 
          variants={itemVariants}
          className="flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold" />
          </span>
          <MapPin className="w-4 h-4 text-brand-gold" />
          <span className="text-sm font-bold tracking-widest uppercase text-white/90">
            Machakos Farm — Collecting Fresh Every Morning
          </span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.95] mb-10 tracking-tight flex flex-col items-center"
        >
          <span className="whitespace-nowrap text-center">Every day, <span className="gradient-brand-text">every egg,</span></span>
          <span className="whitespace-nowrap text-center text-white/90">Done right.</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-3xl text-white/60 max-w-4xl mb-16 leading-relaxed font-light tracking-wide"
        >
          Collected at <span className="text-white font-medium">6:30 AM</span>. Inspected and packed by <span className="text-white font-medium">9 AM</span>. <br className="hidden md:block" /> On your doorstep before noon — direct from our farm in <span className="text-brand-gold font-medium">Machakos, Kenya.</span>
        </motion.p>

        {/* Dual CTAs */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col items-center gap-6"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button
              onClick={() => setOrderSheetOpen(true)}
              className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full gradient-brand text-brand-dark font-black text-lg tracking-wider transition-all duration-500 hover:shadow-[0_0_40px_rgba(236,204,116,0.4)] hover:scale-105"
            >
              <MessageCircle className="w-6 h-6" />
              Order on WhatsApp
            </button>
            <Link
              href="/products"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-bold text-lg tracking-wide transition-all duration-500 hover:bg-white/10 hover:border-white/40 hover:scale-105"
            >
              Explore Products
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <p className="text-brand-gold font-bold text-base md:text-lg tracking-[0.1em] uppercase opacity-80 mt-4 flex items-center gap-2">
            <span className="w-8 h-px bg-brand-gold/30" />
            Today&apos;s delivery slots fill up by 10 AM
            <span className="w-8 h-px bg-brand-gold/30" />
          </p>

          <WhatsAppOrderSheet
            isOpen={orderSheetOpen}
            onClose={() => setOrderSheetOpen(false)}
            whatsapp={whatsapp}
          />
        </motion.div>
      </motion.div>

      {/* Bottom Availability Strip */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-20"
      >
        <AvailabilityStrip availability={availability} />
      </motion.div>
    </div>
  );
}

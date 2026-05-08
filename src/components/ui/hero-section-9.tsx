import { motion, type Variants } from 'framer-motion';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';
import Image from 'next/image';

interface ActionProps {
  text: string;
  onClick: () => void;
  variant?: ButtonProps['variant'];
  className?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  images: string[];
  className?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const floatingVariants: Variants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const HeroSection = ({ title, subtitle, actions, images, className }: HeroSectionProps) => {
  return (
    <section className={cn('w-full overflow-hidden bg-background pt-8 pb-16 lg:pb-24', className)}>
      <div className="container mx-auto grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-8">
        <motion.div
          className="flex flex-col items-start text-left"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-5xl font-black tracking-tighter text-foreground sm:text-7xl lg:text-[5.5rem] leading-[1.1]"
            variants={itemVariants}
          >
            {title}
          </motion.h1>
          <motion.p className="mt-8 max-w-2xl text-xl sm:text-2xl leading-relaxed text-muted-foreground" variants={itemVariants}>
            {subtitle}
          </motion.p>
          <motion.div className="mt-12 hidden lg:flex flex-wrap justify-start gap-6" variants={itemVariants}>
            {actions.map((action, index) => (
              <Button key={index} onClick={action.onClick} variant={action.variant} size="lg" className={action.className}>
                {action.text}
              </Button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative h-[450px] w-full sm:h-[600px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div
            className="absolute -top-4 left-1/4 h-16 w-16 rounded-full bg-[#ECCC74]/50 dark:bg-[#ECCC74]/30"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-1/4 h-12 w-12 rounded-lg bg-[#ef4444]/50 dark:bg-[#ef4444]/30"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: '0.5s' }}
          />
          <motion.div
            className="absolute bottom-1/4 left-4 h-6 w-6 rounded-full bg-[#4ade80]/50 dark:bg-[#4ade80]/30"
            variants={floatingVariants}
            animate="animate"
            style={{ transitionDelay: '1s' }}
          />

          <motion.div
            className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-[3rem] bg-card dark:bg-brand-dark/60 border border-border dark:border-white/10 shadow-2xl sm:h-80 sm:w-80 hover:scale-105 transition-transform duration-500 cursor-pointer group overflow-hidden flex items-center justify-center"
            style={{ transformOrigin: 'bottom center' }}
            variants={imageVariants}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, #ECCC74 0%, transparent 70%)` }} />
            {images[0] ? (
              <Image
                src={images[0]}
                alt="Hero Image 1"
                fill
                sizes="(max-width: 640px) 224px, (max-width: 1024px) 320px, 384px"
                priority
                className="relative z-10 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            ) : (
              <div className="relative z-10 w-full h-full flex items-center justify-center bg-muted rounded-xl border border-dashed border-border opacity-50">
                <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">N&N Branding</span>
              </div>
            )}
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/3 h-48 w-48 rounded-[3rem] bg-card dark:bg-brand-dark/60 border border-border dark:border-white/10 shadow-2xl sm:h-72 sm:w-72 hover:scale-105 transition-transform duration-500 cursor-pointer group overflow-hidden flex items-center justify-center"
            style={{ transformOrigin: 'left center' }}
            variants={imageVariants}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, #4ade80 0%, transparent 70%)` }} />
            {images[1] && (
              <Image
                src={images[1]}
                alt="Hero Image 2"
                fill
                sizes="(max-width: 640px) 192px, (max-width: 1024px) 288px, 320px"
                className="relative z-10 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </motion.div>
          <motion.div
            className="absolute bottom-0 left-0 h-40 w-40 rounded-[3rem] bg-card dark:bg-brand-dark/60 border border-border dark:border-white/10 shadow-2xl sm:h-64 sm:w-64 hover:scale-105 transition-transform duration-500 cursor-pointer group overflow-hidden flex items-center justify-center"
            style={{ transformOrigin: 'top right' }}
            variants={imageVariants}
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, #ef4444 0%, transparent 70%)` }} />
            {images[2] && (
              <Image
                src={images[2]}
                alt="Hero Image 3"
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 256px, 288px"
                className="relative z-10 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            )}
          </motion.div>
        </motion.div>
        <motion.div className="mt-8 mb-6 flex lg:hidden flex-wrap justify-end gap-6 w-full" variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {actions.map((action, index) => (
            <Button key={index} onClick={action.onClick} variant={action.variant} size="lg" className={action.className}>
              {action.text}
            </Button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

'use client';

import { Sparkles } from 'lucide-react';
import { AnimatedFeatureSpotlight3D } from '@/components/ui/animated-feature-spotlight3d';
import dynamic from 'next/dynamic';

const FloatingEgg3DScene = dynamic(() => import('@/components/ui/floating-egg-3d').then(mod => mod.FloatingEgg3DScene), { 
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[400px]" />
});

import { useSiteLoaded } from '@/hooks/use-site-loaded';

export function Hero() {
  const isLoaded = useSiteLoaded();

  return (
    <div className="w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-8 bg-background relative">
      
      {/* Soft dark shadow acting as an obstruction layer to fade the ribbon before it hits the text */}
      <div className="absolute top-[35%] right-[5%] md:right-[20%] w-[300px] md:w-[800px] h-[400px] md:h-[600px] bg-background/95 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-[1]" />

      <div className="w-full max-w-[1500px] mx-auto relative z-[2]">
        <AnimatedFeatureSpotlight3D
          preheaderIcon={<Sparkles className="w-4 h-4 text-brand-gold" />}
          preheaderText="PREMIUM QUALITY SUPPLIERS"
          heading={
            <>
              Farm-Fresh<br />
              <span className="gradient-brand-text">Nutritious Eggs</span>
            </>
          }
          description="From day-collected table eggs to organic farm nutrients, everything you need from a supplier you can rely on. Built with premium quality in mind."
          buttonText="Contact Us"
          buttonProps={{
            className: "gradient-brand text-brand-dark font-bold hover:shadow-[0_0_20px_rgba(var(--brand-gold-rgb),0.4)] border-0 hover:opacity-100",
            onClick: () => {
              window.location.href = '/contact';
            }
          }}
          customImageElement={isLoaded ? <FloatingEgg3DScene /> : null}
          imageAlt="Farm-fresh nutritious eggs"
          headingLevel="h1"
          className="w-full border-none bg-transparent shadow-none"
        />
      </div>
    </div>
  );
}


'use client';

import type { ProductPricingTier } from '@/types/product';

export function PricingTable({ tiers }: { tiers: ProductPricingTier[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {tiers.map((tier) => (
        <div 
          key={tier.label} 
          className="bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-2xl p-6 text-center hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 transition-all group"
        >
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground dark:text-white/40 mb-1 group-hover:text-brand-gold transition-colors">{tier.label}</p>
          <div className="flex flex-col items-center">
            <p className="text-3xl font-black gradient-brand-text leading-tight">{tier.price}</p>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground dark:text-white/30 mt-1">{tier.unit}</p>
          </div>
          {tier.note && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand-orange mt-3 opacity-80">{tier.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}

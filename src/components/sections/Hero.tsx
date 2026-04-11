import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/content/site';
import { HeroClient } from './HeroClient';
import { HeroMotion } from './HeroMotion';
import { HeroContactButton } from './HeroContactButton';

export function Hero() {
  return (
    <HeroClient>
      <HeroMotion className="mb-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/30 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-md">
          <Sparkles className="h-4 w-4 text-brand-gold" />
          PREMIUM QUALITY SUPPLIERS
        </span>
      </HeroMotion>

      <HeroMotion>
        <h1 className="mb-6 text-5xl font-black tracking-tight md:text-7xl lg:text-[5.5rem] w-full uppercase break-words leading-[0.9]">
          Farm-Fresh
          <br />
          <span className="gradient-brand-text">Nutritious Eggs</span>
        </h1>
      </HeroMotion>

      <HeroMotion>
        <p className="mb-10 max-w-2xl text-lg md:text-xl text-foreground/70">
          From day-collected table eggs to organic farm nutrients, everything you need from a
          supplier you can rely on. Built with premium quality in mind.
        </p>
      </HeroMotion>

      <HeroMotion className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <HeroContactButton />
      </HeroMotion>

    </HeroClient>
  );
}

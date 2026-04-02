'use client';

import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function HeroContactButton() {
  return (
    <Button
      asChild
      size="lg"
      className="px-8 h-14 gradient-brand text-brand-dark rounded-full font-bold hover:shadow-[0_0_20px_rgba(var(--brand-gold-rgb),0.4)] transition-all flex items-center justify-center gap-2 group transform hover:scale-105 w-full sm:w-auto text-lg border-0 hover:opacity-100"
    >
      <Link href="/contact">
        Place an Order
        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </Button>
  );
}

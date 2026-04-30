'use client';

import { Navbar } from '@/components/layout/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { InfiniteRibbon } from '@/components/ui/infinite-ribbon';

interface PageWrapperClientProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function PageWrapperClient({ children, footer }: PageWrapperClientProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      {footer}
    </div>
  );
}

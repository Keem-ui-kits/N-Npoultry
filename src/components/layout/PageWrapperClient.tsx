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
      <InfiniteRibbon />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          id="main-content"
          exit={{ opacity: 0, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex-grow"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {footer}
    </div>
  );
}

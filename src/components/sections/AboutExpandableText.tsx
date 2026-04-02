'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-is-mobile';

interface AboutExpandableTextProps {
  children: React.ReactNode;
}

export function AboutExpandableText({ children }: AboutExpandableTextProps) {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative">
      <AnimatePresence initial={false}>
        {(!isMobile || isExpanded) && (
          <motion.div
            initial={isMobile ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {isMobile && (
        <button
          onClick={() => { setIsExpanded(!isExpanded); }}
          className="group flex items-center gap-3 text-brand-gold font-mono text-sm uppercase tracking-[0.2em] hover:text-white transition-colors duration-300 mt-4"
        >
          {isExpanded ? (
            <>
              <span className="w-8 h-[1px] bg-brand-gold group-hover:bg-white transition-colors"></span>
              Show Less 
            </>
          ) : (
            <>
              <span className="w-8 h-[1px] bg-brand-gold group-hover:bg-white transition-colors"></span>
              Read More 
            </>
          )}
        </button>
      )}
    </div>
  );
}

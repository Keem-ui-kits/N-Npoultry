'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function PhoneCopyButton({ phone }: { phone: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard not available — no-op
    }
  };

  return (
    <button
      onClick={() => void handleCopy()}
      className="relative text-white/70 hover:text-brand-gold transition-colors text-sm md:text-base cursor-pointer text-left"
      title="Click to copy"
      aria-label={`Copy ${phone} to clipboard`}
    >
      {phone}
      <AnimatePresence>
        {copied && (
          <motion.span
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: -20 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute -top-1 left-0 text-xs font-bold text-brand-gold pointer-events-none whitespace-nowrap"
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

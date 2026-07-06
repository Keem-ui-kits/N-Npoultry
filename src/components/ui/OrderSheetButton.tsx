'use client';

import { useState, type ReactNode } from 'react';
import { WhatsAppOrderSheet } from '@/components/ui/WhatsAppOrderSheet';

interface OrderSheetButtonProps {
  children: ReactNode;
  className?: string;
  whatsapp?: string;
  initialProductId?: string;
  onOpen?: () => void;
}

/**
 * Renders a button that opens the WhatsApp order sheet, optionally
 * pre-selecting a product. Replaces the old /quote links so every
 * order CTA funnels into the same flow.
 */
export function OrderSheetButton({ children, className, whatsapp, initialProductId, onOpen }: OrderSheetButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => { setOpen(true); onOpen?.(); }} className={className}>
        {children}
      </button>
      <WhatsAppOrderSheet
        isOpen={open}
        onClose={() => { setOpen(false); }}
        whatsapp={whatsapp}
        initialProductId={initialProductId}
      />
    </>
  );
}

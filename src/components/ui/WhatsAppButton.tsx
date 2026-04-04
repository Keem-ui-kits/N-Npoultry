'use client';

import { MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/content/site';

export function WhatsAppButton({ message }: { message?: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => { window.removeEventListener('scroll', toggleVisibility); };
  }, []);

  const whatsappUrl = `https://wa.me/${siteConfig.contacts.whatsapp}${
    message ? `?text=${encodeURIComponent(message)}` : ''
  }`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 50 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 px-6 py-4 bg-[#25D366] text-white rounded-full font-bold shadow-2xl hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] transition-all overflow-hidden group"
          aria-label="Contact us on WhatsApp"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <MessageCircle className="w-6 h-6 relative z-10" />
          <span className="relative z-10 hidden sm:block">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

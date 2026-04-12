'use client';

import Link from 'next/link';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

export function ContactCTA() {
  return (
    <section id="contact-cta" className="py-24 bg-brand-dark relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-orange/10 blur-[100px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-tr from-brand-dark/80 to-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] p-12 md:p-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase leading-tight">
              Ready <span className="gradient-brand-text">to experience</span> <br className="hidden md:block" /> the palace quality?
            </h2>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-medium">
              We deliver daily across Machakos and surrounding areas. Start your order today for farm-fresh excellence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-12 py-5 bg-white text-brand-dark rounded-full font-bold text-xl hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3"
              >
                Place Order <Send className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

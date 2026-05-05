'use client';

import { useState } from 'react';
import { X, MessageCircle, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DELIVERY_ZONES = ['Machakos Town', 'Syokimau', 'Athi River', 'Mlolongo', 'Katoloni', 'Mwala'];

const PRODUCTS = [
  { id: 'table-eggs', label: '30pc Table Eggs (tray)', unit: 'trays' },
  { id: 'poultry-manure', label: 'Poultry Manure (70kg sack)', unit: 'sacks' },
  { id: 'ex-layer-hens', label: 'Ex-Layer Hens', unit: 'hens' },
];

interface OrderState {
  productId: string;
  quantity: string;
  zone: string;
  preferredDate: string;
}

interface WhatsAppOrderSheetProps {
  whatsapp?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function WhatsAppOrderSheet({ whatsapp, isOpen, onClose }: WhatsAppOrderSheetProps) {
  const number = whatsapp ?? '254113377623';
  const [order, setOrder] = useState<OrderState>({
    productId: 'table-eggs',
    quantity: '',
    zone: '',
    preferredDate: '',
  });

  const selectedProduct = PRODUCTS.find((p) => p.id === order.productId) ?? PRODUCTS[0]!;

  const handleContinue = () => {
    const product = PRODUCTS.find((p) => p.id === order.productId);
    const lines = [
      `Hi N&N, I'd like to order:`,
      `- ${product?.label} x ${order.quantity || '___'}`,
      `- Delivery to: ${order.zone || '___'}`,
      order.preferredDate ? `- Preferred date: ${order.preferredDate}` : '- Preferred date: ___',
    ];
    const url = `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[10000]"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 48, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Place an order"
            className="fixed inset-x-4 bottom-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-md z-[10001] bg-[#0d1b26] border border-white/10 rounded-3xl p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-black text-white">Place an Order</h2>
                <p className="text-xs text-white/40 mt-0.5">We'll confirm within minutes on WhatsApp</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors flex-shrink-0"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Product selector */}
              <div>
                <label className="block text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2">
                  What would you like?
                </label>
                <div className="flex flex-col gap-2">
                  {PRODUCTS.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setOrder((o) => ({ ...o, productId: p.id }))}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-left text-sm font-semibold transition-all ${
                        order.productId === p.id
                          ? 'border-brand-gold bg-brand-gold/10 text-brand-gold'
                          : 'border-white/10 bg-white/5 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <span className="flex-1">{p.label}</span>
                      {order.productId === p.id && <ChevronRight className="w-4 h-4 flex-shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label
                  htmlFor="order-qty"
                  className="block text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2"
                >
                  How many {selectedProduct.unit}?
                </label>
                <input
                  id="order-qty"
                  type="number"
                  min="1"
                  value={order.quantity}
                  onChange={(e) => setOrder((o) => ({ ...o, quantity: e.target.value }))}
                  placeholder={`Enter number of ${selectedProduct.unit}`}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-brand-gold/50 transition-colors"
                />
              </div>

              {/* Delivery zone */}
              <div>
                <label
                  htmlFor="order-zone"
                  className="block text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2"
                >
                  Delivery area
                </label>
                <select
                  id="order-zone"
                  value={order.zone}
                  onChange={(e) => setOrder((o) => ({ ...o, zone: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors appearance-none"
                >
                  <option value="" className="bg-[#0d1b26] text-white">Select your area...</option>
                  {DELIVERY_ZONES.map((zone) => (
                    <option key={zone} value={zone} className="bg-[#0d1b26] text-white">{zone}</option>
                  ))}
                  <option value="Other" className="bg-[#0d1b26] text-white">Other (I'll specify in WhatsApp)</option>
                </select>
              </div>

              {/* Preferred date */}
              <div>
                <label
                  htmlFor="order-date"
                  className="block text-[10px] font-bold tracking-widest uppercase text-white/40 mb-2"
                >
                  Preferred delivery date
                </label>
                <input
                  id="order-date"
                  type="date"
                  value={order.preferredDate}
                  onChange={(e) => setOrder((o) => ({ ...o, preferredDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-brand-gold/50 transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="mt-6 w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#25D366] text-white rounded-2xl font-bold text-base hover:bg-[#1ebe5a] transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Continue to WhatsApp
            </button>

            <p className="mt-3 text-center text-[11px] text-white/30">
              Opens WhatsApp with your order pre-filled — you just hit send.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

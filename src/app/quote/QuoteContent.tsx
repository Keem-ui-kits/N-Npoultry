'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Send, FileText, Package, Truck, Calendar, Phone, Activity } from 'lucide-react';

import { quoteSchema, type QuoteFormData } from '@/lib/schemas/quote';

export default function QuoteContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get('product') as 'table-eggs' | 'poultry-manure' | 'ex-layer-hens' | null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      product: initialProduct ?? undefined,
    },
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: QuoteFormData) => {
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      reset();
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div className="bg-card dark:bg-brand-dark/80 border border-border dark:border-white/10 rounded-3xl p-6 md:p-12 backdrop-blur-sm shadow-xl">
      <div className="mb-10 flex items-center gap-4 border-b border-border dark:border-white/10 pb-6">
        <div className="w-12 h-12 rounded-2xl gradient-brand flex items-center justify-center text-brand-dark">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-foreground dark:text-white tracking-tight">Request a Quote</h1>
          <p className="text-muted-foreground dark:text-white/50 text-sm">Fill in the details for a tailored commercial proposal.</p>
        </div>
      </div>

      <form onSubmit={(e) => { void handleSubmit(onSubmit)(e); }} className="grid md:grid-cols-2 gap-6">
        {/* Company & Contact */}
        <div className="space-y-4">
          <h3 className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-4">Business Information</h3>
          
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Company Name <span className="text-brand-gold">*</span></label>
            <input
              id="companyName"
              {...register('companyName')}
              className="w-full px-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
              placeholder="e.g. Poultry Plus LTD"
            />
            {errors.companyName && <p className="text-destructive text-xs mt-1">{errors.companyName.message}</p>}
          </div>

          <div>
            <label htmlFor="contactName" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Contact Name <span className="text-brand-gold">*</span></label>
            <input
              id="contactName"
              {...register('contactName')}
              className="w-full px-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
              placeholder="Full Name"
            />
            {errors.contactName && <p className="text-destructive text-xs mt-1">{errors.contactName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Work Email <span className="text-brand-gold">*</span></label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
              placeholder="your@company.com"
            />
            {errors.email && <p className="text-destructive text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Phone Number <span className="text-brand-gold">*</span></label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="phone"
                {...register('phone')}
                className="w-full pl-11 pr-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                placeholder="0712 345 678"
              />
            </div>
            {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        {/* Product & Logistics */}
        <div className="space-y-4">
          <h3 className="text-brand-gold text-sm font-bold uppercase tracking-wider mb-4">Requirement Details</h3>

          <div>
            <label htmlFor="product" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Preferred Product <span className="text-brand-gold">*</span></label>
            <div className="relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                id="product"
                {...register('product')}
                className="w-full pl-11 pr-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all appearance-none text-foreground dark:text-white"
              >
                <option value="">Select a product...</option>
                <option value="table-eggs">Table Eggs (Grade A)</option>
                <option value="poultry-manure">Poultry Manure (Organic)</option>
                <option value="ex-layer-hens">Ex-Layer Hens</option>
              </select>
            </div>
            {errors.product && <p className="text-destructive text-xs mt-1">{errors.product.message}</p>}
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Quantity Needed <span className="text-brand-gold">*</span></label>
            <div className="relative">
              <Activity className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="quantity"
                {...register('quantity')}
                className="w-full pl-11 pr-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                placeholder="e.g. 50 trays/week"
              />
            </div>
            {errors.quantity && <p className="text-destructive text-xs mt-1">{errors.quantity.message}</p>}
          </div>

          <div>
            <label htmlFor="deliveryArea" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Delivery Area <span className="text-brand-gold">*</span></label>
            <div className="relative">
              <Truck className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                id="deliveryArea"
                {...register('deliveryArea')}
                className="w-full pl-11 pr-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all"
                placeholder="e.g. Machakos Town"
              />
            </div>
            {errors.deliveryArea && <p className="text-destructive text-xs mt-1">{errors.deliveryArea.message}</p>}
          </div>

          <div>
            <label htmlFor="frequency" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Order Frequency <span className="text-brand-gold">*</span></label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select
                id="frequency"
                {...register('frequency')}
                className="w-full pl-11 pr-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all appearance-none text-foreground dark:text-white"
              >
                <option value="">Select frequency...</option>
                <option value="one-off">One-off Order</option>
                <option value="weekly">Weekly Contract</option>
                <option value="monthly">Monthly Supply</option>
              </select>
            </div>
            {errors.frequency && <p className="text-destructive text-xs mt-1">{errors.frequency.message}</p>}
          </div>
        </div>

        <div className="md:col-span-2">
          <label htmlFor="message" className="block text-sm font-medium mb-1.5 text-foreground dark:text-white">Additional Notes (Optional)</label>
          <textarea
            id="message"
            {...register('message')}
            rows={4}
            className="w-full px-4 py-3 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl focus:ring-2 focus:ring-brand-gold outline-none transition-all resize-none"
            placeholder="Tell us about any specific requirements..."
          />
          {errors.message && <p className="text-destructive text-xs mt-1">{errors.message.message}</p>}
        </div>

        <div className="md:col-span-2 flex flex-col items-center gap-4 mt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            type="submit"
            className="w-full md:w-auto px-12 py-4 gradient-brand text-brand-dark rounded-full font-bold text-lg shadow-xl shadow-brand-gold/10 hover:shadow-brand-gold/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Sending Request...' : 'Submit Quote Request'}
            <Send className="w-5 h-5" />
          </motion.button>
          
          <div aria-live="polite" className="min-h-[1.5rem] w-full text-center">
            {submitStatus === 'success' && (
              <p className="text-brand-gold font-bold">Request received! Our team will contact you within 24 hours.</p>
            )}
            {submitStatus === 'error' && (
              <p className="text-white/60">Something went wrong. Please call us directly.</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { siteConfig } from '@/content/site';
import { contactSchema, type ContactFormData } from '@/lib/schemas/contact';
import { Input } from '@/components/ui/input';
import type { SiteConfig } from '@/sanity/lib/queries';

interface ContactProps {
  contactInfo?: Pick<SiteConfig, 'contacts' | 'businessHours'> | null
}

export function Contact({ contactInfo }: ContactProps) {
  const phones = contactInfo?.contacts?.phones ?? siteConfig.contacts.phones;
  const weekdays = contactInfo?.businessHours?.weekdays ?? siteConfig.businessHours.weekdays;
  const saturday = contactInfo?.businessHours?.saturday ?? siteConfig.businessHours.saturday;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', website: '', message: '' },
  });

  const nameValue = watch('name');
  const emailValue = watch('email');
  const websiteValue = watch('website') ?? '';

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const onSubmit = async (data: ContactFormData) => {
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
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
    <section
      id="contact"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white dark:from-muted/20 dark:to-background"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-card dark:bg-brand-dark/80 border border-border dark:border-white/10 rounded-3xl p-6 md:p-12 lg:p-16 backdrop-blur-sm shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-6 pt-2">
                <div>
                  <h3 className="text-foreground dark:text-white font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-brand-gold" />
                    Open a business account
                  </h3>
                  <p className="text-muted-foreground dark:text-white/50 text-sm md:text-base pl-9">
                    For planning and logistics, fill the call card. Terms apply
                  </p>
                </div>

                <div>
                  <h3 className="text-foreground dark:text-white font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-brand-gold" />
                    Business Hours
                  </h3>
                  <p className="text-muted-foreground dark:text-white/50 text-sm md:text-base pl-9">
                    {weekdays}
                    <br />
                    {saturday}
                  </p>
                </div>

                <div>
                  <h3 className="text-foreground dark:text-white font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <Phone className="w-6 h-6 text-brand-gold" />
                    Phone
                  </h3>
                  <p className="text-muted-foreground dark:text-white/50 text-sm md:text-base pl-9">
                    {phones.join(' / ')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={(e) => { void handleSubmit(onSubmit)(e); }}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <Input
                  id="name"
                  label="Name *"
                  value={nameValue}
                  {...register('name')}
                  onChange={(e) => { setValue('name', e.target.value, { shouldValidate: true }); }}
                  className="w-full"
                />
                {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <Input
                  id="email"
                  label="Email *"
                  type="email"
                  value={emailValue}
                  {...register('email')}
                  onChange={(e) => { setValue('email', e.target.value, { shouldValidate: true }); }}
                  className="w-full"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <Input
                  id="website"
                  label="Website (optional)"
                  type="url"
                  value={websiteValue}
                  {...register('website')}
                  onChange={(e) => { setValue('website', e.target.value, { shouldValidate: true }); }}
                  className="w-full"
                />
                {errors.website && <p className="text-destructive text-sm mt-1">{errors.website.message}</p>}
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-foreground dark:text-white text-sm md:text-base mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className="w-full px-5 py-4 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none cursor-text text-left"
                  placeholder="Tell us about your needs..."
                />
                {errors.message && <p className="text-destructive text-sm mt-1">{errors.message.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-4 gradient-brand text-brand-dark rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Submit'}
                <Send className="w-5 h-5" />
              </motion.button>

              <div aria-live="polite" aria-atomic="true" className="min-h-[1.5rem]">
                {submitStatus === 'success' && (
                  <p className="text-brand-gold font-medium">
                    Message sent successfully! We'll be in touch soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-white/60 font-medium">
                    Something went wrong. Please try again.
                  </p>
                )}
              </div>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

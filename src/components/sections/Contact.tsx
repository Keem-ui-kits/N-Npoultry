'use client';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { siteConfig } from '@/content/site';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed');
      setSubmitStatus('success');
      setFormData({ name: '', email: '', website: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
                    <Mail className="w-6 h-6 text-[#FD7E1E]" />
                    Open a business account
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-400 text-sm md:text-base pl-9">
                    For planning and logistics, fill the call card. Terms apply
                  </p>
                </div>

                <div>
                  <h3 className="text-foreground dark:text-white font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#FD7E1E]" />
                    Business Hours
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-400 text-sm md:text-base pl-9">
                    {siteConfig.businessHours.weekdays}
                    <br />
                    {siteConfig.businessHours.saturday}
                  </p>
                </div>

                <div>
                  <h3 className="text-foreground dark:text-white font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <Phone className="w-6 h-6 text-[#FD7E1E]" />
                    Phone
                  </h3>
                  <p className="text-muted-foreground dark:text-gray-400 text-sm md:text-base pl-9">
                    {siteConfig.contacts.phones.join(' / ')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-foreground dark:text-white text-sm md:text-base mb-2"
                >
                  Name <span className="text-[#eb5757]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-foreground dark:text-white text-sm md:text-base mb-2"
                >
                  Email <span className="text-[#eb5757]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all shadow-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="website"
                  className="block text-foreground dark:text-white text-sm md:text-base mb-2"
                >
                  Website <span className="text-[#eb5757]">*</span>
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all"
                  placeholder="https://yourwebsite.com"
                />
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
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 bg-background dark:bg-black/20 border border-border dark:border-white/10 rounded-xl text-foreground dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-gold transition-all resize-none"
                  placeholder="Tell us about your needs..."
                />
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

              {submitStatus === 'success' && (
                <p className="text-green-600 dark:text-green-400 font-medium">
                  Message sent successfully! We'll be in touch soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 dark:text-red-400 font-medium">
                  Something went wrong. Please try again.
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

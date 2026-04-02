import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

import { siteConfig } from '@/content/site';
import { footerLinks } from '@/content/navigation';
import { FadeIn } from '@/components/ui/fade-in';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-brand-dark dark:bg-black bg-gradient-to-tr from-[#0f2935] via-[var(--brand-dark)] to-[#1a4153] dark:from-black dark:to-[#050505] text-white overflow-hidden border-t border-white/5 transition-colors duration-500">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 gradient-brand" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <FadeIn delay={0}>
            <div className="flex items-center mb-4 md:mb-6 group cursor-pointer w-40 h-16 md:w-56 md:h-24 relative">
              <Image 
                src="/og-image.png" 
                alt={siteConfig.name} 
                fill 
                priority
                className="object-contain object-left transform transition-transform duration-300 group-hover:scale-105 origin-left"
              />
            </div>
            <p className="text-white/70 text-sm md:text-base mb-4">{siteConfig.description}</p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-brand-gold hover:to-brand-orange transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-brand-gold hover:to-brand-orange transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-brand-gold hover:to-brand-orange transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-brand-gold hover:to-brand-orange transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </FadeIn>

          {/* Quick Links */}
          <FadeIn delay={0.1}>
            <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative group text-white/70 transition-colors text-sm md:text-base cursor-pointer inline-block hover:text-brand-gold"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-gold group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Products */}
          <FadeIn delay={0.2}>
            <h3 className="text-lg md:text-xl font-bold mb-4">Our Products</h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="relative group text-white/70 transition-colors text-sm md:text-base cursor-pointer inline-block hover:text-brand-gold"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-brand-gold group-hover:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>

          {/* Contact Info */}
          <FadeIn delay={0.3}>
            <h3 className="text-lg md:text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm md:text-base">
                  {siteConfig.contacts.phones.map((phone) => (
                    <div key={phone}>{phone}</div>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="text-white/70 hover:text-brand-gold transition-colors text-sm md:text-base"
                >
                  {siteConfig.contacts.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm md:text-base">{siteConfig.contacts.address}</span>
              </li>
            </ul>
          </FadeIn>
        </div>

        {/* Bottom Bar */}
        <FadeIn delay={0.4}>
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/50 text-sm text-center sm:text-left">
                © {currentYear} {siteConfig.name}. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-white/50 hover:text-brand-gold transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="text-white/50 hover:text-brand-gold transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}


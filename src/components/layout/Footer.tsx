// ============================================
// Footer Component
// ============================================
// Site footer with navigation, contact info, and closing CTA

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  siteSettings, 
  footerNavigation, 
  legalNavigation 
} from '@/cms/settings';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Facebook,
  Instagram,
  Twitter
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return;

    const ctx = gsap.context(() => {
      // Closing CTA animation
      gsap.fromTo(
        '.footer-closing',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-closing',
            start: 'top 85%',
            once: true
          }
        }
      );

      // Footer grid animation
      gsap.fromTo(
        '.footer-col',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.footer-grid',
            start: 'top 90%',
            once: true
          }
        }
      );
    }, footer);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi N&N Poultry Palace — I'd like to order: Eggs. Please get in touch!`
    );
    window.open(
      `https://wa.me/${siteSettings.contact.whatsapp}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative bg-dark border-t border-white/5"
    >
      {/* Closing CTA */}
      <div className="footer-closing section-padding border-b border-white/5">
        <div className="container-custom text-center">
          <p className="eyebrow flex items-center justify-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            Don't Wait
          </p>
          <h2 className="section-title text-white mb-8">
            Fresh eggs, fast delivery. <br />
            <span className="text-outline">Taste the difference.</span>
          </h2>
          <a
            href="#order"
            onClick={(e) => handleNavClick(e, '#order')}
            className="btn-primary text-base px-10 py-4"
          >
            🛒 Order Fresh Eggs Now
          </a>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container-custom py-16">
        <div className="footer-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12 border-b border-white/5">
          {/* Brand Column */}
          <div className="footer-col lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={siteSettings.brand.logo}
                alt={siteSettings.brand.name}
                className="h-12 w-auto"
              />
              <div>
                <h3 className="font-serif text-gold text-lg font-bold">
                  {siteSettings.brand.name}
                </h3>
                <p className="text-xs text-gold/60 tracking-wider uppercase">
                  {siteSettings.brand.tagline}
                </p>
              </div>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              A family-run poultry supplier in Machakos. We collect fresh eggs daily and deliver to homes and businesses. We also supply ex-layer hens and organic poultry manure.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {siteSettings.social.facebook && (
                <a
                  href={siteSettings.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              )}
              {siteSettings.social.instagram && (
                <a
                  href={siteSettings.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              )}
              {siteSettings.social.twitter && (
                <a
                  href={siteSettings.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              )}
              <button
                onClick={openWhatsApp}
                className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold hover:bg-gold hover:text-dark transition-all duration-300"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gold mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm text-white/50 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gold mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${siteSettings.contact.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-3 text-sm text-white/50 hover:text-gold transition-colors"
                >
                  <Phone size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  {siteSettings.contact.phone}
                </a>
              </li>
              <li>
                <button
                  onClick={openWhatsApp}
                  className="flex items-start gap-3 text-sm text-white/50 hover:text-gold transition-colors"
                >
                  <MessageCircle size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  WhatsApp Us
                </button>
              </li>
              <li>
                <a
                  href={`mailto:${siteSettings.contact.email}`}
                  className="flex items-start gap-3 text-sm text-white/50 hover:text-gold transition-colors"
                >
                  <Mail size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  {siteSettings.contact.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-3 text-sm text-white/50">
                  <MapPin size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  {siteSettings.contact.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div className="footer-col">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-gold mb-6">
              Business Hours
            </h4>
            <ul className="space-y-2 text-sm text-white/50">
              <li>Mon – Friday: {siteSettings.business.hours.monday}</li>
              <li>Saturday: {siteSettings.business.hours.saturday}</li>
              <li>Sunday: {siteSettings.business.hours.sunday}</li>
            </ul>
            <div className="mt-6">
              <span className="badge-gold text-[0.6rem]">
                🟢 Orders Open Today
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © {currentYear} {siteSettings.brand.name} Limited. All rights reserved.
          </p>
          <nav className="flex flex-wrap justify-center gap-6">
            {legalNavigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-white/30 hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// ============================================
// Header Component
// ============================================
// Fixed navigation with scroll behavior and mobile menu

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { mainNavigation, siteSettings } from '@/cms/settings';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${
        isScrolled
          ? 'bg-dark/97 backdrop-blur-xl shadow-dark'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-custom">
        <div className="flex items-center justify-between py-4 lg:py-5">
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
          >
            <img 
              src={siteSettings.brand.logo} 
              alt={siteSettings.brand.name}
              className="h-12 lg:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-serif text-gold text-sm lg:text-base font-bold tracking-wide">
                {siteSettings.brand.name}
              </span>
              <span className="text-[0.6rem] lg:text-xs text-gold/70 tracking-[0.15em] uppercase">
                {siteSettings.brand.tagline}
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="px-4 py-2 text-sm font-medium text-white/80 rounded-md transition-all duration-300 hover:text-gold hover:bg-gold/10"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#order"
              onClick={(e) => handleNavClick(e, '#order')}
              className="btn-primary btn-sm"
            >
              Order Fresh Eggs
            </a>
            <a
              href="#order"
              onClick={(e) => handleNavClick(e, '#order')}
              className="btn-outline-gold btn-sm"
            >
              Wholesale Quote
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-gold transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[72px] bg-dark/98 backdrop-blur-xl transition-all duration-500 ease-smooth ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container-custom py-8">
          <ul className="flex flex-col gap-2">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block py-3 text-lg font-medium text-white/80 border-b border-white/5 transition-colors hover:text-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#order"
              onClick={(e) => handleNavClick(e, '#order')}
              className="btn-primary w-full justify-center"
            >
              🛒 Order Fresh Eggs
            </a>
            <a
              href="#order"
              onClick={(e) => handleNavClick(e, '#order')}
              className="btn-outline-gold w-full justify-center"
            >
              📋 Wholesale Quote
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

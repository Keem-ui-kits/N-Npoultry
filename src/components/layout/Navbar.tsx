'use client';

import { gsap } from 'gsap';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

import { navLinks } from '@/content/navigation';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navRef = useRef<HTMLElement>(null);
  const hamburgerLine1Ref = useRef<HTMLSpanElement>(null);
  const hamburgerLine2Ref = useRef<HTMLSpanElement>(null);
  const hamburgerLine3Ref = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuContentRef = useRef<HTMLDivElement>(null);
  const mobileMenuLinksRef = useRef<(HTMLDivElement | null)[]>([]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => { document.removeEventListener('keydown', handler); };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Removed initial navbar animation hook

  // Initialise mobile menu as hidden so GSAP owns visibility from the start
  useEffect(() => {
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, { opacity: 0, clipPath: 'circle(0% at 100% 0%)' });
    }
  }, []);

  useEffect(() => {
    if (!hamburgerLine1Ref.current || !hamburgerLine2Ref.current || !hamburgerLine3Ref.current)
      return;

    if (mobileMenuOpen) {
      gsap.to(hamburgerLine1Ref.current, { rotate: 45, y: 6, duration: 0.3 });
      gsap.to(hamburgerLine2Ref.current, { opacity: 0, duration: 0.3 });
      gsap.to(hamburgerLine3Ref.current, {
        rotate: -45,
        y: -10,
        duration: 0.3,
      });
    } else {
      gsap.to(hamburgerLine1Ref.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(hamburgerLine2Ref.current, { opacity: 1, duration: 0.3 });
      gsap.to(hamburgerLine3Ref.current, { rotate: 0, y: 0, duration: 0.3 });
    }
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileMenuContentRef.current) return;

    const links = mobileMenuLinksRef.current.filter(Boolean);

    if (mobileMenuOpen) {
      gsap.set(mobileMenuRef.current, {
        clipPath: 'circle(0% at 100% 0%)',
        opacity: 0,
      });
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        clipPath: 'circle(150% at 100% 0%)',
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.set(links, {
        y: 20,
        opacity: 0,
      });
      gsap.to(links, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.1,
        delay: 0.2,
        ease: 'power2.out',
      });
    } else {
      gsap.to(links, {
        y: 20,
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: 'power2.in',
      });
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        clipPath: 'circle(0% at 100% 0%)',
        duration: 0.5,
        delay: 0.2,
        ease: 'power2.in',
      });
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${
          isScrolled
            ? 'bg-black/40 backdrop-blur-xl h-20 shadow-2xl border-b border-white/5'
            : 'bg-black/0 backdrop-blur-sm h-24'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <Link
            href="/"
            className="navbar-brand flex items-center gap-1 transition-opacity relative cursor-pointer group"
            onClick={(e) => {
              if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            aria-label="Home"
          >
            <div
              className={`flex items-center font-bold tracking-tight uppercase text-xl md:text-2xl py-1 transition-colors duration-300 text-white`}
            >
              <div className="flex items-center gap-2">
                <Image 
                  src="/nn-brand-text.png" 
                  alt="N&N" 
                  width={50} 
                  height={32} 
                  className="h-8 md:h-10 w-auto object-contain brightness-110"
                />
                <div className="flex items-baseline gap-1.5">
                  <span>POULTRY PALACE</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 lg:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                    "text-sm font-semibold transition-colors relative group cursor-pointer hover:text-brand-gold",
                    pathname === item.href ? "text-brand-gold" : 'text-white/90'
                )}
              >
                {item.name}
                <span className={cn(
                    "absolute -bottom-1 left-0 h-[2px] gradient-brand transition-all duration-300",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}

            <div className="w-px h-6 bg-white/20 mx-2" />



            <Link
              href="/contact"
              className="px-6 py-2.5 gradient-brand text-brand-dark rounded-full font-bold hover:shadow-[0_0_20px_rgba(var(--brand-gold-rgb),0.4)] transition-all flex items-center gap-2 group transform hover:scale-105"
            >
              Order Now
              <Send suppressHydrationWarning className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Menu & CTA */}
          <div className="lg:hidden flex items-center gap-3">

            <button
              className="text-white relative z-50 p-2 cursor-pointer focus:outline-none bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); }}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center gap-1">
                <span
                  ref={hamburgerLine1Ref}
                  className="w-full h-0.5 bg-brand-gold block origin-center rounded-full"
                />
                <span
                  ref={hamburgerLine2Ref}
                  className="w-full h-0.5 bg-brand-gold block rounded-full"
                />
                <span
                  ref={hamburgerLine3Ref}
                  className="w-full h-0.5 bg-brand-gold block origin-center rounded-full"
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu Overlay */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-2xl flex items-center justify-center p-6 transition-[visibility]"
        style={{
          visibility: mobileMenuOpen ? 'visible' : 'hidden',
          pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        }}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          ref={mobileMenuContentRef}
          className="flex flex-col items-center gap-8 text-center w-full max-w-sm"
        >
          {navLinks.map((item, i) => (
            <div
              key={item.name}
              ref={(el) => {
                mobileMenuLinksRef.current[i] = el;
              }}
              className="w-full"
            >
              <Link
                href={item.href}
                className={cn(
                  "block text-3xl sm:text-4xl font-black transition-colors cursor-pointer tracking-tight py-2",
                  pathname === item.href ? "text-brand-gold" : "text-white hover:text-brand-gold"
                )}
                onClick={() => {
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </Link>
            </div>
          ))}

          <div
            ref={(el) => {
              mobileMenuLinksRef.current[navLinks.length] = el;
            }}
            className="mt-6 w-full"
          >
            <Link
              href="/contact"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              className="flex justify-center items-center gap-3 w-full py-4 gradient-brand text-brand-dark rounded-full font-bold text-lg shadow-xl"
            >
              Place an Order <Send suppressHydrationWarning className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

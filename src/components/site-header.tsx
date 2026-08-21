"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type NavKey = "Home" | "Products" | "Inside" | "About";

const NAV_LINKS: { key: NavKey; label: string; href: string }[] = [
  { key: "Home", label: "Home", href: "/" },
  { key: "Products", label: "Products", href: "/products" },
  { key: "Inside", label: "Inside the Farm", href: "/inside-the-farm" },
  { key: "About", label: "About", href: "/about" },
];

const MENU_LINKS = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Inside the Farm", href: "/inside-the-farm" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const FAQ_PEEK_VISIBLE_MS = 4200;
const FAQ_PEEK_GAP_MS = 5000;
const FAQ_PEEK_TAB_HEIGHT = 34;

export function SiteHeader() {
  const pathname = usePathname();
  const variant: "solid" | "image" = pathname === "/" ? "image" : "solid";
  const active: NavKey | undefined = pathname === "/"
    ? "Home"
    : pathname?.startsWith("/products")
      ? "Products"
      : pathname?.startsWith("/about")
        ? "About"
        : pathname?.startsWith("/inside-the-farm")
          ? "Inside"
          : undefined;
  const [scrolled, setScrolled] = useState(false);
  const [faqPeekEligible, setFaqPeekEligible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqPeekVisible, setFaqPeekVisible] = useState(false);
  const spacerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const hamburgerLine1Ref = useRef<HTMLSpanElement>(null);
  const hamburgerLine2Ref = useRef<HTMLSpanElement>(null);
  const hamburgerLine3Ref = useRef<HTMLSpanElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuContentRef = useRef<HTMLDivElement>(null);
  const mobileMenuLinksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const top =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        window.scrollY ||
        document.body.scrollTop ||
        0;
      setScrolled(top > 15);
      // Hero scroll threshold: triggers once scrolled past the hero section
      setFaqPeekEligible(top > Math.min(window.innerHeight * 0.45, 360));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (variant === "image") return;
    const el = headerRef.current;
    const spacer = spacerRef.current;
    if (!el || !spacer) return;
    spacer.style.height = `${el.offsetHeight}px`;
  }, [scrolled, isMobile, variant]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Hamburger line morph animation
  useEffect(() => {
    if (!hamburgerLine1Ref.current || !hamburgerLine2Ref.current || !hamburgerLine3Ref.current)
      return;

    if (menuOpen) {
      gsap.to(hamburgerLine1Ref.current, { rotate: 45, y: 6, duration: 0.3 });
      gsap.to(hamburgerLine2Ref.current, { opacity: 0, duration: 0.2 });
      gsap.to(hamburgerLine3Ref.current, { rotate: -45, y: -6, duration: 0.3 });
    } else {
      gsap.to(hamburgerLine1Ref.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(hamburgerLine2Ref.current, { opacity: 1, duration: 0.3 });
      gsap.to(hamburgerLine3Ref.current, { rotate: 0, y: 0, duration: 0.3 });
    }
  }, [menuOpen]);

  // Mobile menu circular clip-path reveal and staggered link entry
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileMenuContentRef.current) return;

    const links = mobileMenuLinksRef.current.filter(Boolean);

    if (menuOpen) {
      gsap.set(mobileMenuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        opacity: 0,
      });
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.set(links, {
        y: 20,
        opacity: 0,
      });
      gsap.to(links, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.15,
        ease: "power2.out",
      });
    } else {
      gsap.to(links, {
        y: 20,
        opacity: 0,
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.in",
      });
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.45,
        delay: 0.15,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  // Desktop-only: FAQ tab peeks at the far right end, below the navbar, then retracts and
  // waits before peeking again. Fixed position now (no per-link measurement needed) — the
  // loop only runs once the user has scrolled well past the hero (faqPeekEligible), and
  // stops the moment the user scrolls back up.
  useEffect(() => {
    if (isMobile || !faqPeekEligible) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFaqPeekVisible(false);
      return;
    }
    let cancelled = false;
    let timer: number;

    const cycle = () => {
      setFaqPeekVisible(true);
      timer = window.setTimeout(() => {
        if (cancelled) return;
        setFaqPeekVisible(false);
        timer = window.setTimeout(() => {
          if (cancelled) return;
          cycle();
        }, FAQ_PEEK_GAP_MS);
      }, FAQ_PEEK_VISIBLE_MS);
    };

    timer = window.setTimeout(cycle, 1200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [isMobile, faqPeekEligible]);

  const light = variant === "image" && !scrolled;
  const ink = light ? "rgba(245,240,232,0.95)" : "#111111";
  const activeColor = light ? "var(--color-gold)" : "var(--color-terracotta)";
  const paddingY = scrolled ? 12 : variant === "image" ? 22 : 18;
  const logoHeight = scrolled ? 48 : 66;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[80]"
        style={{
          background: light ? "transparent" : "rgba(245,240,232,0.96)",
          backdropFilter: light ? "none" : "blur(16px)",
          WebkitBackdropFilter: light ? "none" : "blur(16px)",
          borderBottom: `1px solid ${light ? "transparent" : "rgba(17,17,17,0.14)"}`,
          boxShadow: scrolled ? "0 4px 24px -2px rgba(17,17,17,0.09), 0 2px 6px -1px rgba(17,17,17,0.04)" : "none",
          transition: "background .4s var(--ease-editorial), padding .4s var(--ease-editorial), border-color .4s var(--ease-editorial), box-shadow .4s var(--ease-editorial)",
          padding: `${paddingY}px clamp(20px, 4vw, 56px)`,
        }}
      >
        <div
          className="mx-auto flex items-center justify-between gap-8"
          style={{ maxWidth: "var(--container-site)" }}
        >
          <Link href="/" className="flex items-center">
            <Image
              src="/Aug 19, 2026, 01_271_17 PM.png"
              alt="N&N Poultry Palace"
              width={260}
              height={90}
              style={{
                height: logoHeight,
                width: "auto",
                transition: "height .4s var(--ease-editorial)",
              }}
              priority
            />
          </Link>

          {!isMobile && (
            <nav className="flex items-center gap-8 text-[15px] transition-colors duration-400">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    color: active === link.key ? activeColor : ink,
                    fontWeight: active === link.key ? 600 : 500,
                  }}
                  className="nn-navlink hover:text-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-5">
            {!isMobile && (
              <span
                className="font-mono text-[10px] tracking-[.2em] uppercase transition-colors duration-400"
                style={{ color: light ? "rgba(245,240,232,.55)" : "rgba(17,17,17,.5)" }}
              >
                Machakos, KE
              </span>
            )}
            {!isMobile && (
              <Link
                href="/order"
                className="nn-arrow text-dark font-semibold whitespace-nowrap"
                style={{
                  padding: "14px 24px",
                  fontSize: 15,
                  backgroundImage: "linear-gradient(to right, var(--color-gold), var(--color-orange))",
                }}
              >
                Order Fresh Eggs <span>→</span>
              </Link>
            )}
            {isMobile && (
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="relative z-50 p-2.5 cursor-pointer focus:outline-none rounded-full transition-colors"
                style={{
                  backgroundColor: menuOpen ? "rgba(255,255,255,0.08)" : light ? "rgba(255,255,255,0.1)" : "rgba(17,17,17,0.06)",
                  border: `1px solid ${menuOpen ? "rgba(255,255,255,0.15)" : light ? "rgba(255,255,255,0.2)" : "rgba(17,17,17,0.12)"}`,
                }}
              >
                <div className="w-5 h-4 flex flex-col justify-between items-center">
                  <span
                    ref={hamburgerLine1Ref}
                    className="w-full h-0.5 block origin-center rounded-full"
                    style={{ backgroundColor: menuOpen ? "var(--color-gold)" : ink }}
                  />
                  <span
                    ref={hamburgerLine2Ref}
                    className="w-full h-0.5 block rounded-full"
                    style={{ backgroundColor: menuOpen ? "var(--color-gold)" : ink }}
                  />
                  <span
                    ref={hamburgerLine3Ref}
                    className="w-full h-0.5 block origin-center rounded-full"
                    style={{ backgroundColor: menuOpen ? "var(--color-gold)" : ink }}
                  />
                </div>
              </button>
            )}
          </div>
        </div>

        {!isMobile && (
          // Clipping "pocket" — the tab slides vertically inside this window, so retracting
          // reads as being swallowed back up rather than fading out as an overlay. Fixed at
          // the far right end, just below the navbar's own bottom border. Gated on
          // `faqPeekEligible`: the peek only runs once the user has scrolled well past the
          // hero (see the loop effect above), never over a transparent, just-loaded, or
          // barely-scrolled header where it would overlap hero content.
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "clamp(20px, 4vw, 56px)",
              height: FAQ_PEEK_TAB_HEIGHT,
              overflow: "hidden",
              pointerEvents: faqPeekVisible && faqPeekEligible ? "auto" : "none",
              zIndex: 5,
            }}
          >
            <Link
              href="/faq"
              aria-hidden={!(faqPeekVisible && faqPeekEligible)}
              tabIndex={faqPeekVisible && faqPeekEligible ? 0 : -1}
              className="font-mono uppercase flex items-center justify-center"
              style={{
                // Retract past -100%: at exactly -100% the pill's rounded bottom edge lands
                // flush on the clip boundary and leaves a hairline sliver visible. The extra
                // 8px pushes it fully clear.
                transform: `translateY(${faqPeekVisible && faqPeekEligible ? "0px" : `calc(-100% - 8px)`})`,
                transition: "transform .5s var(--ease-editorial)",
                background: "var(--color-terracotta)",
                color: "var(--color-cream)",
                fontSize: 11,
                letterSpacing: ".14em",
                fontWeight: 700,
                padding: "8px 16px 9px",
                borderRadius: "0 0 10px 10px",
                whiteSpace: "nowrap",
              }}
            >
              FAQ
            </Link>
          </div>
        )}
      </header>
      {variant !== "image" && <div ref={spacerRef} />}

      {/* Mobile floating FAQ bubble - triggered only after hero is scrolled past */}
      {isMobile && pathname !== "/faq" && (
        <Link
          href="/faq"
          aria-label="Frequently asked questions"
          aria-hidden={!faqPeekEligible || menuOpen}
          tabIndex={faqPeekEligible && !menuOpen ? 0 : -1}
          className="fixed flex items-center justify-center font-bold"
          style={{
            bottom: 22,
            right: 18,
            width: 52,
            height: 52,
            borderRadius: "50%",
            backgroundImage: "linear-gradient(135deg, var(--color-gold), var(--color-orange))",
            color: "var(--color-dark)",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: ".06em",
            boxShadow: "0 10px 24px rgba(17,17,17,.28), 0 2px 6px rgba(0,0,0,0.15)",
            zIndex: 35,
            opacity: faqPeekEligible && !menuOpen ? 1 : 0,
            transform: faqPeekEligible && !menuOpen ? "scale(1) translateY(0)" : "scale(0.6) translateY(24px)",
            pointerEvents: faqPeekEligible && !menuOpen ? "auto" : "none",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
          }}
        >
          FAQ
        </Link>
      )}

      {/* Mobile Fullscreen Menu Overlay (Matches previous production project) */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#111111]/96 backdrop-blur-2xl flex items-center justify-center p-6"
        style={{
          visibility: menuOpen ? "visible" : "hidden",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        aria-hidden={!menuOpen}
      >
        <div
          ref={mobileMenuContentRef}
          className="flex flex-col items-center gap-7 text-center w-full max-w-sm"
        >
          {MENU_LINKS.map((item, i) => (
            <div
              key={item.label}
              ref={(el) => {
                mobileMenuLinksRef.current[i] = el;
              }}
              className="w-full"
            >
              <Link
                href={item.href}
                className="block text-3xl sm:text-4xl font-bold transition-colors cursor-pointer tracking-tight py-2 hover:text-[var(--color-gold)]"
                style={{
                  color: pathname === item.href ? "var(--color-terracotta)" : "var(--color-cream)",
                }}
                onClick={() => {
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

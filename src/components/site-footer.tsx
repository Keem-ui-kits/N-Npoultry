import Link from "next/link";
import { business } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="bg-dark-deep text-cream/60 py-10 px-5 sm:py-14 sm:px-8 md:py-16 md:px-10">
      <div className="mx-auto" style={{ maxWidth: "var(--container-site)" }}>
        <div className="grid grid-cols-12 gap-y-8 gap-x-6 pb-8 sm:pb-12 border-b border-cream/14">
          {/* Brand Column */}
          <div className="col-span-12 md:col-span-4">
            <div className="text-xl sm:text-[22px] font-bold text-cream tracking-tight">{business.name}</div>
            <div className="font-mono text-[10px] sm:text-[11px] tracking-[.18em] uppercase text-gold mt-1.5 sm:mt-2.5">
              Fresh and Nutritious
            </div>
            <p className="mt-3 sm:mt-5 text-xs sm:text-[14px] leading-relaxed text-cream/70" style={{ maxWidth: "34ch" }}>
              {business.vision}
            </p>
          </div>

          {/* Navigation Links Grid */}
          <div className="col-span-6 sm:col-span-3 md:col-span-2 text-xs sm:text-[14px] leading-loose">
            <div className="font-mono text-[10px] tracking-[.2em] uppercase text-cream/40 mb-2 sm:mb-3">Pages</div>
            <div className="space-y-1 sm:space-y-1.5">
              <Link href="/products" className="block hover:text-cream transition-colors">Products</Link>
              <Link href="/faq" className="block hover:text-cream transition-colors">FAQ</Link>
              <Link href="/about" className="block hover:text-cream transition-colors">About</Link>
              <Link href="/inside-the-farm" className="block hover:text-cream transition-colors">Inside Farm</Link>
              <Link href="/contact" className="block hover:text-cream transition-colors">Contact</Link>
            </div>
          </div>

          <div className="col-span-6 sm:col-span-3 md:col-span-2 text-xs sm:text-[14px] leading-loose">
            <div className="font-mono text-[10px] tracking-[.2em] uppercase text-cream/40 mb-2 sm:mb-3">Products</div>
            <div className="space-y-1 sm:space-y-1.5">
              <Link href="/products#table-eggs" className="block hover:text-cream transition-colors">Table Eggs</Link>
              <Link href="/products#poultry-manure" className="block hover:text-cream transition-colors">Poultry Manure</Link>
              <Link href="/products#ex-layer-hens" className="block hover:text-cream transition-colors">Ex-Layer Hens</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="col-span-12 sm:col-span-6 md:col-span-4 font-mono text-[11px] sm:text-[12px] leading-relaxed tracking-[.04em]">
            <div className="text-[10px] tracking-[.2em] uppercase text-cream/40 mb-2 sm:mb-3">Contact</div>
            <div className="text-cream/80">{business.phonesFormatted.join(" · ")}</div>
            <div className="text-cream/80 mt-0.5">{business.email}</div>
            <div className="text-cream/80 mt-0.5">{business.address}</div>
            <div className="mt-2 text-[10px] sm:text-[11px] text-cream/40">Mon–Fri 8:00–17:00 · Sat 8:00–12:00</div>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="flex justify-between items-center flex-wrap gap-3 pt-5 sm:pt-7 font-mono text-[10px] tracking-[.15em] uppercase text-cream/35">
          <span>© {new Date().getFullYear()} {business.name}</span>
          <span className="flex gap-4 sm:gap-6 flex-wrap">
            <Link href="/privacy" className="text-cream/55 hover:text-cream transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-cream/55 hover:text-cream transition-colors">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

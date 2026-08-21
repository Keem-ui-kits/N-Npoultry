import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { OpenStatus } from "@/components/contact/open-status";
import { ContactForm } from "@/components/contact/contact-form";
import { business, deliveryZones, isOpenNowNairobi } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Order on WhatsApp, call the farm, or email N&N Poultry Palace in Machakos. Most messages are answered within minutes during working hours.",
};

export const dynamic = "force-dynamic";

const ROUTES = [
  {
    href: "/order",
    label: "Route 01 · Recommended",
    title: "Order on WhatsApp",
    body: "The way most customers order. Tell us the product, quantity and area — we confirm the price and the next delivery slot, usually within minutes. No forms, no waiting.",
    value: business.whatsappFormatted,
    highlight: true,
  },
  {
    href: "tel:0113377623",
    label: "Route 02",
    title: "Call the farm",
    body: "For standing orders, bulk pricing and anything easier said than typed. Two lines, both answered on the farm.",
    value: business.phonesFormatted.join(" · "),
    highlight: false,
  },
  {
    href: `mailto:${business.email}`,
    label: "Route 03",
    title: "Email us",
    body: "Best for invoicing, wholesale agreements and anything that needs a paper trail.",
    value: business.email,
    highlight: false,
  },
];

export default function ContactPage() {
  const open = isOpenNowNairobi();

  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--color-cream)", padding: "clamp(56px, 8vw, 130px) clamp(20px, 4vw, 56px) clamp(48px, 6vw, 80px)" }}>
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3.5" style={{ marginBottom: 32 }}>
              <span style={{ width: 44, height: 1, background: "var(--color-terracotta)", display: "inline-block" }} />
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".24em", color: "rgba(17,17,17,.55)" }}>
                Contact / Machakos, Kenya
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(46px, 7.4vw, 108px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-.038em" }}>
              Talk to
              <br />
              the farm.
            </h1>
            <p style={{ marginTop: 34, maxWidth: "46ch", fontSize: "clamp(18px, 1.4vw, 21px)", lineHeight: 1.6, color: "rgba(17,17,17,.68)" }}>
              There is no call centre. Messages reach the people who packed the tray, and most are answered within minutes during working hours.
            </p>
          </div>
          <OpenStatus open={open} />
        </div>
      </section>

      {/* Route cards */}
      <Reveal style={{ borderTop: "1px solid rgba(17,17,17,.2)" }}>
        {ROUTES.map((route) => (
          <a
            key={route.title}
            href={route.href}
            className="nn-arrow nn-route grid grid-cols-1 md:grid-cols-[2fr_3fr_auto] items-center"
            style={{
              gap: "clamp(20px, 3vw, 48px)",
              padding: route.highlight ? "clamp(30px, 4vw, 52px) clamp(16px, 2vw, 28px)" : "clamp(24px, 3vw, 40px) clamp(16px, 2vw, 28px)",
              background: route.highlight ? "var(--color-gold)" : "transparent",
              borderBottom: "1px solid rgba(17,17,17,.16)",
            }}
          >
            <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".2em", color: route.highlight ? "rgba(17,17,17,.6)" : "rgba(17,17,17,.45)" }}>
              {route.label}
            </span>
            <span>
              <div style={{ fontSize: route.highlight ? "clamp(28px, 3.2vw, 46px)" : "clamp(24px, 2.6vw, 36px)", fontWeight: 700, letterSpacing: "-.03em", lineHeight: 1, marginBottom: route.highlight ? 14 : 8 }}>
                {route.title}
              </div>
              <p style={{ margin: 0, fontSize: route.highlight ? 17 : 16, lineHeight: 1.7, color: route.highlight ? "rgba(17,17,17,.75)" : "rgba(17,17,17,.68)", maxWidth: "46ch" }}>
                {route.body}
              </p>
            </span>
            <span className="font-mono uppercase flex items-center gap-3" style={{ fontSize: 12, letterSpacing: ".14em" }}>
              {route.value} <span>→</span>
            </span>
          </a>
        ))}
      </Reveal>

      {/* Form */}
      <section style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "clamp(70px, 9vw, 140px) clamp(20px, 4vw, 56px)" }}>
        <div className="grid grid-cols-12" style={{ gap: "clamp(32px, 5vw, 80px)", maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-4">
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)" }}>
              Or leave a message
            </span>
            <h2 style={{ margin: "16px 0 20px", fontSize: "clamp(30px, 3.8vw, 56px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em" }}>
              We&apos;ll come back to you.
            </h2>
            <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(245,240,232,.62)", maxWidth: "40ch", marginBottom: 28 }}>
              If WhatsApp isn&apos;t convenient, this reaches the same inbox. Include your area and we can quote a delivery slot in the reply.
            </p>
            <div className="font-mono uppercase" style={{ borderTop: "1px solid rgba(245,240,232,.2)", paddingTop: 16, fontSize: 11, letterSpacing: ".14em", color: "rgba(245,240,232,.5)", lineHeight: 2.1 }}>
              Machakos, Kenya
              <br />
              Mon–Fri 8:00–17:00
              <br />
              Sat 8:00–12:00
            </div>
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Where we deliver */}
      <Reveal as="section" style={{ background: "var(--color-cream)", padding: "clamp(70px, 9vw, 130px) clamp(20px, 4vw, 56px)" }}>
        <div className="grid grid-cols-12 gap-8" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
            Where we deliver
          </div>
          <div className="col-span-12 md:col-span-9 md:col-start-3">
            <h2 style={{ margin: "0 0 28px", fontSize: "clamp(28px, 3.4vw, 50px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em" }}>
              Six zones, on the morning route.
            </h2>
            <div className="flex flex-wrap gap-3" style={{ marginBottom: 28 }}>
              {deliveryZones.map((zone) => (
                <span
                  key={zone}
                  className="font-mono uppercase"
                  style={{ border: "1px solid rgba(17,17,17,.26)", padding: "10px 16px", fontSize: 11, letterSpacing: ".16em" }}
                >
                  {zone}
                </span>
              ))}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "rgba(17,17,17,.66)", maxWidth: "56ch", margin: 0 }}>
              Nearby but not on the list? Ask us — we can often arrange something, particularly for standing orders.
            </p>
          </div>
        </div>
      </Reveal>
    </>
  );
}

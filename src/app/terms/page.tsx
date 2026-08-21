import type { Metadata } from "next";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you order from N&N Poultry Palace.",
};

const sectionH2: React.CSSProperties = { fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 700, letterSpacing: "-.02em", margin: "48px 0 16px" };
const body: React.CSSProperties = { fontSize: 17, lineHeight: 1.75, color: "rgba(17,17,17,.75)", margin: "0 0 16px" };

export default function TermsPage() {
  return (
    <section style={{ background: "var(--color-cream)", padding: "clamp(56px, 8vw, 120px) clamp(20px, 4vw, 56px) clamp(80px, 10vw, 140px)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.5)", marginBottom: 20 }}>
          Legal / Terms
        </div>
        <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-.035em", margin: "0 0 12px" }}>
          Terms of Service
        </h1>
        <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", color: "rgba(17,17,17,.45)", marginBottom: 40 }}>
          Last updated August 2026 · {business.name}
        </p>

        <p style={body}>
          These terms apply whenever you order products from or otherwise do business with {business.name}, a farm
          based in Machakos, Kenya. By placing an order — on WhatsApp, by phone, by email, or through this website —
          you agree to them.
        </p>

        <h2 style={sectionH2}>Ordering and pricing</h2>
        <p style={body}>
          We do not publish fixed prices on this site. Every order is priced directly with you by message or call
          once we know the product, quantity and delivery area, and price is confirmed before delivery. This site
          does not process payments online.
        </p>

        <h2 style={sectionH2}>Delivery</h2>
        <p style={body}>
          We deliver on a morning route, Monday to Saturday, across our published delivery zones. Delivery slots are
          confirmed at the time of ordering and can fill up, particularly on Saturdays. Areas outside our usual zones
          can sometimes be arranged — ask us.
        </p>

        <h2 style={sectionH2}>Product quality</h2>
        <p style={body}>
          Table eggs are inspected for shell integrity and size before packing. If a breakage occurs in transit, we
          replace it at the time of delivery — that standard is ours to hold, not yours to absorb. Poultry manure and
          ex-layer hens are described as accurately as we can on their product pages; if what arrives doesn&apos;t
          match what was agreed, tell us and we&apos;ll put it right.
        </p>

        <h2 style={sectionH2}>Availability</h2>
        <p style={body}>
          Table eggs, poultry manure and ex-layer hens are farm products and availability can vary with the flock and
          the season. We&apos;ll tell you as early as possible if something you&apos;ve ordered isn&apos;t available.
        </p>

        <h2 style={sectionH2}>Cancellations</h2>
        <p style={body}>
          Since orders are confirmed directly with you before dispatch, you can cancel or change an order any time
          before it leaves the farm by messaging or calling us.
        </p>

        <h2 style={sectionH2}>Website content</h2>
        <p style={body}>
          Text, photography and design on this site belong to {business.name} unless stated otherwise, and shouldn&apos;t
          be reused without asking us first.
        </p>

        <h2 style={sectionH2}>Governing law</h2>
        <p style={body}>These terms are governed by the laws of Kenya.</p>

        <h2 style={sectionH2}>Contact us</h2>
        <p style={body}>
          Questions about these terms can be sent to{" "}
          <a href={`mailto:${business.email}`} style={{ color: "var(--color-terracotta)" }}>{business.email}</a> or via
          WhatsApp at {business.whatsappFormatted}.
        </p>
      </div>
    </section>
  );
}

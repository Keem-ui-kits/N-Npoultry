import type { Metadata } from "next";
import { business } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How N&N Poultry Palace collects, uses and protects your information.",
};

const sectionH2: React.CSSProperties = { fontSize: "clamp(22px, 2.4vw, 32px)", fontWeight: 700, letterSpacing: "-.02em", margin: "48px 0 16px" };
const body: React.CSSProperties = { fontSize: 17, lineHeight: 1.75, color: "rgba(17,17,17,.75)", margin: "0 0 16px" };

export default function PrivacyPage() {
  return (
    <section style={{ background: "var(--color-cream)", padding: "clamp(56px, 8vw, 120px) clamp(20px, 4vw, 56px) clamp(80px, 10vw, 140px)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.5)", marginBottom: 20 }}>
          Legal / Privacy
        </div>
        <h1 style={{ fontSize: "clamp(38px, 5vw, 64px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-.035em", margin: "0 0 12px" }}>
          Privacy Policy
        </h1>
        <p className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", color: "rgba(17,17,17,.45)", marginBottom: 40 }}>
          Last updated August 2026 · {business.name}
        </p>

        <p style={body}>
          {business.name} (&quot;N&amp;N&quot;, &quot;we&quot;, &quot;us&quot;) operates as a farm business based in Machakos, Kenya. This
          policy explains what information we collect when you contact us, order from us, or use this website, and
          how we handle it.
        </p>

        <h2 style={sectionH2}>What we collect</h2>
        <p style={body}>
          When you order or get in touch — by WhatsApp, phone, email, or the contact form on this site — we collect
          what you give us directly: your name, phone number, delivery area or address, and the details of your
          order or enquiry. We do not ask for payment card details or run any online checkout on this site; pricing
          and payment are confirmed directly with you by message or call.
        </p>

        <h2 style={sectionH2}>How we use it</h2>
        <p style={body}>
          We use this information to confirm and fulfil orders, arrange delivery, respond to enquiries, and keep
          basic records for our own accounting and invoicing. We do not sell your information to third parties, and
          we do not use it for advertising.
        </p>

        <h2 style={sectionH2}>WhatsApp and messaging</h2>
        <p style={body}>
          Our order concierge on this site builds a message and hands it off to WhatsApp, which is operated by Meta.
          Once a message is sent via WhatsApp, that conversation is subject to WhatsApp&apos;s own privacy terms in
          addition to this policy. We keep order conversations only as long as needed to fulfil and follow up on
          your order.
        </p>

        <h2 style={sectionH2}>Cookies and analytics</h2>
        <p style={body}>
          This site does not run advertising trackers. If we add basic, privacy-respecting analytics in future (for
          example, to understand which pages are useful), this policy will be updated to reflect it before that
          happens.
        </p>

        <h2 style={sectionH2}>Data retention</h2>
        <p style={body}>
          We keep order and contact records for as long as reasonably needed for accounting, delivery history, and
          customer service — typically no longer than a few years — and delete or anonymise older records when
          they&apos;re no longer needed.
        </p>

        <h2 style={sectionH2}>Your rights</h2>
        <p style={body}>
          Under Kenya&apos;s Data Protection Act, 2019, you can ask us what information we hold about you, ask us to
          correct it, or ask us to delete it. To do any of this, contact us using the details below.
        </p>

        <h2 style={sectionH2}>Contact us</h2>
        <p style={body}>
          Questions about this policy or your information can be sent to{" "}
          <a href={`mailto:${business.email}`} style={{ color: "var(--color-terracotta)" }}>{business.email}</a> or via
          WhatsApp at {business.whatsappFormatted}.
        </p>
      </div>
    </section>
  );
}

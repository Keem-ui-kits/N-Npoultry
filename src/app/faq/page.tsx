import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ArrowButton } from "@/components/ui/arrow-button";
import FAQs from "@/components/ui/text-reveal-faqs";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers on table eggs, poultry manure and ex-layer hens — delivery, minimums, freshness and how ordering works, all in one place.",
};

export default function FaqPage() {
  return (
    <>
      <FAQs />

      {/* Final CTA */}
      <Reveal
        as="section"
        style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "clamp(80px, 11vw, 170px) clamp(20px, 4vw, 56px)" }}
      >
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)", display: "block", marginBottom: 30 }}>
              Still have a question?
            </span>
            <h2 style={{ margin: "0 0 28px", fontSize: "clamp(38px, 5.6vw, 88px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-.038em" }}>
              Ask us
              <br />
              directly.
            </h2>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: "rgba(245,240,232,.65)", maxWidth: "44ch" }}>
              Most questions are answered in a couple of messages — quantity, area, and the next slot on the morning route.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-4">
            <ArrowButton href="/order" variant="primary" size="lg">Order on WhatsApp</ArrowButton>
            <ArrowButton href="/contact" variant="secondary" size="lg" onDark>Talk to N&amp;N</ArrowButton>
            <ArrowButton href="/products" variant="secondary" size="lg" onDark>See all products</ArrowButton>
          </div>
        </div>
      </Reveal>
    </>
  );
}

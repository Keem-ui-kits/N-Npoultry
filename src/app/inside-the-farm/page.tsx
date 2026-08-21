import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ArrowButton } from "@/components/ui/arrow-button";
import { ReadingProgress } from "@/components/education/reading-progress";
import { educationCategories, educationSections, categoryOf } from "@/lib/education-sections";

export const metadata: Metadata = {
  title: "Inside the Farm",
  description:
    "What we have learned raising layers in Machakos County — written by the people doing the work, not a content team.",
};

export default function InsideTheFarmPage() {
  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <section style={{ background: "var(--color-cream)", padding: "clamp(56px, 8vw, 120px) clamp(20px, 4vw, 56px) clamp(40px, 5vw, 70px)" }}>
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3.5" style={{ marginBottom: 26 }}>
              <span style={{ width: 44, height: 1, background: "var(--color-terracotta)", display: "inline-block" }} />
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".24em", color: "rgba(17,17,17,.55)" }}>
                Field notes from Machakos
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(46px, 7.6vw, 112px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-.038em" }}>
              Inside
              <br />
              the Farm
            </h1>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10">
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: "rgba(17,17,17,.68)" }}>
              What we have learned raising layers in Machakos County — written by the people doing the work, not a content team.
            </p>
            <div className="font-mono uppercase" style={{ marginTop: 16, fontSize: 10, letterSpacing: ".16em", color: "rgba(17,17,17,.42)", lineHeight: 1.9 }}>
              {educationSections.length} notes · {educationCategories.length} sections
              <br />
              Everything on one page
            </div>
          </div>
        </div>
      </section>

      {/* Contents */}
      <section style={{ background: "var(--color-cream)", padding: "0 clamp(20px, 4vw, 56px) clamp(56px, 7vw, 96px)" }}>
        <div style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(17,17,17,.42)", paddingBottom: 18, borderBottom: "1px solid rgba(17,17,17,.2)" }}>
            Contents
          </div>
          <Reveal>
            {educationSections.map((section) => {
              const cat = categoryOf(section.category);
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="nn-contents-row grid grid-cols-12 gap-4 items-baseline"
                  style={{ padding: "20px 0", borderBottom: "1px solid rgba(17,17,17,.12)" }}
                >
                  <span className="col-span-4 md:col-span-2 font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".18em", color: "rgba(17,17,17,.45)" }}>
                    {section.fieldNote}
                  </span>
                  <span className="col-span-8 md:col-span-6" style={{ fontSize: "clamp(18px, 1.8vw, 24px)", fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.2 }}>
                    {section.title}
                  </span>
                  <span className="col-span-12 md:col-span-3 font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".18em", color: cat.color }}>
                    {cat.name}
                  </span>
                  <span className="hidden md:block col-span-1 text-right font-mono" style={{ fontSize: 13, color: "rgba(17,17,17,.4)" }}>
                    ↓
                  </span>
                </a>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* Full notes */}
      {educationSections.map((section, i) => {
        const cat = categoryOf(section.category);
        const dark = i % 2 === 1;
        return (
          <section
            key={section.id}
            id={section.id}
            style={{
              background: dark ? "var(--color-dark)" : "var(--color-cream)",
              color: dark ? "var(--color-cream)" : "var(--color-dark)",
              padding: "clamp(56px, 7vw, 100px) clamp(20px, 4vw, 56px)",
              scrollMarginTop: 90,
            }}
          >
            <div style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
              {/* Header */}
              <Reveal className="grid grid-cols-12 gap-8 items-end" style={{ marginBottom: "clamp(28px, 3.5vw, 48px)" }}>
                <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".2em", color: dark ? "rgba(245,240,232,.5)" : "rgba(17,17,17,.45)", lineHeight: 2 }}>
                  {section.fieldNote}
                  <br />
                  <span style={{ color: cat.color }}>{cat.name}</span>
                </div>
                <div className="col-span-12 md:col-span-9 md:col-start-3">
                  <h2 style={{ margin: 0, fontSize: "clamp(30px, 4.2vw, 60px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-.032em", textWrap: "pretty" }}>
                    {section.title}
                  </h2>
                  <p style={{ margin: "18px 0 0", fontSize: "clamp(18px, 1.6vw, 23px)", lineHeight: 1.55, color: dark ? "rgba(245,240,232,.68)" : "rgba(17,17,17,.7)", maxWidth: "46ch" }}>
                    {section.excerpt}
                  </p>
                </div>
              </Reveal>

              {/* Figure */}
              <div className="relative" style={{ aspectRatio: section.aspect, background: "var(--color-dark)", marginBottom: "clamp(32px, 4vw, 56px)" }}>
                <Image
                  src={section.image}
                  alt={section.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 1400px"
                  style={{ objectFit: "cover" }}
                />
              </div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-12 md:col-span-6 md:col-start-3">
                  {section.content.map((para) => (
                    <p
                      key={para.slice(0, 40)}
                      style={{
                        margin: "0 0 30px",
                        fontSize: 19,
                        lineHeight: 1.8,
                        color: dark ? "rgba(245,240,232,.72)" : "rgba(17,17,17,.72)",
                        textWrap: "pretty",
                      }}
                    >
                      {para}
                    </p>
                  ))}

                  {/* Author note */}
                  <div style={{ borderTop: `2px solid ${cat.color}`, paddingTop: 24, marginTop: 8 }}>
                    <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".2em", color: cat.color, marginBottom: 14 }}>
                      How we do it at N&amp;N
                    </div>
                    <p style={{ margin: 0, fontSize: 18, lineHeight: 1.75, color: dark ? "rgba(245,240,232,.8)" : "rgba(17,17,17,.8)", textWrap: "pretty" }}>
                      {section.authorNote}
                    </p>
                  </div>
                </div>

                {/* Farmer's tip */}
                <aside
                  className="col-span-12 md:col-span-3 md:col-start-10"
                  style={{
                    alignSelf: "start",
                    background: dark ? "rgba(245,240,232,.07)" : "var(--color-dark)",
                    color: "var(--color-cream)",
                    padding: "26px 22px",
                  }}
                >
                  <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".18em", color: "var(--color-gold)", marginBottom: 16 }}>
                    Farmer&apos;s tip
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "rgba(245,240,232,.78)", textWrap: "pretty" }}>
                    {section.farmerTip}
                  </p>
                </aside>
              </div>
            </div>
          </section>
        );
      })}

      {/* Dark CTA */}
      <Reveal as="section" style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "clamp(80px, 11vw, 160px) clamp(20px, 4vw, 56px)", borderTop: "1px solid rgba(245,240,232,.18)" }}>
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)", display: "block", marginBottom: 30 }}>
              From notes to trays
            </span>
            <h2 style={{ margin: "0 0 28px", fontSize: "clamp(36px, 5.2vw, 82px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-.038em" }}>
              All of this ends
              <br />
              up in a tray.
            </h2>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: "rgba(245,240,232,.65)", maxWidth: "44ch" }}>
              Everything written here is why the eggs taste the way they do. You can taste the practice, not just read about it.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-4">
            <ArrowButton href="/order" variant="primary" size="lg">Order Fresh Eggs</ArrowButton>
            <ArrowButton href="/products" variant="secondary" size="lg" onDark>See all products</ArrowButton>
          </div>
        </div>
      </Reveal>
    </>
  );
}

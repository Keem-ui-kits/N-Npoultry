import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ArrowButton } from "@/components/ui/arrow-button";
import { ZoomImage } from "@/components/ui/zoom-image";

export const metadata: Metadata = {
  title: "About",
  description:
    "The Kyalos started N&N Poultry Palace in 2021 as a backyard broiler project in Machakos. This is the story of how it became a working layer farm.",
};

const TIMELINE = [
  { year: "2021", label: "Broilers, backyard scale" },
  { year: "2022", label: "Layers · company registered" },
  { year: "Today", label: "Eggs, manure & ex-layers across six zones" },
];

const PROOF_SMALL = [
  { quote: "Living in Syokimau, it's great to have such high-quality eggs delivered right to my door.", name: "Wanjiru M.", place: "Syokimau" },
  { quote: "Invoicing is professional, and I have never had a rejected batch.", name: "Chef Kamau J.", place: "Machakos Town" },
  { quote: "It's great to support a local farm that cares about sustainability.", name: "Sarah L.", place: "Katoloni" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex" style={{ minHeight: "88vh", background: "var(--color-dark)", alignItems: "flex-end", overflow: "hidden" }}>
        <div className="absolute inset-0">
          <Image src="/assets/education/layer-hens.jpeg" alt="The N&N layer house in Machakos" fill priority sizes="100vw" style={{ objectFit: "cover", animation: "nn-hero-settle 2.4s var(--ease-editorial) both" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(17,17,17,.72) 0%, rgba(17,17,17,.35) 40%, rgba(17,17,17,.88) 100%)" }} />
        </div>
        <div className="relative grid grid-cols-12 gap-8 items-end w-full" style={{ maxWidth: "var(--container-site)", margin: "0 auto", padding: "180px clamp(20px, 4vw, 56px) clamp(56px, 7vw, 90px)" }}>
          <div className="col-span-12 md:col-span-8">
            <div className="nn-hero-in flex items-center gap-3.5" style={{ marginBottom: 28, animationDelay: ".2s" }}>
              <span style={{ width: 44, height: 1, background: "var(--color-gold)", display: "inline-block" }} />
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".24em", color: "var(--color-gold)" }}>
                Our Farm / Machakos
              </span>
            </div>
            <h1 className="nn-hero-in" style={{ margin: 0, maxWidth: "22ch", fontSize: "clamp(40px, 6.4vw, 96px)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-.038em", color: "var(--color-cream)", textWrap: "pretty", animationDelay: ".34s" }}>
              Built around doing the ordinary thing exceptionally well.
            </h1>
          </div>
          <div className="nn-hero-in col-span-12 md:col-span-3 md:col-start-10 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", color: "rgba(245,240,232,.6)", lineHeight: 2.1, animationDelay: ".5s" }}>
            {[
              ["Founded", "2021"],
              ["Registered", "2022"],
              ["Products", "Three"],
              ["Zones served", "Six"],
            ].map(([label, value], i) => (
              <div key={label} className="flex justify-between" style={{ borderBottom: i < 3 ? "1px solid rgba(245,240,232,.2)" : undefined }}>
                <span>{label}</span>
                <span style={{ color: "var(--color-cream)" }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01 Origin */}
      <Reveal as="section" style={{ background: "var(--color-cream)", padding: "clamp(80px, 11vw, 170px) clamp(20px, 4vw, 56px) clamp(56px, 7vw, 100px)" }}>
        <div className="grid grid-cols-12" style={{ gap: "clamp(28px, 4vw, 64px)", maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
            01 / Origin
            <br />
            <span style={{ color: "var(--color-terracotta)" }}>2021 — today</span>
          </div>
          <div className="col-span-12 md:col-span-6 md:col-start-3">
            <h2 style={{ margin: "0 0 26px", fontSize: "clamp(30px, 4vw, 60px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em" }}>
              It started as a backyard project during a lockdown.
            </h2>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: "rgba(17,17,17,.72)", maxWidth: "56ch", marginBottom: 18 }}>
              N&amp;N began in 2021 with broiler chicken — a backyard project, nothing more. When controlled movement closed the eateries, the broiler market went with them. The family moved into layers in 2022, and that is when the company was officially registered.
            </p>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: "rgba(17,17,17,.72)", maxWidth: "56ch", marginBottom: 18 }}>
              Disease challenges came next. The response was online training and seminars run by Kenchic and other poultry input traders, considerable research into poultry farming, and a long run of visits to other farms.
            </p>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: "rgba(17,17,17,.72)", maxWidth: "56ch" }}>
              The first year was hard. Batches were lost, mistakes were made, and the operation became more resilient for it. What never moved was the quality of what left the farm.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3 md:col-start-10" style={{ alignSelf: "start", borderTop: "1px solid rgba(17,17,17,.2)" }}>
            {TIMELINE.map((row, i) => (
              <div key={row.year} style={{ padding: "18px 0", borderBottom: i < TIMELINE.length - 1 ? "1px solid rgba(17,17,17,.14)" : undefined }}>
                <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: "-.03em" }}>{row.year}</div>
                <div className="font-mono uppercase" style={{ fontSize: 11, color: "rgba(17,17,17,.55)", marginTop: 4 }}>
                  {row.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 02 The name */}
      <Reveal as="section" style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "0 clamp(20px, 4vw, 56px)" }}>
      <div className="grid grid-cols-12 items-center" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
        <div className="col-span-12 md:col-span-6" style={{ padding: "clamp(64px, 8vw, 130px) 0" }}>
          <div className="flex items-center gap-3.5" style={{ marginBottom: 26 }}>
            <span style={{ width: 34, height: 1, background: "var(--color-gold)", display: "inline-block" }} />
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)" }}>02 / The name</span>
          </div>
          <h2 style={{ margin: "0 0 26px", fontSize: "clamp(30px, 4vw, 60px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em" }}>
            Two initials. Two daughters.
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.75, color: "rgba(245,240,232,.66)", maxWidth: "50ch", marginBottom: 18 }}>
            The name comes from a family setup — our two daughters bear the initials. It is not a brand exercise. It is the reason the standard does not slip when nobody is watching.
          </p>
          <p style={{ fontSize: 19, lineHeight: 1.75, color: "rgba(245,240,232,.66)", maxWidth: "50ch" }}>
            “Fresh and Nutritious” has been the promise since the first tray left the gate, and it is still what the whole operation is measured against.
          </p>
        </div>
        <div className="col-span-12 md:col-span-5 md:col-start-8 relative" style={{ minHeight: "clamp(320px, 40vw, 600px)" }}>
          <ZoomImage src="/nn-poultry-logo.png" alt="The N&N Poultry Palace crest" className="absolute inset-0" />
        </div>
      </div>
      </Reveal>

      {/* 03 Values */}
      <Reveal as="section" style={{ background: "var(--color-cream)", padding: "clamp(80px, 11vw, 170px) clamp(20px, 4vw, 56px)" }}>
        <div style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="grid grid-cols-12 gap-8" style={{ marginBottom: 48 }}>
            <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
              03 / Values
            </div>
            <h2 className="col-span-12 md:col-span-6 md:col-start-3" style={{ margin: 0, fontSize: "clamp(32px, 4.4vw, 62px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-.03em" }}>
              Three commitments, in order of weight.
            </h2>
          </div>
          <div className="grid grid-cols-12" style={{ gap: "clamp(20px, 3vw, 40px)", alignItems: "stretch" }}>
            <div className="col-span-12 md:col-span-7" style={{ background: "var(--color-gold)", padding: "clamp(36px, 5vw, 72px)" }}>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "rgba(17,17,17,.6)", marginBottom: 20 }}>
                Value 01 · Integrity
              </div>
              <div style={{ fontSize: "clamp(28px, 3.6vw, 54px)", fontWeight: 700, lineHeight: 1.05, letterSpacing: "-.03em", marginBottom: 20 }}>
                We believe in doing what&apos;s right — always.
              </div>
              <p style={{ fontSize: 18, lineHeight: 1.7, color: "rgba(17,17,17,.72)", maxWidth: "46ch", margin: 0 }}>
                In practice this is unglamorous: rejecting a cracked tray ourselves rather than letting a customer find it, and telling a buyer when we cannot meet a quantity instead of stretching to fill it.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col" style={{ gap: "clamp(20px, 3vw, 40px)" }}>
              {[
                { label: "Value 02 · Reliability", text: "We are reliable and deliver on our promises." },
                { label: "Value 03 · Teamwork", text: "We work as one team, sharing ideas, responsibilities and successes." },
              ].map((v) => (
                <div key={v.label} className="flex-1" style={{ border: "1px solid rgba(17,17,17,.22)", padding: "clamp(28px, 3vw, 40px)" }}>
                  <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "rgba(17,17,17,.5)", marginBottom: 16 }}>
                    {v.label}
                  </div>
                  <div style={{ fontSize: "clamp(21px, 2vw, 28px)", fontWeight: 600, lineHeight: 1.15, letterSpacing: "-.02em" }}>{v.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 04 Vision & Mission */}
      <Reveal as="section" style={{ background: "var(--color-cream)", padding: "clamp(80px, 11vw, 170px) clamp(20px, 4vw, 56px)" }}>
        <div style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="grid grid-cols-12 gap-8" style={{ marginBottom: 48 }}>
            <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
              04 / Vision &amp; Mission
            </div>
            <h2 className="col-span-12 md:col-span-6 md:col-start-3" style={{ margin: 0, fontSize: "clamp(32px, 4.4vw, 62px)", fontWeight: 700, lineHeight: 1, letterSpacing: "-.03em" }}>
              What we&apos;re building toward.
            </h2>
          </div>
          <div className="grid grid-cols-12" style={{ gap: "clamp(20px, 3vw, 40px)", alignItems: "stretch" }}>
            <div className="col-span-12 md:col-span-6" style={{ background: "var(--color-gold)", padding: "clamp(36px, 5vw, 72px)" }}>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "rgba(17,17,17,.6)", marginBottom: 20 }}>
                01 · Vision
              </div>
              <div style={{ fontSize: "clamp(26px, 3.2vw, 46px)", fontWeight: 700, lineHeight: 1.14, letterSpacing: "-.03em" }}>
                To be East Africa&apos;s leading provider of sustainable, quality poultry products.
              </div>
            </div>
            <div className="col-span-12 md:col-span-6" style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "clamp(36px, 5vw, 72px)" }}>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)", marginBottom: 20 }}>
                02 · Mission
              </div>
              <div style={{ fontSize: "clamp(26px, 3.2vw, 46px)", fontWeight: 700, lineHeight: 1.14, letterSpacing: "-.03em" }}>
                Driving progress in the poultry industry while uplifting the economies that sustain it.
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* 05 Founder story */}
      <Reveal as="section" style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "0 clamp(20px, 4vw, 56px)" }}>
      <div className="grid grid-cols-12 items-center" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
        <div className="col-span-12 md:col-span-5 relative" style={{ minHeight: "clamp(360px, 46vw, 700px)" }}>
          <ZoomImage src="/farm-sign.jpeg" alt="The N&N Poultry Farm entrance sign" className="absolute inset-0" />
          <div className="absolute left-0 right-0 bottom-0 font-mono uppercase" style={{ background: "rgba(17,17,17,.88)", padding: "14px 20px", fontSize: 10, letterSpacing: ".16em", color: "rgba(245,240,232,.6)" }}>
            Founder portrait to be photographed — flock imagery standing in
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 md:col-start-7" style={{ padding: "clamp(64px, 8vw, 130px) 0" }}>
          <div className="flex items-center gap-3.5" style={{ marginBottom: 26 }}>
            <span style={{ width: 34, height: 1, background: "var(--color-gold)", display: "inline-block" }} />
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)" }}>05 / The people behind it</span>
          </div>
          <blockquote style={{ margin: "0 0 28px", fontSize: "clamp(26px, 3.2vw, 46px)", fontWeight: 600, lineHeight: 1.12, letterSpacing: "-.03em" }}>
            “Every egg, every day, done right.”
          </blockquote>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(245,240,232,.62)", maxWidth: "52ch", marginBottom: 18 }}>
            Integrity, teamwork and consistency are the guiding principles, and they are tested most on the days nothing goes to plan — a power cut on a cold Machakos night, a batch running light by week three, a Saturday route with more orders than slots.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(245,240,232,.62)", maxWidth: "52ch", marginBottom: 40 }}>
            “When a kiosk owner in Athi River tells me our eggs are the only ones her customers ask for by name — that&apos;s what it&apos;s all about. That trust is everything we&apos;ve worked for.”
          </p>
          <div style={{ borderTop: "1px solid rgba(245,240,232,.2)", paddingTop: 22 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>The Kyalos</div>
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".16em", color: "var(--color-gold)", marginTop: 6 }}>
              Founders &amp; Directors · 5 years farming
            </div>
          </div>
        </div>
      </div>
      </Reveal>

      {/* 06 Proof */}
      <Reveal as="section" style={{ background: "var(--color-cream)", padding: "clamp(80px, 11vw, 160px) clamp(20px, 4vw, 56px)" }}>
        <div className="grid grid-cols-12 gap-8" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
            06 / Proof
          </div>
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <blockquote style={{ margin: "0 0 24px", fontSize: "clamp(26px, 3.4vw, 52px)", fontWeight: 600, lineHeight: 1.14, letterSpacing: "-.032em" }}>
              “Supply chain reliability is everything in my business. N&amp;N delivers on time, every time — and the feedback from my retail partners has been overwhelmingly positive.”
            </blockquote>
            <div className="flex flex-wrap items-baseline gap-5" style={{ borderTop: "1px solid rgba(17,17,17,.24)", paddingTop: 22 }}>
              <span style={{ fontSize: 19, fontWeight: 600 }}>David K.</span>
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".18em", color: "rgba(17,17,17,.6)" }}>Mlolongo · Wholesale distributor</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 40, marginTop: "clamp(48px, 6vw, 80px)" }}>
              {PROOF_SMALL.map((t) => (
                <div key={t.name}>
                  <p style={{ fontSize: 16, lineHeight: 1.7, color: "rgba(17,17,17,.72)", marginBottom: 14 }}>“{t.quote}”</p>
                  <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".16em", color: "rgba(17,17,17,.55)" }}>
                    {t.name} · {t.place}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* 07 Closing CTA */}
      <Reveal as="section" style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "clamp(80px, 11vw, 170px) clamp(20px, 4vw, 56px)" }}>
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)", display: "block", marginBottom: 30 }}>
              07 / Come and see
            </span>
            <h2 style={{ margin: "0 0 28px", fontSize: "clamp(38px, 5.6vw, 88px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-.038em" }}>
              Visit the farm,
              <br />
              or start with a tray.
            </h2>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: "rgba(245,240,232,.65)", maxWidth: "46ch" }}>
              We keep the barns closed to casual visitors for biosecurity, but arranged visits are welcome — footbath and farm clothing, no exceptions.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-4">
            <ArrowButton href="/order" variant="primary" size="lg">Order Fresh Eggs</ArrowButton>
            <ArrowButton href="/contact" variant="secondary" size="lg" onDark>Arrange a visit</ArrowButton>
          </div>
        </div>
      </Reveal>
    </>
  );
}

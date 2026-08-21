import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { ProductDetail } from "@/lib/products-data";

export function ProductDossierDetail({ product }: { product: ProductDetail }) {
  return (
    <>
      {/* 01 What it is */}
      <Reveal
        as="section"
        id={`${product.slug}-detail`}
        style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "clamp(70px, 9vw, 130px) clamp(20px, 4vw, 56px)" }}
      >
        <div className="grid grid-cols-12 gap-8" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: product.accent }}>
            01 / What it is
          </div>
          <div className="col-span-12 md:col-span-7 md:col-start-3">
            <h3 style={{ margin: "0 0 30px", fontSize: "clamp(30px, 3.8vw, 56px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em", textWrap: "pretty" }}>
              {product.whatItIs.h2}
            </h3>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: "rgba(245,240,232,.66)", maxWidth: "56ch", marginBottom: 20 }}>
              {product.whatItIs.paragraphs[0]}
            </p>
            <p style={{ fontSize: 19, lineHeight: 1.7, color: "rgba(245,240,232,.66)", maxWidth: "56ch" }}>
              {product.whatItIs.paragraphs[1]}
            </p>
          </div>
        </div>
      </Reveal>

      {/* 02 Why */}
      <Reveal as="section" style={{ background: product.why.background, padding: "clamp(70px, 9vw, 130px) clamp(20px, 4vw, 56px)" }}>
        <div style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="grid grid-cols-12 gap-8" style={{ marginBottom: "clamp(40px, 5vw, 70px)" }}>
            <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
              02 / {product.why.label}
            </div>
            <h3 className="col-span-12 md:col-span-6 md:col-start-3" style={{ margin: 0, fontSize: "clamp(30px, 3.8vw, 56px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em" }}>
              {product.why.h2}
            </h3>
          </div>
          <div style={{ borderTop: "1px solid rgba(17,17,17,.2)" }}>
            {product.why.rows.map((row) => (
              <div key={row.number} className="grid grid-cols-12" style={{ gap: 32, padding: "40px 0", borderBottom: "1px solid rgba(17,17,17,.16)", alignItems: "start" }}>
                <span className="col-span-12 md:col-span-2 font-mono" style={{ fontSize: 11, letterSpacing: ".18em", color: product.accent }}>
                  {row.number}
                </span>
                <span className="col-span-12 md:col-span-4" style={{ fontSize: "clamp(24px, 2.4vw, 34px)", fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.1 }}>
                  {row.title}
                </span>
                <div className="col-span-12 md:col-span-5 md:col-start-8">
                  <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(17,17,17,.7)", margin: 0 }}>
                    {row.isQuote ? `“${row.body}”` : row.body}
                  </p>
                  {row.attribution && (
                    <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".16em", color: "rgba(17,17,17,.5)", marginTop: 14 }}>
                      {row.attribution}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Mask banner */}
      <div className="nn-hoverzoom relative" style={{ height: "clamp(340px, 50vw, 620px)", background: "var(--color-dark)" }}>
        <Image src={product.maskBanner.image} alt={product.maskBanner.alt} fill sizes="100vw" priority style={{ objectFit: "cover" }} />
        <div className="absolute" style={{ left: "clamp(20px, 4vw, 56px)", bottom: "clamp(20px, 4vw, 44px)", background: "rgba(17,17,17,.9)", padding: "18px 24px", maxWidth: 400 }}>
          <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".2em", color: product.accent, marginBottom: 8 }}>
            {product.maskBanner.eyebrow}
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(245,240,232,.78)" }}>{product.maskBanner.body}</div>
        </div>
      </div>

      {/* 03 How we handle it */}
      <Reveal as="section" style={{ background: "var(--color-cream)", padding: "clamp(70px, 9vw, 130px) clamp(20px, 4vw, 56px)" }}>
        <div style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="grid grid-cols-12 gap-8" style={{ marginBottom: "clamp(40px, 5vw, 70px)" }}>
            <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
              03 / How we handle it
            </div>
            <h3 className="col-span-12 md:col-span-6 md:col-start-3" style={{ margin: 0, fontSize: "clamp(30px, 3.8vw, 56px)", fontWeight: 700, lineHeight: 1.02, letterSpacing: "-.03em" }}>
              {product.process.h2}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:!grid-cols-5" style={{ borderTop: "1px solid rgba(17,17,17,.2)" }}>
            {product.process.steps.map((step, i) => (
              <div
                key={step.title}
                style={{
                  borderRight: i < product.process.steps.length - 1 ? "1px solid rgba(17,17,17,.16)" : undefined,
                  padding:
                    i === 0
                      ? "30px 20px 34px 0"
                      : i === product.process.steps.length - 1
                        ? "30px 0 34px 20px"
                        : "30px 20px 34px",
                }}
              >
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: ".2em", color: product.process.stepNumberColor, marginBottom: 18 }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-.015em", marginBottom: 12 }}>{step.title}</div>
                <div style={{ fontSize: 15, lineHeight: 1.65, color: "rgba(17,17,17,.65)" }}>{step.body}</div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 04 Details + 05 Who it's for */}
      <Reveal as="section" style={{ background: "var(--color-cream)", padding: "0 clamp(20px, 4vw, 56px) clamp(70px, 9vw, 130px)" }}>
        <div className="grid grid-cols-12" style={{ gap: "clamp(28px, 4vw, 64px)", maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-2 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}>
            04 / Details
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-3">
            <ul className="list-none p-0 m-0" style={{ borderTop: "1px solid rgba(17,17,17,.16)" }}>
              {product.details.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-4" style={{ padding: "16px 0", borderBottom: "1px solid rgba(17,17,17,.16)", fontSize: 17, lineHeight: 1.6 }}>
                  <span className="font-mono" style={{ fontSize: 11, color: product.accent, paddingTop: 4 }}>—</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <h3 style={{ margin: "0 0 30px", fontSize: "clamp(26px, 2.6vw, 38px)", fontWeight: 600, letterSpacing: "-.02em", lineHeight: 1.1 }}>
              05 / Who it&apos;s for
            </h3>
            <div className="flex flex-col" style={{ gap: 2 }}>
              {product.whoItsFor.map((row) => (
                <div key={row.title} style={{ padding: "22px 24px", background: row.bg }}>
                  <div style={{ fontSize: 19, fontWeight: 600, color: row.textOverride ? "#f5f0e8" : undefined }}>{row.title}</div>
                  <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", marginTop: 6, color: row.textOverride ? "rgba(245,240,232,.75)" : "rgba(17,17,17,.6)" }}>
                    {row.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}

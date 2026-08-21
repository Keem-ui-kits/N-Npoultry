import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ArrowButton } from "@/components/ui/arrow-button";
import { ProductsHeroStatus } from "@/components/products/hero-status";
import { ProductsFullChapter } from "@/components/products/full-chapter";
import { ProductDossierDetail } from "@/components/products/dossier-detail";
import { productsData } from "@/lib/products-data";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Table eggs, poultry manure and ex-layer hens from N&N Poultry Palace — one flock, three things, nothing wasted.",
};

const COMPARISON_ROWS = [
  {
    href: "#table-eggs",
    tick: "var(--color-gold)",
    number: "01",
    name: "Table Eggs",
    unit: "30pc tray",
    collection: "Daily, from 2 PM",
    bestFor: "Households · Bakeries",
    status: "Available",
  },
  {
    href: "#poultry-manure",
    tick: "var(--color-sage)",
    number: "02",
    name: "Poultry Manure",
    unit: "70kg sack",
    collection: "Pickup or bulk delivery",
    bestFor: "Gardeners · Farms",
    status: "Available",
  },
  {
    href: "#ex-layer-hens",
    tick: "var(--color-terracotta)",
    number: "03",
    name: "Ex-Layer Hens",
    unit: "Live bird / bulk lot",
    collection: "At the farm",
    bestFor: "Caterers · Bulk buyers",
    status: "Available",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: "var(--color-cream)", padding: "clamp(60px, 9vw, 140px) clamp(20px, 4vw, 56px) clamp(48px, 6vw, 90px)" }}>
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3.5" style={{ marginBottom: 32 }}>
              <span style={{ width: 44, height: 1, background: "var(--color-terracotta)", display: "inline-block" }} />
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".24em", color: "rgba(17,17,17,.55)" }}>
                Products / N&amp;N Poultry Palace
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(46px, 7.4vw, 108px)", fontWeight: 800, lineHeight: 0.88, letterSpacing: "-.038em" }}>
              Three products.
              <br />
              Each done properly.
            </h1>
            <p style={{ marginTop: 34, maxWidth: "48ch", fontSize: "clamp(18px, 1.4vw, 21px)", lineHeight: 1.6, color: "rgba(17,17,17,.68)" }}>
              Table eggs from the layer house, organic manure from the barn floor, and hens at the end of their laying cycle. One flock, three things, nothing wasted.
            </p>
          </div>
          <ProductsHeroStatus />
        </div>
      </section>

      {/* Comparison table */}
      <Reveal
        as="section"
        style={{ background: "var(--color-cream)", padding: "0 clamp(20px, 4vw, 56px) clamp(56px, 7vw, 100px)" }}
      >
        <div style={{ maxWidth: "var(--container-site)", margin: "0 auto", borderTop: "1px solid rgba(17,17,17,.2)" }}>
          <div
            className="hidden md:grid font-mono uppercase"
            style={{ gridTemplateColumns: "3fr 2fr 2fr 2fr 1fr", gap: 24, padding: "14px 0", borderBottom: "1px solid rgba(17,17,17,.16)", fontSize: 10, letterSpacing: ".2em", color: "rgba(17,17,17,.45)" }}
          >
            <span>Product</span>
            <span>Unit</span>
            <span>Collection</span>
            <span>Best for</span>
            <span className="text-right">Status</span>
          </div>
          {COMPARISON_ROWS.map((row, i) => (
            <Link
              key={row.name}
              href={row.href}
              className="nn-row block"
              style={{
                transition: "background .4s var(--ease-editorial)",
                borderBottom: i === COMPARISON_ROWS.length - 1 ? "1px solid rgba(17,17,17,.2)" : "1px solid rgba(17,17,17,.16)",
              }}
            >
              {/* Desktop row */}
              <div className="hidden md:grid items-center" style={{ gridTemplateColumns: "3fr 2fr 2fr 2fr 1fr", gap: 24, padding: "26px 0" }}>
                <span className="flex items-center gap-3" style={{ fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 600, letterSpacing: "-.02em" }}>
                  <span style={{ width: 26, height: 3, background: row.tick, display: "inline-block" }} />
                  {row.number}&nbsp;&nbsp;{row.name}
                </span>
                <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".12em", color: "rgba(17,17,17,.65)" }}>{row.unit}</span>
                <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".12em", color: "rgba(17,17,17,.65)" }}>{row.collection}</span>
                <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".12em", color: "rgba(17,17,17,.65)" }}>{row.bestFor}</span>
                <span className="text-right font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".12em", color: "#4a7c59" }}>{row.status}</span>
              </div>
              {/* Mobile row */}
              <div className="md:hidden" style={{ padding: "20px 0" }}>
                <div className="flex items-center gap-3" style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-.02em" }}>
                  <span style={{ width: 22, height: 3, background: row.tick, display: "inline-block" }} />
                  {row.number}&nbsp;&nbsp;{row.name}
                  <span className="font-mono uppercase" style={{ marginLeft: "auto", fontSize: 10, letterSpacing: ".12em", color: "#4a7c59" }}>
                    {row.status}
                  </span>
                </div>
                <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".1em", color: "rgba(17,17,17,.5)", marginTop: 10, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                  <span>{row.unit}</span>
                  <span>{row.collection}</span>
                  <span className="col-span-2">{row.bestFor}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>

      <ProductsFullChapter
        id="table-eggs"
        eyebrowLabel="01 / Table Eggs"
        accent="var(--color-gold)"
        heading={<>Fresh eggs,<br />collected daily.</>}
        body="Our most-asked-for product. Collected from the layer house daily and inspected for shell integrity and size consistency before packing. Mixed grade — large and medium in the same tray."
        tags={["Collected daily", "30pc trays", "Households + businesses"]}
        ctaLabel="Order Table Eggs"
        ctaHref="/order"
        photo="/eggs.jpeg"
        photoAlt="Fresh N&N table eggs"
        cutout="/norm/table-eggs.png"
        cutoutAlt="A 30pc tray of table eggs"
        statNumber="30"
        statLabel="Eggs per tray"
        imageSide="right"
        imageOrder="photo-first"
      />
      <ProductDossierDetail product={productsData["table-eggs"]} />

      <ProductsFullChapter
        id="poultry-manure"
        eyebrowLabel="02 / Poultry Manure"
        accent="var(--color-sage)"
        heading={<>What the barn<br />gives the soil.</>}
        body="A potent source of nitrogen, phosphorus and potassium that improves soil structure as well as feeding the crop. Dried naturally, nothing added, ready to apply straight to soil."
        tags={["Fully organic", "70kg sacks · FH truck", "≈50–80 m² per sack"]}
        ctaLabel="Order Manure"
        ctaHref="/order"
        photo="/manure-hips.jpeg"
        photoAlt="Poultry manure drying in the sun"
        cutout="/norm/manure-bags.png"
        cutoutAlt="70kg sacks of poultry manure"
        statNumber="70kg"
        statLabel="Standard sack"
        imageSide="left"
        imageOrder="cutout-first"
        background="rgba(122,158,126,.1)"
      />
      <ProductDossierDetail product={productsData["poultry-manure"]} />

      <ProductsFullChapter
        id="ex-layer-hens"
        eyebrowLabel="03 / Ex-Layer Hens"
        accent="var(--color-terracotta)"
        heading={<>The end of<br />a good cycle.</>}
        body="Birds offered at the end of their peak laying cycle — healthy, well-fed and under regular veterinary supervision. Firmer meat, favoured for slow-cooked traditional dishes and soup bases."
        tags={["Vet-inspected", "Sold live at the farm", "Bulk lots available"]}
        ctaLabel="Enquire on Hens"
        ctaHref="/order"
        photo="/layers.jpeg"
        photoAlt="Layer hens at the end of their cycle"
        cutout="/norm/ex-layer-hen.png"
        cutoutAlt="An ex-layer hen"
        statNumber="72–80"
        statLabel="Weeks of age"
        imageSide="right"
        imageOrder="photo-first"
      />
      <ProductDossierDetail product={productsData["ex-layer-hens"]} />

      {/* Final CTA */}
      <Reveal
        as="section"
        style={{ background: "var(--color-dark)", color: "var(--color-cream)", padding: "clamp(80px, 11vw, 170px) clamp(20px, 4vw, 56px)" }}
      >
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-7">
            <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".22em", color: "var(--color-gold)", display: "block", marginBottom: 30 }}>
              Ready when you are
            </span>
            <h2 style={{ margin: "0 0 28px", fontSize: "clamp(38px, 5.6vw, 88px)", fontWeight: 800, lineHeight: 0.92, letterSpacing: "-.038em" }}>
              Know what you need?
              <br />
              Let&apos;s get it to you.
            </h2>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: "rgba(245,240,232,.65)", maxWidth: "44ch" }}>
              Most orders are settled in a few messages — quantity, area, and the next slot on the morning route.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col gap-4">
            <ArrowButton href="/order" variant="primary" size="lg">Order on WhatsApp</ArrowButton>
            <ArrowButton href="/contact" variant="secondary" size="lg" onDark>Talk to N&amp;N</ArrowButton>
            <ArrowButton href="/faq" variant="secondary" size="lg" onDark>Read the FAQ</ArrowButton>
            <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", color: "rgba(245,240,232,.45)", marginTop: 8 }}>
              Mon–Sat delivery · Sat slots fill early
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
}

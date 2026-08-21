import { ArrowButton } from "@/components/ui/arrow-button";
import { EyebrowRule } from "@/components/ui/eyebrow";
import { MetaTable } from "@/components/ui/meta-table";
import { ZoomImage } from "@/components/ui/zoom-image";
import { Reveal } from "@/components/motion/reveal";

export function HomeProductChapter({
  eyebrowLabel,
  eyebrowColor,
  heading,
  body,
  metaRows,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
  imageSide,
  background,
}: {
  eyebrowLabel: string;
  eyebrowColor: string;
  heading: React.ReactNode;
  body: string;
  metaRows: { label: string; value: string }[];
  ctaLabel: string;
  ctaHref: string;
  image: string;
  imageAlt: string;
  imageSide: "left" | "right";
  background?: string;
}) {
  const textCol = imageSide === "right" ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8";
  const imageCol = imageSide === "right" ? "md:col-span-6 md:col-start-7" : "md:col-span-6 md:col-start-1";

  const textBlock = (
    <div className={`col-span-12 ${textCol}`} style={{ padding: "clamp(56px, 7vw, 110px) 0" }}>
      <EyebrowRule label={eyebrowLabel} color={eyebrowColor} ruleWidth={34} ruleHeight={2} />
      <h3
        style={{
          fontSize: "clamp(36px, 4.6vw, 68px)",
          fontWeight: 700,
          lineHeight: 0.96,
          letterSpacing: "-.035em",
          margin: "0 0 22px",
        }}
      >
        {heading}
      </h3>
      <p style={{ fontSize: 18, lineHeight: 1.65, color: "rgba(17,17,17,.68)", maxWidth: "40ch", marginBottom: 36 }}>
        {body}
      </p>
      <div style={{ marginBottom: 36 }}>
        <MetaTable rows={metaRows} />
      </div>
      <ArrowButton href={ctaHref} variant="dark">
        {ctaLabel}
      </ArrowButton>
    </div>
  );

  const imageBlock = (
    <div
      className={`col-span-12 ${
        imageSide === "right" ? "order-first md:order-none " : ""
      }self-stretch relative ${imageCol}`}
      style={{ minHeight: "clamp(320px, 42vw, 620px)" }}
    >
      <ZoomImage src={image} alt={imageAlt} className="absolute inset-0" sizes="(max-width: 900px) 100vw, 50vw" />
    </div>
  );

  return (
    <Reveal
      as="article"
      style={{ background: background ?? "var(--color-cream)", borderTop: "1px solid rgba(17,17,17,.16)" }}
    >
      <div
        className="grid grid-cols-12 items-center"
        style={{
          maxWidth: "var(--container-site)",
          margin: "0 auto",
          gap: "clamp(24px, 4vw, 64px)",
          padding: "0 clamp(20px, 4vw, 56px)",
        }}
      >
        {imageSide === "left" ? (
          <>
            {imageBlock}
            {textBlock}
          </>
        ) : (
          <>
            {textBlock}
            {imageBlock}
          </>
        )}
      </div>
    </Reveal>
  );
}

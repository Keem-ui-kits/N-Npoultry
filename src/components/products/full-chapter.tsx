import Image from "next/image";
import { ArrowButton } from "@/components/ui/arrow-button";
import { EyebrowRule } from "@/components/ui/eyebrow";
import { TagPills } from "@/components/ui/meta-table";
import { ZoomImage } from "@/components/ui/zoom-image";
import { Chapter } from "@/components/motion/chapter";

export function ProductsFullChapter({
  id,
  eyebrowLabel,
  accent,
  heading,
  body,
  tags,
  ctaLabel,
  ctaHref,
  photo,
  photoAlt,
  cutout,
  cutoutAlt,
  statNumber,
  statLabel,
  imageSide,
  background,
  imageOrder = "photo-first",
}: {
  id: string;
  eyebrowLabel: string;
  accent: string;
  heading: React.ReactNode;
  body: string;
  tags: string[];
  ctaLabel: string;
  ctaHref: string;
  photo: string;
  photoAlt: string;
  cutout: string;
  cutoutAlt: string;
  statNumber: string;
  statLabel: string;
  imageSide: "left" | "right";
  background?: string;
  imageOrder?: "photo-first" | "cutout-first";
}) {
  const textCol = imageSide === "right" ? "md:col-span-5 md:col-start-1" : "md:col-span-5 md:col-start-8";
  const imageCol = imageSide === "right" ? "md:col-span-6 md:col-start-7" : "md:col-span-6 md:col-start-1";

  const cutoutBlock = (
    <div className="flex flex-col gap-4">
      <div className="flex-1 flex items-center justify-center relative" style={{ padding: "3%" }}>
        <Image src={cutout} alt={cutoutAlt} fill sizes="(max-width: 900px) 30vw, 18vw" style={{ objectFit: "contain" }} />
      </div>
      <div className="flex-1 flex flex-col justify-end" style={{ background: "var(--color-dark)", padding: 22 }}>
        <span style={{ fontSize: 42, fontWeight: 800, letterSpacing: "-.03em", color: accent, lineHeight: 1 }}>
          {statNumber}
        </span>
        <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".18em", color: "rgba(245,240,232,.55)", marginTop: 8 }}>
          {statLabel}
        </span>
      </div>
    </div>
  );

  const photoBlock = (
    <ZoomImage
      src={photo}
      alt={photoAlt}
      style={{ minHeight: "clamp(280px, 36vw, 540px)" }}
      sizes="(max-width: 900px) 60vw, 35vw"
    />
  );

  const imageColumn = (
    <div
      className={`col-span-12 ${
        imageSide === "right" ? "order-first md:order-none " : ""
      }self-stretch grid ${imageCol}`}
      style={{
        gridTemplateColumns: imageOrder === "photo-first" ? "2fr 1fr" : "1fr 2fr",
        gap: 16,
        padding: "clamp(24px, 3vw, 48px) 0",
      }}
    >
      {imageOrder === "photo-first" ? (
        <>
          {photoBlock}
          {cutoutBlock}
        </>
      ) : (
        <>
          {cutoutBlock}
          {photoBlock}
        </>
      )}
    </div>
  );

  return (
    <Chapter
      as="article"
      id={id}
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
        {imageSide === "left" && imageColumn}
        <div className={`col-span-12 ${textCol}`} style={{ padding: "clamp(56px, 7vw, 118px) 0" }}>
          <EyebrowRule label={eyebrowLabel} color={accent} ruleWidth={34} ruleHeight={2} />
          <h2 style={{ fontSize: "clamp(36px, 4.6vw, 68px)", fontWeight: 700, lineHeight: 0.96, letterSpacing: "-.035em", margin: "0 0 22px" }}>
            {heading}
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: "rgba(17,17,17,.68)", maxWidth: "42ch", marginBottom: 32 }}>{body}</p>
          <div style={{ marginBottom: 34 }}>
            <TagPills tags={tags} />
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <ArrowButton href={ctaHref} variant="dark">
              {ctaLabel}
            </ArrowButton>
          </div>
        </div>
        {imageSide === "right" && imageColumn}
      </div>
    </Chapter>
  );
}

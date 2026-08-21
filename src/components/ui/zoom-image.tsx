import Image from "next/image";
import type { CSSProperties } from "react";

/** Fill-container image with the site's hover-zoom treatment (1.3s / scale 1.06). */
export function ZoomImage({
  src,
  alt,
  className = "",
  style,
  objectPosition,
  sizes = "100vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  objectPosition?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const hasPositionClass = /\b(static|relative|absolute|fixed|sticky)\b/.test(className);

  return (
    <div
      className={`nn-hoverzoom ${hasPositionClass ? className : `relative ${className}`}`}
      style={{ background: "var(--color-dark)", ...style }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectFit: "cover", objectPosition }}
      />
    </div>
  );
}

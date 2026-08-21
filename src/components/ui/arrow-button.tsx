import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary" | "dark" | "text";

const base: Record<Variant, CSSProperties> = {
  primary: { backgroundImage: "linear-gradient(to right, var(--color-gold), var(--color-orange))", color: "var(--color-dark)" },
  dark: { background: "var(--color-dark)", color: "var(--color-cream)" },
  secondary: {
    border: "1px solid rgba(17,17,17,.3)",
    color: "var(--color-dark)",
  },
  text: {
    fontFamily: "var(--font-mono)",
    fontSize: 11,
    letterSpacing: ".18em",
    textTransform: "uppercase",
    color: "var(--color-terracotta)",
    borderBottom: "1px solid rgba(192,97,59,.4)",
    paddingBottom: 6,
  },
};

type Size = "md" | "lg" | "hero" | "sidebar" | "compact";

const sizing: Record<Size, { padding: string; fontSize: number }> = {
  md: { padding: "18px 30px", fontSize: 16 },
  lg: { padding: "24px 28px", fontSize: 18 },
  hero: { padding: "20px 32px", fontSize: 17 },
  sidebar: { padding: "22px 26px", fontSize: 17 },
  compact: { padding: "18px 28px", fontSize: 16 },
};

export function ArrowButton({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  onDark = false,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  onDark?: boolean;
}) {
  const style: CSSProperties = { ...base[variant] };
  if (variant === "secondary" && onDark) {
    style.border = "1px solid rgba(245,240,232,.3)";
    style.color = "var(--color-cream)";
  }
  if (variant !== "text") {
    style.display = "inline-flex";
    style.alignItems = "center";
    style.justifyContent = "space-between";
    style.gap = 14;
    style.fontWeight = 600;
    style.padding = sizing[size].padding;
    style.fontSize = sizing[size].fontSize;
  }

  const variantClass = variant === "text" ? "" : `nn-btn-${variant}${onDark ? " nn-btn-ondark" : ""}`;

  return (
    <Link href={href} className={`nn-arrow ${variantClass} ${className}`} style={style}>
      {children} <span>→</span>
    </Link>
  );
}

export function EyebrowRule({
  label,
  color = "var(--color-gold)",
  ruleWidth = 34,
  ruleHeight = 2,
  textColor = "rgba(17,17,17,.55)",
  className = "",
}: {
  label: string;
  color?: string;
  ruleWidth?: number;
  ruleHeight?: number;
  textColor?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3.5 ${className}`} style={{ marginBottom: 28 }}>
      <span
        data-accent-rule
        style={{ width: ruleWidth, height: ruleHeight, background: color, display: "inline-block", flexShrink: 0 }}
      />
      <span
        className="font-mono uppercase"
        style={{ fontSize: 11, letterSpacing: ".22em", color: textColor }}
      >
        {label}
      </span>
    </div>
  );
}

export function SectionEyebrow({ children, color = "rgba(17,17,17,.45)" }: { children: React.ReactNode; color?: string }) {
  return (
    <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".2em", color }}>
      {children}
    </div>
  );
}

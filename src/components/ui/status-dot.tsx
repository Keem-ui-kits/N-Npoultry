export function StatusDot({ on = true, size = 7, delay }: { on?: boolean; size?: number; delay?: string }) {
  return (
    <span
      className={on ? "nn-status-dot" : ""}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: on ? "var(--color-status-on)" : "var(--color-status-off)",
        display: "inline-block",
        flexShrink: 0,
        animationDelay: on ? delay : undefined,
      }}
    />
  );
}

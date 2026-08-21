import type { CSSProperties, ReactNode } from "react";

export function Container({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={className}
      style={{
        maxWidth: "var(--container-site)",
        margin: "0 auto",
        padding: "0 clamp(20px, 4vw, 56px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

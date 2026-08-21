export function MetaTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div style={{ borderTop: "1px solid rgba(17,17,17,.16)" }}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex justify-between font-mono uppercase"
          style={{
            padding: "13px 0",
            gap: 24,
            borderBottom: "1px solid rgba(17,17,17,.16)",
            fontSize: 11,
            letterSpacing: ".14em",
          }}
        >
          <span style={{ color: "rgba(17,17,17,.5)" }}>{row.label}</span>
          <span className="text-right">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export function TagPills({ tags }: { tags: string[] }) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {tags.map((tag) => (
        <span
          key={tag}
          className="font-mono uppercase"
          style={{
            fontSize: 10,
            letterSpacing: ".16em",
            border: "1px solid rgba(17,17,17,.24)",
            padding: "8px 13px",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

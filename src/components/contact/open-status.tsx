export function OpenStatus({ open }: { open: boolean }) {
  return (
    <div className="col-span-12 md:col-span-3 md:col-start-10 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", color: "rgba(17,17,17,.55)", lineHeight: 2.1 }}>
      <div className="flex items-center gap-2.5">
        <span
          className={open ? "nn-status-dot" : ""}
          style={{ width: 7, height: 7, borderRadius: "50%", background: open ? "var(--color-status-on)" : "var(--color-orange)", display: "inline-block", flexShrink: 0 }}
        />
        {open ? "Open now" : "Closed — messages still reach us"}
      </div>
      <div style={{ borderTop: "1px solid rgba(17,17,17,.16)", marginTop: 10, paddingTop: 10 }}>
        Mon–Fri 8:00–17:00
        <br />
        Sat 8:00–12:00
        <br />
        Sun closed
      </div>
    </div>
  );
}

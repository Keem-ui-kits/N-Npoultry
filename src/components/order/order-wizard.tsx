"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { buildWhatsAppOrderLink, deliveryZones } from "@/lib/site-data";

type ProductKey = "Table Eggs" | "Poultry Manure" | "Ex-Layer Hens";

const PRODUCTS: Record<ProductKey, { unit: string; accent: string; img: string; caption: string }> = {
  "Table Eggs": { unit: "30pc trays", accent: "#eccc74", img: "/norm/table-eggs.png", caption: "30pc trays · collected daily" },
  "Poultry Manure": { unit: "70kg sacks", accent: "#7a9e7e", img: "/norm/manure-bags.png", caption: "70kg sacks · pickup or bulk" },
  "Ex-Layer Hens": { unit: "birds", accent: "#c0613b", img: "/norm/ex-layer-hen.png", caption: "Live birds · at the farm" },
};

const ZONES = [...deliveryZones, "Collecting at the farm", "Somewhere else"];

const QUICK_QTY = [1, 2, 5, 10, 30];

const PRESETS = ["Weekly standing order", "Need an invoice", "Saturday delivery"];

function unitWord(unit: string) {
  if (unit.includes("tray")) return "tray";
  if (unit.includes("sack")) return "sack";
  return "bird";
}

export function OrderWizard() {
  const [step, setStep] = useState(1);
  const [product, setProduct] = useState<ProductKey | null>(null);
  const [qty, setQty] = useState(2);
  const [zone, setZone] = useState<string | null>(null);
  const [landmark, setLandmark] = useState("");
  const [note, setNote] = useState("");
  const [hoverKey, setHoverKey] = useState<string | null>(null);

  const accent = product ? PRODUCTS[product].accent : "#eccc74";
  const unit = product ? PRODUCTS[product].unit : "30pc trays";

  const message = useMemo(() => {
    const lines = [
      "Hi N&N, I'd like to order:",
      `- ${product ?? "___"} x ${qty} ${unit}`,
      `- Delivery to: ${zone ?? "___"}${landmark ? ` (${landmark})` : ""}`,
    ];
    if (note.trim()) lines.push(`- Note: ${note.trim()}`);
    return lines.join("\n");
  }, [product, qty, unit, zone, landmark, note]);

  const canContinue = step === 1 ? !!product : step === 3 ? !!zone : true;

  const hint =
    step === 1 && !product
      ? "Choose a product to continue"
      : step === 3 && !zone
        ? "Choose an area to continue"
        : step === 5
          ? "Message ready — this opens WhatsApp"
          : "";

  const rail = [
    { n: "01", title: "Product", value: product ?? "Not chosen" },
    { n: "02", title: "Quantity", value: product ? `${qty} · ${unit}` : "—" },
    { n: "03", title: "Delivery", value: zone ?? "—" },
    { n: "04", title: "Note", value: note.trim() ? note.trim() : "Optional" },
    { n: "05", title: "Review", value: step === 5 ? "Ready" : "—" },
  ];

  return (
    <div className="grid grid-cols-12" style={{ gap: "clamp(32px, 5vw, 80px)", alignItems: "start" }}>
      {/* Left rail */}
      <div className="col-span-12 md:col-span-3" style={{ position: "sticky", top: 110 }}>
        {/* Mobile: collapses to a progress line + "step n of 5" */}
        <div className="md:hidden">
          <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".16em", color: "rgba(17,17,17,.5)", marginBottom: 12 }}>
            Order concierge · Step {step} of 5
          </div>
          <div style={{ height: 2, background: "rgba(17,17,17,.14)" }}>
            <div style={{ height: 2, width: `${step * 20}%`, background: accent, transition: "width .6s var(--ease-editorial), background .3s" }} />
          </div>
        </div>

        <div className="hidden md:block" style={{ borderTop: "1px solid rgba(17,17,17,.2)" }}>
        {rail.map((row, i) => {
          const n = i + 1;
          const reachable = n === 1 || !!product;
          return (
            <button
              key={row.n}
              type="button"
              onClick={() => reachable && setStep(n)}
              className="w-full text-left"
              style={{
                display: "block",
                padding: "20px 0",
                borderBottom: i < rail.length - 1 ? "1px solid rgba(17,17,17,.14)" : "1px solid rgba(17,17,17,.2)",
                background: "none",
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
                cursor: reachable ? "pointer" : "default",
                opacity: n <= step ? 1 : 0.45,
              }}
            >
              <span className="font-mono" style={{ fontSize: 11, letterSpacing: ".16em", color: "rgba(17,17,17,.4)" }}>{row.n}</span>
              <div style={{ fontSize: 19, fontWeight: 600, letterSpacing: "-.015em", color: step === n ? "var(--color-terracotta)" : "var(--color-dark)" }}>
                {row.title}
              </div>
              <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".12em", color: "rgba(17,17,17,.5)", marginTop: 2 }}>
                {row.value}
              </div>
            </button>
          );
        })}
        <div style={{ height: 2, background: "rgba(17,17,17,.14)", marginTop: 22 }}>
          <div style={{ height: 2, width: `${step * 20}%`, background: accent, transition: "width .6s var(--ease-editorial), background .3s" }} />
        </div>
        <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".16em", color: "rgba(17,17,17,.42)", marginTop: 10 }}>
          Step {step} of 5
        </div>
        </div>
      </div>

      {/* Right content */}
      <div className="col-span-12 md:col-span-8 md:col-start-5">
        <div key={step} className="nn-step-panel">
          {step === 1 && (
            <div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 700, letterSpacing: "-.03em" }}>
                What are you ordering?
              </h2>
              <p style={{ margin: "0 0 32px", fontSize: 17, lineHeight: 1.6, color: "rgba(17,17,17,.68)" }}>
                Pick one. You can add a second product in the note at step four.
              </p>
              <div className="flex flex-col gap-3">
                {(Object.keys(PRODUCTS) as ProductKey[]).map((p) => {
                  const selected = product === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProduct(p)}
                      onMouseEnter={() => setHoverKey(`product-${p}`)}
                      onMouseLeave={() => setHoverKey(null)}
                      className="grid items-center text-left"
                      style={{
                        gridTemplateColumns: "96px 1fr auto",
                        gap: 20,
                        border: selected
                          ? "1px solid var(--color-dark)"
                          : hoverKey === `product-${p}`
                            ? "1px solid rgba(17,17,17,.5)"
                            : "1px solid rgba(17,17,17,.24)",
                        background: selected ? `${PRODUCTS[p].accent}2e` : "transparent",
                        padding: "18px 22px",
                        cursor: "pointer",
                      }}
                    >
                      <span className="relative" style={{ width: 96, height: 72, background: PRODUCTS[p].accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Image src={PRODUCTS[p].img} alt={p} width={70} height={56} style={{ objectFit: "contain" }} />
                      </span>
                      <span>
                        <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "-.02em" }}>{p}</div>
                        <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".1em", color: "rgba(17,17,17,.55)", marginTop: 4 }}>
                          {PRODUCTS[p].caption}
                        </div>
                      </span>
                      <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".14em", color: selected ? "var(--color-dark)" : "rgba(17,17,17,.35)" }}>
                        {selected ? "Selected" : "Select"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 700, letterSpacing: "-.03em" }}>
                How many?
              </h2>
              <p style={{ margin: "0 0 32px", fontSize: 17, lineHeight: 1.6, color: "rgba(17,17,17,.68)" }}>
                Minimum is one {unitWord(unit)}. Larger volumes are priced on request.
              </p>
              <div className="flex items-center gap-6" style={{ marginBottom: 30 }}>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  onMouseEnter={() => setHoverKey("qty-minus")}
                  onMouseLeave={() => setHoverKey(null)}
                  className="font-mono"
                  style={{
                    width: 52,
                    height: 52,
                    border: hoverKey === "qty-minus" ? "1px solid #111111" : "1px solid rgba(17,17,17,.28)",
                    background: hoverKey === "qty-minus" ? "rgba(17,17,17,.07)" : "none",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <div className="text-center">
                  <div style={{ fontSize: "clamp(56px, 7vw, 92px)", fontWeight: 800, letterSpacing: "-.04em", lineHeight: 1 }}>{qty}</div>
                  <div className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".18em", marginTop: 8 }}>{unit}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  onMouseEnter={() => setHoverKey("qty-plus")}
                  onMouseLeave={() => setHoverKey(null)}
                  className="font-mono"
                  style={{
                    width: 52,
                    height: 52,
                    border: hoverKey === "qty-plus" ? "1px solid #111111" : "1px solid rgba(17,17,17,.28)",
                    background: hoverKey === "qty-plus" ? "rgba(17,17,17,.07)" : "none",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {QUICK_QTY.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQty(q)}
                    onMouseEnter={() => setHoverKey(`qty-quick-${q}`)}
                    onMouseLeave={() => setHoverKey(null)}
                    className="font-mono uppercase"
                    style={{
                      border:
                        qty === q
                          ? "1px solid var(--color-dark)"
                          : hoverKey === `qty-quick-${q}`
                            ? "1px solid rgba(17,17,17,.5)"
                            : "1px solid rgba(17,17,17,.28)",
                      padding: "9px 14px",
                      fontSize: 12,
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    {q === 30 ? "30 — wholesale" : q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 700, letterSpacing: "-.03em" }}>
                Where is it going?
              </h2>
              <p style={{ margin: "0 0 32px", fontSize: 17, lineHeight: 1.6, color: "rgba(17,17,17,.68)" }}>
                We run a morning route Monday to Saturday. Saturday slots fill early in the week.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ marginBottom: 28 }}>
                {ZONES.map((z) => (
                  <button
                    key={z}
                    type="button"
                    onClick={() => setZone(z)}
                    onMouseEnter={() => setHoverKey(`zone-${z}`)}
                    onMouseLeave={() => setHoverKey(null)}
                    style={{
                      border:
                        zone === z
                          ? "1px solid var(--color-dark)"
                          : hoverKey === `zone-${z}`
                            ? "1px solid rgba(17,17,17,.5)"
                            : "1px solid rgba(17,17,17,.24)",
                      background: zone === z ? "rgba(17,17,17,.08)" : "transparent",
                      padding: "20px 18px",
                      fontSize: 17,
                      fontWeight: 500,
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    {z}
                  </button>
                ))}
              </div>
              <label className="block" style={{ maxWidth: 520 }}>
                <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".18em", color: "rgba(17,17,17,.5)" }}>
                  Street or landmark — optional
                </span>
                <input
                  className="nn-input"
                  type="text"
                  placeholder="Near Katoloni market"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  style={{ width: "100%", marginTop: 10, padding: "12px 0", fontSize: 18 }}
                />
              </label>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 700, letterSpacing: "-.03em" }}>
                Anything we should know?
              </h2>
              <p style={{ margin: "0 0 32px", fontSize: 17, lineHeight: 1.6, color: "rgba(17,17,17,.68)" }}>
                A preferred day, a second product, an invoice name. Skip it if there is nothing.
              </p>
              <textarea
                className="nn-input"
                rows={3}
                placeholder="Deliver Thursday morning if possible. Invoice to the restaurant."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{ width: "100%", maxWidth: 640, padding: "12px 0", fontSize: 18, display: "block", marginBottom: 24 }}
              />
              <div className="flex flex-wrap gap-2.5">
                {PRESETS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setNote((n) => (n.trim() ? `${n.trim()} ${p}.` : `${p}.`))}
                    onMouseEnter={() => setHoverKey(`preset-${p}`)}
                    onMouseLeave={() => setHoverKey(null)}
                    className="font-mono uppercase"
                    style={{
                      border: hoverKey === `preset-${p}` ? "1px solid rgba(17,17,17,.5)" : "1px solid rgba(17,17,17,.28)",
                      padding: "9px 14px",
                      fontSize: 11,
                      background: "none",
                      cursor: "pointer",
                    }}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 style={{ margin: "0 0 12px", fontSize: "clamp(28px, 3.4vw, 44px)", fontWeight: 700, letterSpacing: "-.03em" }}>
                Ready to send.
              </h2>
              <p style={{ margin: "0 0 32px", fontSize: 17, lineHeight: 1.6, color: "rgba(17,17,17,.68)" }}>
                This is the message that opens in WhatsApp. Edit anything by tapping a step on the left.
              </p>
              <div className="grid md:grid-cols-2" style={{ gap: "clamp(20px, 3vw, 40px)" }}>
                <div style={{ borderTop: "1px solid rgba(17,17,17,.14)" }}>
                  {[
                    ["Product", product ?? "—"],
                    ["Quantity", product ? `${qty} · ${unit}` : "—"],
                    ["Delivery", zone ?? "—"],
                    ["Note", note.trim() || "None"],
                    ["Price", "Confirmed on reply"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between font-mono uppercase" style={{ borderBottom: "1px solid rgba(17,17,17,.14)", padding: "13px 0", fontSize: 11, letterSpacing: ".14em" }}>
                      <span style={{ color: "rgba(17,17,17,.5)" }}>{label}</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "var(--color-dark)", padding: "26px 24px" }}>
                  <div className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".2em", color: "var(--color-gold)", marginBottom: 14 }}>
                    Message preview
                  </div>
                  <pre className="font-mono" style={{ fontSize: 13, lineHeight: 1.9, color: "rgba(245,240,232,.85)", whiteSpace: "pre-wrap", margin: 0 }}>
                    {message}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom nav */}
        <div className="flex items-center flex-wrap gap-4" style={{ borderTop: "1px solid rgba(17,17,17,.2)", marginTop: "clamp(40px, 5vw, 64px)", paddingTop: 30 }}>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="nn-arrow"
              style={{ border: "1px solid rgba(17,17,17,.3)", padding: "14px 24px", fontSize: 15, fontWeight: 600, background: "none", cursor: "pointer" }}
            >
              ← Back
            </button>
          )}
          {step < 5 && (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="nn-arrow"
              style={{
                background: "var(--color-dark)",
                color: "var(--color-cream)",
                padding: "14px 24px",
                fontSize: 15,
                fontWeight: 600,
                border: 0,
                cursor: canContinue ? "pointer" : "default",
                opacity: canContinue ? 1 : 0.35,
                pointerEvents: canContinue ? "auto" : "none",
              }}
            >
              Continue <span>→</span>
            </button>
          )}
          {step === 5 && (
            <a
              href={buildWhatsAppOrderLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="nn-arrow"
              style={{ backgroundImage: "linear-gradient(to right, var(--color-gold), var(--color-orange))", color: "var(--color-dark)", padding: "14px 24px", fontSize: 15, fontWeight: 600 }}
            >
              Continue on WhatsApp <span>→</span>
            </a>
          )}
          <span className="font-mono uppercase" style={{ fontSize: 10, letterSpacing: ".16em", color: "rgba(17,17,17,.42)" }}>
            {hint}
          </span>
        </div>
      </div>
    </div>
  );
}

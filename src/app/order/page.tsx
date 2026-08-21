import type { Metadata } from "next";
import { OrderWizard } from "@/components/order/order-wizard";

export const metadata: Metadata = {
  title: "Order",
  description:
    "Five questions, then WhatsApp — build your N&N Poultry Palace order and send it straight to the farm.",
};

export default function OrderPage() {
  return (
    <>
      <section style={{ background: "var(--color-cream)", padding: "clamp(44px, 6vw, 90px) clamp(20px, 4vw, 56px) clamp(32px, 4vw, 56px)" }}>
        <div className="grid grid-cols-12 gap-8 items-end" style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-3.5" style={{ marginBottom: 24 }}>
              <span style={{ width: 44, height: 1, background: "var(--color-terracotta)", display: "inline-block" }} />
              <span className="font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".24em", color: "rgba(17,17,17,.55)" }}>
                Order concierge
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: "clamp(38px, 5.6vw, 84px)", fontWeight: 800, lineHeight: 0.9, letterSpacing: "-.038em" }}>
              Five questions,
              <br />
              then WhatsApp.
            </h1>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-9">
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.65, color: "rgba(17,17,17,.68)" }}>
              We build the message for you so nothing gets missed. Nothing is sent until you press the last button.
            </p>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--color-cream)", padding: "0 clamp(20px, 4vw, 56px) clamp(80px, 10vw, 140px)" }}>
        <div style={{ maxWidth: "var(--container-site)", margin: "0 auto" }}>
          <OrderWizard />
        </div>
      </section>
    </>
  );
}

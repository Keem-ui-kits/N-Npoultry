"use client";

import { StatusDot } from "@/components/ui/status-dot";
import { useNairobiTime } from "@/components/ui/use-nairobi-time";

export function ProductsHeroStatus() {
  const time = useNairobiTime();
  return (
    <div className="col-span-12 md:col-span-3 md:col-start-10 font-mono uppercase" style={{ fontSize: 11, letterSpacing: ".14em", color: "rgba(17,17,17,.55)", lineHeight: 1.9 }}>
      <div className="flex items-center" style={{ gap: 9, marginBottom: 14 }}>
        <StatusDot />
        All three available today
      </div>
      <div style={{ borderTop: "1px solid rgba(17,17,17,.16)", paddingTop: 12 }}>
        {time ? `Updated ${time} EAT` : " "}
        <br />
        Machakos, Kenya
      </div>
    </div>
  );
}

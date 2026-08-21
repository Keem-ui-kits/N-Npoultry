export const business = {
  name: "N&N Poultry Palace",
  tagline: "Fresh and Nutritious — your trusted source for farm-fresh eggs in Machakos.",
  vision: "To be East Africa's leading provider of sustainable quality poultry products.",
  mission:
    "Driving progress in the poultry industry while uplifting the economies that sustain it.",
  freshnessPromise: "Collected at 2 PM. Packed by 5 PM. On your doorstep before noon.",
  phones: ["0113377623", "0714246534"],
  phonesFormatted: ["0113 377 623", "0714 246 534"],
  whatsapp: "254113377623",
  whatsappFormatted: "+254 113 377 623",
  email: "palacepoultryn.n@gmail.com",
  address: "Machakos, Kenya",
  hours: {
    weekday: { days: "Mon–Fri", open: 8, close: 17, label: "8:00 AM–5:00 PM" },
    saturday: { days: "Sat", open: 8, close: 12, label: "8:00 AM–12:00 PM" },
  },
} as const;

export const deliveryZones = [
  "Machakos Town",
  "Syokimau",
  "Athi River",
  "Mlolongo",
  "Katoloni",
  "Mwala",
] as const;

export const colors = {
  dark: "#111111",
  darkDeep: "#000000",
  cream: "#f5f0e8",
  gold: "#eccc74",
  orange: "#f59268",
  soil: "#8b5e3c",
  sage: "#7a9e7e",
  terracotta: "#c0613b",
  straw: "#d4a847",
  statusOn: "#4ade80",
  statusOff: "#ef4444",
} as const;

export type ProductSlug = "table-eggs" | "poultry-manure" | "ex-layer-hens";

export const products: Record<
  ProductSlug,
  {
    slug: ProductSlug;
    name: string;
    shortName: string;
    accent: string;
    accentName: "gold" | "sage" | "terracotta";
    unit: string;
    minimum: string;
  }
> = {
  "table-eggs": {
    slug: "table-eggs",
    name: "Table Eggs",
    shortName: "Table Eggs",
    accent: colors.gold,
    accentName: "gold",
    unit: "30pc tray",
    minimum: "1 tray",
  },
  "poultry-manure": {
    slug: "poultry-manure",
    name: "Poultry Manure",
    shortName: "Manure",
    accent: colors.sage,
    accentName: "sage",
    unit: "70kg sack",
    minimum: "1 sack",
  },
  "ex-layer-hens": {
    slug: "ex-layer-hens",
    name: "Ex-Layer Hens",
    shortName: "Ex-Layer Hens",
    accent: colors.terracotta,
    accentName: "terracotta",
    unit: "bird",
    minimum: "1 bird",
  },
};

export function buildWhatsAppOrderLink(message: string) {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Open/closed status computed in Africa/Nairobi time regardless of server locale. */
export function isOpenNowNairobi(date: Date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Nairobi",
    weekday: "short",
    hour: "numeric",
    hour12: false,
  }).formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  if (weekday === "Sat") return hour >= 8 && hour < 12;
  if (weekday !== "Sun") return hour >= 8 && hour < 17;
  return false;
}

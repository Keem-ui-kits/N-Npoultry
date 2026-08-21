export type ProductDetail = {
  slug: "table-eggs" | "poultry-manure" | "ex-layer-hens";
  accent: string;
  number: string;
  breadcrumb: string;
  h1: [string, string];
  subhead: string;
  metaRows: { label: string; value: string }[];
  availability: string;
  heroCtaPrimary: string;
  heroCtaSecondary: string;
  gallery: { src: string; alt: string; isCutout?: boolean }[];
  whatItIs: { h2: string; paragraphs: [string, string] };
  why: {
    label: string;
    h2: string;
    background: string;
    rows: { number: string; title: string; body: string; isQuote: boolean; attribution?: string }[];
  };
  maskBanner: { image: string; alt: string; eyebrow: string; body: string };
  process: { h2: string; stepNumberColor: string; steps: { title: string; body: string }[] };
  details: { heading: string; bullets: string[] };
  whoItsFor: { title: string; subtitle: string; bg: string; textOverride?: boolean }[];
  faq: { q: string; a: string }[];
  order: { h2: [string, string]; body: string };
  crossSell: { image: string; alt: string; tick: string; label: string; title: string };
};

export const productsData: Record<ProductDetail["slug"], ProductDetail> = {
  "table-eggs": {
    slug: "table-eggs",
    accent: "#eccc74",
    number: "01",
    breadcrumb: "Table Eggs",
    h1: ["Table", "Eggs"],
    subhead:
      "Collected from the farm, delivered the same day. Sold by the thirty-piece tray — ideal for home cooks and food businesses alike.",
    metaRows: [
      { label: "Format", value: "30pc tray · bulk case" },
      { label: "Collection", value: "Daily, from 2 PM" },
      { label: "Grade", value: "Mixed — large & medium" },
      { label: "Best for", value: "Households · Bakeries · Kiosks" },
      { label: "Farm to door", value: "24–48 hours" },
    ],
    availability: "Available — next dispatch tomorrow, 08:00",
    heroCtaPrimary: "Order Table Eggs",
    heroCtaSecondary: "Ask about bulk",
    gallery: [
      { src: "/eggs.jpeg", alt: "Trays of eggs" },
      { src: "/assets/education/grading-of-eggs.jpeg", alt: "Grading and stacking trays" },
      { src: "/norm/egg.png", alt: "A single egg", isCutout: true },
    ],
    whatItIs: {
      h2: "Our most-asked-for product, and the reason most people find us.",
      paragraphs: [
        "Collected daily from our layer hens, each egg goes through inspection for shell integrity and size consistency. We hold a high-frequency delivery schedule so a tray reaches you within 24 to 48 hours of laying.",
        "Trays are mixed grade — large and medium together — which is what most kitchens actually want. Yesterday's collection is sold in the local market the same day rather than held over.",
      ],
    },
    why: {
      label: "Why customers stay",
      h2: "Three reasons, in their words.",
      background: "#f5f0e8",
      rows: [
        {
          number: "01",
          title: "Freshness you can see in the yolk",
          body: "I've been buying from N&N for over eight months and the eggs are consistently fresh. The yolks are bright and rich — you can really taste the difference.",
          isQuote: true,
          attribution: "Wanjiru M. · Syokimau · Household",
        },
        {
          number: "02",
          title: "No rejected batches",
          body: "We switched our restaurant supply to N&N six months ago. Wholesale pricing is fair, invoicing is professional, and I have never had a rejected batch.",
          isQuote: true,
          attribution: "Chef Kamau J. · Machakos Town · Restaurant",
        },
        {
          number: "03",
          title: "Ordering takes one message",
          body: "WhatsApp ordering is super convenient, and they even remind me before I run low. This is the kind of supplier every small business needs.",
          isQuote: true,
          attribution: "Amina S. · Athi River · Breakfast kiosk",
        },
      ],
    },
    maskBanner: {
      image: "/assets/education/layer-hens.jpeg",
      alt: "The layer house",
      eyebrow: "Where the tray starts",
      body: "High-calcium layer mash, a managed lighting schedule, and three collections a day at peak production.",
    },
    process: {
      h2: "From nest box to your door.",
      stepNumberColor: "#d4a847",
      steps: [
        { title: "Care", body: "Morning walk-through, ventilation checked, water intake logged." },
        { title: "Collect", body: "Three times daily at peak — frequency is what keeps shells intact." },
        { title: "Grade", body: "Two until four. Cracks, size and shell quality checked by hand." },
        { title: "Pack", body: "Sealed into 30pc trays by five, marked with the collection day." },
        { title: "Deliver", body: "On the morning route, Mon–Sat, across six zones of the county." },
      ],
    },
    details: {
      heading: "What's in the tray",
      bullets: [
        "Daily collection for maximum freshness",
        "Sizes: mixed grade, large and medium",
        "Hygienically handled and packed",
        "Available in 30pc egg trays",
        "Bulk cases for commercial buyers",
      ],
    },
    whoItsFor: [
      { title: "Households", subtitle: "One tray, on the morning route", bg: "#eccc74" },
      { title: "Bakeries & restaurants", subtitle: "Standing orders, bulk cases", bg: "rgba(236,204,116,.45)" },
      { title: "Kiosks & resellers", subtitle: "Reminders before you run low", bg: "rgba(236,204,116,.22)" },
    ],
    faq: [
      { q: "Do you deliver on weekends?", a: "We deliver Monday to Saturday. Saturday slots fill quickly — message early in the week to hold one." },
      { q: "What if an egg breaks in transit?", a: "At the time of delivery, any breakage is replaced. The standard is ours to hold, not yours to absorb." },
      { q: "Can I order less than a tray?", a: "Our minimum is one 30pc tray. For smaller quantities, ask us — we may have loose stock on the day." },
      { q: "Which areas do you deliver to?", a: "Machakos Town, Syokimau, Athi River, Mlolongo, Katoloni and Mwala, daily. If you are nearby, ask — we may be able to arrange it." },
    ],
    order: {
      h2: ["One tray or twenty.", "Same care."],
      body: "Tell us the quantity and where you are. We confirm the price and the next slot, usually within minutes.",
    },
    crossSell: { image: "/eggs.jpeg", alt: "Table eggs", tick: "#eccc74", label: "01 / Table Eggs", title: "Fresh eggs, collected daily" },
  },

  "poultry-manure": {
    slug: "poultry-manure",
    accent: "#7a9e7e",
    number: "02",
    breadcrumb: "Poultry Manure",
    h1: ["Poultry", "Manure"],
    subhead:
      "Bagged organic fertilizer, nutrient-rich for gardens, farms and commercial agriculture. Available in bulk sacks for large-scale operations.",
    metaRows: [
      { label: "Format", value: "70kg sack · FH truck" },
      { label: "Composition", value: "Nitrogen · Phosphorus · Potassium" },
      { label: "Treatment", value: "Naturally sun-dried, nothing added" },
      { label: "Coverage", value: "≈50–80 m² per sack" },
      { label: "Collection", value: "Pickup or bulk delivery" },
    ],
    availability: "Available — sacks ready at the farm",
    heroCtaPrimary: "Order Manure",
    heroCtaSecondary: "Ask about truck loads",
    gallery: [
      { src: "/manure-hips.jpeg", alt: "Manure heaps" },
      { src: "/assets/education/poultry-manure.png", alt: "Manure applied to soil" },
      { src: "/norm/manure-bags.png", alt: "70kg sacks", isCutout: true },
    ],
    whatItIs: {
      h2: "A circular farm. What leaves the barn feeds the soil.",
      paragraphs: [
        "Our organic poultry manure is a potent source of nitrogen, phosphorus and potassium — the nutrients that drive healthy plant growth and soil restoration. Unlike synthetic fertilizer it also adds organic matter, which improves water retention and feeds the microorganisms already in the ground.",
        "It comes out of our barns and goes into the sacks. Nothing added, nothing chemically treated, dried in the Machakos sun until it is ready.",
      ],
    },
    why: {
      label: "Why customers stay",
      h2: "Soil health, not just a yield bump.",
      background: "rgba(122,158,126,.1)",
      rows: [
        {
          number: "01",
          title: "Visible results in one season",
          body: "I started using their poultry manure for my kitchen garden last season and the results are incredible. It's rich, well-composted, and significantly improved my soil health.",
          isQuote: true,
          attribution: "Sarah L. · Katoloni · Kitchen garden",
        },
        {
          number: "02",
          title: "Ready to apply on arrival",
          body: "No curing period, no mixing, no waiting. The manure is naturally dried before bagging, so it can go straight into soil as a base dressing or a top dressing.",
          isQuote: false,
        },
        {
          number: "03",
          title: "A smaller chemical footprint",
          body: "For growers moving away from synthetic inputs, this is a direct substitution that improves soil structure at the same time as it feeds the crop.",
          isQuote: false,
        },
      ],
    },
    maskBanner: {
      image: "/assets/education/poultry-manure.png",
      alt: "Manure worked into soil",
      eyebrow: "Farmer's tip",
      body: "Mix into the soil a week before planting, not the same day. Give the microbes time to activate it — you will see the difference in early growth.",
    },
    process: {
      h2: "From barn floor to sack.",
      stepNumberColor: "#7a9e7e",
      steps: [
        { title: "Clear", body: "Barns cleared on a cycle that keeps the houses clean and dry for the birds." },
        { title: "Heap", body: "Laid out in the open to dry naturally rather than treated or accelerated." },
        { title: "Dry", body: "The sun concentrates the nutrients and clears most pathogens. The smell tells you when it is ready." },
        { title: "Bag", body: "Filled into 70kg sacks, or loaded loose for FH truck orders." },
        { title: "Move", body: "Collected at the farm, or delivered in bulk by arrangement." },
      ],
    },
    details: {
      heading: "What's in the sack",
      bullets: [
        "Highly concentrated nutrient content",
        "Fully organic and sustainable",
        "Suitable for all crop types and soils",
        "Rich in nitrogen & phosphorus",
        "Available for pickup or bulk delivery",
      ],
    },
    whoItsFor: [
      { title: "Kitchen gardeners", subtitle: "One sack covers 50–80 m²", bg: "#7a9e7e" },
      { title: "Commercial farmers", subtitle: "FH truck loads by arrangement", bg: "rgba(122,158,126,.5)" },
      { title: "Smallholder farms", subtitle: "Collect from the farm", bg: "rgba(122,158,126,.24)" },
    ],
    faq: [
      { q: "Is it ready to use straight away?", a: "Yes — our manure is naturally dried and can be applied directly to soil." },
      { q: "Can I get less than 70kg?", a: "The standard sack is 70kg. Contact us for arrangements on smaller quantities." },
      { q: "How do I apply it to my garden?", a: "Mix into soil before planting or apply as a top dressing. One sack covers roughly 50–80 square metres." },
    ],
    order: {
      h2: ["A sack, or a", "truck load."],
      body: "Tell us the volume and whether you are collecting or need delivery, and we will price it and set a day.",
    },
    crossSell: { image: "/manure-hips.jpeg", alt: "Poultry manure", tick: "#7a9e7e", label: "02 / Poultry Manure", title: "What the barn gives the soil" },
  },

  "ex-layer-hens": {
    slug: "ex-layer-hens",
    accent: "#c0613b",
    number: "03",
    breadcrumb: "Ex-Layer Hens",
    h1: ["Ex-Layer", "Hens"],
    subhead:
      "Healthy hens sold at the end of their laying cycle — suitable for meat use or re-homing. Raised with care, fed well, housed clean.",
    metaRows: [
      { label: "Format", value: "Live bird · bulk lots" },
      { label: "Age", value: "72–80 weeks" },
      { label: "Health", value: "Full vaccination programme" },
      { label: "Best for", value: "Caterers · Bulk buyers · Traditional cooking" },
      { label: "Collection", value: "At the farm, Machakos" },
    ],
    availability: "Available — current batch at end of cycle",
    heroCtaPrimary: "Enquire on Hens",
    heroCtaSecondary: "Ask about bulk lots",
    gallery: [
      { src: "/layers.jpeg", alt: "Layer hens" },
      { src: "/assets/education/grown-chicks-hens.jpeg", alt: "Grown hens in the house" },
      { src: "/norm/ex-layer-hen.png", alt: "An ex-layer hen", isCutout: true },
    ],
    whatItIs: {
      h2: "Birds that have done their work, offered honestly.",
      paragraphs: [
        "Our ex-layer hens are offered at the end of their peak laying cycle. They are healthy, well-fed, and have been under regular veterinary supervision throughout their time on the farm.",
        "The meat is firmer than a broiler's — which is exactly why it is favoured for slow-cooked traditional dishes and soup bases. An affordable, high-quality source of lean poultry meat.",
      ],
    },
    why: {
      label: "Why buyers choose them",
      h2: "Known history, known health.",
      background: "rgba(192,97,59,.08)",
      rows: [
        {
          number: "01",
          title: "You know where the bird has been",
          body: "Every hen we sell was raised here from the brooder. Vaccination schedule, feed programme and veterinary oversight are all part of our own records — not a middleman's word.",
          isQuote: false,
        },
        {
          number: "02",
          title: "Right for the pot it's going in",
          body: "Tougher meat is a feature for slow cooking. Caterers and households cooking traditional dishes ask for these specifically, and they hold up to long braising in a way young birds do not.",
          isQuote: false,
        },
        {
          number: "03",
          title: "Nothing on the farm is wasted",
          body: "The flock produces eggs, the barn produces manure, and at the end of the cycle the birds themselves find a use. That is the whole reason a small farm can run sustainably.",
          isQuote: false,
        },
      ],
    },
    maskBanner: {
      image: "/assets/education/pullets.jpeg",
      alt: "Birds gathered around a drinker in the grower house",
      eyebrow: "A full cycle",
      body: "Day-old chick to end of lay is around eighty weeks. Every one of those weeks is logged in a notebook in the farm office.",
    },
    process: {
      h2: "Eighty weeks of care.",
      stepNumberColor: "#c0613b",
      steps: [
        { title: "Brood", body: "Arrive as day-olds, brooder at 32–35°C, electrolyte water from hour one." },
        { title: "Grow", body: "Grower feed, steady weight gain, sample-weighed twice a week." },
        { title: "Vaccinate", body: "A full programme under veterinary supervision, recorded per batch." },
        { title: "Lay", body: "From week 18 to around week 80, on high-calcium layer mash." },
        { title: "Retire", body: "Offered live at the farm for meat use or re-homing." },
      ],
    },
    details: {
      heading: "What you're buying",
      bullets: [
        "Regularly vaccinated and vet-inspected",
        "Raised on premium, balanced feed",
        "Tougher meat ideal for slow-cooked dishes",
        "Available for live purchase at the farm",
        "Bulk lots available for businesses",
      ],
    },
    whoItsFor: [
      { title: "Restaurants & caterers", subtitle: "Bulk lots, arranged ahead", bg: "#c0613b", textOverride: true },
      { title: "Bulk buyers", subtitle: "Speak to us about logistics", bg: "rgba(192,97,59,.45)" },
      { title: "Traditional cooking", subtitle: "Collect at the farm", bg: "rgba(192,97,59,.2)" },
    ],
    faq: [
      { q: "What age are the hens?", a: "Typically 72–80 weeks — the end of their laying cycle, and in good health." },
      { q: "Do you deliver live hens?", a: "We primarily sell at the farm. Speak to us about bulk delivery logistics." },
      { q: "Are they vaccinated?", a: "Yes — all our birds go through a full vaccination programme under veterinary supervision." },
    ],
    order: {
      h2: ["Tell us how many,", "and when."],
      body: "Batches come to the end of lay on a schedule, so bulk lots are worth arranging ahead of time.",
    },
    crossSell: { image: "/layers.jpeg", alt: "Ex-layer hens", tick: "#c0613b", label: "03 / Ex-Layer Hens", title: "The end of a good cycle" },
  },
};

export const productSlugs = Object.keys(productsData) as ProductDetail["slug"][];

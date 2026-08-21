export type ArticleCategory = "The Chick Journey" | "Growth & Care" | "Product Excellence";

export type ArticleBody =
  | { type: "p"; text: string; lede?: boolean }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; attribution: string };

export type Article = {
  slug: string;
  fieldNote: string;
  category: ArticleCategory;
  title: string;
  excerpt?: string;
  image: string;
  alt: string;
  aspect: string;
  span: string;
  /** Only populated for articles with a full write-up (currently just field note 01). */
  full?: {
    readTime: string;
    dek: string;
    heroAlt: string;
    heroCaption: string;
    factRail: { label: string; value: string }[];
    body: ArticleBody[];
    farmerTip: string;
    stats: { number: string; label: string }[];
    productCrossSell: { slug: "table-eggs" | "poultry-manure" | "ex-layer-hens"; body: string };
  };
};

export const articles: Article[] = [
  {
    slug: "welcoming-one-day-old-chicks",
    fieldNote: "Field note 01",
    category: "The Chick Journey",
    title: "Welcoming One-Day-Old Chicks",
    excerpt:
      "The critical first twenty-four hours of a chick's life on the farm — heaters on before seven, water lines flushed, and a backup heat source on hand.",
    image: "/assets/education/one-day-old-chicks.jpeg",
    alt: "Day-old chicks in the brooding house",
    aspect: "21/9",
    span: "featured",
    full: {
      readTime: "6 min read",
      dek: "The critical first twenty-four hours of a chick's life on the farm — and why those few hours set the tone for everything that follows.",
      heroAlt: "Day-old chicks under the brooder",
      heroCaption: "Brooding house, arrival morning — heaters on, water lines flushed, lighting kept bright",
      factRail: [
        { label: "Brooder temp", value: "32–35°C" },
        { label: "Arrival window", value: "Before 07:00" },
        { label: "Hatchery", value: "Nairobi" },
        { label: "Critical period", value: "First 24 hrs" },
      ],
      body: [
        {
          type: "p",
          lede: true,
          text: "The journey of our high-quality table eggs begins with healthy, vigorous one-day-old chicks. When they arrive at our farm, the first twenty-four hours are critical for their long-term health and productivity.",
        },
        {
          type: "p",
          text: "We receive our day-old chicks from a trusted hatchery in Nairobi. The moment they arrive — usually before seven in the morning — we're already in the brooding house: heaters on, water lines flushed and ready. Those first few hours set the tone for everything.",
        },
        { type: "h2", text: "A chick cannot keep itself warm" },
        {
          type: "p",
          text: "We prepare specialised brooding houses with precise temperature control, around 32 to 35 degrees, because young chicks cannot yet regulate their own body temperature. Lighting is kept deliberately bright so they can locate water and feed without hunting for it.",
        },
        {
          type: "p",
          text: "Immediate access to clean, electrolyte-infused water and high-quality starter feed lets them recover from transport stress and begin healthy growth straight away. A chick that drinks in the first hour is a chick that eats in the second.",
        },
        {
          type: "quote",
          text: "One power cut on a cold Machakos night is all it takes to lose an entire batch.",
          attribution: "The Kyalos · Founders",
        },
        { type: "h2", text: "What we do differently" },
        {
          type: "p",
          text: "From experience, we always keep a backup heat source on hand for the first week. It is the least glamorous item on the farm and the one we would replace first. Reliability at this stage is not about equipment quality — it is about having a second option when the first one fails at two in the morning.",
        },
        {
          type: "p",
          text: "Everything after this point compounds. Uniform, well-started chicks become uniform pullets, and uniform pullets become a flock that reaches peak production together rather than in a long, uneven tail.",
        },
      ],
      farmerTip: "Keep a backup heat source for the first week. A single power cut on a cold night is all it takes.",
      stats: [
        { number: "32–35°", label: "Brooder temperature, week one" },
        { number: "20–22%", label: "Protein in starter crumble" },
        { number: "17 wks", label: "First light stimulation" },
      ],
      productCrossSell: {
        slug: "table-eggs",
        body: "Every tray starts with a chick that drank in its first hour. Sold by the thirty-piece tray, collected daily.",
      },
    },
  },
  {
    slug: "the-science-of-chick-feeding",
    fieldNote: "Field note 02",
    category: "The Chick Journey",
    title: "The Science of Chick Feeding",
    excerpt: "Building a strong skeletal and immune system through nutrition — and why we weigh a random sample twice a week.",
    image: "/assets/education/chicks-feeding.jpeg",
    alt: "Chicks feeding",
    aspect: "16/9",
    span: "md:col-span-7",
    full: {
      readTime: "4 min read",
      dek: "Building a strong skeletal and immune system through nutrition — and why we weigh a random sample twice a week.",
      heroAlt: "Chicks feeding on starter crumble",
      heroCaption: "Starter line, week two — crumble fortified with calcium and phosphorus for skeletal development",
      factRail: [
        { label: "Starter protein", value: "20–22%" },
        { label: "Sampling", value: "Twice weekly" },
        { label: "Phase", value: "Weeks 1–3" },
        { label: "Feed check", value: "Daily consumption" },
      ],
      body: [
        {
          type: "p",
          lede: true,
          text: "Nutrition in the early weeks is the foundation of a productive layer hen. Our chicks are fed a specially formulated starter crumble, rich in protein — around twenty to twenty-two percent — and fortified with essential vitamins and minerals.",
        },
        {
          type: "p",
          text: "We buy our starter crumble from a supplier whose composition we've verified ourselves, not just taken the bag's word for it. We've tried cheaper alternatives before and seen the difference in shell quality six months later.",
        },
        { type: "h2", text: "Calcium and phosphorus, watched closely" },
        {
          type: "p",
          text: "Calcium and phosphorus ratios are carefully monitored to promote strong skeletal development — vital for birds that will eventually produce strong-shelled eggs. Our feeding lines are designed for easy access, and we monitor consumption daily.",
        },
        {
          type: "quote",
          text: "If they're running light by week three, we know something is off with the feed or water intake — not the birds.",
          attribution: "The Kyalos · Founders",
        },
        {
          type: "p",
          text: "We weigh a random sample of birds twice a week during the starter phase. Consistent, proper feeding during this window directly correlates to the flock's uniformity and its future peak egg production.",
        },
      ],
      farmerTip: "We weigh a random sample of birds twice a week during the starter phase. If they're running light by week three, we know something is off with the feed or water intake — not the birds.",
      stats: [
        { number: "20–22%", label: "Protein in starter crumble" },
        { number: "2×", label: "Weighed sampling, weekly" },
        { number: "Wk 3", label: "First check against target weight" },
      ],
      productCrossSell: {
        slug: "table-eggs",
        body: "Strong shells start with starter feed. Every tray traces back to a chick that hit its weight targets. Sold by the thirty-piece tray, collected daily.",
      },
    },
  },
  {
    slug: "from-pullet-to-layer-hen",
    fieldNote: "Field note 03",
    category: "Growth & Care",
    title: "From Pullet to Layer Hen",
    excerpt: "The transition handled over a week, not overnight — and why first light stimulation waits until exactly seventeen weeks.",
    image: "/assets/education/pullets.jpeg",
    alt: "Pullets in the grower house",
    aspect: "4/5",
    span: "md:col-span-5",
    full: {
      readTime: "4 min read",
      dek: "The transition handled over a week, not overnight — and why first light stimulation waits until exactly seventeen weeks.",
      heroAlt: "Pullets in the grower house",
      heroCaption: "Grower house, week sixteen — ambient temperatures, grower feed, full vaccination schedule",
      factRail: [
        { label: "Move window", value: "Over 1 week" },
        { label: "Light stimulation", value: "Exactly 17 wks" },
        { label: "Transfer age", value: "16–18 wks" },
        { label: "Oversight", value: "Full vet schedule" },
      ],
      body: [
        {
          type: "p",
          lede: true,
          text: "As chicks grow into pullets, their nutritional and environmental needs change. Temperature is gradually reduced to ambient levels, and they move onto a grower feed that supports steady, healthy growth without premature fattening.",
        },
        {
          type: "p",
          text: "The transition from grower to layer house is something we handle over a week, not overnight. We move small groups at a time so the birds settle without stress — rushed transitions show up in the production numbers, and you feel it immediately.",
        },
        { type: "h2", text: "Why seventeen weeks, not sooner" },
        {
          type: "p",
          text: "This period involves strict veterinary oversight, including a full vaccination schedule to protect against common poultry diseases. We treat preventative care as the most ethical and sustainable approach to farming.",
        },
        {
          type: "quote",
          text: "Too early and you trigger premature laying in birds whose bodies aren't ready, which hurts shell quality for the whole cycle.",
          attribution: "The Kyalos · Founders",
        },
        {
          type: "p",
          text: "By sixteen to eighteen weeks, they're ready to transfer to the layer house, fully equipped to begin their productive cycle.",
        },
      ],
      farmerTip: "We always do our first light stimulation at exactly 17 weeks — not before. Too early and you trigger premature laying in birds whose bodies aren't ready, which hurts shell quality for the whole cycle.",
      stats: [
        { number: "17 wks", label: "First light stimulation" },
        { number: "16–18 wks", label: "Transfer to layer house" },
        { number: "1 wk", label: "Move handled in stages" },
      ],
      productCrossSell: {
        slug: "table-eggs",
        body: "A pullet moved on our schedule becomes a hen that lays on schedule. Sold by the thirty-piece tray, collected daily.",
      },
    },
  },
  {
    slug: "flock-care-and-daily-operations",
    fieldNote: "Field note 04",
    category: "Growth & Care",
    title: "Flock Care and Daily Operations",
    excerpt: "Daily routines to ensure animal welfare and optimal farm conditions — and why the first walk of the day happens before breakfast.",
    image: "/assets/education/grown-chicks-hens.jpeg",
    alt: "Daily flock walk-through",
    aspect: "3/2",
    span: "md:col-span-4",
    full: {
      readTime: "3 min read",
      dek: "Daily routines to ensure animal welfare and optimal farm conditions — and why the first walk of the day happens before breakfast.",
      heroAlt: "Daily flock walk-through",
      heroCaption: "Morning walk-through — the first check of the day, before phones and before breakfast",
      factRail: [
        { label: "First check", value: "Before breakfast" },
        { label: "Walk-throughs", value: "Multiple daily" },
        { label: "Logging", value: "Daily farm log" },
        { label: "Density", value: "Kept low" },
      ],
      body: [
        {
          type: "p",
          lede: true,
          text: "Our daily operations are guided by our core value of integrity and doing what is right. Experienced farmhands conduct multiple walk-throughs a day to monitor the flock's behaviour, health and comfort.",
        },
        {
          type: "p",
          text: "The first thing we do each morning — before checking phones, before breakfast — is walk the flock. You learn to read a bird: one sitting apart from the group, a dip in drinking, feathers that look off. Small signals, caught early.",
        },
        { type: "h2", text: "A notebook, not a dashboard" },
        {
          type: "p",
          text: "Ventilation is constantly adjusted for air quality, and the barns are kept clean and dry. We monitor water consumption and house temperature so the environment stays stress-free, and we keep low stocking densities so natural behaviour — and welfare — stays intact.",
        },
        {
          type: "quote",
          text: "If mortality spikes two days in a row, we know immediately — not after a week.",
          attribution: "The Kyalos · Founders",
        },
        {
          type: "p",
          text: "We keep a daily farm log in a simple notebook. Early detection is the difference between treating three birds and treating three hundred.",
        },
      ],
      farmerTip: "We keep a daily farm log in a simple notebook. If mortality spikes two days in a row, we know immediately — not after a week. Early detection is the difference between treating three birds and treating three hundred.",
      stats: [
        { number: "3×", label: "Walk-throughs, minimum, daily" },
        { number: "2 days", label: "Mortality trend that triggers a check" },
        { number: "Low", label: "Stocking density, by design" },
      ],
      productCrossSell: {
        slug: "table-eggs",
        body: "Happy, healthy birds are productive birds. Every tray comes from a flock walked and logged every day. Sold by the thirty-piece tray, collected daily.",
      },
    },
  },
  {
    slug: "peak-production-the-layer-phase",
    fieldNote: "Field note 05",
    category: "Product Excellence",
    title: "Peak Production: The Layer Phase",
    excerpt: "Managing hens during their most productive laying cycle — and why floor eggs, not just nest counts, tell the real story.",
    image: "/layers.jpeg",
    alt: "Layer hens at peak production",
    aspect: "3/2",
    span: "md:col-span-4",
    full: {
      readTime: "3 min read",
      dek: "Managing hens during their most productive laying cycle — and why floor eggs, not just nest counts, tell the real story.",
      heroAlt: "Layer hens at peak production",
      heroCaption: "Layer house, midday collection — the second of three daily passes",
      factRail: [
        { label: "Collections", value: "3× daily" },
        { label: "Diet", value: "High-calcium layer mash" },
        { label: "Lighting", value: "Managed schedule" },
        { label: "Promise", value: "Fresh & Nutritious" },
      ],
      body: [
        {
          type: "p",
          lede: true,
          text: "During the layer phase, the diet switches to a high-calcium layer mash to support daily egg production. Lighting in the barns is closely managed to simulate natural daylight and keep laying cycles consistent.",
        },
        {
          type: "p",
          text: "We collect eggs three times a day during peak production — morning, midday and late afternoon. That frequency is what keeps our eggs clean and uncracked. One collection a day is not enough for a high-producing flock.",
        },
        { type: "h2", text: "What the floor tells us" },
        {
          type: "p",
          text: "Eggs are collected gently and frequently through the day so they stay clean and fresh. At this stage, our commitment to fresh and nutritious is realised in every egg laid.",
        },
        {
          type: "quote",
          text: "If we start finding more eggs on the floor than usual, it's the flock's way of telling us the nest boxes need attention or the lighting schedule is off.",
          attribution: "The Kyalos · Founders",
        },
        {
          type: "p",
          text: "We continually monitor feed-to-egg conversion and eggshell quality, making minor nutritional adjustments as needed to keep the flock at peak performance.",
        },
      ],
      farmerTip: "We judge the health of a laying cycle by the floor eggs, not just the nests. If we start finding more eggs on the floor than usual, it's the flock's way of telling us the nest boxes need attention or the lighting schedule is off.",
      stats: [
        { number: "3×", label: "Egg collections, daily" },
        { number: "High-Ca", label: "Layer mash formulation" },
        { number: "Daily", label: "Feed-to-egg tracking" },
      ],
      productCrossSell: {
        slug: "table-eggs",
        body: "Peak production, collected three times a day and graded by hand. Sold by the thirty-piece tray, collected daily.",
      },
    },
  },
  {
    slug: "sustainable-farming-with-organic-manure",
    fieldNote: "Field note 06",
    category: "Product Excellence",
    title: "Sustainable Farming with Organic Manure",
    excerpt: "How our high-quality organic manure supports regenerative agriculture — and why it dries in the Machakos sun, not a machine.",
    image: "/assets/education/poultry-manure.png",
    alt: "Organic manure on soil",
    aspect: "3/2",
    span: "md:col-span-4",
    full: {
      readTime: "3 min read",
      dek: "How our high-quality organic manure supports regenerative agriculture — and why it dries in the Machakos sun, not a machine.",
      heroAlt: "Organic manure on soil",
      heroCaption: "Sun-drying, Machakos — nothing added, nothing chemically treated",
      factRail: [
        { label: "Drying", value: "Natural, sun-dried" },
        { label: "Nutrients", value: "N-P-K rich" },
        { label: "Bag out", value: "70kg sacks" },
        { label: "Advice", value: "Mix 1 week before planting" },
      ],
      body: [
        {
          type: "p",
          lede: true,
          text: "At N&N, we believe in a circular agricultural economy. Our organic poultry manure is a potent source of nitrogen, phosphorus and potassium — vital for healthy plant growth and soil restoration.",
        },
        {
          type: "p",
          text: "The manure comes out of our barns and goes into the sacks — nothing added, nothing treated with chemicals. We let it dry naturally in the Machakos sun, which concentrates the nutrients and eliminates most pathogens. The smell tells you when it's ready.",
        },
        { type: "h2", text: "Give the soil a week" },
        {
          type: "p",
          text: "Unlike synthetic fertilisers, poultry manure improves soil structure by adding organic matter, which enhances water retention and supports beneficial soil microorganisms — leading to long-term soil health and more resilient yields.",
        },
        {
          type: "quote",
          text: "Give the soil microbes time to activate it — you'll see a visible difference in early plant growth.",
          attribution: "The Kyalos · Founders",
        },
        {
          type: "p",
          text: "We always advise customers to mix our manure into the soil a week before planting, not the same day. Whether you're a small-scale gardener or a large-scale farmer, it's a lower-chemical alternative that still delivers for the crop.",
        },
      ],
      farmerTip: "We always advise customers to mix our manure into the soil a week before planting, not the same day. Give the soil microbes time to activate it — you'll see a visible difference in early plant growth.",
      stats: [
        { number: "70kg", label: "Per sack" },
        { number: "N-P-K", label: "Naturally rich" },
        { number: "1 wk", label: "Recommended rest before planting" },
      ],
      productCrossSell: {
        slug: "poultry-manure",
        body: "Sun-dried, nothing added. Covers roughly fifty to eighty square metres a sack — pickup or bulk delivery.",
      },
    },
  },
  {
    slug: "controlled-access-for-enhanced-biosecurity",
    fieldNote: "Field note 07",
    category: "Growth & Care",
    title: "Controlled Access for Enhanced Biosecurity",
    excerpt:
      "We don't allow casual visitors into the barns — even family. One outbreak can wipe out months of work, and the most common entry point isn't people. It's second-hand equipment.",
    image: "/images/biosecurity.jpeg",
    alt: "Controlled access to the barns",
    aspect: "16/10",
    span: "md:col-span-12",
    full: {
      readTime: "3 min read",
      dek: "We don't allow casual visitors into the barns — even family. One outbreak can wipe out months of work, and the most common entry point isn't people. It's second-hand equipment.",
      heroAlt: "Controlled access to the barns",
      heroCaption: "Barn entrance — footbath and farm-specific clothing, no exceptions",
      factRail: [
        { label: "Visitor policy", value: "No casual access" },
        { label: "Entry protocol", value: "Footbath + change" },
        { label: "Top risk", value: "Second-hand equipment" },
        { label: "Approach", value: "Prevention over cure" },
      ],
      body: [
        {
          type: "p",
          lede: true,
          text: "Biosecurity is our first line of defence against poultry disease. We keep strict controlled access to every barn, to prevent pathogens arriving from outside sources in the first place.",
        },
        {
          type: "p",
          text: "We don't allow casual visitors into the barns — even family. It sounds strict, but one disease outbreak can wipe out months of work. The rule is simple: if you're coming into a barn, you change footwear and wash your hands. No exceptions.",
        },
        { type: "h2", text: "The risk isn't who you'd expect" },
        {
          type: "p",
          text: "Visitors and farm workers follow rigorous sanitation protocols — footbaths and farm-specific clothing — so the environment stays sterile and safe for the birds.",
        },
        {
          type: "quote",
          text: "The most common disease entry point we've seen isn't visitors — it's new equipment.",
          attribution: "The Kyalos · Founders",
        },
        {
          type: "p",
          text: "We always disinfect any second-hand feeders, drinkers or crates before they touch the floor of our barns. Controlling who and what enters keeps the flock healthy, cuts the need for medical intervention, and protects the quality that leaves the farm.",
        },
      ],
      farmerTip: "The most common disease entry point we've seen isn't visitors — it's new equipment. We always disinfect any second-hand feeders, drinkers, or crates before they touch the floor of our barns.",
      stats: [
        { number: "0", label: "Casual visitor access" },
        { number: "100%", label: "Footbath compliance, no exceptions" },
        { number: "#1 risk", label: "Second-hand equipment" },
      ],
      productCrossSell: {
        slug: "table-eggs",
        body: "A closed barn is a healthy flock. Every tray starts with birds that were never exposed to unnecessary risk. Sold by the thirty-piece tray, collected daily.",
      },
    },
  },
];

export const categories: { key: "all" | ArticleCategory; label: string }[] = [
  { key: "all", label: "All notes" },
  { key: "The Chick Journey", label: "The Chick Journey" },
  { key: "Growth & Care", label: "Growth & Care" },
  { key: "Product Excellence", label: "Product Excellence" },
];

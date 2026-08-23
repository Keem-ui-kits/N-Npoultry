/** Education content, copied verbatim from the frozen N&N build (src/content/education.ts).
 *  These sections are rendered in full on /inside-the-farm — there are no per-article pages. */

export type EducationCategoryId = "the-chick-journey" | "growth-and-care" | "product-excellence";

export type EducationCategory = {
  id: EducationCategoryId;
  name: string;
  description: string;
  color: string;
};

export type EducationSection = {
  id: string;
  fieldNote: string;
  title: string;
  category: EducationCategoryId;
  image: string;
  alt: string;
  aspect: string;
  excerpt: string;
  authorNote: string;
  farmerTip: string;
  content: string[];
};

export const educationCategories: EducationCategory[] = [
  {
    id: "the-chick-journey",
    name: "The Chick Journey",
    description: "From day one, ensuring a strong foundation for future layers.",
    color: "var(--color-gold)",
  },
  {
    id: "growth-and-care",
    name: "Growth & Care",
    description: "Providing the optimal environment, nutrition, and veterinary care.",
    color: "var(--color-sage)",
  },
  {
    id: "product-excellence",
    name: "Product Excellence",
    description: "Delivering fresh, nutritious farm produce safely to your table.",
    color: "var(--color-terracotta)",
  },
];

export const educationSections: EducationSection[] = [
  {
    id: "day-one-chicks",
    fieldNote: "Field note 01",
    title: "Welcoming One-Day-Old Chicks",
    category: "the-chick-journey",
    image: "/assets/education/one-day-old-chicks.jpeg",
    alt: "Day-old chicks in the brooding house",
    aspect: "16/9",
    excerpt: "The critical first 24 hours of a chick's life on the farm.",
    authorNote:
      "At N&N, we receive our day-old chicks from a trusted hatchery in Nairobi. The moment they arrive — usually before 7am — we're already in the brooding house, heaters on, water lines flushed and ready. Those first few hours set the tone for everything.",
    farmerTip:
      "From experience, we always keep a backup heat source on hand for the first week. One power cut on a cold Machakos night is all it takes to lose an entire batch.",
    content: [
      "The journey of our high-quality table eggs begins with healthy, vigorous one-day-old chicks. When they arrive at our farm, the first 24 hours are critical for their long-term health and productivity.",
      "We prepare specialized brooding houses with precise temperature controls (around 32-35°C) because young chicks cannot regulate their own body temperature. The lighting is kept bright to help them easily locate water and feed.",
      "Providing immediate access to clean, electrolyte-infused water and high-quality starter feed ensures they recover from any transport stress and begin healthy growth immediately.",
    ],
  },
  {
    id: "chicks-feeding",
    fieldNote: "Field note 02",
    title: "The Science of Chick Feeding",
    category: "the-chick-journey",
    image: "/assets/education/chicks-feeding.jpeg",
    alt: "Chicks feeding in the brooding house",
    aspect: "16/9",
    excerpt: "Building a strong skeletal and immune system through nutrition.",
    authorNote:
      "At N&N, we buy our starter crumble from a supplier whose composition we've verified ourselves — not just taken the bag's word for it. We've tried cheaper alternatives and seen the difference in shell quality six months later.",
    farmerTip:
      "We weigh a random sample of birds twice a week during the starter phase. If they're running light by week three, we know something is off with the feed or water intake — not the birds.",
    content: [
      "Nutrition in the early weeks is the foundation of a productive layer hen. Our chicks are fed a specially formulated starter crumble, which is rich in protein (around 20-22%) and fortified with essential vitamins and minerals.",
      "Calcium and phosphorus ratios are carefully monitored to promote strong skeletal development, which is vital for birds that will eventually produce strong-shelled eggs.",
      "Our feeding lines are designed for easy access, and we monitor consumption daily. Consistent, proper feeding during this phase directly correlates to the flock's uniformity and future peak egg production.",
    ],
  },
  {
    id: "growth-to-hen",
    fieldNote: "Field note 03",
    title: "From Pullet to Layer Hen",
    category: "growth-and-care",
    image: "/assets/education/pullets.jpeg",
    alt: "Pullets in the grower house",
    aspect: "16/9",
    excerpt: "The transition phase where young pullets develop into productive adults.",
    authorNote:
      "At N&N, the transition from grower to layer house is something we handle over a week, not overnight. We move small groups at a time so the birds settle without stress. Rushed transitions show up in your production numbers — you feel it immediately.",
    farmerTip:
      "We always do our first light stimulation at exactly 17 weeks — not before. Too early and you trigger premature laying in birds whose bodies aren't ready, which hurts shell quality for the whole cycle.",
    content: [
      "As chicks grow into pullets (young hens), their nutritional and environmental needs change. The temperature is gradually reduced to ambient levels, and they are transitioned to a grower feed which supports steady, healthy growth without premature fattening.",
      "This period involves strict veterinary oversight, including a comprehensive vaccination schedule to protect them from common poultry diseases. We believe preventative care is the most ethical and sustainable approach to farming.",
      "By the time they reach 16-18 weeks of age, they are ready to be transferred to the layer house, fully equipped to begin their productive cycle.",
    ],
  },
  {
    id: "care-and-welfare",
    fieldNote: "Field note 04",
    title: "Flock Care and Daily Operations",
    category: "growth-and-care",
    image: "/assets/education/grown-chicks-hens.jpeg",
    alt: "Grown hens in the layer house",
    aspect: "16/9",
    excerpt: "Daily routines to ensure animal welfare and optimal farm conditions.",
    authorNote:
      "At N&N, the first thing we do each morning — before checking phones, before breakfast — is walk the flock. You learn to read a bird. A hen sitting apart from the group, a dip in drinking, feathers that look off. These small signals are what keep a flock healthy.",
    farmerTip:
      "We keep a daily farm log in a simple notebook. If mortality spikes two days in a row, we know immediately — not after a week. Early detection is the difference between treating three birds and treating three hundred.",
    content: [
      "Our daily operations are guided by our core value of Integrity and doing what is right. Our experienced farmhands conduct multiple walk-throughs daily to monitor the flock's behavior, health, and comfort.",
      "Ventilation is constantly adjusted to ensure optimal air quality, and the barns are kept clean and dry. We use automated systems to monitor water consumption and house temperature, ensuring the environment remains stress-free.",
      "Happy, healthy birds are productive birds. Our battery cage system houses four hens per cage — structured, clean, and easy to monitor individually for health and output.",
    ],
  },
  {
    id: "layer-hens-production",
    fieldNote: "Field note 05",
    title: "Peak Production: The Layer Phase",
    category: "product-excellence",
    image: "/layers.jpeg",
    alt: "Layer hens at peak production",
    aspect: "16/9",
    excerpt: "Managing hens during their most productive laying cycle.",
    authorNote:
      "At N&N, we collect eggs three times a day during peak production — morning, midday, and late afternoon. That frequency is what keeps our eggs clean and uncracked. One collection a day is not enough for a high-producing flock.",
    farmerTip:
      "We judge the health of a laying cycle cage by cage. If egg counts drop in a specific box, we know exactly which four hens to check — feed intake, shell quality, behaviour. That's the advantage of the battery system: you can pinpoint problems fast.",
    content: [
      "During the layer phase, the diet is switched to a high-calcium layer mash to support daily egg production. The timing and duration of lighting in the barns are closely managed to simulate natural daylight and maintain consistent laying cycles.",
      "Eggs are collected gently and frequently throughout the day to ensure they remain clean and fresh. At this stage, our commitment to “Fresh and Nutritious” is realized in every egg laid.",
      "We continually monitor feed-to-egg conversion rates and eggshell quality, making minor nutritional adjustments as needed to keep the flock at peak performance.",
    ],
  },
  {
    id: "poultry-manure-benefits",
    fieldNote: "Field note 06",
    title: "Sustainable Farming with Organic Manure",
    category: "product-excellence",
    image: "/assets/education/poultry-manure.png",
    alt: "Poultry manure drying in the sun",
    aspect: "16/9",
    excerpt: "How our high-quality organic manure supports regenerative agriculture.",
    authorNote:
      "At N&N, the manure comes out of our barns and goes into the sacks — nothing added, nothing treated with chemicals. We let it dry naturally in the Machakos sun, which concentrates the nutrients and eliminates most pathogens. The smell tells you when it's ready.",
    farmerTip:
      "We always advise customers to mix our manure into the soil a week before planting, not the same day. Give the soil microbes time to activate it — you'll see a visible difference in early plant growth.",
    content: [
      "At N&N Poultry Palace, we believe in a circular agricultural economy. Our organic poultry manure is a potent source of essential nutrients—nitrogen, phosphorus, and potassium (NPK)—which are vital for healthy plant growth and soil restoration.",
      "Unlike synthetic fertilizers, poultry manure improves soil structure by adding organic matter, which enhances water retention and supports beneficial soil microorganisms. This leads to long-term soil health and more resilient crop yields.",
      "Whether you are a small-scale gardener or a large-scale farmer, our carefully managed and naturally aged manure provides an eco-friendly alternative that helps reduce the chemical footprint on our land while delivering superior nutritional value to crops.",
    ],
  },
  {
    id: "enhanced-biosecurity",
    fieldNote: "Field note 07",
    title: "Controlled Access for Enhanced Biosecurity",
    category: "growth-and-care",
    image: "/images/biosecurity.jpeg",
    alt: "Controlled access point at the farm barns",
    aspect: "16/9",
    excerpt: "Safeguarding our flocks through strict access control and biosecurity measures.",
    authorNote:
      "At N&N, we don't allow casual visitors into the barns — even family. We know it sounds strict, but one disease outbreak can wipe out months of work. Our rule is simple: if you're coming into a barn, you change footwear and wash your hands. No exceptions.",
    farmerTip:
      "The most common disease entry point we've seen isn't visitors — it's new equipment. We always disinfect all feeders, drinkers, or crates before they touch the floor of our barns.",
    content: [
      "Biosecurity is our first line of defense against poultry diseases. We implement strict controlled access to all our barns to prevent the introduction of pathogens from outside sources.",
      "Visitors and farm workers must adhere to rigorous sanitation protocols, including the use of footbaths and farm-specific clothing, ensuring that the environment remains sterile and safe for our birds.",
      "By controlling who and what enters the facility, we maintain a healthy flock, reducing the need for medical interventions and guaranteeing the highest quality produce for our customers.",
    ],
  },
];

export function categoryOf(id: EducationCategoryId): EducationCategory {
  return educationCategories.find((c) => c.id === id) ?? educationCategories[0];
}

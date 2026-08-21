// One-off seed migration: uploads real farm photography and creates the
// educationArticle documents matching src/lib/articles-data.ts in the Next.js app.
// Run with: npx sanity@latest exec scripts/migrate-articles.mjs --with-user-token
import { getCliClient } from "sanity/cli";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = resolve(__dirname, "../../public");

const client = getCliClient({ apiVersion: "2026-02-01" });

async function uploadImage(relPath, alt) {
  const filePath = resolve(PUBLIC_DIR, relPath.replace(/^\//, ""));
  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: relPath.split("/").pop(),
  });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id }, alt };
}

const articles = [
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
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "The journey of our high-quality table eggs begins with healthy, vigorous one-day-old chicks. When they arrive at our farm, the first twenty-four hours are critical for their long-term health and productivity.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "We receive our day-old chicks from a trusted hatchery in Nairobi. The moment they arrive — usually before seven in the morning — we're already in the brooding house: heaters on, water lines flushed and ready. Those first few hours set the tone for everything.",
            },
          ],
        },
        { _type: "block", style: "h2", children: [{ _type: "span", text: "A chick cannot keep itself warm" }] },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "We prepare specialised brooding houses with precise temperature control, around 32 to 35 degrees, because young chicks cannot yet regulate their own body temperature. Lighting is kept deliberately bright so they can locate water and feed without hunting for it.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Immediate access to clean, electrolyte-infused water and high-quality starter feed lets them recover from transport stress and begin healthy growth straight away. A chick that drinks in the first hour is a chick that eats in the second.",
            },
          ],
        },
        {
          _type: "pullQuote",
          text: "One power cut on a cold Machakos night is all it takes to lose an entire batch.",
          attribution: "The Kyalos · Founders",
        },
        { _type: "block", style: "h2", children: [{ _type: "span", text: "What we do differently" }] },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "From experience, we always keep a backup heat source on hand for the first week. It is the least glamorous item on the farm and the one we would replace first. Reliability at this stage is not about equipment quality — it is about having a second option when the first one fails at two in the morning.",
            },
          ],
        },
        {
          _type: "block",
          style: "normal",
          children: [
            {
              _type: "span",
              text: "Everything after this point compounds. Uniform, well-started chicks become uniform pullets, and uniform pullets become a flock that reaches peak production together rather than in a long, uneven tail.",
            },
          ],
        },
      ],
      farmerTip: "Keep a backup heat source for the first week. A single power cut on a cold night is all it takes.",
      stats: [
        { number: "32–35°", label: "Brooder temperature, week one" },
        { number: "20–22%", label: "Protein in starter crumble" },
        { number: "17 wks", label: "First light stimulation" },
      ],
      productCrossSell: {
        productSlug: "table-eggs",
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
  },
  {
    slug: "flock-care-and-daily-operations",
    fieldNote: "Field note 04",
    category: "Growth & Care",
    title: "Flock Care and Daily Operations",
    image: "/assets/education/grown-chicks-hens.jpeg",
    alt: "Daily flock walk-through",
    aspect: "3/2",
    span: "md:col-span-4",
  },
  {
    slug: "peak-production-the-layer-phase",
    fieldNote: "Field note 05",
    category: "Product Excellence",
    title: "Peak Production: The Layer Phase",
    image: "/layers.jpeg",
    alt: "Layer hens at peak production",
    aspect: "3/2",
    span: "md:col-span-4",
  },
  {
    slug: "sustainable-farming-with-organic-manure",
    fieldNote: "Field note 06",
    category: "Product Excellence",
    title: "Sustainable Farming with Organic Manure",
    image: "/assets/education/poultry-manure.png",
    alt: "Organic manure on soil",
    aspect: "3/2",
    span: "md:col-span-4",
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
  },
];

for (const article of articles) {
  console.log(`Uploading image for ${article.slug}...`);
  const image = await uploadImage(article.image, article.alt);

  const doc = {
    _id: `educationArticle-${article.slug}`,
    _type: "educationArticle",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    fieldNote: article.fieldNote,
    category: article.category,
    excerpt: article.excerpt,
    image,
    aspect: article.aspect,
    span: article.span,
    ...(article.full ? { full: article.full } : {}),
  };

  console.log(`Creating ${article.slug}...`);
  await client.createOrReplace(doc);
}

console.log("Done.");

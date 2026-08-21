import { client } from "./client";
import { urlFor } from "./image";
import { ARTICLES_LIST_QUERY, ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from "./queries";
import { articles as staticArticles, type Article, type ArticleBody } from "@/lib/articles-data";

export type ArticleCard = {
  slug: string;
  fieldNote: string;
  category: string;
  title: string;
  excerpt?: string;
  image: string;
  alt: string;
  aspect: string;
  span: string;
  hasFull: boolean;
};

export type PortableBlock = { _type: string; [key: string]: unknown };

export type SanityArticleFull = {
  readTime?: string;
  dek?: string;
  heroAlt?: string;
  heroCaption?: string;
  factRail?: { label: string; value: string }[];
  body?: PortableBlock[];
  farmerTip?: string;
  stats?: { number: string; label: string }[];
  productCrossSell?: { productSlug: "table-eggs" | "poultry-manure" | "ex-layer-hens"; body: string };
};

export type SanityArticle = ArticleCard & { full?: SanityArticleFull };

type RawImage = { asset?: { url: string }; alt?: string } | null | undefined;

function imageUrl(img: RawImage, fallback: string) {
  if (!img?.asset) return fallback;
  try {
    return urlFor(img as never).width(1600).url();
  } catch {
    return fallback;
  }
}

/** Converts the static articles-data.ts body shape into Portable Text blocks, so the
 * article template can render both Sanity content and the offline fallback through
 * the same <PortableText> renderer. */
function staticBodyToPortableText(body: ArticleBody[]): PortableBlock[] {
  return body.map((block) => {
    if (block.type === "h2") {
      return { _type: "block", style: "h2", children: [{ _type: "span", text: block.text }] };
    }
    if (block.type === "quote") {
      return { _type: "pullQuote", text: block.text, attribution: block.attribution };
    }
    return {
      _type: "block",
      style: block.lede ? "lead" : "normal",
      children: [{ _type: "span", text: block.text }],
    };
  });
}

function staticFullToSanityFull(full: NonNullable<Article["full"]>): SanityArticleFull {
  return {
    readTime: full.readTime,
    dek: full.dek,
    heroAlt: full.heroAlt,
    heroCaption: full.heroCaption,
    factRail: full.factRail,
    body: staticBodyToPortableText(full.body),
    farmerTip: full.farmerTip,
    stats: full.stats,
    productCrossSell: { productSlug: full.productCrossSell.slug, body: full.productCrossSell.body },
  };
}

function toStaticFallback(): SanityArticle[] {
  return staticArticles.map((a) => ({
    slug: a.slug,
    fieldNote: a.fieldNote,
    category: a.category,
    title: a.title,
    excerpt: a.excerpt,
    image: a.image,
    alt: a.alt,
    aspect: a.aspect,
    span: a.span,
    hasFull: !!a.full,
    full: a.full ? staticFullToSanityFull(a.full) : undefined,
  }));
}

export async function getArticleCards(): Promise<SanityArticle[]> {
  try {
    const docs = await client.fetch(ARTICLES_LIST_QUERY, {}, { next: { revalidate: 300 } });
    if (!Array.isArray(docs) || docs.length === 0) return toStaticFallback();
    return docs.map((d) => ({
      slug: d.slug,
      fieldNote: d.fieldNote,
      category: d.category,
      title: d.title,
      excerpt: d.excerpt,
      image: imageUrl(d.image, "/eggs.jpeg"),
      alt: d.image?.alt ?? d.title,
      aspect: d.aspect,
      span: d.span,
      hasFull: !!d.hasFull,
    }));
  } catch {
    return toStaticFallback();
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  try {
    const slugs = await client.fetch(ARTICLE_SLUGS_QUERY);
    if (Array.isArray(slugs) && slugs.length) return slugs;
  } catch {
    /* fall through to static */
  }
  return staticArticles.map((a) => a.slug);
}

export async function getArticleBySlug(slug: string): Promise<SanityArticle | undefined> {
  try {
    const doc = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug }, { next: { revalidate: 300 } });
    if (doc) {
      return {
        slug: doc.slug,
        fieldNote: doc.fieldNote,
        category: doc.category,
        title: doc.title,
        excerpt: doc.excerpt,
        image: imageUrl(doc.image, "/eggs.jpeg"),
        alt: doc.image?.alt ?? doc.title,
        aspect: doc.aspect,
        span: doc.span,
        hasFull: !!doc.full,
        full: doc.full,
      };
    }
  } catch {
    /* fall through to static */
  }
  return toStaticFallback().find((a) => a.slug === slug);
}

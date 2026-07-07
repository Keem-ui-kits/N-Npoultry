import { cache } from 'react'
import type { Product } from '@/types/product'
import type { Testimonial } from '@/content/testimonials'
import type { EducationArticle } from '@/content/education'

// ---------------------------------------------------------------------------
// GROQ queries
// ---------------------------------------------------------------------------

export const PRODUCTS_QUERY = `*[_type == "product"] {
  "id": id.current,
  title,
  titleAccent,
  description,
  fullDescription,
  features,
  details,
  "image": image.asset->url,
  color,
  colorRgb,
  gradient
} | order(title asc)`

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && id.current == $id][0] {
  "id": id.current,
  title,
  titleAccent,
  description,
  fullDescription,
  features,
  details,
  "image": image.asset->url,
  color,
  colorRgb,
  gradient
}`

export const TESTIMONIALS_QUERY = `*[_type == "testimonial"] {
  "id": _id,
  name,
  company,
  location,
  rating,
  text
}`

export const EDUCATION_ARTICLES_QUERY = `*[_type == "educationArticle"] {
  "id": id.current,
  title,
  category,
  "image": image.asset->url,
  excerpt,
  content,
  authorNote,
  farmerTip
}`

export const EDUCATION_ARTICLE_BY_SLUG_QUERY = `*[_type == "educationArticle" && id.current == $slug][0] {
  "id": id.current,
  title,
  category,
  "image": image.asset->url,
  excerpt,
  content,
  authorNote,
  farmerTip
}`

export const SITE_CONFIG_QUERY = `*[_type == "siteConfig" && _id == "siteConfig"][0] {
  "heroImageUrl": heroImage.asset->url,
  contacts { email, phones, address, whatsapp },
  businessHours { weekdays, saturday },
  socialLinks { facebook, twitter, instagram },
  deliveryZones,
  availability { tableEggs, manure, exLayerHens, lastUpdated, note }
}`

export const HOME_CONFIG_QUERY = `*[_type == "homeConfig" && _id == "homeConfig"][0] {
  hero {
    headlinePre, headlineAccent, headlinePost,
    subtext, locationBadge, slotNote,
    ctaPrimary, ctaSecondary
  },
  farmPulse {
    headingPre, headingAccent, headingPost, description,
    card1Badge, card1Title, card1Body, card1Stat, card1StatLabel,
    card2Badge, card2Title, card2Body,
    card3Badge, card3Title, card3Body,
    card4Badge, card4Title, card4Body, card4CtaLabel
  },
  howWeWork {
    headlinePrimary, headlineAccent, description,
    step1Title, step1Description,
    step2Title, step2Description,
    step3Title, step3Description,
    step4Title, step4Description
  },
  contactCta {
    headlinePre, headlineAccent, headlinePost,
    description, ctaPrimary
  },
  farmGallery {
    badgeText, heading, headingAccent, description
  }
}`

export const ABOUT_CONFIG_QUERY = `*[_type == "aboutConfig"][0] {
  rootsParagraph1,
  rootsParagraph2,
  rootsQuote,
  "rootsImageUrl": rootsImage.asset->url
}`

export const FOUNDER_CONFIG_QUERY = `*[_type == "founderConfig" && _id == "founderConfig"][0] {
  founderName,
  founderRole,
  yearsOnFarm,
  "founderPhotoUrl": founderPhoto.asset->url,
  founderQuote,
  founderStory
}`

export const FARM_PHOTOS_QUERY = `*[_type == "farmPhoto" && defined(photo.asset)] | order(order asc) {
  "url": photo.asset->url,
  alt,
  order
}`

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SanityContacts {
  email?: string
  phones?: string[]
  address?: string
  whatsapp?: string
}

export interface AvailabilityData {
  tableEggs?: number | null
  manure?: number | null
  exLayerHens?: number | null
  lastUpdated?: string | null
  note?: string | null
}

export interface SiteConfig {
  heroImageUrl?: string
  contacts?: SanityContacts
  businessHours?: {
    weekdays?: string
    saturday?: string
  }
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
  deliveryZones?: string[]
  availability?: AvailabilityData | null
}

export interface HomeConfig {
  hero?: {
    headlinePre?: string
    headlineAccent?: string
    headlinePost?: string
    subtext?: string
    locationBadge?: string
    slotNote?: string
    ctaPrimary?: string
    ctaSecondary?: string
  }
  farmPulse?: {
    headingPre?: string
    headingAccent?: string
    headingPost?: string
    description?: string
    card1Badge?: string
    card1Title?: string
    card1Body?: string
    card1Stat?: string
    card1StatLabel?: string
    card2Badge?: string
    card2Title?: string
    card2Body?: string
    card3Badge?: string
    card3Title?: string
    card3Body?: string
    card4Badge?: string
    card4Title?: string
    card4Body?: string
    card4CtaLabel?: string
  }
  howWeWork?: {
    headlinePrimary?: string
    headlineAccent?: string
    description?: string
    step1Title?: string
    step1Description?: string
    step2Title?: string
    step2Description?: string
    step3Title?: string
    step3Description?: string
    step4Title?: string
    step4Description?: string
  }
  contactCta?: {
    headlinePre?: string
    headlineAccent?: string
    headlinePost?: string
    description?: string
    ctaPrimary?: string
  }
  farmGallery?: {
    badgeText?: string
    heading?: string
    headingAccent?: string
    description?: string
  }
}

export interface AboutConfig {
  rootsImageUrl?: string
  rootsParagraph1?: string
  rootsParagraph2?: string
  rootsQuote?: string
}

export interface FounderConfig {
  founderName?: string
  founderRole?: string
  yearsOnFarm?: number
  founderPhotoUrl?: string
  founderQuote?: string
  founderStory?: string[]
}

export interface FarmPhoto {
  url: string
  alt: string
  order?: number
}

// ---------------------------------------------------------------------------
// Fetch helper — returns null when Sanity is not configured or the query fails
// ---------------------------------------------------------------------------

export async function fetchFromSanity<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (
    !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
    !process.env.NEXT_PUBLIC_SANITY_DATASET
  ) {
    return null
  }
  try {
    const { client } = await import('./client')
    return await client.fetch<T>(query, params ?? {}, {
      next: { revalidate: 3600, tags: ['sanity'] },
    })
  } catch {
    return null
  }
}

// ---------------------------------------------------------------------------
// Typed convenience wrappers
// ---------------------------------------------------------------------------

export async function getProducts(): Promise<Product[]> {
  const { products: fallback } = await import('@/content/products')
  const data = await fetchFromSanity<Partial<Product>[]>(PRODUCTS_QUERY)
  if (data && data.length > 0) {
    return data.map((p) => {
      const fb = fallback.find((f) => f.id === p.id)
      return {
        ...fb,
        ...p,
        image: p.image ?? fb?.image ?? '',
        color: p.color ?? fb?.color ?? '',
        gradient: p.gradient ?? fb?.gradient ?? '',
        colorRgb: p.colorRgb ?? fb?.colorRgb ?? [0, 0, 0],
      } as Product
    })
  }
  return fallback
}

export async function getProductById(id: string): Promise<Product | null> {
  const { products: fallback } = await import('@/content/products')
  const fb = fallback.find((p) => p.id === id) ?? null
  const data = await fetchFromSanity<Partial<Product>>(PRODUCT_BY_SLUG_QUERY, { id })
  if (data) {
    return {
      ...fb,
      ...data,
      image: data.image ?? fb?.image ?? '',
      color: data.color ?? fb?.color ?? '',
      gradient: data.gradient ?? fb?.gradient ?? '',
      colorRgb: data.colorRgb ?? fb?.colorRgb ?? [0, 0, 0],
    } as Product
  }
  return fb
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchFromSanity<Testimonial[]>(TESTIMONIALS_QUERY)
  if (data && data.length > 0) return data
  const { testimonials } = await import('@/content/testimonials')
  return testimonials
}

export async function getEducationArticles(): Promise<EducationArticle[]> {
  const data = await fetchFromSanity<EducationArticle[]>(EDUCATION_ARTICLES_QUERY)
  const { educationArticles } = await import('@/content/education')
  if (data && data.length > 0) {
    const validSanityArticles = data.filter((d) => d.image)
    const sanityIds = new Set(validSanityArticles.map((d) => d.id))
    return [...validSanityArticles, ...educationArticles.filter((a) => !sanityIds.has(a.id))]
  }
  return educationArticles
}

export async function getEducationArticleBySlug(slug: string): Promise<EducationArticle | null> {
  const data = await fetchFromSanity<EducationArticle>(EDUCATION_ARTICLE_BY_SLUG_QUERY, { slug })
  const { educationArticles } = await import('@/content/education')
  const fallback = educationArticles.find((a) => a.id === slug) ?? null
  // Mirror getEducationArticles: a Sanity doc without an image loses to the
  // local fallback; the page guards handle the no-fallback null-image case.
  if (data) {
    if (data.image || !fallback) return data
    return fallback
  }
  return fallback
}

// cache() deduplicates calls within a single render pass across layout, footer, pages
export const getSiteConfig = cache(function getSiteConfig(): Promise<SiteConfig | null> {
  return fetchFromSanity<SiteConfig>(SITE_CONFIG_QUERY)
})

export async function getAboutConfig(): Promise<AboutConfig | null> {
  return fetchFromSanity<AboutConfig>(ABOUT_CONFIG_QUERY)
}

export async function getFounderConfig(): Promise<FounderConfig | null> {
  return fetchFromSanity<FounderConfig>(FOUNDER_CONFIG_QUERY)
}

export async function getFarmPhotos(): Promise<FarmPhoto[]> {
  const data = await fetchFromSanity<FarmPhoto[]>(FARM_PHOTOS_QUERY)
  return (data ?? []).filter((p) => !!p.url)
}

export async function getHomeConfig(): Promise<HomeConfig | null> {
  return fetchFromSanity<HomeConfig>(HOME_CONFIG_QUERY)
}

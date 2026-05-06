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
  availability { tableEggs, manure, exLayerHens, lastUpdated, note }
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

export type SanityContacts = {
  email?: string
  phones?: string[]
  address?: string
  whatsapp?: string
}

export type AvailabilityData = {
  tableEggs?: number | null
  manure?: number | null
  exLayerHens?: number | null
  lastUpdated?: string | null
  note?: string | null
}

export type SiteConfig = {
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
  availability?: AvailabilityData | null
}

export type AboutConfig = {
  rootsImageUrl?: string
  rootsParagraph1?: string
  rootsParagraph2?: string
  rootsQuote?: string
}

export type FounderConfig = {
  founderName?: string
  founderRole?: string
  yearsOnFarm?: number
  founderPhotoUrl?: string
  founderQuote?: string
  founderStory?: string[]
}

export type FarmPhoto = {
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
  const data = await fetchFromSanity<Product[]>(PRODUCTS_QUERY)
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
      }
    })
  }
  return fallback
}

export async function getProductById(id: string): Promise<Product | null> {
  const { products: fallback } = await import('@/content/products')
  const fb = fallback.find((p) => p.id === id) ?? null
  const data = await fetchFromSanity<Product>(PRODUCT_BY_SLUG_QUERY, { id })
  if (data) {
    return {
      ...fb,
      ...data,
      image: data.image ?? fb?.image ?? '',
      color: data.color ?? fb?.color ?? '',
      gradient: data.gradient ?? fb?.gradient ?? '',
      colorRgb: data.colorRgb ?? fb?.colorRgb ?? [0, 0, 0],
    }
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
  if (data) return data
  const { educationArticles } = await import('@/content/education')
  return educationArticles.find((a) => a.id === slug) ?? null
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

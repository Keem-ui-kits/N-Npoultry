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
  content
}`

export const EDUCATION_ARTICLE_BY_SLUG_QUERY = `*[_type == "educationArticle" && id.current == $slug][0] {
  "id": id.current,
  title,
  category,
  "image": image.asset->url,
  excerpt,
  content
}`

export const SITE_CONFIG_QUERY = `*[_type == "siteConfig" && _id == "siteConfig"][0] {
  "heroImageUrl": heroImage.asset->url,
  contacts { email, phones, address, whatsapp },
  businessHours { weekdays, saturday },
  socialLinks { facebook, twitter, instagram }
}`

export const ABOUT_CONFIG_QUERY = `*[_type == "aboutConfig"][0] {
  rootsParagraph1,
  rootsParagraph2,
  rootsQuote,
  "rootsImageUrl": rootsImage.asset->url
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
}

export type AboutConfig = {
  rootsImageUrl?: string
  rootsParagraph1?: string
  rootsParagraph2?: string
  rootsQuote?: string
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
  const data = await fetchFromSanity<Product[]>(PRODUCTS_QUERY)
  if (data && data.length > 0) {
    return data.map((p) => ({
      ...p,
      colorRgb: (p.colorRgb ?? [0, 0, 0]),
    }))
  }
  const { products } = await import('@/content/products')
  return products
}

export async function getProductById(id: string): Promise<Product | null> {
  const data = await fetchFromSanity<Product>(PRODUCT_BY_SLUG_QUERY, { id })
  if (data) {
    return { ...data, colorRgb: (data.colorRgb ?? [0, 0, 0]) }
  }
  const { products } = await import('@/content/products')
  return products.find((p) => p.id === id) ?? null
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

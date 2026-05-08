import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
import { getProducts, getEducationArticles } from '@/sanity/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.baseUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date('2026-04-01'), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date('2026-04-01'), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/quote`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/education-hub`, lastModified: new Date('2026-04-01'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/terms`, lastModified: new Date('2026-04-01'), changeFrequency: 'yearly', priority: 0.1 },
    { url: `${baseUrl}/privacy`, lastModified: new Date('2026-04-01'), changeFrequency: 'yearly', priority: 0.1 },
  ];

  const [products, articles] = await Promise.all([
    getProducts().catch(() => []),
    getEducationArticles().catch(() => []),
  ]);

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date('2026-04-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/education-hub/${article.id}`,
    lastModified: new Date('2026-04-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}

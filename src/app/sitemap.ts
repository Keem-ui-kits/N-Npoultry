import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
import { products } from '@/content/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl;

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/products',
    '/contact',
    '/quote',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' ? 'weekly' : 'monthly') as 'weekly' | 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}

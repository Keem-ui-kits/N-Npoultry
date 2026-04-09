import type { MetadataRoute } from 'next';
import { siteConfig } from '@/content/site';
import { products } from '@/content/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.baseUrl;

  const priorities: Record<string, number> = {
    '': 1.0,
    '/products': 0.9,
    '/about': 0.7,
    '/contact': 0.7,
    '/quote': 0.7,
    '/education-hub': 0.5,
    '/terms': 0.1,
    '/privacy': 0.1,
  };

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/products',
    '/about',
    '/contact',
    '/quote',
    '/education-hub',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === '' || route === '/products' ? 'weekly' : (route === '/terms' || route === '/privacy' ? 'yearly' : 'monthly')) as 'weekly' | 'monthly' | 'yearly',
    priority: priorities[route] ?? 0.5,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes];
}

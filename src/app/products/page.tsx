import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductsDetailed } from '@/components/sections/products/ProductsDetailed';
import { getProducts } from '@/sanity/lib/queries';
import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';

export const metadata: Metadata = {
  title: 'Our Products | N&N Poultry Palace',
  description:
    'Explore our range of premium poultry products including farm-fresh table eggs, ex-layer hens, and organic manure from Machakos, Kenya.',
  alternates: { canonical: `${siteConfig.baseUrl}/products` },
  openGraph: {
    title: 'Our Products | N&N Poultry Palace',
    description:
      'Farm-fresh table eggs, ex-layer hens, and organic poultry manure — delivered daily from Machakos.',
    url: `${siteConfig.baseUrl}/products`,
    siteName: siteConfig.name,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'N&N Poultry Palace Products' }],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Products | N&N Poultry Palace',
    description: 'Farm-fresh eggs and organic poultry products from Machakos.',
    images: ['/og-image.png'],
  },
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <PageWrapper>
      <PageHeader
        title="Our"
        accent="Products"
        subtitle="Farm-fresh excellence delivered daily from our palace to your doorstep."
      />
      <ProductsDetailed products={products} />
    </PageWrapper>
  );
}

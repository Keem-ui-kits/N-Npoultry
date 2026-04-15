import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductsDetailed } from '@/components/sections/products/ProductsDetailed';
import { HashScrollHandler } from '@/components/sections/products/HashScrollHandler';
import { getProducts } from '@/sanity/lib/queries';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products | N&N Poultry Palace',
  description:
    'Explore our range of premium poultry products including farm-fresh table eggs, ex-layer hens, and organic manure from Machakos, Kenya.',
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <PageWrapper>
      <HashScrollHandler />
      <PageHeader
        title="Our"
        accent="Products"
        subtitle="Farm-fresh excellence delivered daily from our palace to your doorstep."
      />
      <ProductsDetailed products={products} />
    </PageWrapper>
  );
}

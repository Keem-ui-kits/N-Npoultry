import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { ProductsDetailed } from '@/components/sections/products/ProductsDetailed';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Products | N&N Poultry Palace',
  description:
    'Explore our range of premium poultry products including farm-fresh table eggs, ex-layer hens, and organic manure from Machakos, Kenya.',
};

export default function ProductsPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="Our"
        accent="Products"
        subtitle="Farm-fresh excellence delivered daily from our palace to your doorstep."
      />
      <ProductsDetailed />
    </PageWrapper>
  );
}

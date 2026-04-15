import Link from 'next/link';
import { getProducts } from '@/sanity/lib/queries';
import { RevealProductList } from '@/components/ui/reveal-product-list';
import { ProductsTeaserDesktop } from './ProductsTeaserDesktop';
import { Button } from '@/components/ui/button';
import type { Product } from '@/types/product';

function sortProducts(products: Product[]): Product[] {
  const eggs = products.find((p) => p.id === 'table-eggs');
  const rest = products.filter((p) => p.id !== 'table-eggs');
  return eggs ? [eggs, ...rest] : products;
}

export async function ProductsTeaser() {
  const raw = await getProducts();
  const products = sortProducts(raw);

  return (
    <div className="w-full bg-background" id="products-teaser">
      {/* Mobile + Tablet: numbered reveal list */}
      <div className="lg:hidden px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight text-foreground">
            Three Products,{' '}
            <span className="gradient-brand-text">One Trusted</span> Source
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
            Farm-fresh eggs, organic fertilizer, and quality hens — everything sourced directly from our farm in Machakos.
          </p>
        </div>

        <RevealProductList products={products} />

        <div className="mt-8">
          <Link href="/products#table-eggs">
            <Button size="lg" className="w-full">
              Explore All Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Desktop: hero layout with floating images */}
      <div className="hidden lg:block">
        <ProductsTeaserDesktop products={products} />
      </div>
    </div>
  );
}

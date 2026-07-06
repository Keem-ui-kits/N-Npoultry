import Link from 'next/link';
import { Package } from 'lucide-react';
import { products as contentProducts } from '@/content/products';
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
  // Start with static content — guaranteed to work even if Sanity is unavailable
  let products: Product[] = sortProducts(contentProducts);
  try {
    const raw = await getProducts();
    if (raw.length > 0) products = sortProducts(raw);
  } catch {
    // static contentProducts already set above
  }

  return (
    <div className="w-full bg-background" id="products-teaser">
      {/* Mobile + Tablet: numbered reveal list */}
      <div className="lg:hidden px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-brand-gold/25 bg-brand-gold/[0.07]">
            <Package className="w-3 h-3 text-brand-gold" />
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-brand-gold">
              Our Products
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-tight text-foreground">
            Three Products,{' '}
            <span className="text-brand-gold">One Trusted</span> Source
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
            Table eggs graded daily, organic manure from our flock, and ex-layer hens when the cycle turns — all raised and dispatched from our farm outside Machakos Town.
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

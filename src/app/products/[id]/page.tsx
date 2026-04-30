import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CheckCircle2, Send } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { siteConfig } from '@/content/site';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { getProducts, getProductById } from '@/sanity/lib/queries';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: 'Product Not Found | N&N Poultry Palace',
    };
  }

  const productTitle = `${product.title} ${product.titleAccent}`;
  return {
    title: `${productTitle} | N&N Poultry Palace`,
    description: product.description,
    alternates: { canonical: `${siteConfig.baseUrl}/products/${id}` },
    openGraph: {
      title: `${productTitle} | N&N Poultry Palace`,
      description: product.description,
      url: `${siteConfig.baseUrl}/products/${id}`,
      siteName: siteConfig.name,
      images: [{ url: product.image, alt: productTitle }],
      locale: 'en_KE',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${productTitle} | N&N Poultry Palace`,
      description: product.description,
      images: [product.image],
    },
  };
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ id: product.id }));
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const [product, allProducts] = await Promise.all([
    getProductById(id),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${product.title} ${product.titleAccent}`,
    description: product.fullDescription ?? product.description,
    image: `${siteConfig.baseUrl}${product.image}`,
    url: `${siteConfig.baseUrl}/products/${product.id}`,
    brand: { '@type': 'Brand', name: 'N&N Poultry Palace' },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'KES',
      seller: { '@type': 'Organization', name: 'N&N Poultry Palace' },
    },
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <PageHeader
        title={product.title}
        accent={product.titleAccent}
        subtitle={product.description}
      />

      <div className="py-16 md:py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: `${product.title} ${product.titleAccent}` },
            ]}
          />

          <div className="flex flex-col gap-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square bg-muted/20 dark:bg-brand-dark/40 rounded-[3rem] p-12 flex items-center justify-center overflow-hidden border border-border dark:border-white/10 group shadow-2xl">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-12 group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                    {product.title} <span className="text-brand-gold">{product.titleAccent}</span>
                  </h2>
                  <p className="text-xl text-muted-foreground font-medium italic">
                    {product.fullDescription ?? product.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold uppercase tracking-widest text-brand-gold">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features?.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-lg font-medium">
                        <CheckCircle2 className="text-brand-gold w-6 h-6 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 flex flex-col sm:flex-row gap-4">
                  <Link
                    href={`/quote?product=${product.id}`}
                    className="inline-flex items-center justify-center gap-3 px-12 py-5 gradient-brand text-brand-dark rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl shadow-brand-gold/10"
                  >
                    Request a Quote <Send className="w-5 h-5" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-3 px-12 py-5 bg-background dark:bg-white/5 border border-border dark:border-white/10 rounded-full font-bold text-xl hover:bg-muted/30 dark:hover:bg-white/10 transition-all"
                  >
                    Contact Sales
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="py-16 md:py-24 bg-muted/20 dark:bg-brand-dark/20 border-t border-border dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-5xl font-black mb-12 uppercase tracking-tight">
            Related <span className="text-brand-gold">Products</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allProducts
              .filter((p) => p.id !== product.id)
              .map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="group bg-card dark:bg-brand-dark border border-border dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-video relative bg-muted/10 dark:bg-black/20 p-6 flex items-center justify-center overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold group-hover:text-brand-gold transition-colors">
                      {related.title} {related.titleAccent}
                    </h3>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

import { PageWrapper } from '@/components/layout/PageWrapper';
import { PageHeader } from '@/components/layout/PageHeader';
import { products } from '@/content/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <PageWrapper>
      <PageHeader 
        title={product.title} 
        accent={product.titleAccent} 
        subtitle={product.description} 
      />
      
      <div className="py-16 md:py-24 bg-white dark:bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand-gold transition-colors mb-12 font-bold"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-muted/20 dark:bg-brand-dark/40 rounded-[3rem] p-12 flex items-center justify-center overflow-hidden border border-border dark:border-white/10 group shadow-2xl">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-12 group-hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter">
                  {product.title} <span className="text-brand-gold">{product.titleAccent}</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium italic">
                  {product.fullDescription || product.description}
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

              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-12 py-5 gradient-brand text-brand-dark rounded-full font-bold text-xl hover:scale-105 transition-all shadow-xl"
                >
                  Order Now
                </Link>
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
            {products
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

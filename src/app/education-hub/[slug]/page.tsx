import { PageWrapper } from '@/components/layout/PageWrapper';
import { educationCategories } from '@/content/education';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { getEducationArticles, getEducationArticleBySlug } from '@/sanity/lib/queries';
import { siteConfig } from '@/content/site';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getEducationArticles();
  return articles.map((article) => ({ slug: article.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getEducationArticleBySlug(slug);
  if (!article) return { title: 'Article Not Found | N&N Poultry Palace' };
  // Sanity can return articles without an image — fall back to the site OG image
  const ogImage = article.image ?? '/og-image.png';
  return {
    title: `${article.title} | N&N Poultry Palace`,
    description: article.excerpt,
    alternates: { canonical: `${siteConfig.baseUrl}/education-hub/${slug}` },
    openGraph: {
      title: `${article.title} | N&N Poultry Palace`,
      description: article.excerpt,
      url: `${siteConfig.baseUrl}/education-hub/${slug}`,
      siteName: siteConfig.name,
      images: [{ url: ogImage, alt: article.title }],
      locale: 'en_KE',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${article.title} | N&N Poultry Palace`,
      description: article.excerpt,
      images: [ogImage],
    },
  };
}

export default async function EducationArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getEducationArticleBySlug(slug);
  if (!article) notFound();

  const category = educationCategories.find((c) => c.id === article.category);

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    ...(article.image
      ? { image: article.image.startsWith('http') ? article.image : `${siteConfig.baseUrl}${article.image}` }
      : {}),
    url: `${siteConfig.baseUrl}/education-hub/${slug}`,
    author: { '@type': 'Organization', name: 'N&N Poultry Palace', url: siteConfig.baseUrl },
    publisher: {
      '@type': 'Organization',
      name: 'N&N Poultry Palace',
      url: siteConfig.baseUrl,
      logo: { '@type': 'ImageObject', url: `${siteConfig.baseUrl}/nn-poultry-logo.png` },
    },
  };

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-12 relative overflow-hidden px-4 md:px-8">
        <div className="absolute inset-0 bg-[#030213] pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 to-[#030213]" />
          <div className="absolute top-0 right-1/4 w-[40vw] h-[40vw] bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10 pt-10">
          <Link
            href="/education-hub"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-gold transition-colors mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Education Hub
          </Link>
          {category && (
            <p className="text-brand-gold text-sm font-semibold uppercase tracking-widest mb-4">
              {category.name}
            </p>
          )}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white">
            {article.title}
          </h1>
          <p className="text-xl text-white/70 font-light">{article.excerpt}</p>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
        {article.image && (
          <div className="relative aspect-[16/9] rounded-[2rem] overflow-hidden mb-12 shadow-2xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Farm note callout */}
        {article.authorNote && (
          <div
            className="rounded-2xl px-6 py-5 mb-10 border"
            style={{
              background: 'rgba(245,240,232,0.06)',
              borderColor: 'rgba(245,240,232,0.18)',
            }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: 'var(--brand-straw)' }}>
              A note from our farm
            </p>
            <p className="text-white/75 leading-relaxed text-base">{article.authorNote}</p>
          </div>
        )}

        <div className="space-y-6 text-white/80 font-light leading-relaxed text-lg">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Farmer tip callout */}
        {article.farmerTip && (
          <div
            className="mt-10 rounded-2xl px-6 py-5 border border-brand-gold/20"
            style={{ background: 'rgba(236,204,116,0.05)' }}
          >
            <p className="text-xs font-bold tracking-widest uppercase mb-2 text-brand-gold/70">
              Farmer&apos;s tip
            </p>
            <p className="text-white/70 leading-relaxed text-base italic">{article.farmerTip}</p>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}

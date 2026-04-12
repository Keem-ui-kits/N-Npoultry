'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { EducationArticle } from '@/content/education';

interface Category {
  id: string;
  name: string;
  description: string;
}

interface Props {
  categories: Category[];
  articles: EducationArticle[];
}

export function EducationTabsClient({ categories, articles }: Props) {
  const [activeTab, setActiveTab] = useState(categories[0]?.id ?? '');

  const activeCategory = categories.find((c) => c.id === activeTab);
  const activeArticles = articles.filter((a) => a.category === activeTab);

  return (
    <div className="w-full">
      {/* Static Tabs */}
      <section className="py-4 relative z-20">
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}} />
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-start sm:justify-center overflow-x-auto gap-4 sm:gap-8 md:gap-16 px-4 hide-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveTab(cat.id); }}
              title={cat.name}
              className={cn(
                "text-xs md:text-lg lg:text-xl font-bold uppercase tracking-widest transition-all px-5 py-2 md:py-3 border rounded-full whitespace-nowrap overflow-hidden text-ellipsis",
                "max-w-[110px] sm:max-w-[150px] md:max-w-none", // Truncation constraints for mobile
                activeTab === cat.id 
                  ? "text-brand-dark bg-brand-gold border-brand-gold" 
                  : "text-white/50 border-white/20 bg-white/5 hover:border-white/50 hover:text-white/80 hover:bg-white/10"
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Mini Page Content */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto relative z-10 min-h-[50vh]">
        {activeCategory && (
          <div key={activeCategory.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Category Header */}
            <div className="mb-20 border-b border-white/10 pb-8 text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{activeCategory.name}</h2>
              <p className="text-xl md:text-2xl text-brand-gold/80 font-light">{activeCategory.description}</p>
            </div>

            {/* Alternating Articles Layout */}
            <div className="space-y-32">
              {activeArticles.map((article, idx) => {
                // Zig-zag layout: even indexes (0) image left, odd indexes (1) image right
                const isImageRight = idx % 2 !== 0;

                return (
                  <article 
                    key={article.id} 
                    className={cn(
                      "flex flex-col md:items-center gap-12 lg:gap-20 group", 
                      isImageRight ? "md:flex-row-reverse" : "md:flex-row"
                    )}
                  >
                    
                    {/* Article Image */}
                    <div className="relative w-full md:w-1/2 aspect-square lg:aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                    </div>
                    
                    {/* Article Content */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <h3 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight group-hover:text-brand-gold transition-colors">
                        {article.title}
                      </h3>
                      <div className="prose prose-invert prose-lg max-w-none text-white/70 font-light leading-relaxed">
                        {Array.isArray(article.content) ? (
                          article.content.map((paragraph, pIdx) => (
                            <p key={pIdx} className="mb-6">{paragraph}</p>
                          ))
                        ) : (
                          <p>{article.content as React.ReactNode}</p>
                        )}
                      </div>
                    </div>

                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

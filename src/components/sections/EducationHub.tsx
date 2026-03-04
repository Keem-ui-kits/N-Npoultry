// ============================================
// Educational Hub Section
// ============================================
// CMS-driven educational content about chicken manure
// Editors can update content in src/cms/educational.ts

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationalArticles, getFeaturedArticles } from '@/cms/educational';
import { BookOpen, Clock, Tag, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

const EducationHub = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedArticle, setSelectedArticle] = useState<typeof educationalArticles[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const featuredArticles = getFeaturedArticles();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Single card animation
      gsap.fromTo(
        '.group',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const openArticle = (article: typeof educationalArticles[0]) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  // Format content with markdown-like styling
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        // Handle headers
        if (paragraph.startsWith('## ')) {
          return (
            <h3 key={index} className="font-serif text-xl text-gold mt-8 mb-4">
              {paragraph.replace('## ', '')}
            </h3>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h4 key={index} className="font-serif text-lg text-white mt-6 mb-3">
              {paragraph.replace('### ', '')}
            </h4>
          );
        }
        // Handle lists
        if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
          const items = paragraph.split('\n').filter(item => item.trim());
          return (
            <ul key={index} className="list-disc list-inside space-y-2 my-4 text-white/80">
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^[-*] /, '')}</li>
              ))}
            </ul>
          );
        }
        // Handle numbered lists
        if (/^\d+\./.test(paragraph)) {
          const items = paragraph.split('\n').filter(item => item.trim());
          return (
            <ol key={index} className="list-decimal list-inside space-y-2 my-4 text-white/80">
              {items.map((item, i) => (
                <li key={i}>{item.replace(/^\d+\.\s*/, '')}</li>
              ))}
            </ol>
          );
        }
        // Handle bold text
        const formattedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gold">$1</strong>');

        // Regular paragraph
        return (
          <p
            key={index}
            className="text-white/80 leading-relaxed mb-4"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      });
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        <div className="container-custom relative z-10">
          {/* Single Descriptive Card */}
          {featuredArticles.length > 0 && (
            <div className="max-w-5xl mx-auto">
              {featuredArticles.slice(0, 1).map((article) => (
                <article
                  key={article.id}
                  onClick={() => openArticle(article)}
                  className="group cursor-pointer grid lg:grid-cols-12 bg-dark-card rounded-3xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-700 shadow-2xl"
                >
                  {/* Image Wrapper */}
                  <div className="relative lg:col-span-5 aspect-[16/10] lg:aspect-auto overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark-card/50 hidden lg:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent lg:hidden" />
                  </div>

                  {/* Content Wrapper */}
                  <div className="lg:col-span-7 p-8 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6 text-sm font-medium tracking-wider uppercase text-gold/60">
                      <span className="flex items-center gap-1.5">
                        <BookOpen size={16} />
                        {article.category}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <span className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {article.readTime} min read
                      </span>
                    </div>

                    <h2 className="font-serif text-3xl lg:text-5xl text-white mb-6 leading-tight group-hover:text-gold transition-colors duration-500">
                      {article.title}
                    </h2>

                    {article.subtitle && (
                      <p className="text-gold/90 text-xl lg:text-2xl font-medium mb-6">
                        {article.subtitle}
                      </p>
                    )}

                    <p className="text-white/70 text-lg mb-8 leading-relaxed">
                      {article.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-3 mb-10">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/5 text-white/50 border border-white/10 group-hover:border-gold/20 transition-colors"
                        >
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <button className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-dark font-bold rounded-full hover:bg-white transition-all duration-300 group/btn shadow-lg shadow-gold/10">
                        Learn More
                        <ChevronRight
                          size={20}
                          className="transition-transform group-hover/btn:translate-x-1"
                        />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Article Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-card border-gold/20 text-white p-0">
          {selectedArticle && (
            <>
              {/* Article Header Image */}
              <div className="relative aspect-[21/9] overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent" />
              </div>

              {/* Article Content */}
              <div className="px-8 pb-8 -mt-16 relative z-10">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {selectedArticle.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {selectedArticle.readTime} min read
                    </span>
                    <span>•</span>
                    <span>{new Date(selectedArticle.publishedAt).toLocaleDateString()}</span>
                  </div>

                  <DialogTitle className="font-serif text-3xl text-white text-left">
                    {selectedArticle.title}
                  </DialogTitle>

                  {selectedArticle.subtitle && (
                    <p className="text-gold/80 text-lg mt-2">
                      {selectedArticle.subtitle}
                    </p>
                  )}
                </DialogHeader>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 my-6">
                  {selectedArticle.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gold/10 text-gold border border-gold/20"
                    >
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Article Body */}
                <div className="prose prose-invert max-w-none">
                  {formatContent(selectedArticle.content)}
                </div>

                {/* Author & Date */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-sm text-white/50">
                  <span>By {selectedArticle.author}</span>
                  {selectedArticle.updatedAt && (
                    <span>Updated: {new Date(selectedArticle.updatedAt).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default EducationHub;

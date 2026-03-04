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
  const regularArticles = educationalArticles.filter(a => !a.featured);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.education-header',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            once: true
          }
        }
      );

      // Featured article animation
      gsap.fromTo(
        '.featured-article',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.featured-article',
            start: 'top 80%',
            once: true
          }
        }
      );

      // Article cards animation
      gsap.fromTo(
        '.article-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.articles-grid',
            start: 'top 85%',
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
        {/* Section Header */}
        <div className="education-header max-w-2xl mb-16">
          <p className="eyebrow flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Education Hub
          </p>
          <h2 className="section-title text-white mb-6">
            Learn About <br />
            <span className="text-outline">Sustainable Farming</span>
          </h2>
          <p className="text-lg text-white/70">
            Discover the benefits of poultry manure, composting techniques, and sustainable agricultural practices from our experts.
          </p>
        </div>

        {/* Featured Article */}
        {featuredArticles.length > 0 && (
          <div className="featured-article mb-12">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                onClick={() => openArticle(article)}
                className="group cursor-pointer grid lg:grid-cols-2 gap-8 bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                  <span className="badge-gold absolute top-4 left-4">
                    Featured
                  </span>
                </div>

                {/* Content */}
                <div className="p-8 lg:py-12 lg:pr-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 mb-4 text-sm text-white/50">
                    <span className="flex items-center gap-1">
                      <BookOpen size={14} />
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {article.readTime} min read
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl lg:text-3xl text-white mb-3 group-hover:text-gold transition-colors">
                    {article.title}
                  </h3>
                  
                  {article.subtitle && (
                    <p className="text-gold/80 text-lg mb-4">
                      {article.subtitle}
                    </p>
                  )}

                  <p className="text-white/60 mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {article.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-white/5 text-white/50"
                      >
                        <Tag size={10} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="inline-flex items-center gap-2 text-gold font-semibold group/btn">
                    Read Article
                    <ChevronRight 
                      size={18} 
                      className="transition-transform group-hover/btn:translate-x-1" 
                    />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Article Grid */}
        <div className="articles-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => openArticle(article)}
              className="article-card group cursor-pointer bg-dark-card rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="article-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-xs text-white/50">
                  <span>{article.category}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.readTime} min
                  </span>
                </div>

                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-sm text-white/60 line-clamp-2 mb-4">
                  {article.excerpt}
                </p>

                <button className="inline-flex items-center gap-1 text-sm text-gold font-medium group/btn">
                  Read More
                  <ChevronRight 
                    size={14} 
                    className="transition-transform group-hover/btn:translate-x-1" 
                  />
                </button>
              </div>
            </article>
          ))}
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

// ============================================
// Products Section
// ============================================
// CMS-driven product showcase with GSAP animations

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/cms/products';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Products = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const ctx = gsap.context(() => {
      // Section header animation
      gsap.fromTo(
        '.products-header',
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

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.product-card');
      gsap.fromTo(
        cardElements,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const getBadgeClass = (type: string) => {
    switch (type) {
      case 'gold':
        return 'badge-gold';
      case 'cream':
        return 'badge-cream';
      default:
        return 'badge-cream';
    }
  };

  return (
    <section
      ref={sectionRef}
      id="products"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="products-header max-w-2xl mb-16">
          <p className="eyebrow flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Our Collection
          </p>
          <h2 className="section-title text-white mb-6">
            Three Products, <br />
            <span className="text-outline">One Trusted Source</span>
          </h2>
          <p className="text-lg text-white/70">
            From day-collected table eggs to organic farm nutrients — everything you need from a supplier you can trust.
          </p>
        </div>

        {/* Products Grid */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {products.map((product) => (
            <article 
              key={product.id} 
              className="product-card group"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
                  loading="lazy"
                />
                {/* Badge */}
                <span className={`absolute top-4 left-4 ${getBadgeClass(product.badgeType)}`}>
                  {product.badge}
                </span>
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col">
                <h3 className="card-title text-white mb-3">
                  {product.name}
                </h3>
                <p className="text-sm text-white/60 mb-4 flex-grow leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <li 
                      key={index}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <span className="text-gold text-xs mt-1">✦</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={product.ctaLink}
                  onClick={(e) => handleNavClick(e, product.ctaLink)}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    product.id === 'table-eggs'
                      ? 'btn-primary btn-sm'
                      : 'btn-dark btn-sm'
                  }`}
                >
                  {product.ctaText}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

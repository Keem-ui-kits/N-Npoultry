// ============================================
// Testimonials Section
// ============================================
// Customer testimonials with GSAP animations

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { testimonials } from '@/cms/settings';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.testimonials-header',
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

      // Cards animation
      gsap.fromTo(
        '.testimonial-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-grid',
            start: 'top 85%',
            once: true
          }
        }
      );

      // Bottom CTA animation
      gsap.fromTo(
        '.testimonials-cta',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.testimonials-cta',
            start: 'top 90%',
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

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="testimonials-header max-w-2xl mb-16">
          <p className="eyebrow flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-gold" />
            Excellence Recognized
          </p>
          <h2 className="section-title text-white mb-6">
            Trusted by <br />
            <span className="text-outline">Homes & Businesses</span>
          </h2>
          <p className="text-lg text-white/70">
            From home cooks to restaurant owners — our customers choose N&N for freshness they can count on, every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="testimonial-card relative"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-gold text-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="relative text-white/85 italic leading-relaxed mb-8">
                <span className="absolute -top-4 -left-2 text-6xl text-gold/20 font-serif leading-none">
                  "
                </span>
                {testimonial.quote}
              </blockquote>

              {/* Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-cream-dark/30">
                <div>
                  <strong className="block text-white font-semibold">
                    {testimonial.name}
                  </strong>
                  <span className="text-sm text-white/50">
                    {testimonial.role}, {testimonial.location}
                  </span>
                </div>
                <span className={`badge-verified text-[0.6rem] ${
                  testimonial.verifiedType === 'wholesale' ? 'text-gold' : ''
                }`}>
                  ✓ Verified {testimonial.verifiedType === 'wholesale' ? 'Wholesale' : 'Buyer'}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="testimonials-cta text-center">
          <p className="text-white/50 text-sm mb-6">
            Join hundreds of satisfied customers across Machakos and Nairobi.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#order"
              onClick={(e) => handleNavClick(e, '#order')}
              className="btn-primary"
            >
              Order Fresh Eggs Now
            </a>
            <a
              href="#order"
              onClick={(e) => handleNavClick(e, '#order')}
              className="btn-dark"
            >
              Get Wholesale Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

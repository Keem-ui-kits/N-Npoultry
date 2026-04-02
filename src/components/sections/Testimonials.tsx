import { testimonials } from '@/content/testimonials';
import { TestimonialsCarousel } from './TestimonialsCarousel';
import { FadeIn } from '@/components/ui/fade-in';

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-[#f8f9fa] dark:from-background dark:to-muted/20"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <FadeIn delay={0} className="mb-8 md:mb-12">
          <h2 className="text-foreground dark:text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            Trusted by
            <br />
            Homes & Businesses
          </h2>
          <p className="text-foreground/80 dark:text-gray-300 text-lg md:text-2xl max-w-3xl font-light">
            Join hundreds of satisfied customers across Machakos
          </p>
        </FadeIn>
      </div>

      {/* Stagger Cards Area */}
      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  );
}

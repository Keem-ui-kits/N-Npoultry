"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { Star, StarHalf, ChevronLeft, ChevronRight } from "lucide-react";
const imgProducts = "/849ef451bd4a8a97096bdd31572b4b90d966f0cd.png";

const testimonials = [
  {
    id: 1,
    name: "Wanjiru M.",
    location: "Home Cook, Syokimau",
    rating: 3.5,
    text: "I've been buying from N&N for over eight months and the eggs are consistently fresh. Living in Syokimau, it's great to have such high-quality eggs delivered right to my door. The yolks are bright and rich — you can really taste the difference!"
  },
  {
    id: 2,
    name: "Chef Kamau J.",
    location: "Restaurant Owner, Machakos Town",
    rating: 3.5,
    text: "We switched our restaurant supply in Machakos Town to N&N six months ago. Their wholesale pricing is fair, invoicing is professional, and I have never had a rejected batch. Reliable and easy to work with — highly recommended for any local food business."
  },
  {
    id: 3,
    name: "Amina S.",
    location: "Breakfast Kiosk Owner, Athi River",
    rating: 3.5,
    text: "I run a small breakfast kiosk in Athi River and N&N's 30-egg trays have been a game-changer. Freshness every morning, WhatsApp ordering is super convenient, and they even remind me before I run low. This is the kind of supplier every small business needs."
  }
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-6 h-6 md:w-7 md:h-7 fill-[#F8A401] text-[#F8A401]" />
      ))}
      {hasHalfStar && <StarHalf className="w-6 h-6 md:w-7 md:h-7 fill-[#F8A401] text-[#F8A401]" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-6 h-6 md:w-7 md:h-7 text-[#F8A401]" />
      ))}
    </div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" ref={ref} className="relative min-h-screen flex items-center justify-center py-16 md:py-24 overflow-hidden bg-gradient-to-b from-white to-[#f8f9fa] dark:from-background dark:to-muted/20">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-[#133240] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6">
            Trusted by
            <br />
            Homes & Businesses
          </h2>
          <p className="text-[#133240] text-lg md:text-2xl max-w-3xl">
            Join hundreds of satisfied customers across Machakos
          </p>
        </motion.div>

        {/* Desktop View - All Cards */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-6 xl:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white rounded-lg p-6 md:p-8 border border-[#e7eaec] shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-[#133240] text-xl md:text-2xl font-semibold mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-[#133240] text-sm md:text-base font-light">
                    {testimonial.location}
                  </p>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
              <p className="text-[#133240] text-base md:text-lg leading-relaxed">
                {testimonial.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile/Tablet View - Carousel */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg p-6 md:p-8 border border-[#e7eaec] shadow-lg min-h-[320px] flex flex-col"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-[#133240] text-xl md:text-2xl font-semibold mb-1">
                  {testimonials[activeIndex].name}
                </h3>
                <p className="text-[#133240] text-sm md:text-base font-light">
                  {testimonials[activeIndex].location}
                </p>
              </div>
              <StarRating rating={testimonials[activeIndex].rating} />
            </div>
            <p className="text-[#133240] text-base md:text-lg leading-relaxed flex-grow">
              {testimonials[activeIndex].text}
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 border-2 border-[#133240] rounded-lg hover:bg-[#133240] hover:text-white transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? "bg-gradient-to-r from-[#eccc74] to-[#f59268] w-8"
                      : "bg-[#9BD609]/30"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="p-3 border-2 border-[#133240] rounded-lg hover:bg-[#133240] hover:text-white transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

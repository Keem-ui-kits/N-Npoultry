'use client';

import { products } from '@/content/products';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export function ProductsTeaser() {
  return (
    <section id="products-teaser" className="py-24 bg-white dark:bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase tracking-tight">
              Premium <span className="gradient-brand-text">Poultry</span> Products
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              Daily collected farm-fresh eggs and organic nutrients. Trusted quality from Machakos, Kenya.
            </p>
          </div>
          <Link 
            href="/products" 
            className="group flex items-center gap-2 text-brand-dark dark:text-white font-bold text-lg hover:text-brand-gold transition-colors"
          >
            Explore All Products
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:gap-8 pb-12">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1 }}
              className="sticky md:static group relative bg-card dark:bg-brand-dark/60 rounded-3xl border border-border dark:border-white/10 overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-row md:flex-col items-center"
              style={{
                top: `calc(100px + ${index * 20}px)`, // Stacking offset for mobile sticky
                zIndex: index
              }}
            >
              {/* Content (Left on mobile, Bottom on desktop) */}
              <div className="p-6 md:p-8 flex-1 order-1 md:order-2 w-2/3 md:w-full">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  {product.title} <span className="text-brand-gold">{product.titleAccent}</span>
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm line-clamp-2 mb-4 md:mb-6 pr-4 md:pr-0">
                  {product.description}
                </p>
                <Link 
                  href={`/products#${product.id}`}
                  className="inline-flex items-center gap-2 text-brand-gold font-bold text-xs md:text-sm uppercase tracking-wider"
                >
                  Learn More <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </Link>
              </div>

              {/* Image (Right on mobile, Top on desktop) */}
              <div className="relative w-1/3 min-h-[140px] md:min-h-0 md:w-full md:aspect-square flex items-center justify-center bg-muted/20 dark:bg-black/20 order-2 md:order-1 shrink-0">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-2 md:p-8 group-hover:scale-110 transition-transform duration-500 scale-125 md:scale-100 -translate-x-2 md:translate-x-0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

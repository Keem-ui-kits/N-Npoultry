"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
const imgProducts = "/849ef451bd4a8a97096bdd31572b4b90d966f0cd.png";
const imgImage = "/5b2538566d246a3ffc8bc417d070f8759a9e7830.png";

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="about" ref={ref} className="relative min-h-screen flex items-center justify-center py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white dark:from-muted/20 dark:to-background">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[#133240] text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-12 uppercase text-center md:text-left"
        >
          THE <span className="bg-gradient-to-r from-[#eccc74] to-[#f59268] bg-clip-text text-transparent">N&N</span> STANDARD
        </motion.h2>

        <div className="relative bg-[#f8f8f8]/60 rounded-3xl p-6 md:p-12 lg:p-16 backdrop-blur-sm">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
            >
              <img
                alt="Poultry farm"
                className="absolute inset-0 object-cover w-full h-full transform rotate-180 scale-y-[-1]"
                src={imgImage}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-[#133240] text-base md:text-lg mb-6">
                <span className="font-bold">N&N Poultry Palace</span> is a family-run poultry business rooted in{" "}
                <span className="font-semibold">Machakos</span>, built on a commitment to quality, trust, and community. Guided by a clear vision to lead in sustainable poultry production, we combine modern husbandry practices, rigorous quality control, and environmentally responsible methods to ensure every product meets our exacting standards. Beyond production, we are driven by a mission to uplift the communities that sustain us — creating opportunities, supporting local farmers, and contributing to a stronger agricultural ecosystem.
              </p>
              
              <p className="text-[#133240] text-base md:text-lg mb-6">
                Integrity, reliability, and teamwork define how we operate.
              </p>
              
              <p className="text-[#133240] text-base md:text-lg mb-8">
                We believe in doing what's right, delivering on our promises, and working together to achieve excellence. Through every product we supply, we aim to create lasting value for farmers, retailers, and consumers alike.
              </p>
              
              <p className="text-[#133240] text-base md:text-lg italic">
                "Fresh and Nutritious" isn't just a tagline — it's our promise to deliver wholesome, responsibly produced products that people can trust.
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-12"
          >
            <div className="bg-white/80 rounded-xl p-6">
              <h3 className="text-[#133240] font-bold text-lg md:text-xl mb-3">Vision:</h3>
              <p className="text-[#133240] text-sm md:text-base">
                To be East Africa's leading provider of sustainable quality poultry products.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-6">
              <h3 className="text-[#133240] font-bold text-lg md:text-xl mb-3">Mission:</h3>
              <p className="text-[#133240] text-sm md:text-base">
                Driving progress in the poultry industry while uplifting the economies that sustain it.
              </p>
            </div>
            
            <div className="bg-white/80 rounded-xl p-6 sm:col-span-2 lg:col-span-1">
              <h3 className="text-[#133240] font-bold text-lg md:text-xl mb-3">Core Values:</h3>
              <ul className="text-[#133240] text-sm md:text-base space-y-2">
                <li>✓ We believe in doing what's right—always.</li>
                <li>✓ We are reliable and deliver on our promises.</li>
                <li>✓ We work as one team, sharing ideas, responsibilities, and successes.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

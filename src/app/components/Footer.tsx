"use client";
import { motion } from "motion/react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
const imgDesignStudioLogo = "/f05a8416be46c845b2cc564f11cec0d15aac5ab1.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#133240] bg-gradient-to-tr from-[#0f2935] via-[#133240] to-[#1a4153] text-white overflow-hidden border-t border-white/5">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#eccc74] to-[#f59268]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img
              alt="N&N Poultry Palace Logo"
              className="h-12 md:h-16 w-auto mb-4"
              src={imgDesignStudioLogo}
            />
            <p className="text-white/70 text-sm md:text-base mb-4">
              Fresh and Nutritious — your trusted source for farm-fresh eggs in Machakos.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#eccc74] hover:to-[#f59268] transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#eccc74] hover:to-[#f59268] transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#eccc74] hover:to-[#f59268] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gradient-to-r hover:from-[#eccc74] hover:to-[#f59268] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Home
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  About Us
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Contact
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-4">Our Products</h3>
            <ul className="space-y-3">
              <li>
                <a href="#products" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Table Eggs (30pc)
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Bulk Cases
                </a>
              </li>
              <li>
                <a href="#products" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Commercial Supply
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  Business Account
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg md:text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#eccc74] flex-shrink-0 mt-0.5" />
                <div className="text-white/70 text-sm md:text-base">
                  <div>0113366723</div>
                  <div>0714246534</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#eccc74] flex-shrink-0 mt-0.5" />
                <a href="mailto:info@nnpoultry.co.ke" className="text-white/70 hover:text-[#eccc74] transition-colors text-sm md:text-base">
                  info@nnpoultry.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#eccc74] flex-shrink-0 mt-0.5" />
                <span className="text-white/70 text-sm md:text-base">
                  Machakos, Kenya
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm text-center sm:text-left">
              © {currentYear} N&N Poultry Palace. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/50 hover:text-[#eccc74] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/50 hover:text-[#eccc74] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

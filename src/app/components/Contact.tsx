"use client";
import { motion } from "motion/react";
import { useInView } from "motion/react";
import { useRef, useState } from "react";
import { MapPin, Mail, Phone, Send } from "lucide-react";
const imgProducts = "/849ef451bd4a8a97096bdd31572b4b90d966f0cd.png";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" ref={ref} className="relative min-h-screen flex items-center justify-center py-16 md:py-24 overflow-hidden bg-gradient-to-b from-[#f8f9fa] to-white dark:from-muted/20 dark:to-background">
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-[#f8f8f8] rounded-3xl p-6 md:p-12 lg:p-16">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-[#133240] text-3xl sm:text-4xl md:text-5xl font-black mb-6">
                Contact us
              </h2>
              
              <p className="text-[#133240] text-base md:text-lg mb-8">
                We are committed to processing the information in order to contact you and talk about your project.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#133240] font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <Mail className="w-6 h-6 text-[#FD7E1E]" />
                    Open a business account
                  </h3>
                  <p className="text-[#133240] text-sm md:text-base pl-9">
                    For planning and logistics, fill the call card. Terms - COD
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[#133240] font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#FD7E1E]" />
                    Business Hours
                  </h3>
                  <p className="text-[#133240] text-sm md:text-base pl-9">
                    Mon–Fri: 8:00 AM – 5:00 PM<br />
                    Sat: 8:00 AM – 12:00 PM
                  </p>
                </div>
                
                <div>
                  <h3 className="text-[#133240] font-bold text-lg md:text-xl mb-3 flex items-center gap-3">
                    <Phone className="w-6 h-6 text-[#FD7E1E]" />
                    Phone
                  </h3>
                  <p className="text-[#133240] text-sm md:text-base pl-9">
                    0113366723 / 0714246534
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-[#133240] text-sm md:text-base mb-2">
                  Name <span className="text-[#eb5757]">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-[#bdbdbd] rounded-xl text-[#133240] focus:outline-none focus:ring-2 focus:ring-[#eccc74] transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-[#133240] text-sm md:text-base mb-2">
                  Email <span className="text-[#eb5757]">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-[#bdbdbd] rounded-xl text-[#133240] focus:outline-none focus:ring-2 focus:ring-[#eccc74] transition-all shadow-sm"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-[#133240] text-sm md:text-base mb-2">
                  Website <span className="text-[#eb5757]">*</span>
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-white border border-[#bdbdbd] rounded-xl text-[#133240] focus:outline-none focus:ring-2 focus:ring-[#eccc74] transition-all"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-[#133240] text-sm md:text-base mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-5 py-4 bg-white border border-[#bdbdbd] rounded-xl text-[#133240] focus:outline-none focus:ring-2 focus:ring-[#eccc74] transition-all resize-none"
                  placeholder="Tell us about your needs..."
                />
              </div>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#eccc74] to-[#f59268] text-[#133240] rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Submit
                <Send className="w-5 h-5" />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}

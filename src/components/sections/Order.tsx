// ============================================
// Order Section
// ============================================
// Contact form and order placement with validation

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteSettings } from '@/cms/settings';
import { products } from '@/cms/products';
import {
  MessageCircle,
  Phone,
  Send,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

interface FormData {
  name: string;
  phone: string;
  email: string;
  product: string;
  quantity: string;
  deliveryAddress: string;
  preferredDate: string;
  orderType: 'retail' | 'wholesale';
  message: string;
}

const Order = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    product: '',
    quantity: '',
    deliveryAddress: '',
    preferredDate: '',
    orderType: 'retail',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Left content animation
      gsap.fromTo(
        '.order-left',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            once: true
          }
        }
      );

      // Form animation
      gsap.fromTo(
        '.order-form',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            once: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.product || !formData.quantity || !formData.deliveryAddress) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
    toast.success('Order submitted successfully!');

    // Reset form after delay
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        product: '',
        quantity: '',
        deliveryAddress: '',
        preferredDate: '',
        orderType: 'retail',
        message: ''
      });
      setIsSuccess(false);
    }, 5000);
  };

  const openWhatsApp = (product: string = 'Eggs') => {
    const message = encodeURIComponent(
      `Hi N&N Poultry Palace — I'd like to order: ${product}. Please get in touch!`
    );
    window.open(
      `https://wa.me/${siteSettings.contact.whatsapp}?text=${message}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <section
      ref={sectionRef}
      id="order"
      className="section-padding relative overflow-hidden bg-dark-lighter"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 -translate-y-1/3" />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: Contact Info */}
          <div className="order-left">
            <p className="eyebrow flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-gold" />
              Order Now
            </p>

            <div className="divider-gold mb-6" />

            <h2 className="section-title text-white mb-6">
              Ready to Order? <br />
              <span className="text-outline">Get in Touch.</span>
            </h2>

            <p className="text-white/70 mb-10 leading-relaxed">
              Fill in the form, WhatsApp us, or call directly — we make ordering as easy as possible for both retail and wholesale customers.
            </p>

            {/* Contact Channels */}
            <div className="space-y-4 mb-10">
              <button
                onClick={() => openWhatsApp()}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-gold/20 hover:bg-gold/10 hover:border-gold transition-all duration-300 group text-left"
              >
                <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark transition-colors">
                  <MessageCircle size={24} />
                </span>
                <div>
                  <strong className="block text-white">Chat on WhatsApp</strong>
                  <span className="text-sm text-white/50">Fastest response — we reply within minutes</span>
                </div>
              </button>

              <a
                href={`tel:${siteSettings.contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-gold/20 hover:bg-gold/10 hover:border-gold transition-all duration-300 group"
              >
                <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark transition-colors">
                  <Phone size={24} />
                </span>
                <div>
                  <strong className="block text-white">Call Us: {siteSettings.contact.phone}</strong>
                  <span className="text-sm text-white/50">Mon–Fri: 8:00 AM – 5:00 PM | Sat: 8:00 AM – 12:00 PM</span>
                </div>
              </a>
            </div>

            {/* Business Account CTA */}
            <div className="p-6 rounded-xl bg-gold/5 border border-gold/20">
              <h4 className="font-serif text-gold text-lg mb-2">
                🏢 Open a Business Account
              </h4>
              <p className="text-sm text-white/60 mb-4">
                For planning and logistics, fill the call card. Terms - COD
              </p>
              <a
                href="#order-form"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-outline-gold btn-sm"
              >
                Apply for Business Account
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="order-form">
            <div className="bg-white/[0.03] border border-gold/10 rounded-xl p-6 lg:p-8">
              {isSuccess ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-4">
                    Thank You — Order Received!
                  </h3>
                  <p className="text-white/60 mb-6">
                    We've received your request. A N&N representative will confirm your order within 24 hours.
                  </p>
                  <button
                    onClick={() => openWhatsApp('my order')}
                    className="btn-whatsapp"
                  >
                    <MessageCircle size={18} />
                    Follow Up on WhatsApp
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="font-serif text-xl text-white mb-6 pb-4 border-b border-gold/20">
                    📋 Place Your Order
                  </h3>

                  <form id="order-form" onSubmit={handleSubmit} className="space-y-4">
                    {/* Name & Phone */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">
                          Full Name <span className="text-gold">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Jane Doe"
                          className="form-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="form-label">
                          Phone Number <span className="text-gold">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+254 712 345 678"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="form-label">
                        Email Address <span className="text-white/40 font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="jane@example.com"
                        className="form-input"
                      />
                    </div>

                    {/* Product & Quantity */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">
                          Product <span className="text-gold">*</span>
                        </label>
                        <select
                          name="product"
                          value={formData.product}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          <option value="" disabled>Select a product...</option>
                          {products.map(product => (
                            <option key={product.id} value={product.name}>
                              {product.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">
                          Quantity <span className="text-gold">*</span>
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          value={formData.quantity}
                          onChange={handleInputChange}
                          placeholder="e.g. 10 (cartons)"
                          min="1"
                          className="form-input"
                          required
                        />
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <div>
                      <label className="form-label">
                        Delivery Address <span className="text-gold">*</span>
                      </label>
                      <textarea
                        name="deliveryAddress"
                        value={formData.deliveryAddress}
                        onChange={handleInputChange}
                        placeholder="Street, area, Machakos..."
                        rows={2}
                        className="form-textarea"
                        required
                      />
                    </div>

                    {/* Date & Order Type */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">
                          Preferred Delivery Date
                        </label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                      </div>
                      <div>
                        <label className="form-label">
                          Order Type
                        </label>
                        <select
                          name="orderType"
                          value={formData.orderType}
                          onChange={handleInputChange}
                          className="form-select"
                        >
                          <option value="retail">Retail / Consumer</option>
                          <option value="wholesale">Wholesale / Business</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="form-label">
                        Additional Notes
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Special instructions, quantities, or questions..."
                        rows={3}
                        className="form-textarea"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex flex-wrap gap-3 pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary flex-1 min-h-[48px]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Submit Order Request
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Order;

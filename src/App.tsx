// ============================================
// N&N Poultry Palace - Main App
// ============================================
// CMS-driven Next.js-inspired React application
// with GSAP animations and gold-on-black premium theme

import { useEffect } from 'react';
import { Toaster } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Section Components
import Hero from '@/components/sections/Hero';
import Products from '@/components/sections/Products';
import Trust from '@/components/sections/Trust';
import EducationHub from '@/components/sections/EducationHub';
import Testimonials from '@/components/sections/Testimonials';
import Order from '@/components/sections/Order';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Configure GSAP defaults
    gsap.config({
      nullTargetWarn: false,
    });

    // Set up ScrollTrigger defaults
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
    });

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-dark text-white overflow-x-hidden">
      {/* Toast Notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#141414',
            color: '#fff',
            border: '1px solid rgba(212, 175, 55, 0.2)',
          },
        }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero />
        <Products />
        <Trust />
        <EducationHub />
        <Testimonials />
        <Order />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

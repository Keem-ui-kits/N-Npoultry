// ============================================
// N&N Poultry Palace - Main App
// ============================================
// CMS-driven Next.js-inspired React application
// with GSAP animations and gold-on-black premium theme

import { useEffect, Suspense, lazy } from 'react';
import { Toaster } from 'sonner';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Eagerly Loaded
import HeroSection from '@/components/sections/HeroSection';

// Lazy Loaded Sections
const Products = lazy(() => import('@/components/sections/Products'));
const Trust = lazy(() => import('@/components/sections/Trust'));
const Testimonials = lazy(() => import('@/components/sections/Testimonials'));
const Order = lazy(() => import('@/components/sections/Order'));

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Force scroll to top on load/reload
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

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
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as any);
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
        <HeroSection />
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20 bg-dark">
              <div className="w-8 h-8 rounded-full border-t-2 border-b-2 border-gold animate-spin" />
            </div>
          }
        >
          <Products />
          <Trust />
          <Testimonials />
          <Order />
        </Suspense>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

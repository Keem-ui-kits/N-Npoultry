import { Hero } from "./components/Hero";
import { Products } from "./components/Products";
import { HowWeWork } from "./components/HowWeWork";
import { About } from "./components/About";
import { Testimonials } from "./components/Testimonials";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Products />
      <HowWeWork />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}

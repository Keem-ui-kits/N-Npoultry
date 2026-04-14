import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface StaticPageWrapperProps {
  children: React.ReactNode;
}

export function StaticPageWrapper({ children }: StaticPageWrapperProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

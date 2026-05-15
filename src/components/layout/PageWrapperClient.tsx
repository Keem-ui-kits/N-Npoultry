'use client';

import { Navbar } from '@/components/layout/Navbar';

interface PageWrapperClientProps {
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function PageWrapperClient({ children, footer }: PageWrapperClientProps) {

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />
      <main id="main-content" className="flex-grow relative">
        {children}
      </main>
      {footer}
    </div>
  );
}

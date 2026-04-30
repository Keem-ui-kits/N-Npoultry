import Link from 'next/link';
import { PageWrapper } from '@/components/layout/PageWrapper';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 — Page Not Found | N&N Poultry Palace',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <PageWrapper>
      <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 text-center px-4 bg-gradient-to-b from-[#030213] to-black">
        <h1 className="text-8xl md:text-9xl font-black gradient-brand-text animate-pulse">404</h1>
        <div className="space-y-2">
          <p className="text-2xl md:text-3xl font-bold text-white tracking-tight">Oops! Page not found.</p>
          <p className="text-muted-foreground max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to a new nest.
          </p>
        </div>
        <Link 
          href="/" 
          className="mt-4 gradient-brand text-brand-dark px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all text-lg"
        >
          Back to Home
        </Link>
      </div>
    </PageWrapper>
  );
}

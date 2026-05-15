'use client';

import { RefreshCcw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Next.js Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-4 bg-gradient-to-b from-[#030213] to-black">
      <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center text-destructive mb-4">
        <RefreshCcw className="w-10 h-10" />
      </div>
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Something went wrong</h1>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          {error.message}
        </p>
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => { reset(); }}
          className="gradient-brand text-brand-dark px-10 py-4 rounded-full font-bold shadow-xl hover:scale-105 transition-all text-lg flex items-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" /> Try again
        </button>
        <Link
          href="/"
          className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-bold hover:bg-white/10 transition-all text-lg"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

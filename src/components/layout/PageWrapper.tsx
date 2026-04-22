import { PageWrapperClient } from '@/components/layout/PageWrapperClient';
import { Footer } from '@/components/layout/Footer';

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <PageWrapperClient footer={<Footer />}>
      {children}
    </PageWrapperClient>
  );
}

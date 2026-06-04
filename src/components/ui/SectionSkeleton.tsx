import { Skeleton } from '@/components/ui/skeleton';

export function SectionSkeleton() {
  return (
    <div className="py-24 max-w-7xl mx-auto px-4">
      <Skeleton className="h-12 w-1/3 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}

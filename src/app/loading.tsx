export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
        <span className="text-brand-gold/60 text-xs tracking-widest uppercase font-semibold animate-pulse">
          Loading
        </span>
      </div>
    </div>
  );
}

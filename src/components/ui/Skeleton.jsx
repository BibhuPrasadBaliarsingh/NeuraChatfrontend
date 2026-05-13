export function SkeletonLine({ className = '' }) {
  return (
    <div className={`h-3 rounded-full shimmer-bg ${className}`} />
  );
}

export function MessageSkeleton() {
  return (
    <div className="flex gap-3 px-4 py-5 animate-fadeIn">
      <div className="w-8 h-8 rounded-full bg-white/10 shimmer-bg shrink-0 mt-0.5" />
      <div className="flex-1 space-y-2 pt-1">
        <SkeletonLine className="w-3/4" />
        <SkeletonLine className="w-1/2" />
        <SkeletonLine className="w-5/6" />
      </div>
    </div>
  );
}

export function SidebarSkeleton() {
  return (
    <div className="space-y-1 px-2">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-9 rounded-lg shimmer-bg" style={{ opacity: 1 - i * 0.15 }} />
      ))}
    </div>
  );
}

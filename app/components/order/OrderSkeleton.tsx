export function OrderSkeleton() {
  return (
    <div className="container py-8 space-y-6">
      <div className="h-9 w-40 bg-slate-200 rounded animate-pulse mb-8" />
      {[1, 2].map((i) => (
        <div
          key={i}
          className="overflow-hidden rounded-xl border bg-white shadow-sm space-y-4"
        >
          <div className="h-16 bg-slate-100 animate-pulse" />
          <div className="p-6 space-y-4">
            <div className="flex gap-4 items-center">
              <div className="h-16 w-16 bg-slate-200 rounded-lg animate-pulse" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

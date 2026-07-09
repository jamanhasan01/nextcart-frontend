"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 ">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl border bg-card">
          {/* Product Image */}
          <Skeleton className="aspect-square w-full" />

          {/* Product Content */}
          <div className="space-y-3 p-4">
            <Skeleton className="h-3 w-20" />

            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />

            <Skeleton className="h-4 w-24" />

            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>

            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsSkeleton;

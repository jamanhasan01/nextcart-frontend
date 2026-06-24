import { Skeleton } from "@/components/ui/skeleton";

export function TableSkeleton() {
  return (
    <div className="rounded-lg border">
      <div className="p-4 border-b">
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="space-y-4 p-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-7 gap-4 items-center"
          >
            <Skeleton className="h-10 w-10 rounded-md" />

            <Skeleton className="h-4 w-32" />

            <Skeleton className="h-4 w-40" />

            <Skeleton className="h-4 w-24" />

            <Skeleton className="h-6 w-20 rounded-full" />

            <Skeleton className="h-4 w-28" />

            <div className="flex justify-end">
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
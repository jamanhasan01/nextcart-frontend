"use client";

import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const ActiveFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters: {
    key: string;
    label: string;
    value: string;
  }[] = [];

  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const search = searchParams.get("search");

  if (category) {
    filters.push({
      key: "category",
      value: category,
      label: "Category",
    });
  }

  if (search) {
    filters.push({
      key: "search",
      value: search,
      label: `Search: ${search}`,
    });
  }

  if (sort) {
    filters.push({
      key: "sort",
      value: sort,
      label: `Sort: ${sort}`,
    });
  }

  if (minPrice || maxPrice) {
    filters.push({
      key: "price",
      value: "",
      label: `৳${minPrice || 0} - ৳${maxPrice || "∞"}`,
    });
  }

  if (!filters.length) return null;

  const handleRemove = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    switch (key) {
      case "price":
        params.delete("minPrice");
        params.delete("maxPrice");
        break;

      default:
        params.delete(key);
    }

    params.delete("page");

    router.push(`/products?${params.toString()}`);
  };

  const handleClearAll = () => {
    router.push("/products");
  };

  return (
    <div className="rounded-xl border bg-background p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">
          Active Filters
        </h3>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((filter) => (
          <Badge
            key={filter.key}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1"
          >
            {filter.label}

            <button
              onClick={() => handleRemove(filter.key)}
              className="rounded-full p-0.5 hover:bg-muted"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
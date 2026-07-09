"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Grid2X2, List, ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SearchFilter from "./SearchFilter";

interface ProductsToolbarProps {
  totalProducts?: number;
  view?: "grid" | "list";
  onViewChange?: (view: "grid" | "list") => void;
}

const ProductsToolbar = ({
  totalProducts = 0,
  view = "grid",
  onViewChange,
}: ProductsToolbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "newest";

const handleSortChange = (value: string | null) => {
  if (!value) return;

  const params = new URLSearchParams(searchParams.toString());

  switch (value) {
    case "newest":
      params.set("sort", "-createdAt");
      break;

    case "oldest":
      params.set("sort", "createdAt");
      break;

    case "price-asc":
      params.set("sort", "price");
      break;

    case "price-desc":
      params.set("sort", "-price");
      break;

    case "name-asc":
      params.set("sort", "name");
      break;

    case "name-desc":
      params.set("sort", "-name");
      break;

    default:
      params.delete("sort");
  }

  params.delete("page");

  router.push(`${pathname}?${params.toString()}`);
};

  return (
    <div className="flex  gap-4 rounded-xl border bg-card p-4 flex-row items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold text-foreground">
          {totalProducts.toLocaleString()}
        </span>{" "}
        products
      </p>

      <div className="flex items-center gap-3">
        <Select value={currentSort} onValueChange={handleSortChange}>
          <SelectTrigger className="w-[200px]">
            <ArrowUpDown className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name (A–Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z–A)</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex rounded-md border">
          <Button
            variant={view === "grid" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewChange?.("grid")}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>

          <Button
            variant={view === "list" ? "default" : "ghost"}
            size="icon"
            onClick={() => onViewChange?.("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductsToolbar;

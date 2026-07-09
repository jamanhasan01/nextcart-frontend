"use client";

import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";

interface ProductsHeaderProps {
  totalProducts?: number;
}

const ProductsHeader = ({
  totalProducts = 0,
}: ProductsHeaderProps) => {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link
          href="/"
          className="transition-colors hover:text-foreground"
        >
          Home
        </Link>

        <ChevronRight className="h-4 w-4" />

        <span className="font-medium text-foreground">
          Products
        </span>
      </nav>

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            All Products
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Browse our complete collection and discover the perfect
            products for your needs.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-xl border bg-muted/40 px-4 py-3">
          <Package className="h-5 w-5 text-primary" />

          <div>
            <p className="text-xs text-muted-foreground">
              Available Products
            </p>

            <p className="text-lg font-bold">
              {totalProducts.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
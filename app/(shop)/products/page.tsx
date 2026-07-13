"use client";

import { useSearchParams } from "next/navigation";
import React, { useState, useMemo, Suspense } from "react";

import ProductsHeader from "./components/ProductsHeader";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsFilters from "./components/ProductsFilters";
import ProductsGrid from "./components/ProductsGrid";
import MobileFilters from "./components/MobileFilters";
import SearchFilter from "./components/SearchFilter";
import { PaginationComponent } from "@/app/components/common/PaginationComponent";

import { useProducts, useProductsStats } from "@/hooks/products/useProducts";
import useDebounce from "@/hooks/useDebounce";

// 1. Core Logic Component
const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");

  // Read search filters from URL
  const categories = searchParams?.get("category") ?? "";
  const sort = searchParams?.get("sort") ?? "";
  const minPrice = searchParams?.get("minPrice") ?? "";
  const maxPrice = searchParams?.get("maxPrice") ?? "";
  const search = searchParams?.get("search") ?? "";

  // Keep pagination in sync with URL if present, otherwise default to 1
  const pageParam = searchParams?.get("page") ?? "1";
  const [page, setPage] = useState(() => parseInt(pageParam, 10) || 1);

  const { debouncevalue } = useDebounce(search, 1000);

  // Fetch hook matching your data requirements
  const { products, isLoading, pagination } = useProducts({
    categories,
    sort,
    minPrice,
    maxPrice,
    search: debouncevalue,
    page, // Passed state parameter if hook accepts it
  });

  const { stats } = useProductsStats();

  const totalProducts = stats?.totalProducts;
  const total = pagination?.total_product;
  const totalPage = pagination?.total_page ?? 0;
  const limit = pagination?.limit;

  return (
    <div className="container mx-auto px-4">
      <ProductsHeader totalProducts={totalProducts} />
      <div className="my-6 lg:hidden">
        <SearchFilter />
      </div>

      {/* Mobile Filter */}
      <div className="mt-6 lg:hidden">
        <MobileFilters />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        {/* Desktop Filter */}
        <aside className="hidden lg:block">
          <ProductsFilters />
        </aside>

        <main className="space-y-6">
          <ProductsToolbar
            totalProducts={total}
            view={view}
            onViewChange={setView}
          />
          <ProductsGrid products={products} isLoading={isLoading} view={view} />

          {/* Pagination section */}
          <div>
            {totalPage > 1 && (
              <PaginationComponent
                total_page={totalPage}
                page={page}
                limit={limit}
                setPage={setPage}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

// 2. Simple Loading Fallback skeleton layout
const ProductsLoadingFallback = () => (
  <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[400px]">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
    <p className="text-muted-foreground animate-pulse">
      Loading catalog details...
    </p>
  </div>
);

// 3. Main Build-Safe Page Wrapper
const ProductsPage = () => {
  return (
    <Suspense fallback={<ProductsLoadingFallback />}>
      <ProductsPageContent />
    </Suspense>
  );
};

export default ProductsPage;

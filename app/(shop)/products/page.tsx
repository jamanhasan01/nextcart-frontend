"use client";

import { useSearchParams } from "next/navigation";

import ProductsHeader from "./components/ProductsHeader";
import ProductsToolbar from "./components/ProductsToolbar";
import ProductsFilters from "./components/ProductsFilters";
import ProductsGrid from "./components/ProductsGrid";

import MobileFilters from "./components/MobileFilters";

import { useProducts, useProductsStats } from "@/hooks/products/useProducts";
import useDebounce from "@/hooks/useDebounce";
import SearchFilter from "./components/SearchFilter";
import { useState } from "react";
import { PaginationComponent } from "@/app/components/common/PaginationComponent";

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const categories = searchParams.get("category") ?? "";
  const sort = searchParams.get("sort") ?? "";
  const minPrice = searchParams.get("minPrice") ?? "";
  const maxPrice = searchParams.get("maxPrice") ?? "";
  const search = searchParams.get("search") ?? "";
  const [page, setPage] = useState(1);

  const { debouncevalue } = useDebounce(search, 1000);

  const { products, isLoading, pagination } = useProducts({
    categories,
    sort,
    minPrice,
    maxPrice,
    search: debouncevalue,
  });

  const { stats } = useProductsStats();

  const totalProducts = stats?.totalProducts;
  const total = pagination?.total_product;

  const totalPage = pagination?.total_page;
  const limit = pagination?.limit;

  return (
    <div className="container ">
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
          {/* paginatoins  */}
          <div>
            {totalPage > 1 && (
              <PaginationComponent
                total_page={totalPage}
                page={page}
                limit={limit}
                setPage={setPage}
              ></PaginationComponent>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;

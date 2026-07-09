"use client";

import ActiveFilters from "./ActiveFilters";
import CategoryFilter from "./CategoryFilter";

import PriceRangeFilter from "./PriceRangeFilter";
import SearchFilter from "./SearchFilter";

const ProductsFilters = () => {
  return (
    <aside className="sticky top-24 hidden h-fit space-y-6 lg:block">
      <SearchFilter></SearchFilter>
      <div className="rounded-xl border bg-card p-5">
        <h2 className="text-lg font-semibold">Filters</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Narrow down products by category, brand and price.
        </p>
      </div>
      <ActiveFilters />

      <CategoryFilter />

      <PriceRangeFilter />
    </aside>
  );
};

export default ProductsFilters;

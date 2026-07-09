"use client";

import Link from "next/link";
import { PackageSearch, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

const ProductsEmpty = () => {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border border-dashed bg-card px-6 py-12 text-center">
      <div className="rounded-full bg-muted p-5">
        <PackageSearch className="h-12 w-12 text-muted-foreground" />
      </div>

      <h2 className="mt-6 text-2xl font-bold">No Products Found</h2>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        We couldn't find any products matching your current filters. Try
        changing your search, category, brand, or price range.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button
          render={
            <Link href="/products">
              <RotateCcw className="mr-2 h-4 w-4" />
              Clear Filters
            </Link>
          }
        ></Button>

        <Button
          variant="outline"
          render={<Link href="/">Continue Shopping</Link>}
        ></Button>
      </div>
    </div>
  );
};

export default ProductsEmpty;

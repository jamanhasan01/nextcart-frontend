"use client";

import { useParams } from "next/navigation";
import ProductDetailsView from "../components/product-details/ProductDetailsView";
import { useProduct } from "@/hooks/products/useProducts";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();

  const { product, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-2">
        <h2 className="text-xl font-semibold">Product Not Found</h2>
        <p className="text-sm text-muted-foreground">
          The item you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  return <ProductDetailsView product={product} />;
}

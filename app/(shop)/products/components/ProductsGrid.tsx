"use client";

import { IProduct } from "@/types/products.type";
import ProductCard from "../../../components/home/cards/ProductCard";
import ProductsEmpty from "./ProductsEmpty";
import ProductsSkeleton from "./ProductsSkeleton";



interface ProductsGridProps {
  products: IProduct[];
  isLoading?: boolean;
  view: "grid" | "list";
}

const ProductsGrid = ({
  products = [],
  isLoading = false,
  view
}: ProductsGridProps) => {
  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (products?.length === 0) {
    return <ProductsEmpty />;
  }

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4"
          : "space-y-4"
      }
    >
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsGrid;

"use client";

import ProductCard from "./ProductCard";
import ProductsEmpty from "./ProductsEmpty";
import ProductsSkeleton from "./ProductsSkeleton";

interface Product {
  _id: string;
  name: string;
  slug: string;
  price: number;
  finalPrice?: number;
  discount?: number;
  stock: number;
  brand?: string;
  rating?: number;
  reviewCount?: number;
  thumbnail: {
    url: string;
  };
  category?: {
    name: string;
  };
}

interface ProductsGridProps {
  products: Product[];
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

"use client";
import DashboardHeader from "../components/ui/DashboardHeader";
import { Plus } from "lucide-react";
import { ProductTable } from "../components/products/ProductTable";
import { useProducts } from "@/hooks/products/useProducts";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";

const ProductManage = () => {
  const { products, isLoading } = useProducts({
    isAdmin: true,
  });

  return (
    <div>
      <DashboardHeader
        title="Product Management"
        subtitle="Manage your inventory and products"
        buttonText="Add Product"
        buttonLink="/dashboard/products/create"
        buttonIcon={<Plus />}
      />
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <ProductTable products={products}></ProductTable>
      )}
    </div>
  );
};

export default ProductManage;

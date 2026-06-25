"use client";
import DashboardHeader from "../components/ui/DashboardHeader";
import { Plus } from "lucide-react";
import { ProductTable } from "../components/products/ProductTable";
import { useProducts } from "@/hooks/products/useProducts";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";
import { PaginationComponent } from "@/app/components/common/PaginationComponent";
import { useState } from "react";

const ProductManage = () => {
  const [page, setPage] = useState(1);
  console.log({ page });

  const { products, isLoading, pagination } = useProducts({
    isAdmin: true,
    limit: 1,
    page,
  });

  const totalPage = pagination?.total_page;
  const limit = pagination?.limit;

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
      <PaginationComponent
        total_page={totalPage}
        page={page}
        limit={limit}
        setPage={setPage}
      ></PaginationComponent>
    </div>
  );
};

export default ProductManage;

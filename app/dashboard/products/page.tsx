"use client";
import DashboardHeader from "../components/ui/DashboardHeader";
import { Plus } from "lucide-react";
import { ProductTable } from "../components/products/ProductTable";
import { useProducts } from "@/hooks/products/useProducts";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";
import { PaginationComponent } from "@/app/components/common/PaginationComponent";
import { useState } from "react";
import ProductFilters from "../components/products/ProductFilters";
import useDebounce from "@/hooks/useDebounce";

const ProductManage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, onSearchChange] = useState("");
  const [statusFilter, onStatusChange] = useState("");

  const { debouncevalue, isDebounce } = useDebounce(searchQuery, 1000);

  console.log({ debouncevalue });

  const { products, isLoading, pagination } = useProducts({
    isAdmin: true,
    limit: 20,
    page,
    status: statusFilter,
    search: debouncevalue, 
    
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
      {/* filter of data */}
      <ProductFilters
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
        onStatusChange={onStatusChange}
        statusFilter={statusFilter}
      ></ProductFilters>

      {/* table of data */}
      <div>
        {isLoading || isDebounce ? (
          <TableSkeleton />
        ) : (
          <ProductTable
            page={page}
            limit={limit}
            products={products}
          ></ProductTable>
        )}
      </div>
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
    </div>
  );
};

export default ProductManage;

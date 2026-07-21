"use client";
import { NewSaleForm } from "../components/sales/NewSaleForm";
import { useProduct, useProducts } from "@/hooks/products/useProducts";
import SalesTable from "../components/sales/SalesTable";
import { useSales } from "@/hooks/sales/useSales";
import SearchFilter from "@/app/(shop)/products/components/SearchFilter";
import useDebounce from "@/hooks/useDebounce";
import { useState } from "react";
import SalesFilters from "../components/sales/SalesFilter";
import SalesStats from "../components/sales/SalesStats";

const page = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, onSearchChange] = useState("");
  const [statusFilter, onStatusChange] = useState("");

  const { debouncevalue, isDebounce } = useDebounce(searchQuery, 1000);
  const { sales, pagination } = useSales({
    page: page,
    search: debouncevalue,
    status: statusFilter,
  });

  const totalPage = pagination?.total_page;
  const limit = pagination?.limit;

  return (
    <div>
      <SalesStats></SalesStats>
      <SalesFilters
        onSearchChange={onSearchChange}
        searchQuery={searchQuery}
        onStatusChange={onStatusChange}
        statusFilter={statusFilter}
      ></SalesFilters>
      <SalesTable page={totalPage} limit={limit} sales={sales}></SalesTable>
    </div>
  );
};

export default page;

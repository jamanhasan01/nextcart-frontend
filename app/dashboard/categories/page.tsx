"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

import DashboardHeader from "../components/ui/DashboardHeader";
import { CategoriesTable } from "../components/categories/CategoriesTable";
import { TableSkeleton } from "../components/skeletons/TableSkeleton";

import { useCategories } from "@/hooks/categories/useCategories";

import { CategoriesFilters } from "../components/categories/CategoriesFilters";
import useDebounce from "@/hooks/useDebounce";
import { PaginationComponent } from "@/app/components/common/PaginationComponent";

const CategoriesManage = () => {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const { debouncevalue, isDebounce } = useDebounce(searchQuery, 1000);

  const { categories, isLoading, pagination } = useCategories({
    search: debouncevalue,
    status: statusFilter,
    limit: 20,
    page,
  });


  const totalPage = pagination?.total_page;
  const limit = pagination?.limit;

  return (
    <div className="space-y-6">
      <DashboardHeader
        title="Categories"
        subtitle="Organize your products into structured collections"
        buttonText="Add Category"
        buttonLink="/dashboard/categories/create"
        buttonIcon={<Plus className="h-4 w-4" />}
      />

      {/* Pass state values and setter hooks directly down into your filter toolbar */}
      <CategoriesFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      {isLoading || isDebounce ? (
        <TableSkeleton />
      ) : (
        <CategoriesTable page={page} limit={limit} categories={categories} />
      )}

      <PaginationComponent
        page={page}
        total_page={totalPage}
        setPage={setPage}
      ></PaginationComponent>
    </div>
  );
};

export default CategoriesManage;

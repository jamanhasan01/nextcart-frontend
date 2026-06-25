"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function ProductFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: ProductsFiltersProps) {
  return (
    <div className="flex mb-6 justify-between sm:flex-row items-center gap-3 w-full bg-card p-4 rounded-xl border border-border shadow-sm">
      {/* Search Input Box */}
      <div className="relative min-w-2xl sm:max-w-xs flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-9 bg-background border-input text-foreground placeholder:text-muted-foreground w-full"
        />
      </div>

      {/* Status Filter Dropdown */}
      <div className="w-full flex justify-end">
        <Select
          value={statusFilter}
          // FIX: Intercept the null value and safely pass a string up to your state hook
          onValueChange={(value) => onStatusChange(value ?? "")}
        >
          <SelectTrigger className="border-input text-foreground">
            <SelectValue
              className={"capitalize"}
              placeholder="Filter by Status"
            />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border text-popover-foreground">
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default ProductFilters;

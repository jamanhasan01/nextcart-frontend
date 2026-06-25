"use client";


import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoriesFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
}

export function CategoriesFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: CategoriesFiltersProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative w-full flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9"
        />
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-52">
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusChange(value ?? "")}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              className="capitalize"
              placeholder="Filter by Status"
            />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default CategoriesFilters;
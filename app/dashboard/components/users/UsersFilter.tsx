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

import { IUserQueries } from "@/types/user.type";

interface ProductsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: IUserQueries["status"];
  onStatusChange: (value: IUserQueries["status"]) => void;
}

export function UsersFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}: ProductsFiltersProps) {
  return (
    <div className="mb-6 flex min-w-full max-w-2xl flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative w-full flex-1">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="text"
          placeholder="Search by customer name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9"
        />
      </div>

      {/* Status Filter */}
      <div className="w-full sm:w-52">
        <Select
          value={statusFilter}
          onValueChange={(value) => onStatusChange(value ?? "active")}
        >
          <SelectTrigger className="w-full">
            <SelectValue
              placeholder="Filter by Status"
              className="capitalize"
            />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default UsersFilter;

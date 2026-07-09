"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    // reset pagination
    params.delete("page");

    router.push(`/products?${params.toString()}`);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("search");
    params.delete("page");

    setSearch("");

    router.push(`/products?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border bg-card p-5 ">
      <h3 className="mb-4 text-base font-semibold">
        Search
      </h3>

      <div className="relative">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="pr-20"
        />

        <div className="absolute right-0 top-1/2 flex -translate-y-1/2 gap-1">
          {search && (
            <Button
              size="icon"
              variant="ghost"
              onClick={handleClear}
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          <Button
            size="icon"
            onClick={handleSearch}
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
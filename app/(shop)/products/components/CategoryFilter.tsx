"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useCategories } from "@/hooks/categories/useCategories";
import { ICategory } from "@/types/categories.type";

const CategoryFilter = () => {
  const { categories } = useCategories();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const selectedCategories =
    searchParams.get("category")?.split(",").filter(Boolean) ?? [];

  const handleCheckedChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    let values = [...selectedCategories];

    if (values.includes(categoryId)) {
      values = values.filter((id) => id !== categoryId);
    } else {
      values.push(categoryId);
    }

    if (values.length) {
      params.set("category", values.join(","));
    } else {
      params.delete("category");
    }

    // Reset pagination
    params.delete("page");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold">Categories</h3>

      <div className="space-y-3">
        {categories?.map((category: ICategory) => (
          <div key={category._id} className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={category._id}
                checked={selectedCategories.includes(category._id)}
                onCheckedChange={() => handleCheckedChange(category._id)}
              />

              <Label htmlFor={category._id} className="cursor-pointer text-sm">
                {category.name}
              </Label>
            </div>

            <span className="text-xs text-muted-foreground">
              ({category.productCount})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;

"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const brands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Realme",
  "Oppo",
  "Vivo",
  "OnePlus",
  "Sony",
];

const BrandFilter = () => {
  const handleCheckedChange = (
    brand: string,
    checked: boolean | "indeterminate"
  ) => {
    console.log(brand, checked);

    // TODO:
    // Update URL search params
    // Example:
    // ?brand=apple,samsung
  };

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="mb-4 text-base font-semibold">Brands</h3>

      <div className="space-y-3">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                onCheckedChange={(checked) =>
                  handleCheckedChange(brand, checked)
                }
              />

              <Label
                htmlFor={brand}
                className="cursor-pointer text-sm"
              >
                {brand}
              </Label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
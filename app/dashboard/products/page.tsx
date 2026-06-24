'use client'
import DashboardHeader from "../components/ui/DashboardHeader";
import { Plus } from "lucide-react";
import { useCategories } from "@/hooks/categories/useCategories";
import { CategoriesTable } from "../components/categories/CategoriesTable";

const ProductManage = () => {
  const { categories } = useCategories();
  return (
    <div>
      <DashboardHeader
        title="Product Management"
        subtitle="Manage your inventory and products"
        buttonText="Add Product"
        buttonLink="/dashboard/products/create"
        buttonIcon={<Plus />}
      />
      <CategoriesTable categories={categories}></CategoriesTable>
    </div>
  );
};

export default ProductManage;

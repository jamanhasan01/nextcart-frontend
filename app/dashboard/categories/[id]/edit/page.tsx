"use client";

import CategoryForm from "@/app/dashboard/components/categories/CategoryForm";
import { useCategory } from "@/hooks/categories/useCategories";
import { useParams } from "next/navigation";

const UpdateCategory = () => {
  const { id } = useParams();

  const { category, isLoading } = useCategory(id as string);
  if (isLoading) {
    return null;
  }
  return (
    <div>
      <CategoryForm category={category}></CategoryForm>
    </div>
  );
};

export default UpdateCategory;

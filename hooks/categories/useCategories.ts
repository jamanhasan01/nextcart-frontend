import { CategoryService } from "@/services/category.service";
import { useQueries, useQuery } from "@tanstack/react-query";

export const useCategories = (params = {}) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categories", params],
    queryFn: () => CategoryService.get(params),
  });

  return {
    categories: data?.data,
    pagination: data?.pagination,
    isLoading,
    error,
  };
};

export const useCategory = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["category", id],
    queryFn: () => CategoryService.getById(id),
  });
  return {
    category: data?.data,
    isLoading,
    error,
  };
};

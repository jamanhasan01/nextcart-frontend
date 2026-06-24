import { ProductService } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (params = {}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.get(params),
  });

  return {
    products: data?.data?.products,
    isLoading,
  };
};

export const useProduct = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => ProductService.getById(id),
  });
  return {
    product: data?.data,
    isLoading,
  };
};

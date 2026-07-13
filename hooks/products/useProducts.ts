import { ProductService } from "@/services/product.service";
import { IProductQuery } from "@/types/products.type";
import { useQuery } from "@tanstack/react-query";

export const useProducts = (params: IProductQuery) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", params],
    queryFn: () => ProductService.get(params),
  });

  return {
    products: data?.data?.products,
    pagination: data?.data?.pagination,
    isLoading,
  };
};
export const useProductsStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products_state"],
    queryFn: () => ProductService.getStats(),
  });

  return {
    stats: data?.data,
    isLoading,
  };
};

export const useProduct = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["product",id],
    queryFn: () => ProductService.getById(id),
  });
  return {
    product: data?.data,
    isLoading,
  };
};

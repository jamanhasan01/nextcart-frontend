// ================= DELETE PRODUCT =================

import { ProductService } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    mutateAsync: deleteProductAsync,
    isPending,
    error,
  } = useMutation({
    mutationFn: (id: string) => ProductService.delete(id),

    onSuccess: () => {
      // Refresh all product lists
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      // Refresh dashboard product stats
      queryClient.invalidateQueries({
        queryKey: ["products_stats"],
      });
    },
  });

  return {
    deleteProduct,
    deleteProductAsync,
    isDeleting: isPending,
    error,
  };
};

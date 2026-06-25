import { ProductService } from "@/services/product.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useProductUpdate = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ProductService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });

  return mutation;
};

export default useProductUpdate;

import { ProductService } from "@/services/product.service";
import { useMutation } from "@tanstack/react-query";

const useProductCreate = () => {
  const mutation = useMutation({
    mutationFn: ProductService.create,
  });

  return mutation;
};

export default useProductCreate;

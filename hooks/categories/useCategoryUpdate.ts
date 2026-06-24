import { CategoryService } from "@/services/categories/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCategoryUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CategoryService.update,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      queryClient.invalidateQueries({
        queryKey: ["category"],
      });
    },
  });
};

export default useCategoryUpdate
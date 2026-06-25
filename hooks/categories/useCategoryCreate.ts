import { CategoryService } from "@/services/category.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCategoryCreate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: CategoryService.post,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });
};

export default useCategoryCreate;

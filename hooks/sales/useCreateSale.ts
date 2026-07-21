import { salesService } from "@/services/sales.service";
import { ICreateSalesInput } from "@/types/sales.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ICreateSalesInput) => salesService.create(data),

    onSuccess: () => {
      toast.success("Sale created successfully");

      queryClient.invalidateQueries({
        queryKey: ["sales"],
      });

      queryClient.invalidateQueries({
        queryKey: ["sales_stats"],
      });

      // Stock changes after a sale
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["products_state"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to create sale");
    },
  });

  return {
    createSale: mutateAsync,
    isCreating: isPending,
  };
};

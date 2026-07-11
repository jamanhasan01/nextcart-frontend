import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "@/services/order.service";
import { toast } from "sonner";

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      OrderService.updateStatus({
        orderId: id,
        data: {
          orderStatus: status,
        },
      }),

    onSuccess: () => {
      toast.success("Order status updated");

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ?? "Failed to update order status",
      );
    },
  });
};

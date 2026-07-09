import { OrderService } from "@/services/order.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";

const useOrderCreate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: OrderService.post,
    onSuccess: () => {
      localStorage.removeItem("cart");
      // Refresh order list
      queryClient.invalidateQueries({
        queryKey: ["my-orders"],
      });

      // If you have a cart query
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

export default useOrderCreate;

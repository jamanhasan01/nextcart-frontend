import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { CartService } from "@/services/cart.service";
import { updateLocalCartQuantity } from "@/utils/local-cart";
import { toast } from "sonner";

export const useUpdateCart = () => {
  const { me: user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: string;
      quantity: number;
    }) => {
      if (user) {
        return CartService.update({
          productId,
          quantity,
        });
      }

      updateLocalCartQuantity(productId, quantity);

      return Promise.resolve();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (err) => {
      toast.warning(err.message);
    },
  });
};

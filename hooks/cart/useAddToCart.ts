import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { CartService } from "@/services/cart.service";
import { addToLocalCart } from "@/utils/local-cart";

export const useAddToCart = () => {
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
      // Delay for 500ms
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (user) {
        return CartService.post({
          productId,
          quantity,
        });
      }

      addToLocalCart(productId, quantity);
    },

    onSuccess: () => {
      if (user) {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
};

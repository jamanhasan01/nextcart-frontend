import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { CartService } from "@/services/cart.service";
import { removeFromLocalCart } from "@/utils/local-cart";
import { toast } from "sonner";

export const useRemoveCart = () => {
  const { me: user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      if (user) {
        return CartService.delete(productId);
      }

      removeFromLocalCart(productId);

      return Promise.resolve();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });

      toast.success("Product removed from cart");
    },

    onError: (error) => {
      console.log(error);

      toast.error("Failed to remove product");
    },
  });
};

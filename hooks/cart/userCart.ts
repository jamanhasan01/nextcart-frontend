import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";
import { CartService } from "@/services/cart.service";
import { getLocalCart } from "@/utils/local-cart";

export const useCart = () => {
  const { me: user } = useAuth();

  return useQuery({
    queryKey: ["cart", user?._id],

    queryFn: async () => {
      if (user) {
        return CartService.get();
      }

      const localItems = getLocalCart();

      return CartService.guest(localItems);
    },
  });
};
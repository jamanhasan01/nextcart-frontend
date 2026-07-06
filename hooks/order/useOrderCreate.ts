import { OrderService } from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../auth/useAuth";

const useOrderCreate = () => {
  return useMutation({
    mutationFn: OrderService.post,
  });
};

export default useOrderCreate;

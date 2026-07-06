import { OrderService } from "@/services/order.service";
import { Query, useQuery } from "@tanstack/react-query";

export const useOrders = () => {
  const { data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => OrderService.get(),
  });
  return {
    orders: data?.data?.order,
  };
};

export const useMyOrders = () => {
  const { data ,isLoading} = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => OrderService.getMy(),
  });
  return {
    data: data?.data,
    isLoading
  };
};
export default useMyOrders;

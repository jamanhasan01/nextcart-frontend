import { OrderService } from "@/services/order.service";
import { IOrderQuery } from "@/types/order.type";
import { keepPreviousData, Query, useQuery } from "@tanstack/react-query";

export const useOrders = (params: IOrderQuery) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", params],
    queryFn: () => OrderService.get(params),
  });
  return {
    orders: data?.data?.orders || [],
    pagination: data?.data.pagination,
    isLoading,
  };
};

export const useMyOrders = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => OrderService.getMy(),
  });
  return {
    data: data?.data,
    isLoading,
  };
};
export default useMyOrders;

import { OrderService } from "@/services/order.service";
import { useQuery } from "@tanstack/react-query";

export const useOrderStats = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders-stats"],
    queryFn: () => OrderService.getStats(),
  });
  return {
    stats: data?.data,
    isLoading,
  };
};
export default useOrderStats;

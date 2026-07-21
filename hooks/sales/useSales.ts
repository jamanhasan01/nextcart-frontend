import { salesService } from "@/services/sales.service";
import { ISalesQuery } from "@/types/sales.type";
import { useQuery } from "@tanstack/react-query";

/* =============================== GET ALL SALES =============================== */

export const useSales = (params: ISalesQuery = {}) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["sales", params],
    queryFn: () => salesService.getAll(params),
  });

  return {
    sales: data?.data.sales ?? [],
    pagination: data?.data?.pagination,
    isLoading,
    isFetching,
    error,
  };
};

/* =============================== GET SALES STATS =============================== */

export const useSalesStats = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["sales_stats"],
    queryFn: () => salesService.getStats(),
  });

  return {
    stats: data,
    isLoading,
    isFetching,
    error,
  };
};

/* =============================== GET SINGLE SALE =============================== */

export const useSale = (id: string) => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["sale", id],
    queryFn: () => salesService.getById(id),
    enabled: !!id,
  });

  return {
    sale: data?.data,
    isLoading,
    isFetching,
    error,
  };
};

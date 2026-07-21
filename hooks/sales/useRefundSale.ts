import { salesService } from "@/services/sales.service";
import { IRefundSalesInput } from "@/types/sales.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface RefundSaleParams {
  id: string;
  data: IRefundSalesInput;
}

export const useRefundSale = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ id, data }: RefundSaleParams) =>
      salesService.refund(id, data),

    onSuccess: (data, variables) => {
      // Refresh the general sales dashboard/list views
      queryClient.invalidateQueries({ queryKey: ["sales"] });

      // Update the detailed view for this specific sale record
      queryClient.invalidateQueries({ queryKey: ["sale", variables.id] });

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["sales_stats"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return {
    refundSale: mutation.mutateAsync,
    isRefunding: mutation.isPending,
    ...mutation,
  };
};

export default useRefundSale;

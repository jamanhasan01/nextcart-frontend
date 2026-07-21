import {
  ICreateSalesInput,
  IRefundSalesInput,
  ISalesQuery,
} from "@/types/sales.type";
import { api } from "@/utils/Api";

export const salesService = {
  // Get all sales with filters/pagination
  getAll: async (params?: ISalesQuery) => {
    return await api.get("/sales", params);
    
  },

  // Get sales dashboard statistics
  getStats: async () => {
    const response = await api.get("/sales/stats");
    return response.data;
  },

  // Get a single sale by ID
  getById: async (id: string) => {
    const response = await api.get(`/sales/${id}`);
    return response.data;
  },

  // Create a new in-store/manual sale
  create: async (data: ICreateSalesInput) => {
    const response = await api.post("/sales", data);
    return response.data;
  },

  // Full or partial refund
  refund: async (id: string, data: IRefundSalesInput) => {
    const response = await api.post(`/sales/${id}/refund`, data);
    return response.data;
  },
};

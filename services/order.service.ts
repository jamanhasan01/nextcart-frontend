import { api } from "@/utils/Api";

export const OrderService = {
  get: async () => {
    return api.get(`/admin/orders`);
  },
  getMy: async () => {
    return api.get(`/orders`);
  },
  getById: async (id: string) => {
    return api.get(`/order/${id}`);
  },
  post: async (payload: CreateOrderPayload) => {
    return api.post("/order", payload);
  },
  update: ({ id, data }: { id: string; data: FormData }) => {
    return api.patch(`/order/${id}`, data);
  },
  cancel: ({ id }: { id: string }) => {
    return api.patch(`/order/cancel/${id}`, {});
  },
 
};

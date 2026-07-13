import { CreateOrderPayload, IOrderQuery } from "@/types/order.type";
import { api } from "@/utils/Api";

export const OrderService = {
  get: async (params = {}) => {
    return api.get(`/admin/orders`, params);
  },
  getMy: async () => {
    return api.get(`/orders`);
  },
  getStats: async () => {
    return api.get(`/orders/stats`);
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
  updateStatus: ({
    orderId,
    data,
  }: {
    orderId: string;
    data: {
      orderStatus: string;
    };
  }) => {
    return api.patch(`/order/order-status/${orderId}`, data);
  },
  cancel: ({ id }: { id: string }) => {
    return api.patch(`/order/cancel/${id}`, {});
  },
};

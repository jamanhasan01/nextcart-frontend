import { api } from "@/utils/Api";

export const ProductService = {
  get: async (params = {}) => {
    return api.get("/products", params);
  },

  getById: async (id: string) => {
    return api.get(`/products/${id}`);
  },
  getStats: async () => {
    return api.get(`/products/stats`);
  },

  create: async (payload: FormData) => {
    return api.post("/products", payload);
  },

  update: async ({ id, data }: { id: string; data: FormData }) => {
    return api.patch(`/products/${id}`, data);
  },

  delete: async (id: string) => {
    return api.delete(`/products/${id}`);
  },
};

import { ICategory, ICreateCategory } from "@/types/categories.type";
import { IProductQuery } from "@/types/products.type";
import { api } from "@/utils/Api";

export const CategoryService = {
  get: async (params:IProductQuery) => {
    return api.get(`/categories`, params);
  },
  getById: async (id = {}) => {
    return api.get(`/categories/${id}`);
  },
  post: async (payload: FormData) => {
    return api.post("/categories", payload);
  },
  update: ({ id, data }: { id: string; data: FormData }) => {
    return api.patch(`/categories/${id}`, data);
  },
};

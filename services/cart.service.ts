import { ILocalCartItem } from "@/types/cart";
import { ICategory, ICreateCategory } from "@/types/categories.type";
import { IProductQuery } from "@/types/products.type";
import { api } from "@/utils/Api";

export const CartService = {
  get: async () => {
    return api.get(`/cart`);
  },
  //   getById: async (id = {}) => {
  //     return api.get(`/cart/${id}`);
  //   },
  post: async (payload: { productId: string; quantity: number }) => {
    return api.post("/cart", payload);
  },
  update: async (payload: { productId: string; quantity: number }) => {
    return api.patch("/cart", payload);
  },
  delete: (id: string) => {
    return api.delete(`/cart/${id}`);
  },
  guest: async (items: ILocalCartItem[]) => {
    return api.post("/cart/guest", {
      items,
    });
  },
};

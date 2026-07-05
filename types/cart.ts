// src/types/cart.ts

export interface ICartItem {
  product: string;
  quantity: number;
}

export interface ICart {
  _id: string;
  user: string;
  items: ICartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface ILocalCartItem {
  product: string;
  quantity: number;
}

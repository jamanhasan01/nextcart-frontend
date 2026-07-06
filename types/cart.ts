import { IProduct } from "./products.type";

export interface ICartItem {
  product: IProduct;
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
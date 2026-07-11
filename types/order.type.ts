import { IImage } from "./common.type";
import { IProduct } from "./products.type";

export interface CreateOrderPayload {
  items: {
    product: string;
    quantity: number;
  }[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
  };
}

export interface IOrderQuery {
  page?: number;
  limit?: number;

  search?: string; // orderId, customer name, phone

  status?:  "all" |"pending" | "processing" | "delivered" | "cancelled" 

  paymentStatus?: "paid" | "unpaid" | "refunded";

  userId?: string;

  guestId?: string;

  from?: string;

  to?: string;

  minTotal?: number;

  maxTotal?: number;

  sort?: string;

  select?: string;
}

// Basic TypeScript Interfaces based on your sample data
export interface IOrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  productId: string;
  image: string; // Since it's a string, we might need JSON parsing or a backup if it contains a full object string
}

export interface IShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
}

export interface IOrder {
  _id: string;
  orderId: string;
  user: string;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  status: "pending" | "processing" | "delivered" | "cancelled";
  paymentStatus: "unpaid" | "paid" | "refunded";
  createdAt: string;
  updatedAt: string;
}

/* =============================== SALE ITEM =============================== */

export interface ISaleItem {
  product: string;
  productID: string;
  name: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  refundedQuantity: number;
}

/* =============================== SALE =============================== */

export interface ISale {
  _id: string;
  saleID: string;
  items: ISaleItem[];

  totalItems: number;
  subtotal: number;
  discountAmount: number;
  tax: number;
  totalAmount: number;

  paymentMethod: "cash" | "card" | "mobile_banking" | "other";

  customer?: {
    name?: string;
    phone?: string;
  };

  cashier?: string;

  status: "completed" | "partially_refunded" | "refunded" | "void";

  notes?: string;

  createdAt: string;
  updatedAt: string;
}

/* =============================== CREATE SALE =============================== */

export interface ISalesItemInput {
  productId: string;
  quantity: number;
}

export interface ICreateSalesInput {
  items: ISalesItemInput[];

  paymentMethod: "cash" | "card" | "mobile_banking" | "other";

  customer?: {
    name?: string;
    phone?: string;
  };

  cashier?: string;

  discountAmount?: number;
  tax?: number;
  notes?: string;
}

/* =============================== REFUND SALE =============================== */

export interface IRefundItemInput {
  productId: string;
  quantity: number;
}

export interface IRefundSalesInput {
  // If omitted, refund all remaining refundable items
  items?: IRefundItemInput[];

  reason?: string;
}
export type SalesStatus =
  | "completed"
  | "partially_refunded"
  | "refunded"
  | "void"
  | undefined;
/* =============================== SALE QUERY =============================== */

export interface ISalesQuery {
  page?: number;
  limit?: number;

  // Matches saleID
  search?: string;

  status?: SalesStatus | string;

  paymentMethod?: "cash" | "card" | "mobile_banking" | "other";

  cashier?: string;

  // ISO date strings
  startDate?: string;
  endDate?: string;
}

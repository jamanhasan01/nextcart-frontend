interface CreateOrderPayload {
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
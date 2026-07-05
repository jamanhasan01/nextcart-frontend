export interface LocalCartItem {
  product: string;
  quantity: number;
}

const CART_KEY = "cart";

export const getLocalCart = (): LocalCartItem[] => {
  if (typeof window === "undefined") return [];

  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
};

export const saveLocalCart = (items: LocalCartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const addToLocalCart = (productId: string, quantity: number = 1) => {
  const cart = getLocalCart();

  const existing = cart.find((item) => item.product === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({
      product: productId,
      quantity,
    });
  }

  saveLocalCart(cart);
};
export const removeFromLocalCart = (productId: string) => {
  const cart = getLocalCart();

  const updatedCart = cart.filter((item) => item.product !== productId);

  saveLocalCart(updatedCart);
};
export const clearLocalCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const updateLocalCartQuantity = (
  productId: string,
  quantity: number,
) => {
  const cart = getLocalCart();

  const updatedCart = cart
    .map((item) => (item.product === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0);

  saveLocalCart(updatedCart);
};

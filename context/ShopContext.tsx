"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  shippingDetails: {
    name: string;
    email: string;
    address: string;
    city: string;
    zip: string;
  };
}

interface User {
  name: string;
  email: string;
}

interface ShopContextType {
  cart: CartItem[];
  orders: Order[];
  user: User | null;
  addToCart: (product: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  loginUser: (email: string, name?: string) => void;
  logoutUser: () => void;
  placeOrder: (shippingDetails: Order["shippingDetails"]) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedOrders = localStorage.getItem("orders");
    const savedUser = localStorage.getItem("user");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      saveCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      saveCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    saveCart(cart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    saveCart(cart.map((item) => (item.id === id ? { ...item, quantity } : item)));
  };

  const clearCart = () => saveCart([]);

  const loginUser = (email: string, name?: string) => {
    const profile = { name: name || email.split("@")[0], email };
    setUser(profile);
    localStorage.setItem("user", JSON.stringify(profile));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const placeOrder = (shippingDetails: Order["shippingDetails"]) => {
    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder: Order = {
      id: orderId,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      items: [...cart],
      total,
      status: "Processing",
      shippingDetails,
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    localStorage.setItem("orders", JSON.stringify(updated));
    clearCart();
    return orderId;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        orders,
        user,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loginUser,
        logoutUser,
        placeOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
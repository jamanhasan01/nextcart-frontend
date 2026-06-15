"use client";

import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { Trash2, ArrowRight, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useShop();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-slate-100 p-4 rounded-full text-slate-400 mb-4">
          <ShoppingBag size={30} />
        </div>
        <h2 className="text-sm font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-xs text-slate-500 mt-1">Add items from our catalog to get started.</p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-slate-900 text-white px-4 py-2 text-xs font-semibold hover:bg-slate-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-xl font-extrabold tracking-tight text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4 divide-y divide-slate-100">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-4 pt-4 first:pt-0">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded border border-slate-200 bg-slate-50">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between text-xs">
                  <h3 className="font-semibold text-slate-900">{item.name}</h3>
                  <p className="font-bold text-slate-950">${item.price * item.quantity}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-1 border border-slate-200 rounded bg-slate-50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="px-1.5 text-xs font-semibold text-slate-800">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600"
                    >
                      <Plus size={11} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="flex items-center space-x-1 text-slate-400 hover:text-red-600 transition text-xs"
                  >
                    <Trash2 size={13} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-xs font-bold text-slate-900 pb-3 border-b border-slate-100">Order Summary</h2>
          <div className="space-y-3 py-4 text-xs font-medium text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-900 font-semibold">${total}</span>
            </div>
            <div className="flex justify-between">
              <span>Standard Shipping</span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-xs font-bold text-slate-950 pt-3 border-t border-slate-100">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-2 flex w-full items-center justify-center gap-1 rounded-md bg-slate-900 text-white py-2 text-xs font-semibold hover:bg-slate-800 transition"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
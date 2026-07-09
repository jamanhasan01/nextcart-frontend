"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/hooks/cart/userCart";
import { useRemoveCart } from "@/hooks/cart/useRemoveCart";
import { useUpdateCart } from "@/hooks/cart/useUpdateCart";
import { ICart, ICartItem } from "@/types/cart";
import { formatBDT } from "@/lib/formatBDT";

export default function CartPage() {
  const { data, isLoading } = useCart();

  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCart();

  const { mutate: removeFromCart, isPending: isRemoving } = useRemoveCart();

  const cart: ICartItem[] = data?.items ?? [];

  const total = cart.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0,
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        Loading cart...
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="mb-4 rounded-full bg-slate-100 p-4 text-slate-400">
          <ShoppingBag size={30} />
        </div>

        <h2 className="text-sm font-bold text-slate-900">Your cart is empty</h2>

        <p className="mt-1 text-xs text-slate-500">
          Add items from our catalog to get started.
        </p>

        <Link
          href="/"
          className="mt-6 rounded-md bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-xl font-extrabold tracking-tight">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cart Items */}
        <div className="space-y-4 divide-y rounded-xl border bg-white p-6 shadow-sm lg:col-span-8">
          {cart.map((item: ICartItem) => (
            <div
              key={item.product._id}
              className="flex flex-col gap-4 pt-4 first:pt-0 sm:flex-row"
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded border bg-slate-50">
                <Image
                  src={
                    item.product.thumbnail?.url ??
                    "/images/product-placeholder.png"
                  }
                  alt={item.product.name}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">{item.product.name}</h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatBDT(item.product.finalPrice)}
                    </p>
                  </div>

                  <p className="font-bold">
                    {formatBDT(item.product.finalPrice * item.quantity)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center rounded border">
                    <button
                      className="p-2 hover:bg-muted disabled:opacity-50"
                      disabled={isUpdating || item.quantity <= 1}
                      onClick={() =>
                        updateQuantity({
                          productId: item.product._id,
                          quantity: item.quantity - 1,
                        })
                      }
                    >
                      <Minus size={14} />
                    </button>

                    <span className="min-w-10 text-center">
                      {item.quantity}
                    </span>

                    <button
                      className="p-2 hover:bg-muted disabled:opacity-50"
                      disabled={isUpdating}
                      onClick={() =>
                        updateQuantity({
                          productId: item.product._id,
                          quantity: item.quantity + 1,
                        })
                      }
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.product._id);
                    }}
                    className="flex items-center gap-1 text-xs text-red-500"
                  >
                    <Trash2 size={13} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="rounded-xl border bg-white p-6 shadow-sm lg:col-span-4">
          <h2 className="border-b pb-3 text-sm font-bold">Order Summary</h2>

          <div className="space-y-3 py-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>

              <span className="font-semibold">{formatBDT(total)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>

              <span className="font-semibold text-green-600">FREE</span>
            </div>

            <div className="flex justify-between border-t pt-3 font-bold">
              <span>Total</span>

              <span>{formatBDT(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-md bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Proceed to Checkout
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}

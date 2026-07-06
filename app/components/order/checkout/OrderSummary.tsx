"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import { ICartItem } from "@/types/cart";

interface OrderSummaryProps {
  items: ICartItem[];
  loading?: boolean;
}

const OrderSummary = ({ items }: OrderSummaryProps) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0,
  );

  const shipping = 0;

  const discount = 0;

  const total = subtotal + shipping - discount;

  return (
    <Card className="sticky top-24 shadow-none">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Products */}

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.product._id} className="flex gap-3">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg border">
                <Image
                  src={
                    item.product.thumbnail?.url ??
                    "/images/product-placeholder.png"
                  }
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <h3 className="line-clamp-2 text-sm font-medium">
                  {item.product.name}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Qty : {item.quantity}
                </p>

                <p className="text-sm font-semibold">
                  ${item.product.finalPrice.toFixed(2)}
                </p>
              </div>

              <div className="font-semibold">
                ${(item.product.finalPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Calculation */}

        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>

            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>

            <span className="text-green-600">FREE</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>

            <span>-${discount.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Total */}

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>${total.toFixed(2)}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;

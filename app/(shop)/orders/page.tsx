"use client";

import Link from "next/link";
import { PackageOpen } from "lucide-react";
import useMyOrders from "@/hooks/order/useOrders";
import { OrderSkeleton } from "@/app/components/order/OrderSkeleton";
import { STATUS_CONFIG } from "@/app/components/order/order-utils";
import { OrderHeader } from "@/app/components/order/OrderHeader";
import { OrderItem } from "@/app/components/order/OrderItem";
import { OrderFooter } from "@/app/components/order/OrderFooter";
import { OrderService } from "@/services/order.service";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useMyOrders();
  const orders = data?.order ?? [];

  if (isLoading) return <OrderSkeleton />;

  const handleCancelOrder = async (orderId: string) => {
    try {
      const res = await OrderService.cancel({ id: orderId });

      if (res.success) {
        toast.success(res.message || "Order cancelled successfully.");
        queryClient.invalidateQueries({
          queryKey: ["my-orders"],
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to cancel order.");
    }
  };
  if (orders.length === 0) {
    return (
      <div className="container py-20 flex justify-center">
        <div className="flex max-w-md flex-col items-center justify-center text-center rounded-2xl border border-slate-100 bg-white p-10 shadow-sm">
          <div className="mb-4 rounded-full bg-slate-50 p-4 text-slate-400 ring-8 ring-slate-50/50">
            <PackageOpen size={32} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">No Orders Found</h2>
          <p className="mt-2 text-sm text-slate-500 max-w-xs">
            You haven't placed any orders yet. Explore our items and make your
            first purchase!
          </p>
          <Link
            href="/products"
            className="mt-6 inline-flex justify-center rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-5xl">
      <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-slate-900">
        My Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order: any) => {
          const total = order.items.reduce(
            (sum: number, item: any) => sum + item.price * item.quantity,
            0,
          );
          const currentStatusConfig = STATUS_CONFIG[order.status.toLowerCase()];

          return (
            <div
              key={order._id}
              className="overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-sm transition hover:shadow-md"
            >
              <OrderHeader
                orderId={order.orderId}
                createdAt={order.createdAt}
                paymentStatus={order.paymentStatus}
                total={total}
                status={order.status}
                statusConfig={currentStatusConfig}
              />

              <div className="divide-y divide-slate-100">
                {order.items.map((item: any) => (
                  <OrderItem key={item.product._id} item={item} />
                ))}
              </div>

              <OrderFooter
                orderId={order._id}
                status={order.status}
                shippingAddress={order.shippingAddress}
                statusText={
                  order.status === "delivered"
                    ? "Order successfully delivered"
                    : `Order is being ${order.status.toLowerCase()}`
                }
                onCancel={() => handleCancelOrder(order._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

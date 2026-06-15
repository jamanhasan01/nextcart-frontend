"use client";

import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { PackageOpen, Clock, Truck } from "lucide-react";

export default function OrdersPage() {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-slate-100 p-4 rounded-full text-slate-400 mb-4">
          <PackageOpen size={30} />
        </div>
        <h2 className="text-sm font-bold text-slate-900">No Orders Found</h2>
        <p className="text-xs text-slate-500 mt-1">Orders placed during your session will appear here.</p>
        <Link
          href="/"
          className="mt-6 rounded-md bg-slate-900 text-white px-4 py-2 text-xs font-semibold hover:bg-slate-800 transition"
        >
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="text-xl font-extrabold tracking-tight text-slate-900 mb-8">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-xs font-semibold text-slate-650">
              <div className="grid grid-cols-2 sm:flex sm:space-x-8 gap-y-2">
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wide">Date Placed</p>
                  <p className="text-slate-900 mt-0.5">{order.date}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wide">Order ID</p>
                  <p className="text-slate-900 font-mono mt-0.5">{order.id}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-400 uppercase tracking-wide">Total Amount</p>
                  <p className="text-slate-900 mt-0.5">${order.total}</p>
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1 rounded bg-blue-50 text-blue-700 px-2 py-0.5 text-[10px] font-bold border border-blue-100">
                  <Clock size={11} />
                  <span>{order.status}</span>
                </span>
              </div>
            </div>

            <div className="px-6 py-4 divide-y divide-slate-100">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0 text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={item.image} alt={item.name} className="h-8 w-8 object-cover rounded border border-slate-200" />
                    <div>
                      <p className="font-semibold text-slate-950">{item.name}</p>
                      <p className="text-slate-500 text-[10px]">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="bg-slate-50/50 border-t border-slate-100 px-6 py-3 flex flex-col sm:flex-row justify-between text-xs gap-2">
              <div>
                <p className="text-[9px] text-slate-400 uppercase tracking-wide">Shipping Address</p>
                <p className="text-slate-650 mt-0.5">
                  {order.shippingDetails.name} — {order.shippingDetails.address}, {order.shippingDetails.city}, {order.shippingDetails.zip}
                </p>
              </div>

              <div className="flex items-center text-slate-500 gap-1 text-[11px] font-medium self-start sm:self-center">
                <Truck size={13} className="text-blue-600" />
                <span>Simulated Transit Routing</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
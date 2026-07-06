"use client";
import CheckoutForm from "@/app/components/order/checkout/CheckoutForm";
import OrderSummary from "@/app/components/order/checkout/OrderSummary";
import { useCart } from "@/hooks/cart/userCart";
import React from "react";

const CheckoutPage = () => {
  const { data, isLoading } = useCart();
  const items = data?.items || [];

  if (isLoading) {
    <div>loading</div>;
  }

  return (
    <div className="container">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CheckoutForm />
        </div>

        <div className="lg:col-span-4">
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

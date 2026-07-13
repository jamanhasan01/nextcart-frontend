"use client";

import CheckoutForm from "@/app/components/order/checkout/CheckoutForm";
import OrderSummary from "@/app/components/order/checkout/OrderSummary";
import { useCart } from "@/hooks/cart/userCart";
import { useProduct } from "@/hooks/products/useProducts";
import { useSearchParams } from "next/navigation";
import React, { useMemo, Suspense } from "react";

// 1. Move your main logic to an inner component
const CheckoutContent = () => {
  const searchParams = useSearchParams();

  // Read parameters defensively from the URL query string
  const isBuyNow = searchParams ? searchParams.get("buyNow") === "true" : false;
  const buyNowProductId = searchParams ? searchParams.get("productId") : null;
  const buyNowQuantity = parseInt(searchParams?.get("quantity") || "1", 10);

  // Fetch Hooks
  const { data: cartData, isLoading: isCartLoading } = useCart();

  // Only query if buyNowProductId actually exists to prevent broken API calls on raw reloads
  const { product, isLoading: isProductLoading } = useProduct(
    buyNowProductId || "",
  );

  // Keep standard items fallback stable with useMemo
  const items = useMemo(() => {
    if (isBuyNow) {
      if (product) {
        return [
          {
            product: product,
            quantity: buyNowQuantity,
          },
        ];
      }
      return [];
    }

    return cartData?.items || [];
  }, [isBuyNow, product, buyNowQuantity, cartData]);

  // Handle all combined loading states cleanly
  if (isCartLoading || (isBuyNow && isProductLoading)) {
    return <CheckoutLoadingFallback />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <CheckoutForm items={items} isBuyNow={isBuyNow} />
        </div>

        <div className="lg:col-span-4">
          <OrderSummary items={items} />
        </div>
      </div>
    </div>
  );
};

// 2. Extracted Loading State for Reuse
const CheckoutLoadingFallback = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <p className="text-muted-foreground animate-pulse">
      Loading checkout details...
    </p>
  </div>
);

// 3. Main Export wrapped in Suspense
const CheckoutPage = () => {
  return (
    <Suspense fallback={<CheckoutLoadingFallback />}>
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;
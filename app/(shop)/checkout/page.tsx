"use client";

import CheckoutForm from "@/app/components/order/checkout/CheckoutForm";
import OrderSummary from "@/app/components/order/checkout/OrderSummary";
import { useCart } from "@/hooks/cart/userCart";
import { useProduct } from "@/hooks/products/useProducts";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const CheckoutPage = () => {
  const searchParams = useSearchParams();
  
  // 1. Read parameters defensively from the URL query string
  const isBuyNow = searchParams ? searchParams.get("buyNow") === "true" : false;
  const buyNowProductId = searchParams ? searchParams.get("productId") : null;
  const buyNowQuantity = parseInt(searchParams?.get("quantity") || "1", 10);

  // 2. Fetch Hooks
  const { data: cartData, isLoading: isCartLoading } = useCart();
  
  // Only query if buyNowProductId actually exists to prevent broken API calls on raw reloads
  const { product, isLoading: isProductLoading } = useProduct(buyNowProductId || "");

  // 3. Keep standard items fallback stable with useMemo
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
      return []; // Return empty instead of breaking if product is still fetching after refresh
    }
    
    return cartData?.items || [];
  }, [isBuyNow, product, buyNowQuantity, cartData,isProductLoading]);

  // 4. Handle all combined loading states cleanly
  if (isCartLoading || (isBuyNow && isProductLoading)) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading checkout details...</p>
      </div>
    );
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

export default CheckoutPage;
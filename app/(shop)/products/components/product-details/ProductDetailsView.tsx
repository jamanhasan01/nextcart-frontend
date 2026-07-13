"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  RefreshCw,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/formatBDT";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { IProduct } from "@/types/products.type";

interface ProductDetailsProps {
  product: IProduct;
}

export default function ProductDetailsView({ product }: ProductDetailsProps) {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(
    product.thumbnail?.url || product.images[0]?.url,
  );
  const [quantity, setQuantity] = useState(1);

  const { mutate: addToCart, isPending } = useAddToCart();

  const finalPrice = product.finalPrice ?? product.price;
  const hasDiscount = finalPrice < product.price;
  const isOutOfStock = product.stock <= 0;

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment" && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;

    // Constructs query parameter with the reactive selected quantity value
    const queryParams = new URLSearchParams({
      buyNow: "true",
      productId: product._id,
      quantity: quantity.toString(),
    });

    router.push(`/checkout?${queryParams.toString()}`);
  };

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Left: Gallery Section */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
            <Image
              src={activeImage || "/images/product-placeholder.png"}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-center"
            />
            {hasDiscount && (
              <span className="absolute left-4 top-4 rounded-md bg-red-600 px-3 py-1 text-sm font-semibold text-white shadow-md">
                {product.discount}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails list */}
          {product.images && product.images.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {product.images.map((img) => (
                <button
                  key={img.url}
                  type="button"
                  onClick={() => setActiveImage(img.url)}
                  className={`relative aspect-square w-20 overflow-hidden rounded-lg border bg-muted transition-all ${
                    activeImage === img.url
                      ? "border-primary ring-2 ring-primary/20"
                      : "hover:border-neutral-400"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} preview`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info Section */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Meta Tags / Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                {product.category?.name}
              </span>
              <span className="text-xs text-muted-foreground">
                SKU: {product.productID}
              </span>
            </div>

            {/* Title & Brand */}
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-muted-foreground">
                Brand: <span className="text-foreground">{product.brand}</span>
              </p>
            </div>

            {/* Pricing Panel */}
            <div className="flex items-baseline gap-3 rounded-xl bg-muted/40 p-4">
              <span className="text-3xl font-extrabold text-foreground">
                {formatBDT(finalPrice)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through">
                    {formatBDT(product.price)}
                  </span>
                  <span className="text-sm font-medium text-red-600">
                    Save {formatBDT(product.price - finalPrice)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Description</h3>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                {product.description}
              </p>
            </div>

            {/* Inventory Status indicator */}
            <div className="flex items-center gap-2 text-sm font-medium">
              <span
                className={`h-2 w-2 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-green-500"}`}
              />
              <span
                className={isOutOfStock ? "text-red-500" : "text-green-600"}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : `In Stock (${product.stock} units left)`}
              </span>
            </div>
          </div>

          {/* Action Area */}
          <div className="space-y-4 pt-4 border-t">
            {!isOutOfStock && (
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <span className="text-sm font-medium text-muted-foreground w-20">
                  Quantity:
                </span>
                <div className="flex h-10 w-32 items-center justify-between rounded-md border bg-background px-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-8 text-center text-sm font-semibold select-none">
                    {quantity}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground"
                    onClick={() => handleQuantityChange("increment")}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons Layer - Fixed 50/50 Grid Layout */}
            <div className="grid grid-cols-2 gap-3 w-full">
              {/* Buy Now Button */}
              <Button
                type="button"
                size="lg"
                className="w-full text-base font-semibold bg-neutral-900 text-white hover:bg-neutral-800 shadow-sm"
                disabled={isOutOfStock}
                onClick={handleBuyNow}
              >
                <Zap className="mr-2 h-5 w-5 fill-current" />
                {isOutOfStock ? "Out of Stock" : "Buy Now"}
              </Button>

              {/* Add To Cart Button */}
              <Button
                variant="outline"
                size="lg"
                className="w-full text-base font-medium text-neutral-800 border-neutral-300"
                disabled={isPending || isOutOfStock}
                onClick={() =>
                  addToCart({
                    productId: product._id,
                    quantity: quantity,
                  })
                }
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isPending ? "Adding..." : "Add to Cart"}
              </Button>
            </div>
          </div>

          {/* Trust Badges Footer */}
          <div className="grid grid-cols-3 gap-2 border-t pt-6 text-center text-xs text-muted-foreground">
            <div className="flex flex-col items-center gap-1">
              <Truck className="h-5 w-5 text-primary/80" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <RefreshCw className="h-5 w-5 text-primary/80" />
              <span>7 Day Return</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="h-5 w-5 text-primary/80" />
              <span>Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

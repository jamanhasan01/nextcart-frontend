"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Zap, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/formatBDT";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { IProduct } from "@/types/products.type";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const finalPrice = product.finalPrice ?? product.price;
  const hasDiscount = finalPrice < product.price;
  const image = product.thumbnail?.url || "/images/product-placeholder.png";
  const isOutOfStock = product.stock <= 0;

  const { mutate: addToCart, isPending } = useAddToCart();

  const badge = hasDiscount
    ? {
        text: `${product.discount}% OFF`,
        className: "bg-red-600 text-white",
      }
    : product.isTrending
      ? {
          text: "Trending",
          className: "bg-emerald-600 text-white",
        }
      : product.isFlashDeal
        ? {
            text: "Flash Deal",
            className: "bg-orange-500 text-white",
          }
        : null;

  const handleBuyNow = () => {
    if (isOutOfStock) return;

    const queryParams = new URLSearchParams({
      buyNow: "true",
      productId: product._id,
      quantity: "1",
    });

    router.push(`/checkout?${queryParams.toString()}`);
  };

  return (
    // FIX 1: Added h-full and flex-col to keep card containers completely uniform
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card transition-all duration-200 hover:shadow-md">
      
      {/* Image Container */}
      {/* FIX 2: Removed conflicting h-60, let aspect-square dictate structural behavior cleanly */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Link href={`/products/${product._id}`} className="block h-full w-full">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        </Link>

        {/* Dynamic badge */}
        {badge && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide shadow-sm ${badge.className}`}
          >
            {badge.text}
          </span>
        )}

        {/* Floating Add to Cart Button */}
        <button
          type="button"
          disabled={isPending || isOutOfStock}
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2.5 text-muted-foreground shadow transition-all hover:bg-neutral-50 hover:text-primary disabled:opacity-50 active:scale-95"
          onClick={() =>
            addToCart({
              productId: product._id,
              quantity: 1,
            })
          }
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
          ) : (
            <ShoppingCart className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Content */}
      {/* FIX 3: flex-1 and flex-col distributes extra spacing evenly so buttons align horizontally across rows */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground/80 tracking-wide uppercase">
            {product.category?.name}
          </p>

          <Link href={`/products/${product._id}`} className="block">
            {/* FIX 4: Explicit height reserve bounds text to a clean line block layout */}
            <h3 className="line-clamp-2 text-sm font-semibold text-neutral-800 transition-colors hover:text-primary leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 pt-0.5">
            <span className="text-lg font-extrabold text-neutral-900">
              {formatBDT(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through decoration-muted-foreground/60">
                {formatBDT(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Action Elements Wrapper */}
        <div className="space-y-2.5">
          {/* Stock Status */}
          <div className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${isOutOfStock ? "bg-red-500" : "bg-emerald-500"}`} />
            <p className={`text-xs font-semibold tracking-wide ${isOutOfStock ? "text-red-500" : "text-emerald-600"}`}>
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </p>
          </div>

          {/* Full Width Buy Now Action Button */}
          {/* FIX 5: Balanced out color system utilizing primary/slate color rules depending on theme config */}
          <Button
            size="sm"
            className="w-full text-xs h-9 font-semibold shadow-sm transition-transform active:scale-[0.99] bg-neutral-900 text-white hover:bg-neutral-800"
            disabled={isOutOfStock}
            onClick={handleBuyNow}
          >
            <Zap className="mr-1.5 size-3.5 fill-current" />
            {isOutOfStock ? "Out of Stock" : "Buy Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
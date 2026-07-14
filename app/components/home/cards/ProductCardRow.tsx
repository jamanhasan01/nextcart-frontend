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

const ProductCardRow = ({ product }: ProductCardProps) => {
  const router = useRouter();

  const finalPrice = product.finalPrice ?? product.price;
  const hasDiscount = finalPrice < product.price;
  const image = product.thumbnail?.url || "/images/product-placeholder.png";
  const isOutOfStock = product.stock <= 0;

  const { mutate: addToCart, isPending } = useAddToCart();

  const discountBadge = hasDiscount ? `${product.discount}% OFF` : null;

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    const queryParams = new URLSearchParams({
      buyNow: "true",
      productId: product._id,
      quantity: "1",
    });

    router.push(`/checkout?${queryParams.toString()}`);
  };

  return (
    <div className="group relative flex w-full items-center gap-4 rounded-2xl border border-neutral-100 bg-white p-3 transition-all duration-300 hover:border-neutral-200 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:border-neutral-800/60 dark:bg-neutral-900/50">
      
      {/* Left: Compact Square Image Cover */}
      <div className="relative aspect-square w-24 sm:w-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800">
        <Link href={`/products/${product._id}`} className="block h-full w-full">
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="120px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
        </Link>
        
        {discountBadge && (
          <span className="absolute left-1.5 top-1.5 rounded-md bg-red-500 px-1.5 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider">
            {discountBadge}
          </span>
        )}
      </div>

      {/* Right: Info & Actions Columns */}
      <div className="flex flex-1 flex-col justify-between py-0.5 min-w-0 h-full">
        <div className="space-y-1">
          {/* Category & Stock Status Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 truncate">
              {product.category?.name || "Premium Collection"}
            </span>
            <span className={`text-[10px] font-bold ${isOutOfStock ? "text-red-500" : "text-emerald-500"}`}>
              {isOutOfStock ? "Out of Stock" : "In Stock"}
            </span>
          </div>

          <Link href={`/products/${product._id}`} className="block">
            <h3 className="line-clamp-1 text-sm font-semibold text-neutral-800 dark:text-neutral-200 transition-colors hover:text-indigo-600">
              {product.name}
            </h3>
          </Link>

          {/* Pricing Stack */}
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-neutral-900 dark:text-white">
              {formatBDT(finalPrice)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-neutral-400 line-through">
                {formatBDT(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Compact Actions Toolbar */}
        <div className="flex items-center gap-2 pt-2 mt-2 border-t border-neutral-50 dark:border-neutral-800/50">
          <Button
            size="sm"
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="h-8 flex-1 rounded-lg text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700"
          >
            <Zap className="size-3 mr-1 fill-current" />
            Buy Now
          </Button>

          <button
            type="button"
            disabled={isPending || isOutOfStock}
            onClick={() => addToCart({ productId: product._id, quantity: 1 })}
            className="flex items-center justify-center h-8 w-8 rounded-lg border border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700 text-neutral-600 dark:text-neutral-300 transition-colors shrink-0 disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-400" />
            ) : (
              <ShoppingCart className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardRow;
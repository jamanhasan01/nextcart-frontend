"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBDT } from "@/lib/formatBDT";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const finalPrice = product.finalPrice ?? product.price;
  const hasDiscount = finalPrice < product.price;

  return (
    <div className="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      {/* Image */}
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.thumbnail.url}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {hasDiscount && (
            <span className="absolute left-3 top-3 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              {product.discount}% OFF
            </span>
          )}

          <button className="absolute right-3 top-3 rounded-full bg-white p-2 shadow">
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground">
            {product.category?.name}
          </p>

          <Link href={`/products/${product.slug}`}>
            <h3 className="line-clamp-2 font-semibold transition-colors hover:text-primary">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-muted-foreground">{product.brand}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">{formatBDT(finalPrice)}</span>

          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatBDT(product.price)}
            </span>
          )}
        </div>

        {/* Stock */}
        <p
          className={`text-sm ${
            product.stock > 0 ? "text-green-600" : "text-red-500"
          }`}
        >
          {product.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        {/* Action */}
        <Button className="w-full" disabled={product.stock === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

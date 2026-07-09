import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingCart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { IProduct } from "@/types/products.type";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import useDebounce from "@/hooks/useDebounce";
import { formatBDT } from "@/lib/formatBDT";



interface ProductCardProps {
  product: IProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.thumbnail?.url || "/images/product-placeholder.png";
  const { mutate: addToCart, isPending } = useAddToCart();
  return (
    <Card className="group overflow-hidden rounded-xl border transition-all hover:shadow-lg py-0">
      <div className="relative aspect-square overflow-hidden bg-muted h-48">
        <Image
          src={image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />

        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.discount > 0 && (
            <Badge variant="destructive">-{product.discount}%</Badge>
          )}

          {product.isFlashDeal && <Badge>Flash Deal</Badge>}
          {product.isTrending && <Badge>Trending</Badge>}
          {product.isOffer && <Badge>Offer</Badge>}
        </div>

        <div className="absolute right-3 top-3 flex translate-x-10 flex-col gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <Button size="icon" variant="secondary">
            <Heart className="size-4" />
          </Button>

          <Button size="icon" variant="secondary">
            <Eye className="size-4" />
          </Button>
        </div>
      </div>

      <CardContent className="space-y-2 p-4">
        <Link
          href={`/products/${product._id}`}
          className="line-clamp-2 font-medium hover:text-primary"
        >
          {product.name}
        </Link>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold">
                {formatBDT(product.finalPrice)}
          </span>

          {product.discount > 0 && (
            <span className="text-sm text-muted-foreground line-through">
              {formatBDT(product.price)}
            </span>
          )}
        </div>

        <Button
          className="w-full"
          disabled={isPending}
          onClick={() =>
            addToCart({
              productId: product._id,
              quantity: 1,
            })
          }
        >
          <ShoppingCart className="mr-2 size-4" />
          {isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </CardContent>
    </Card>
  );
}

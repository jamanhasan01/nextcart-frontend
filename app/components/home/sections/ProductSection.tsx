import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "../cards/ProductCard";
import { IProduct } from "@/types/products.type";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: IProduct[];
  href?: string;
}

export function ProductSection({
  title,
  subtitle,
  products,
  href,
}: ProductSectionProps) {
  if (!products?.length) return <div>No products</div>;

  return (
    <section>
      <div className="container">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>

            {subtitle && (
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            )}
          </div>

          {href && (
            <Button
              variant="outline"
              render={
                <Link href={href}>
                  View All
                  <ChevronRight className="ml-2 size-4" />
                </Link>
              }
            ></Button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

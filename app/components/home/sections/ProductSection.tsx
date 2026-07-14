import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { IProduct } from "@/types/products.type";
import ProductCard from "../cards/ProductCard";
import ProductsEmpty from "@/app/(shop)/products/components/ProductsEmpty";

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
  if (!products?.length) return <ProductsEmpty />;

  return (
    <section className="border-b border-neutral-100 dark:border-neutral-900">
      <div className="container">
        
        {/* Header Layout: Content split Left (Text) and Right (Link) */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="relative pl-4 border-l-4 border-black space-y-1 max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              {title}
            </h2>
            
            {subtitle && (
              <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {href && (
            <div className="shrink-0 pl-4 sm:pl-0">
              <Link
                href={href}
                className="inline-flex items-center border-b-3 border-black pb-2 gap-1.5 text-base font-bold uppercase tracking-wider text-black hover:text-black/60 hover:border-black/60  transition-colors group"
              >
                Explore Collection
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
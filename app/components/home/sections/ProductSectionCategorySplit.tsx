import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { IProduct } from "@/types/products.type";
import ProductCardRow from "../cards/ProductCardRow";
import ProductsEmpty from "@/app/(shop)/products/components/ProductsEmpty";
import { ICategory } from "@/types/categories.type";

interface ProductSectionCategoryProps {
  category: ICategory;
  products: IProduct[];
}

export function ProductSectionCategorySplit({
  category,
  products,
}: ProductSectionCategoryProps) {
  if (!products?.length) return <ProductsEmpty />;

  const categoryImage =
    category.image?.url || "/images/category-placeholder.png";
  const categoryLink = `/products?category=${category._id}`;

  return (
    <section className="border-b border-neutral-150 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/20">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Sticky Editorial Category Billboard */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit flex flex-col justify-between rounded-3xl bg-neutral-900 dark:bg-neutral-950 p-8 text-white min-h-[320px] lg:min-h-[300] shadow-xl overflow-hidden relative group">
            {/* Category Image Overlay (Soft blend in background) */}
            <div className="absolute inset-0 z-0">
              <Image
                src={categoryImage}
                alt={category.name}
                fill
                priority
                className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
              />
              {/* Vignette effect to guarantee text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-900/40" />
            </div>

            {/* Background Light Pattern Accent */}
            <div className="absolute right-[-20%] bottom-[-10%] w-60 h-60 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none z-0" />

            {/* Header Information */}
            <div className="space-y-4 relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
                Curated Category
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white">
                {category.name}
              </h2>
            </div>

            {/* Link Anchor Action Button */}
            <div className="relative z-10 pt-6">
              <Button
                render={
                  <Link
                    href={categoryLink}
                    className="inline-flex items-center justify-center gap-2"
                  >
                    Browse Collection
                    <ArrowUpRight className="size-4" />
                  </Link>
                }
                variant="outline"
                className="w-full sm:w-auto border-neutral-700 bg-transparent text-white hover:bg-white hover:text-neutral-950 rounded-xl"
              ></Button>
            </div>
          </div>

          {/* Right Column: Dynamic Modular Row Cards */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.slice(0, 6).map((product) => (
                <ProductCardRow key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

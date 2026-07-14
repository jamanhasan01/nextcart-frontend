"use client";

import { BannerSection } from "../components/home/sections/BannerSection";
import { ProductSection } from "../components/home/sections/ProductSection";
import { ProductSectionCategorySplit } from "../components/home/sections/ProductSectionCategorySplit";

import { useProducts } from "@/hooks/products/useProducts";
import { useCategory } from "@/hooks/categories/useCategories";

// Loader spinner component to improve user experience while fetching data
import { Loader2 } from "lucide-react";

const HomePage = () => {
  // 1. Fetch products and safely rename loading state variables to avoid redeclaration conflicts
  const { products: newArrivals, isLoading: isLoadingNew } = useProducts({});
  const { products: trending, isLoading: isLoadingTrending } = useProducts({ isTrending: "true" });
  const { products: flashDeals, isLoading: isLoadingFlash } = useProducts({ isFlashDeal: "true" });
  
  const targetCategoryId = "6a55e981338ea912bf7e4369";
  const { products: shirts, isLoading: isLoadingShirts } = useProducts({
    categories: targetCategoryId,
  });

  // 2. Fetch the category details for the split banner layout
  const { category, isLoading: isLoadingCategory } = useCategory(targetCategoryId);

  const isGlobalLoading = isLoadingNew || isLoadingTrending || isLoadingFlash || isLoadingShirts || isLoadingCategory;

  if (isGlobalLoading) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-2">
        <Loader2 className="h-10 w-10 animate-spin text-black-600" />
        <p className="text-sm font-medium text-neutral-500">Loading your shopping experience...</p>
      </div>
    );
  }

  return (
    <div >
      <BannerSection />

      {/* New Arrivals Grid Section */}
      <ProductSection
        title="New Arrivals"
        subtitle="Discover the latest products just added to our collection."
        products={newArrivals}
        href="/products"
      />

      {/* Trending Favorites Section */}
      <ProductSection
        title="Trending Products"
        subtitle="Customer favorites that everyone is talking about."
        products={trending}
      />

      {/* Flash Deals Promo Section */}
      <ProductSection
        title="Flash Deals"
        subtitle="Save big on limited-time offers before they're gone."
        products={flashDeals}
      />

      {/* Dynamic Category Row Grid (Now named correctly based on API category data) */}
      <ProductSection
        title={category?.name || "Featured Collection"}
        subtitle={`Check out our signature curated items from our ${category?.name?.toLowerCase() || "category"}.`}
        products={shirts}
        href={`/products?category=${targetCategoryId}`}
      />
 
      {/* Editorial Category Split View (Only renders if category fetch succeeded) */}
      {category && (
        <ProductSectionCategorySplit
          category={category}
          products={shirts}
        />
      )}
    </div>
  );
};

export default HomePage;
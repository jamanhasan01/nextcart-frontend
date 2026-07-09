'use client'
import { useAuth } from "@/hooks/auth/useAuth";
import { BannerSection } from "../components/home/sections/BannerSection";
import { ProductSection } from "../components/home/sections/ProductSection";
import { useProduct, useProducts } from "@/hooks/products/useProducts";

const HomePage = () => {
  const { products: newArrivals } = useProducts({});

  
  return (
    <div className="container">
      <BannerSection></BannerSection>
      <ProductSection
        title="New Arrivals"
        subtitle="Latest products in our collection"
        products={newArrivals}
      />

      {/* <ProductSection
  title="Trending Products"
  subtitle="Popular right now"
  products={trending}
/>

<ProductSection
  title="Flash Deals"
  subtitle="Limited-time offers"
  products={flashDeals}
/>

<ProductSection
  title="Combo Offers"
  subtitle="Save more with bundles"
  products={comboProducts}
/> */}
    </div>
  );
};

export default HomePage;

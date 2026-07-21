"use client";
import DashboardComponent from "./components/dashboard/DashboardComponent";
import SalesStats from "./components/sales/SalesStats";
import { useSalesStats } from "@/hooks/sales/useSales";
import { useProductsStats } from "@/hooks/products/useProducts";
import useOrderStats from "@/hooks/order/useOrderStats";

const page = () => {
  const { stats: storeSales } = useSalesStats();
  const { stats: productStats } = useProductsStats();
  const { stats: onlineSales } = useOrderStats();
  console.log({ productStats });

  return (
    <div>
      <DashboardComponent
        storeSales={storeSales}
        onlineSales={onlineSales}
        productStats={productStats}
      ></DashboardComponent>
    </div>
  );
};

export default page;

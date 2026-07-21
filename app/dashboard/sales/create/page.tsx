'use client'
import { NewSaleForm } from "../../components/sales/NewSaleForm";
import { useProducts } from "@/hooks/products/useProducts";

const CreateSales = () => {
  const { products } = useProducts({});
  return (
    <div>
      <NewSaleForm products={products}></NewSaleForm>
    </div>
  );
};

export default CreateSales;

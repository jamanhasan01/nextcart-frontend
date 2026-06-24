"use client";

import ProductForm from "@/app/dashboard/components/products/ProductForm";
import { useProduct } from "@/hooks/products/useProducts";
import { useParams } from "next/navigation";

const UpdateProduct = () => {
  const { id } = useParams();

  const { product ,isLoading} = useProduct(id as string);
  if (isLoading) {
    return null
  }

  console.log({product});
  
  return (
    <div>
      <ProductForm product={product}></ProductForm>
    </div>
  );
};

export default UpdateProduct;

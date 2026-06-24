'use client'
import { useCategory } from "@/hooks/categories/useCategories";

const page =  () => {
  const { category } = useCategory("6a30d52e3ee880f309193c29");
  console.log(category);

  return <div>Test</div>;
};

export default page;

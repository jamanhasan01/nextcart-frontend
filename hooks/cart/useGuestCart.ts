import { useEffect, useState } from "react";
import { getLocalCart } from "@/utils/local-cart";

export const useGuestCart = () => {
  const [cart, setCart] = useState(getLocalCart());

  useEffect(() => {
    const handleStorage = () => {
      setCart(getLocalCart());
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return cart;
};

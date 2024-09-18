import { useEffect, useState } from "react";
import { ProductI } from "../interfaces/productsI";

export function usePriceFilter(products: ProductI[]) {
  const [productsData, setProductsData] = useState(structuredClone(products));

  useEffect(() => {
    setProductsData(structuredClone(products));
  }, [products]);

  productsData.sort((a, b) => (a.price > b.price ? 1 : -1));

  return productsData;
}

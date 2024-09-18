import { ProductViewModel } from "./ProductModel";

export type GetResponseProductViewModel = {
  products: ProductViewModel[];
  total: number;
  count: number;
  page: number;
  minValue: number;
  maxValue: number;
};

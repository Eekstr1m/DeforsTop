import { ProductI } from "./productsI";

export interface ResponseSearchI {
  status: number;
  data: ProductI[] | null;
}

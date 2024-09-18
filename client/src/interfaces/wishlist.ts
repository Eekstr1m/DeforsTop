import { ProductI } from "./productsI";

export interface WishlistI {
  _id: string;
  userId: string;
  products: WishlistProductI[];
}

export interface ResponseWishlistI {
  status: number;
  data: WishlistI;
}

export interface WishlistProductI extends ProductI {
  productId: string;
}

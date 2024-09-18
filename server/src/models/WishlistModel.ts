import mongoose from "mongoose";
import { ProductViewModel } from "./ProductModel";

const WishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

export const WishList = mongoose.model("Wishlist", WishlistSchema);

export type WishlistViewModel = {
  _id: mongoose.Types.ObjectId;
  userId: string;
  products: ProductViewModel[];
};

export type ProductWishlistViewModel = {
  _id: mongoose.Types.ObjectId;
  productId: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  thumbnail: string;
};

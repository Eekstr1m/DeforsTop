import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", CartSchema);

export type CartViewModel = {
  _id: mongoose.Types.ObjectId;
  userId: string;
  products: CartProduct[];
  totalPrice: number;
  totalQuantity: number;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

export type CartProduct = {
  productId: string;
  title: string;
  photoPath: string;
  price: number;
  quantity: number;
  total: number;
};

export type PostCartBodyModel = {
  productId: string;
  quantity: number;
};

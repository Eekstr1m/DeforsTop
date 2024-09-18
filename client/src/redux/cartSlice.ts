import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CartI } from "../interfaces/cart";

const initialState: CartI = {
  _id: "",
  userId: "",
  products: [],
  totalPrice: 0,
  totalQuantity: 0,
  createdAt: "",
  updatedAt: "",
};

type QuantityAction = {
  type: "inc" | "dec";
  productId: string;
};
type DeleteProductType = {
  productId: string;
  quantity: number;
  price: number;
};
type AddProductType = {
  productId: string;
  photoPath: string;
  quantity: number;
  title: string;
  price: number;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartI>) => {
      state._id = action.payload._id;
      state.userId = action.payload.userId;
      state.products = action.payload.products;
      state.totalPrice = action.payload.totalPrice;
      state.totalQuantity = action.payload.totalQuantity;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.updatedAt;
    },
    setQuantity: (state, action: PayloadAction<QuantityAction>) => {
      const product = state.products.find(
        (product) => product.productId === action.payload.productId
      );

      if (product) {
        if (action.payload.type === "inc") {
          product.quantity += 1;
          state.totalPrice += product.price;
          state.totalQuantity += 1;
        } else {
          product.quantity -= 1;
          state.totalPrice -= product.price;
          state.totalQuantity -= 1;
        }
        product.total = product.quantity * product.price;
      }
    },
    deleteProduct: (state, action: PayloadAction<DeleteProductType>) => {
      const newProducts = state.products.filter(
        (product) => product.productId !== action.payload.productId
      );
      state.products = newProducts;
      state.totalPrice -= action.payload.price;
      state.totalQuantity -= action.payload.quantity;
    },
    addProduct: (state, action: PayloadAction<AddProductType>) => {
      state.products.push({
        title: action.payload.title,
        productId: action.payload.productId,
        photoPath: action.payload.photoPath,
        quantity: action.payload.quantity,
        price: action.payload.price,
        total: action.payload.price * action.payload.quantity,
      });
      state.totalPrice += action.payload.quantity * action.payload.price;
      state.totalQuantity += action.payload.quantity;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCart, setQuantity, deleteProduct, addProduct } =
  cartSlice.actions;

export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WishlistI, WishlistProductI } from "../interfaces/wishlist";

const initialState: WishlistI = {
  _id: "",
  userId: "",
  products: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList(state, action: PayloadAction<WishlistProductI[]>) {
      state.products = action.payload;
    },
    removeFromWishList(state, action: PayloadAction<WishlistProductI[]>) {
      state.products = action.payload;
    },
    setWishList(state, action: PayloadAction<WishlistI>) {
      state._id = action.payload._id;
      state.userId = action.payload.userId;
      state.products = action.payload.products;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWishList, removeFromWishList, setWishList } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;

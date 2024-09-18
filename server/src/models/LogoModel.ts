import mongoose from "mongoose";

const LogoSchema = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Logo = mongoose.model("Logo", LogoSchema);

export type LogoViewModel = {
  _id: mongoose.Types.ObjectId;
  brand: string;
  thumbnail: string;
};

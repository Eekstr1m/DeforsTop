import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      max: 1000,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    specifications: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, autoIndex: false }
);

ProductSchema.index({
  title: "text",
  description: "text",
  price: "text",
  brand: "text",
  category: "text",
  thumbnail: "text",
  specifications: "text",
});

export const Product = mongoose.model("Product", ProductSchema);
Product.createIndexes();

export type ProductViewModel = {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  category: string;
  thumbnail: string;
  specifications: Array<SpecificationsObject>;
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

type SpecificationsObject = {
  name: string;
  desc: string;
};

export type GetProductParamsModel = {
  id: string;
};

export type CreateProductModel = {
  title: string;
  description: string;
  price: number;
  quantity: number;
  brand: string;
  category: string;
  thumbnailPath: string;
  specifications: Array<SpecificationsObject>;
};

export type AllProductsViewModel = {
  products: ProductViewModel[];
  total: number;
  count: number;
  page: number;
  minValue: number;
  maxValue: number;
};

export type ProductsQuery = {
  page: string;
  count: string;
  minPrice: string;
  maxPrice: string;
  sortedValue: string;
  brand: string;
};

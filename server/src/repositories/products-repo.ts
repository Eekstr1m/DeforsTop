import { products } from "./../data";
import {
  AllProductsViewModel,
  CreateProductModel,
  Product,
  ProductViewModel,
  UpdateProductModel,
} from "../models/ProductModel.js";

type ProductsViewQuery = {
  page: number;
  count: number;
  skip: number;
  minPrice: number | null;
  maxPrice: number | null;
  sortedValue: "toHigh" | "toLow" | "none";
  brand: string;
  category?: string;
};

const productsFinderFunc = async (
  findObj: Object | null,
  sorted: 1 | -1 | 0,
  count: number,
  skip: number
) => {
  let productsArr: ProductViewModel[];

  if (findObj !== null) {
    if (sorted === 0) {
      productsArr = await Product.find(findObj).limit(count).skip(skip);
    } else {
      productsArr = await Product.find(findObj)
        .sort({ price: sorted })
        .limit(count)
        .skip(skip);
    }
  } else {
    if (sorted === 0) {
      productsArr = await Product.find().limit(count).skip(skip);
    } else {
      productsArr = await Product.find()
        .sort({ price: sorted })
        .limit(count)
        .skip(skip);
    }
  }

  let zeros: ProductViewModel[] = [];
  const filteredQuantityArr = productsArr.filter((item) =>
    item.quantity !== 0 ? true : zeros.push(item) && false
  );
  productsArr = filteredQuantityArr.concat(zeros);

  return productsArr;
};

export const productsRepo = {
  async getProducts({
    page,
    count,
    skip,
    minPrice,
    maxPrice,
    sortedValue,
    brand,
    category,
  }: ProductsViewQuery) {
    let products: ProductViewModel[];

    const priceFinder =
      maxPrice === 0 ? {} : { price: { $gte: minPrice, $lte: maxPrice } };
    const categoryFinder = category ? { category: { $eq: category } } : {};
    const brandFinder = brand ? { brand: { $in: brand.split(",") } } : {};

    const finderObject = Object.assign(
      priceFinder,
      categoryFinder,
      brandFinder
    );

    switch (sortedValue) {
      case "toHigh":
        products = await productsFinderFunc(finderObject, 1, count, skip);
        break;

      case "toLow":
        products = await productsFinderFunc(finderObject, -1, count, skip);
        break;

      case "none":
        products = await productsFinderFunc(finderObject, 0, count, skip);
        break;

      default:
        return 404;
    }

    const total = finderObject
      ? await Product.countDocuments(finderObject)
      : await Product.countDocuments();

    if (!products) {
      return 404;
    }

    const allProducts = await Product.find();
    const priceArray = allProducts.map((i) => i.price);
    const minValue = Math.min(...priceArray);
    const maxValue = Math.max(...priceArray);

    const allProductsData: AllProductsViewModel = {
      products,
      total,
      count,
      page,
      minValue,
      maxValue,
    };

    return allProductsData;
  },
  async getSingleProduct(id: string) {
    if (!id) {
      return 400;
    }
    const product: ProductViewModel | null = await Product.findById(id);

    if (!product) {
      return 400;
    }
    return product;
  },
  async createProduct({
    title,
    description,
    price,
    quantity,
    brand,
    category,
    thumbnailPath,
    specifications,
  }: CreateProductModel) {
    const newProduct = new Product({
      title,
      description,
      price,
      quantity,
      brand,
      category,
      thumbnail: thumbnailPath,
      specifications,
    });

    return await newProduct.save();
  },
  async updateProduct({
    id,
    title,
    description,
    price,
    quantity,
    brand,
    category,
    thumbnailPath,
    specifications,
  }: UpdateProductModel) {
    if (!id) {
      return 400;
    }
    const product = await Product.findOneAndUpdate(
      { _id: { $eq: id } },
      {
        $set: {
          title,
          description,
          price,
          quantity,
          brand,
          category,
          thumbnailPath,
          specifications,
        },
      },
      { returnOriginal: false }
    );

    if (!product) {
      return 400;
    }

    return product;
  },
  async getNewArrivalsProducts() {
    const products: ProductViewModel[] = await Product.find({
      quantity: { $gte: 1 },
    })
      .sort({ createdAt: -1 })
      .limit(6);

    if (!products) {
      return 404;
    }

    return products;
  },
  async getRecommendedProducts(id: string) {
    if (!id) {
      return 400;
    }
    const product: ProductViewModel | null = await Product.findById(id);

    if (!product) {
      return 404;
    }

    const products = await Product.find({
      category: product.category,
      quantity: { $gte: 1 },
    }).limit(6);

    if (!products) {
      return 404;
    }

    return products;
  },
};

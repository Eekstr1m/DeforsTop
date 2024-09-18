import express, { Response } from "express";
import {
  getTypedError,
  RequestWithParams,
  RequestWithParamsAndBody,
  ResponseError,
} from "../types/RequestResponseTypes.js";
import {
  ProductWishlistViewModel,
  WishList,
  WishlistViewModel,
} from "../models/WishlistModel.js";
import { body, param } from "express-validator";
import { inputValidationMiddleware } from "../middleware/validation.js";
import { Product, ProductViewModel } from "../models/ProductModel.js";
import { productsRepo } from "../repositories/products-repo.js";

export const getWishlistRouter = () => {
  const router = express.Router();

  router.get(
    "/:userId",
    async (
      req: RequestWithParams<{ userId: string }>,
      res: Response<WishlistViewModel | ResponseError>
    ) => {
      // Get wishlist by userId and return to the client
      try {
        const { userId } = req.params;
        if (!userId) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const wishlist = await WishList.findOne({
          userId: { $eq: userId },
        });

        if (!wishlist) {
          return res.status(202).json({ message: "Wishlist not found" });
        }

        res.status(200).json(wishlist);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );
  router.get(
    "/:userId/:productId",
    [
      param("userId").trim().notEmpty().isString(),
      param("productId").trim().notEmpty().isString(),
    ],
    inputValidationMiddleware,
    async (
      req: RequestWithParams<{ userId: string; productId: string }>,
      res: Response<ProductWishlistViewModel | ResponseError>
    ) => {
      // get single product from wishlist
      try {
        const { userId, productId } = req.params;
        if (!userId) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const wishlist = await WishList.findOne({
          userId: { $eq: userId },
        });

        if (!wishlist) {
          return res.status(202).json({ message: "Wishlist not found" });
        }

        const wishlistProduct: ProductWishlistViewModel | undefined =
          wishlist.products.find((i) => i.productId === productId);

        if (!wishlistProduct) {
          return res.status(202).json({ message: "Product not found" });
        }

        res.status(200).json(wishlistProduct);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  router.put(
    "/:userId",
    [
      param("userId").trim().notEmpty().isString(),
      body("productId").trim().notEmpty().isString(),
    ],
    inputValidationMiddleware,
    async (
      req: RequestWithParamsAndBody<{ userId: string }, { productId: string }>,
      res: Response<WishlistViewModel | ResponseError>
    ) => {
      try {
        const { userId } = req.params;
        const { productId } = req.body;

        const wishlist = await WishList.findOne({
          userId: { $eq: userId },
        });

        const product = await Product.findById(productId);

        if (!product) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const newProduct: ProductWishlistViewModel = {
          _id: product._id,
          productId: productId,
          title: product.title,
          description: product.description,
          price: product.price,
          brand: product.brand,
          category: product.category,
          thumbnail: product.thumbnail,
        };

        // Creating wishlist if it doesn't exist yet
        if (!wishlist) {
          const products: ProductWishlistViewModel[] = [{ ...newProduct }];

          const newWishlist = new WishList({
            userId,
            products,
          });

          const savedWishlist = await newWishlist.save();

          return res.status(201).json(savedWishlist);
        }

        // Adding the product to the existing wishlist
        let products: ProductWishlistViewModel[] = wishlist.products;
        let productExisting: ProductWishlistViewModel | false =
          products.find((i) => i.productId === productId) || false;

        if (!productExisting) {
          products.push(newProduct);
        } else return res.status(202).json(wishlist);

        const updateWishlist = await WishList.findOneAndUpdate(
          { userId: { $eq: userId } },
          { products },
          { returnOriginal: false }
        );

        if (!updateWishlist) {
          return res.status(404).json({ message: "Wishlist not found" });
        }

        res.status(200).json(updateWishlist);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  router.delete(
    "/:userId/:productId",
    [
      param("userId").trim().notEmpty().isString(),
      param("productId").trim().notEmpty().isString(),
    ],
    inputValidationMiddleware,
    async (
      req: RequestWithParams<{ userId: string; productId: string }>,
      res: Response<WishlistViewModel | ResponseError>
    ) => {
      try {
        const { userId, productId } = req.params;

        if (!userId) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const wishlist = await WishList.findOne({
          userId: { $eq: userId },
        });

        if (!wishlist) {
          return res.status(404).json({ message: "Wishlist not found" });
        }
        // Remove the item from array and save it to DB
        wishlist.products = wishlist.products.filter(
          (item) => item.productId !== productId
        );
        await wishlist.save();

        res.status(200).json(wishlist);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  return router;
};

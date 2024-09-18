import express, { Response } from "express";
import {
  Cart,
  CartProduct,
  CartViewModel,
  PostCartBodyModel,
} from "../models/CartModel.js";
import { Product, ProductViewModel } from "../models/ProductModel.js";
import {
  RequestWithParams,
  RequestWithParamsAndBody,
  ResponseError,
  getTypedError,
} from "../types/RequestResponseTypes.js";
import { products } from "./../data";

export const getCartRouter = () => {
  const router = express.Router();

  router.get(
    "/:userId",
    async (
      req: RequestWithParams<{ userId: string }>,
      res: Response<CartViewModel | ResponseError>
    ) => {
      // Get cart by userId and return to the client
      try {
        const { userId } = req.params;
        if (!userId) {
          return res.status(400).json({ message: "Invalid credentials" });
        }
        const cart: CartViewModel | null = await Cart.findOne({
          userId: { $eq: userId },
        });

        if (!cart) {
          return res.status(206).json({ message: "Cart not found" });
        }

        res.status(200).json(cart);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  router.put(
    "/:userId",
    async (
      req: RequestWithParamsAndBody<{ userId: string }, PostCartBodyModel>,
      res
    ) => {
      try {
        const { userId } = req.params;
        const { productId, quantity } = req.body;
        if (!userId || !productId || !quantity) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const cart: CartViewModel | null = await Cart.findOne({
          userId: { $eq: userId },
        });

        const product: ProductViewModel | null = await Product.findById(
          productId
        );

        if (!product) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        if (!cart) {
          const products: CartProduct[] = [
            {
              productId: productId,
              title: product.title,
              photoPath: product.thumbnail,
              price: product.price,
              quantity: quantity,
              total: product.price * quantity,
            },
          ];

          const newCart = new Cart({
            userId,
            products,
            totalPrice: products[0].total,
            totalQuantity: quantity,
          });

          const savedCart: CartViewModel = await newCart.save();

          return res.status(201).json(savedCart);
        }

        let products = cart.products;
        let productExisting: CartProduct | false =
          products.find((i) => i.productId === productId) || false;
        let newProduct: CartProduct;

        if (productExisting) {
          return res.status(204).json("In cart");
        } else {
          newProduct = {
            productId,
            title: product.title,
            photoPath: product.thumbnail,
            price: product.price,
            quantity,
            total: product.price * quantity,
          };

          products.push(newProduct);
        }

        products = products.map((i) =>
          i.productId === productId ? newProduct : i
        );

        const totalQuantity = products.reduce(
          (total, item) => total + item.quantity,
          0
        );

        const totalPrice = products.reduce(
          (total, item) => total + item.total,
          0
        );

        const updateCart: CartViewModel | null = await Cart.findOneAndUpdate(
          { userId: { $eq: userId } },
          { products, totalPrice, totalQuantity },
          { returnOriginal: false }
        );

        if (!updateCart) {
          return res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(updateCart);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  router.delete("/:userId/:productId", async (req, res) => {
    try {
      const { userId, productId } = req.params;
      if (!userId || !productId) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const cart: CartViewModel | null = await Cart.findOne({
        userId: { $eq: userId },
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      let products = cart.products;
      products = products.filter((i) => i.productId !== productId);

      const totalQuantity = products.reduce(
        (total, item) => total + item.quantity,
        0
      );

      const totalPrice = products.reduce(
        (total, item) => total + item.total,
        0
      );

      const updateCart: CartViewModel | null = await Cart.findOneAndUpdate(
        { userId: { $eq: userId } },
        { products, totalPrice, totalQuantity },
        { returnOriginal: false }
      );

      if (!updateCart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      res.status(200).json(updateCart);
    } catch (err) {}
  });

  return router;
};

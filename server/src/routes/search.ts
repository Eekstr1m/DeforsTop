import express, { Response } from "express";
import { param } from "express-validator";
import { inputValidationMiddleware } from "../middleware/validation.js";
import { Product, ProductViewModel } from "../models/ProductModel.js";
import {
  getTypedError,
  RequestWithParams,
  ResponseError,
} from "../types/RequestResponseTypes.js";
export const getSearchRouter = () => {
  const router = express.Router();

  router.get(
    "/:searchTerm",
    [param("searchTerm").trim().notEmpty().isString()],
    inputValidationMiddleware,
    async (
      req: RequestWithParams<{ searchTerm: string }>,
      res: Response<ProductViewModel[] | ResponseError>
    ) => {
      try {
        const { searchTerm } = req.params;

        const products = await Product.find({
          $text: { $search: `\"${searchTerm}\"` },
        });

        if (products.length <= 0) {
          return res.status(404).json({ message: "Products not found" });
        }

        return res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  return router;
};

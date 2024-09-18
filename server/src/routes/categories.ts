import express, { Response } from "express";
import { GetResponseProductViewModel } from "../models/GetResponseProductViewModel.js";
import { Product, ProductViewModel } from "../models/ProductModel.js";
import {
  RequestWithParams,
  RequestWithParamsAndQuery,
  RequestWithQuery,
  ResponseError,
  getTypedError,
} from "../types/RequestResponseTypes.js";
import { inputValidationMiddleware } from "../middleware/validation.js";
import { matchedData, param, query } from "express-validator";
import { productsRepo } from "../repositories/products-repo.js";

export const getCategoriesRouter = () => {
  const router = express.Router();

  router.get(
    "/brands",
    [query("category").trim().isString().optional()],
    inputValidationMiddleware,
    async (
      req: RequestWithQuery<{ category: string | undefined }>,
      res: Response<string[] | ResponseError>
    ) => {
      try {
        const data = matchedData(req);

        const categoryFinder =
          data.category === "undefined"
            ? {}
            : { category: { $eq: data.category } };

        const product = await Product.find(categoryFinder);
        const brands = new Set(product.map((i) => i.brand));
        let brandsArray: string[] = [...brands];
        res.status(200).json(brandsArray);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  router.get("/", async (req, res: Response<string[] | ResponseError>) => {
    try {
      const product = await Product.find();

      const categories = new Set(product.map((i) => i.category));
      let cat: string[] = [...categories];
      res.status(200).json(cat);
    } catch (err) {
      res.status(500).json({ message: getTypedError(err) });
    }
  });

  router.get(
    "/:category",
    [
      param("category").trim().isString(),
      query("page").trim().isNumeric().optional(),
      query("count").optional().isNumeric().optional(),
      query("minPrice").trim().isNumeric().optional(),
      query("maxPrice").trim().isNumeric().optional(),
      query("sortedValue")
        .trim()
        .isString()
        .isIn(["toHigh", "toLow", "none"])
        .optional(),
      query("brand").trim().isString().optional(),
    ],
    inputValidationMiddleware,
    async (
      req: RequestWithParamsAndQuery<
        { category: string },
        {
          page: string;
          count: string;
          minPrice: string;
          maxPrice: string;
          sortedValue: string;
          brand: string;
        }
      >,
      res: Response<GetResponseProductViewModel | ResponseError>
    ) => {
      try {
        const data = matchedData(req);

        const page = +data.page || 1;
        const count = +data.count || 10;
        const skip = (page - 1) * count;

        if (!data.category) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const products = await productsRepo.getProducts({
          page,
          count,
          skip,
          minPrice: +data.minPrice,
          maxPrice: +data.maxPrice,
          sortedValue: data.sortedValue,
          brand: data.brand,
          category: data.category,
        });

        if (products === 404) {
          return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  return router;
};

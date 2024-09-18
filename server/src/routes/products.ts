import express, { Express, NextFunction, Request, Response } from "express";
import { verifyToken } from "../middleware/auth.js";
import { upload } from "../middleware/uploadFiles.js";
import {
  AllProductsViewModel,
  CreateProductModel,
  GetProductParamsModel,
  Product,
  ProductsQuery,
  ProductViewModel,
} from "../models/ProductModel.js";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
  ResponseError,
  getTypedError,
} from "../types/RequestResponseTypes.js";
import { productsRepo } from "../repositories/products-repo.js";
import { body, matchedData, param, query } from "express-validator";
import { inputValidationMiddleware } from "../middleware/validation.js";

export const getProductsRouter = () => {
  const router = express.Router();

  router.get(
    "/recommended/:id",
    param("id").trim().notEmpty().isString(),
    inputValidationMiddleware,
    async (req: RequestWithParams<GetProductParamsModel>, res) => {
      try {
        // Get recommended products and send it back to the client
        const { id } = req.params;
        const products = await productsRepo.getRecommendedProducts(id);

        if (products === 404) {
          return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json(products);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  router.get("/newarrivals", async (req, res) => {
    try {
      // Get last 6 recently added products and send it back to the client
      const products = await productsRepo.getNewArrivalsProducts();

      if (products === 404) {
        return res.status(404).json({ message: "No data found" });
      }

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: getTypedError(err) });
    }
  });

  router.get(
    "/",
    [
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
      req: RequestWithQuery<ProductsQuery>,
      res: Response<AllProductsViewModel | ResponseError>
    ) => {
      try {
        // Get products and send them back to the client
        const data = matchedData(req);

        const page = +data.page || 1;
        const count = +data.count || 10;
        const skip = (page - 1) * count;

        const products = await productsRepo.getProducts({
          page,
          count,
          skip,
          minPrice: +data.minPrice,
          maxPrice: +data.maxPrice,
          sortedValue: data.sortedValue,
          brand: data.brand,
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

  router.post(
    "/",
    upload.single("thumbnail"),
    verifyToken,
    [
      body("title").trim().notEmpty(),
      body("description").trim().notEmpty(),
      body("price").trim().notEmpty().isNumeric(),
      body("quantity").trim().notEmpty().isNumeric().isInt({ min: 1 }),
      body("brand").trim().notEmpty(),
      body("category").trim().notEmpty(),
      body("thumbnailPath").trim().notEmpty(),
      body("specifications").optional().isArray().contains({}),
      body("specifications.*.name").exists().notEmpty().isString(),
      body("specifications.*.desc").exists().notEmpty().isString(),
    ],
    inputValidationMiddleware,
    async (
      req: RequestWithBody<CreateProductModel>,
      res: Response<ProductViewModel | ResponseError>
    ) => {
      try {
        // Create product and send back to the client

        const {
          title,
          description,
          price,
          quantity,
          brand,
          category,
          thumbnailPath,
          specifications,
        } = req.body;

        const product = await productsRepo.createProduct({
          title,
          description,
          price,
          quantity,
          brand,
          category,
          thumbnailPath,
          specifications,
        });

        res.status(201).json(product);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  router.get(
    "/:id",
    param("id").trim().notEmpty().isString(),
    inputValidationMiddleware,
    async (req: RequestWithParams<GetProductParamsModel>, res) => {
      try {
        // Get single product by id and send it back to the client
        const { id } = req.params;
        const product = await productsRepo.getSingleProduct(id);

        if (product === 400) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json(product);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  return router;
};

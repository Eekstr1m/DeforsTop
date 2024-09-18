import express from "express";
import {
  getTypedError,
  RequestWithBody,
} from "../types/RequestResponseTypes.js";
import { Logo } from "../models/LogoModel.js";
import { upload } from "../middleware/uploadFiles.js";
import { verifyToken } from "../middleware/auth.js";

export const getLogoRouter = () => {
  const router = express.Router();

  router.get("/", async (req, res) => {
    // Get all brand logos
    try {
      const logo = await Logo.find();

      res.status(200).json(logo);
    } catch (err) {
      res.status(500).json({ message: getTypedError(err) });
    }
  });

  router.post(
    "/",
    upload.single("thumbnail"),
    verifyToken,
    // [
    //   body("title").trim().notEmpty(),
    //   body("description").trim().notEmpty(),
    //   body("price").trim().notEmpty().isNumeric(),
    //   body("brand").trim().notEmpty(),
    //   body("category").trim().notEmpty(),
    //   body("thumbnailPath").trim().notEmpty(),
    // ],
    // inputValidationMiddleware,
    async (req: RequestWithBody<{ brand: string; thumbnail: string }>, res) => {
      try {
        // Create logo and send back to the client

        const { brand, thumbnail } = req.body;

        const newLogo = new Logo({
          brand,
          thumbnail,
        });

        const savedLogo = await newLogo.save();

        res.status(201).json(savedLogo);
      } catch (err) {
        res.status(500).json({ message: getTypedError(err) });
      }
    }
  );

  return router;
};

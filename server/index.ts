import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import multer from "multer";
import fs from "fs";
import session from "express-session";
import { authTokenVerification, verifyToken } from "./src/middleware/auth.js";
import { getAuthRouter } from "./src/routes/auth.js";
import { getCartRouter } from "./src/routes/cart.js";
import { getCategoriesRouter } from "./src/routes/categories.js";
import { getProductsRouter } from "./src/routes/products.js";
import { getLogoRouter } from "./src/routes/logo.js";
import { getWishlistRouter } from "./src/routes/wishlist.js";
import { getSearchRouter } from "./src/routes/search.js";

/* CONFIGURATION */
dotenv.config();
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 6001;

/* MIDDLEWARE */
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  origin: process.env.BASEURL,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/assets", express.static("public/assets"));

/* MONGOOSE SETUP */
const MONGO_URL = process.env.MONGO_URL;
if (!MONGO_URL) {
  console.log("MONGODB_URI is missing, please fill the value!");
  process.exit(1);
}
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server starts at port ${port}`));
  })
  .catch((err) => {
    console.log(`${err}. MongoDB did not connected`);
  });

/* ROUTES */
app.use(authTokenVerification);

// upload files
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const imageFolderName = req.body.title.split(" ").join("_");
      // const path = `uploads/${req.body.title}`;
      const path = `public/assets/${imageFolderName}`;
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

app.post("/test", upload.array("avatar"), (req, res) => {
  // console.log(req.files);

  const thumbnailPath: string[] = [];
  const images = req.files as Express.Multer.File[];

  if (images) {
    images.forEach((i) => {
      const path = i.path.replace(`public\\assets\\`, "");
      thumbnailPath.push(path);
    });
    // else push path to placeholder image
  }
  console.log("🚀 ~ app.post ~ thumbnailPath:", thumbnailPath);
  res.json("Upload");
});

app.use("/auth", getAuthRouter());
app.use("/products", getProductsRouter());
app.use("/categories", getCategoriesRouter());
app.use("/cart", getCartRouter());
app.use("/wishlist", getWishlistRouter());
app.use("/logo", getLogoRouter());
app.use("/search", getSearchRouter());

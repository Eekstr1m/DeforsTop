import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import { products } from "./src/data.js";
import { authTokenVerification, verifyToken } from "./src/middleware/auth.js";
import { Product } from "./src/models/ProductModel.js";
import { getAuthRouter } from "./src/routes/auth.js";
import { getCartRouter } from "./src/routes/cart.js";
import { getCategoriesRouter } from "./src/routes/categories.js";
import { getProductsRouter } from "./src/routes/products.js";
import session from "express-session";
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
// app.get("/test", sessionToken, (req, res) => {
//   res.json("Hello world");
// });

app.use("/auth", getAuthRouter());
app.use("/products", getProductsRouter());
app.use("/categories", getCategoriesRouter());
app.use("/cart", getCartRouter());
app.use("/wishlist", getWishlistRouter());
app.use("/logo", getLogoRouter());
app.use("/search", getSearchRouter());

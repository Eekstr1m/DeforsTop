import { createBrowserRouter } from "react-router-dom";
// import Error from "../components/Error/Error";
import Cart from "./Cart";
import Category from "./Category";
import Error from "./Error";
import Login from "./Login";
import Main from "./Main";
import Product from "./Product";
import Wishlist from "./Wishlist";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <Error />,
  },
  {
    path: "/category/",
    element: <Category />,
    children: [
      {
        path: ":category",
        element: <Category />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/product/:productId",
    element: <Product />,
    errorElement: <Error />,
  },
  {
    path: "/cart",
    element: <Cart />,
    errorElement: <Error />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/error",
    element: <Error />,
    errorElement: <Error />,
  },
]);

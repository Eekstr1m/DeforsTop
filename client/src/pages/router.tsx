import { createBrowserRouter, Navigate } from "react-router-dom";
// import Error from "../components/Error/Error";
import Cart from "./Cart";
import Category from "./Category";
import Error from "./Error";
import Login from "./Login";
import Main from "./Main";
import Product from "./Product";
import Wishlist from "./Wishlist";
import Profile from "./Profile";
import Admin from "./Admin";
import AdminDashboard from "../components/AdminPage/AdminDashboard/AdminDashboard";
import AdminProducts from "../components/AdminPage/AdminProducts/AdminProducts";
import AdminAddProduct from "../components/AdminPage/AdminProducts/AdminAddProduct/AdminAddProduct";
import AdminProductsList from "../components/AdminPage/AdminProducts/AdminProductsList/AdminProductsList";

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
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        index: true,
        element: <Navigate replace to="dashboard" />,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
        children: [
          {
            index: true,
            element: <Navigate replace to="productslist" />,
          },
          {
            path: "addproduct",
            element: <AdminAddProduct />,
          },
          {
            path: "productslist",
            element: <AdminProductsList />,
          },
        ],
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/error",
    element: <Error />,
    errorElement: <Error />,
  },
]);

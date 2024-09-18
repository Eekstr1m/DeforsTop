import axios from "axios";
import { Fetcher } from "swr";
import { AuthUserI, ResponseAuthUserI } from "../interfaces/authUser";
import { ResponseCartI } from "../interfaces/cart";
import { getTypedError } from "../interfaces/error";
import { ResponseProductsI } from "../interfaces/productsI";
import { ResponseWishlistI } from "../interfaces/wishlist";
import { ResponseSearchI } from "../interfaces/search";

export const BaseURL = "http://localhost:4000";

// move to env
// export const BaseURL = "https://fp3snhng-4000.euw.devtunnels.ms";

const instance = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: BaseURL,
  withCredentials: true,
});

export const API = {
  async getProducts(): Promise<ResponseProductsI> {
    const response = await instance.get(`/products`);
    return response.data;
  },
  async getCategories(): Promise<string[]> {
    const response = await instance.get(`/categories`);

    if (response.status !== 200) {
      throw new Error(`An error has occurred: ${response.statusText}`);
    }

    return response.data;
  },
  async getAuthMe(): Promise<AuthUserI> {
    try {
      const response = await instance.get(`/auth/me`);

      const authUser: AuthUserI = {
        authStatus: response.data.status,
        userData: response.data,
      };

      return authUser;
    } catch (error) {
      const err = getTypedError(error);
      return {
        authStatus: err.response.status,
        userData: { _id: "", status: "" },
      };
    }
  },
  async login(
    email: string,
    password: string,
    rememberMe: boolean
  ): Promise<ResponseAuthUserI> {
    try {
      const response = await instance.post("/auth/login", {
        email,
        password,
        rememberMe,
      });

      return { status: response.status, data: response.data.user };
    } catch (error) {
      const err = getTypedError(error);
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
  },
  async updateCart(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<ResponseCartI> {
    try {
      const response = await instance.put(`/cart/${userId}`, {
        productId,
        quantity,
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      const err = getTypedError(error);
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
  },
  async deleteProductFromCart(
    userId: string,
    productId: string
  ): Promise<ResponseCartI> {
    try {
      const response = await instance.delete(`/cart/${userId}/${productId}`);
      return { status: response.status, data: response.data };
    } catch (error) {
      const err = getTypedError(error);
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
  },
  async getWishlistProductById(
    userId: string,
    productId: string
  ): Promise<ResponseWishlistI> {
    try {
      const response = await instance.put(`/wishlist/${userId}/${productId}`, {
        productId,
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      const err = getTypedError(error);
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
  },
  async addToWishlist(
    userId: string,
    productId: string
  ): Promise<ResponseWishlistI> {
    try {
      const response = await instance.put(`/wishlist/${userId}`, {
        productId,
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      const err = getTypedError(error);
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
  },
  async removeFromWishlist(
    userId: string,
    productId: string
  ): Promise<ResponseWishlistI> {
    try {
      const response = await instance.delete(
        `/wishlist/${userId}/${productId}`
      );
      return { status: response.status, data: response.data };
    } catch (error) {
      const err = getTypedError(error);
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
  },
  async search(searchTerm: string): Promise<ResponseSearchI> {
    try {
      const response = await instance.get(`/search/${searchTerm}`);
      return { status: response.status, data: response.data };
    } catch (error) {
      const err = getTypedError(error);
      return {
        status: err.response.status,
        data: err.response.data,
      };
    }
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const apiGetFetcher: Fetcher<any, string> = async (url) => {
  const res = await instance.get(url);

  return { status: res.status, data: res.data };
};

export const apiGetWishlistProduct = async (
  url: string
): Promise<ResponseWishlistI> => {
  const response = await instance.get(BaseURL + url);
  return { status: response.status, data: response.data };
};

import { Link, Navigate } from "react-router-dom";
import s from "./WishlistButton.module.scss";
import { API, apiGetWishlistProduct } from "../../../API/api";
import { useAuthData } from "../../../provider/provider";
import useSWR from "swr";
import { ResponseWishlistI } from "../../../interfaces/wishlist";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToWishList,
  removeFromWishList,
} from "../../../redux/wishlistSlice";
import { ProductI } from "../../../interfaces/productsI";
import NoData from "../NoData/NoData";

export default function WishlistButton() {
  return (
    <Link className={s.like_icon} to={"/wishlist"}>
      <i className="fa-regular fa-heart fa-lg"></i>
    </Link>
  );
}

export function AddToWishlistButton({ item }: { item: ProductI }) {
  const { authUserData } = useAuthData();
  const { data, error, isLoading } = useSWR<ResponseWishlistI>(
    `/wishlist/${authUserData.userData._id}/${item._id}`,
    apiGetWishlistProduct
  );

  if (error) return <Navigate to={"/error"} />;
  // if (error) console.log("error", error.response.status);
  if (isLoading) return <Preloader />;
  // create no data component
  if (!data) return <NoData />;
  return <WishlistBtn item={item} productData={data} />;
}

function WishlistBtn({
  item,
  productData,
}: {
  item: ProductI;
  productData: ResponseWishlistI;
}) {
  const { authUserData } = useAuthData();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const dispatch = useDispatch();

  // check if the user has already added this product in his wishlist
  useEffect(() => {
    if (productData.status === 200) {
      setIsLiked(true);
    }

    return () => {
      setIsLiked(false);
    };
  }, [productData]);

  // add to wishlist and redux
  const addToWishlistHandler = async () => {
    const response = await API.addToWishlist(
      authUserData.userData._id,
      item._id
    );
    if (response.status === 200 || response.status === 201) {
      setIsLiked(true);
      dispatch(addToWishList(response.data.products));
    }
  };
  // remove from wishlist and redux
  const removeFromWishlistHandler = async () => {
    const response = await API.removeFromWishlist(
      authUserData.userData._id,
      item._id
    );
    if (response.status === 200) {
      setIsLiked(false);
      dispatch(removeFromWishList(response.data.products));
    }
  };

  return (
    <div className={s.like_icon}>
      {isLiked ? (
        <div onClick={removeFromWishlistHandler}>
          <i className="fa-solid fa-heart fa-lg"></i>
        </div>
      ) : (
        <div onClick={addToWishlistHandler}>
          <i className="fa-regular fa-heart fa-lg"></i>
        </div>
      )}
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import { WishlistI } from "../../interfaces/wishlist";
import ProductCard from "../ProductCard/ProductCard";
import s from "./WishlistInfo.module.scss";
import { RootState } from "../../redux/reduxStore";
import { useEffect } from "react";
import { setWishList } from "../../redux/wishlistSlice";
import NoData from "../common/NoData/NoData";

export default function WishlistInfo({ data }: { data: WishlistI }) {
  const wishlistData = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setWishList(data));
    }
  }, [data, dispatch]);

  if (!wishlistData.products.length) {
    return <NoData>Your wishlist is empty.</NoData>;
  }

  return (
    <div className={s.wrapper}>
      <div className={s.title}>
        <h2>Your wishlist</h2>
      </div>
      <div className={s.products}>
        {wishlistData.products.map((item) => (
          <ProductCard key={item.productId} productData={item} />
        ))}
      </div>
    </div>
  );
}

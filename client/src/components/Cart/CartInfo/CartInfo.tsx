import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartI } from "../../../interfaces/cart";
import { setCart } from "../../../redux/cartSlice";
import { RootState } from "../../../redux/reduxStore";
import CartFooter from "./CartFooter";
import s from "./CartInfo.module.scss";
import CartProductItem from "./CartProductItem";
import NoData from "../../common/NoData/NoData";

export default function CartInfo({ data }: { data: CartI }) {
  const cartData = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setCart(data));
    }
  }, [data, dispatch]);

  return (
    <div className={s.cart}>
      {cartData.products.length > 0 ? (
        <div>
          {cartData.products.map((item) => (
            <CartProductItem key={item.productId} item={item} />
          ))}
          <CartFooter cartData={cartData} />
        </div>
      ) : (
        <NoData>Your cart is empty.</NoData>
      )}
    </div>
  );
}

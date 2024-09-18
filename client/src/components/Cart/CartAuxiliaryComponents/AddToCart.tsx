import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { API, apiGetFetcher } from "../../../API/api";
import { useAuthData } from "../../../provider/provider";
import { addProduct, setCart } from "../../../redux/cartSlice";
import s from "../../common/Button/CustomButton.module.scss";
import { ProductI } from "../../../interfaces/productsI";
import { RootState } from "../../../redux/reduxStore";
import useSWR from "swr";
import Preloader from "../../common/Preloader/Preloader";
import { ResponseCartI } from "../../../interfaces/cart";
import { useEffect } from "react";

export default function AddToCart({
  item,
  quantity,
}: {
  item: ProductI;
  quantity?: number;
}) {
  const { authUserData } = useAuthData();
  const dispatch = useDispatch();
  const cartDataState = useSelector((state: RootState) => state.cart);

  const { data: cartData, isLoading } = useSWR<ResponseCartI>(
    `/cart/${authUserData.userData._id}`,
    apiGetFetcher
  );

  useEffect(() => {
    if (cartData && cartData.status === 200) {
      dispatch(setCart(cartData.data));
    }
  }, [cartData, dispatch]);

  if (isLoading) return <Preloader />;

  const existingProducts = cartDataState.products.find(
    (i) => i.productId === item._id
  );

  const addToCartHandler = async () => {
    if (!authUserData.userData) {
      return <Navigate to={`/login`} />;
    }
    const response = await API.updateCart(
      authUserData.userData._id,
      item._id,
      quantity || 1
    );
    if (response.status === 200) {
      dispatch(
        addProduct({
          productId: item._id,
          photoPath: item.thumbnail,
          quantity: quantity || 1,
          title: item.title,
          price: item.price,
        })
      );
    }
  };

  return (
    <div onClick={addToCartHandler}>
      <div
        className={s.btn}
        style={{
          cursor: "pointer",
          backgroundColor: existingProducts ? "var(--light_gray)" : "",
        }}
      >
        <i
          style={{ paddingRight: "10px" }}
          className="fa-solid fa-basket-shopping fa-lg"
        ></i>
        <span>{existingProducts ? "In cart" : "To cart"}</span>
      </div>
    </div>
  );
}

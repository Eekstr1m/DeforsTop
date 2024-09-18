import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { API } from "../../../../API/api";
import { useAuthData } from "../../../../provider/provider";
import { setQuantity } from "../../../../redux/cartSlice";
import s from "./QuantityChange.module.scss";

export default function QuantityChange({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}) {
  const { authUserData } = useAuthData();
  const dispatch = useDispatch();

  const onClickHandler = async (type: "inc" | "dec") => {
    if (!authUserData.userData) {
      return <Navigate to={`/login`} />;
    }
    const newQuantity = type === "inc" ? quantity + 1 : quantity - 1;
    const response = await API.updateCart(
      authUserData.userData._id,
      productId,
      newQuantity
    );
    if (response.status === 200) {
      dispatch(setQuantity({ type, productId }));
    }
  };

  return (
    <div className={s.wrapper}>
      <button
        disabled={quantity === 1}
        onClick={() => onClickHandler("dec")}
        className={`${s.icons} ${s.icon_minus}`}
      >
        <i className="fa-solid fa-minus"></i>
      </button>
      <div className={s.number}>{quantity}</div>
      <button
        onClick={() => onClickHandler("inc")}
        className={`${s.icons} ${s.icon_plus}`}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}

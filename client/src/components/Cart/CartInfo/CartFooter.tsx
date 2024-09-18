import { CartI } from "../../../interfaces/cart";
import s from "./CartInfo.module.scss";
import CustomButton from "../../common/Button/CustomButton";

export default function CartFooter({ cartData }: { cartData: CartI }) {
  return (
    <div className={s.cart_footer}>
      <div className={s.info_box}>
        <div className={s.price_block}>
          <div className={s.price_title}>Total price:</div>
          <div className={s.total_price}>{cartData.totalPrice} $</div>
        </div>
        {/* Not finished */}
        <CustomButton link={"/cart/order"}>
          <div>Place your order</div>
        </CustomButton>
      </div>
    </div>
  );
}

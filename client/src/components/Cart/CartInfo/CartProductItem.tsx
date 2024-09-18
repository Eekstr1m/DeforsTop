import { CartProductI } from "../../../interfaces/cart";
import Image from "../../common/Image/Image";
import DeleteItemFromCart from "../CartAuxiliaryComponents/DeleteItemFromCart";
import s from "./CartProductItem.module.scss";
import QuantityChange from "../CartAuxiliaryComponents/QuantityChange/QuantityChange";

export default function CartProductItem({ item }: { item: CartProductI }) {
  return (
    <div className={s.cart_item}>
      <div id={s.image} className={s.image}>
        <Image thumbnail={item.photoPath} />
      </div>
      <div id={s.title} className={s.title_block}>
        <div className={s.title}>{item.title}</div>
        <DeleteItemFromCart
          productId={item.productId}
          price={item.price}
          quantity={item.quantity}
        />
      </div>
      <div id={s.info} className={s.info_box}>
        <div className={s.info_wrapper}>
          <div className={s.quantity}>
            <QuantityChange
              productId={item.productId}
              quantity={item.quantity}
            />
          </div>
          <div>
            <div className={s.total_price}>{item.total} $</div>
          </div>
        </div>
      </div>
    </div>
  );
}

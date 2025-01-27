import { Link } from "react-router-dom";
import s from "./ProductCard.module.scss";
import Image from "../common/Image/Image";
import AddToCart from "../Cart/CartAuxiliaryComponents/AddToCart";
import { AddToWishlistButton } from "../common/WishlistButton/WishlistButton";
import { ProductI } from "../../interfaces/productsI";

export default function ProductCard({
  productData,
}: {
  productData: ProductI;
}) {
  return (
    <div
      className={s.product_card}
      style={{ opacity: productData.quantity === 0 ? "0.5" : "1" }}
    >
      {productData.quantity > 0 && productData.quantity <= 10 && (
        <div className={s.card_runningOut}>Running Out</div>
      )}
      {productData.quantity === 0 && (
        <div className={`${s.card_runningOut} ${s.card_outStock}`}>
          Out of stock
        </div>
      )}

      <Link to={`/product/${productData._id}`} className={s.card_img}>
        <Image thumbnail={productData.thumbnail} />
      </Link>
      <Link to={`/product/${productData._id}`} className={s.card_title}>
        {productData.title}
      </Link>
      <div className={s.card_price_block}>
        <div className={s.card_price}>{productData.price} $</div>
        <div className={s.card_shop_block}>
          <AddToWishlistButton item={productData} />
          {productData.quantity > 0 && <AddToCart item={productData} />}
        </div>
      </div>
    </div>
  );
}

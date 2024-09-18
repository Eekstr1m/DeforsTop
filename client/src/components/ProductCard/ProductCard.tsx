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
    <div className={s.product_card}>
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
          <AddToCart item={productData} />
        </div>
      </div>
    </div>
  );
}

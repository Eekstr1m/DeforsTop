import s from "./AboutProduct.module.scss";
import AddToCart from "../../Cart/CartAuxiliaryComponents/AddToCart";
import { ProductI } from "../../../interfaces/productsI";

import Carousel from "../Carousel/Carousel";
import { AddToWishlistButton } from "../../common/WishlistButton/WishlistButton";

export default function AboutProduct({
  productData,
}: {
  productData: ProductI;
}) {
  return (
    <div className={s.about}>
      <Carousel hideThumb={true} thumbnail={productData.thumbnail} />
      <div className={s.product_info}>
        <div className={s.product_title}>{productData.title}</div>
        <div className={s.product_desc}>{productData.description}</div>
        <div className={s.price_block}>
          <div className={s.product_price}>{productData.price} $</div>
          <div>
            {/* Need to add like feature */}
            <AddToWishlistButton item={productData} />
          </div>
        </div>
        <AddToCart item={productData} />
      </div>
    </div>
  );
}

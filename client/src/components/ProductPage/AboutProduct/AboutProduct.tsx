import s from "./AboutProduct.module.scss";
import AddToCart from "../../Cart/CartAuxiliaryComponents/AddToCart";
import { ProductI } from "../../../interfaces/productsI";
import { AddToWishlistButton } from "../../common/WishlistButton/WishlistButton";
import ImageCarousel from "../Carousel/Carousel";
import { useEffect, useRef } from "react";

export default function AboutProduct({
  productData,
}: {
  productData: ProductI;
}) {
  const mounted = useRef<boolean>(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      window.scrollTo(0, 0);
    }
  });

  return (
    <div className={s.about}>
      <ImageCarousel thumbnail={productData.thumbnail} />
      <div className={s.product_info}>
        <div className={s.product_title}>{productData.title}</div>
        <div className={s.product_desc}>{productData.description}</div>
        <div className={s.price_block}>
          <div className={s.product_price}>{productData.price} $</div>
          <div>
            <AddToWishlistButton item={productData} />
          </div>
        </div>
        <AddToCart item={productData} />
      </div>
    </div>
  );
}

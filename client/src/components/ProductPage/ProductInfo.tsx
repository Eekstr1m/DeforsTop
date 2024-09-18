import { ProductI } from "../../interfaces/productsI";
import s from "./ProductInfo.module.scss";
import "@splidejs/react-splide/css";
import RecommendedProducts from "./RecommendedProducts/RecommendedProducts";
import AboutProduct from "./AboutProduct/AboutProduct";
import Carousel from "./Carousel/Carousel";
import Specification from "./Specification/Specification";

export default function ProductInfo({
  productData,
  recommendedData,
}: {
  productData: ProductI;
  recommendedData: ProductI[];
}) {
  return (
    <section className={s.wrapper}>
      {/* About product info */}
      <AboutProduct productData={productData} />
      {/* Recommended products block */}
      <RecommendedProducts recommendedData={recommendedData} />
      {/* Spec about product */}
      {/* Need to prop productData.spec */}
      <Specification productData={productData} />
      {/* Photo block */}
      <div className={s.photos}>
        <h2>Photos</h2>
        <div className={s.carouselWrapper}>
          <Carousel hideThumb={false} thumbnail={productData.thumbnail} />
        </div>
      </div>
    </section>
  );
}

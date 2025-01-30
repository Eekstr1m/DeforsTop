import { ProductI } from "../../interfaces/productsI";
import s from "./ProductInfo.module.scss";
import RecommendedProducts from "./RecommendedProducts/RecommendedProducts";
import AboutProduct from "./AboutProduct/AboutProduct";
import Specification from "./Specification/Specification";
import ImageCarousel from "./Carousel/Carousel";

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
      <Specification productData={productData} />
      {/* Photo block */}
      <div className={s.photos}>
        <h2>Photos</h2>
        <div className={s.carouselWrapper}>
          <ImageCarousel thumbnail={productData.thumbnail} />
        </div>
      </div>
    </section>
  );
}

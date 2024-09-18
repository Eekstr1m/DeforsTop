import { ProductI } from "../../../interfaces/productsI";
import ProductCard from "../../ProductCard/ProductCard";
import s from "./RecommendedProducts.module.scss";

export default function RecommendedProducts({
  recommendedData,
}: {
  recommendedData: ProductI[];
}) {
  const widthChecker = () => {
    if (recommendedData.length < 5) {
      return { maxWidth: "var(--max_width)" };
    }
    return;
  };
  return (
    <div style={widthChecker()} className={s.wrapper}>
      <h2 className={s.title}>Recommendations for you</h2>
      <div className={s.products}>
        {recommendedData.map((item) => (
          <ProductCard key={item._id} productData={item} />
        ))}
      </div>
    </div>
  );
}

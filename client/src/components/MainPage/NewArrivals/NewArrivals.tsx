import s from "./NewArrivals.module.scss";
import ProductCard from "../../ProductCard/ProductCard";
import { ProductI } from "../../../interfaces/productsI";

export default function NewArrivals({
  newArrivalsData,
}: {
  newArrivalsData: ProductI[];
}) {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <div className={s.title}>
          <h2>New Arrivals</h2>
        </div>
        <div className={s.products}>
          {newArrivalsData.map((item) => (
            <ProductCard key={item._id} productData={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

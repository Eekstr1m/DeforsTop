import { ResponseProductsI } from "../../interfaces/productsI";
import PriceFilter from "./Filters/PriceFilter";
import SortFilter from "./Filters/SortFilter";
import ProductCard from "../ProductCard/ProductCard";
import s from "./ProductList.module.scss";
import BrandFilter from "./Filters/BrandFilter";

export default function ProductsWrapper({
  productsData,
}: {
  productsData: ResponseProductsI;
}) {
  return (
    <div className={s.wrapper}>
      <div className={s.filters}>
        <PriceFilter
          minValue={productsData.minValue}
          maxValue={productsData.maxValue}
        />
        <SortFilter />
        {/* BrandFilter */}
        <BrandFilter />
      </div>
      <div className={s.products}>
        {productsData.products.map((item) => (
          <ProductCard key={item._id} productData={item} />
        ))}
      </div>
    </div>
  );
}

import { useRef } from "react";
import { ResponseProductsI } from "../../interfaces/productsI";
import Pagination from "../Pagination/Pagination";
import ProductsWrapper from "./ProductsWrapper";
import s from "./ProductList.module.scss";

export default function ProductsList({
  productsData,
}: {
  productsData: ResponseProductsI;
}) {
  const productsAnchor = useRef<HTMLDivElement>(null);

  const anchorHandler = () => {
    if (productsAnchor.current) {
      productsAnchor.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <section className={s.container}>
      <div ref={productsAnchor}></div>

      <ProductsWrapper productsData={productsData} />
      {productsData.total > productsData.count && (
        <Pagination
          anchorHandler={anchorHandler}
          total={productsData.total}
          limit={productsData.count}
        />
      )}
    </section>
  );
}

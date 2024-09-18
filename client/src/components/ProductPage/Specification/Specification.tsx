import { ProductI } from "../../../interfaces/productsI";
import s from "./Specification.module.scss";

export default function Specification({
  productData,
}: {
  productData: ProductI;
}) {
  if (!productData.specifications.length) {
    return <></>;
  }
  return (
    <div className={s.wrapper}>
      <h2>Specification</h2>
      <div className={s.spec}>
        {productData.specifications.map((item) => (
          <div key={item.name} className={s.item}>
            <div>{item.name}</div>
            <div className={s.desc}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { CompaniesLogoI } from "../../../interfaces/companiesLogo";
import Image from "../../common/Image/Image";
import s from "./LogotypesBanner.module.scss";

export default function LogotypesBanner({
  logoData,
}: {
  logoData: CompaniesLogoI[];
}) {
  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        {logoData.map((item) => (
          <Link
            to={`/category?brand=${item.brand}`}
            key={item._id}
            className={s.logo_item}
          >
            <Image thumbnail={item.thumbnail} />
          </Link>
        ))}
      </div>
    </div>
  );
}

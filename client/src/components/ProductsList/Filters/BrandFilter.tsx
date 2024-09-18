import { Form } from "react-bootstrap";
import useSWR from "swr";
import { apiGetFetcher } from "../../../API/api";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Preloader from "../../common/Preloader/Preloader";
import NoData from "../../common/NoData/NoData";
import { ResponseBrandsI } from "../../../interfaces/companiesLogo";
import { CustomButtonStyle } from "../../common/Button/CustomButton";
import { useCallback, useState } from "react";
import { usePathWithoutElem, useQuery } from "../../../customHooks/useQuery";
import s from "./Filters.module.scss";

export default function BrandFilter() {
  const query = useQuery();
  const brandQuery = query.brand.split(",");
  const [brands, setBrands] = useState<string[]>(brandQuery);

  const path = usePathWithoutElem(["brand"]);
  const { category } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [brandHeight, setBrandHeight] = useState(0);

  const { data, error, isLoading } = useSWR<ResponseBrandsI>(
    `/categories/brands?category=${category}`,
    apiGetFetcher
  );

  const handleRect = useCallback((node: HTMLDivElement) => {
    setBrandHeight(node?.getBoundingClientRect().height);
  }, []);

  if (error) return <Navigate to={"/error"} />;
  if (isLoading) return <Preloader />;
  if (!data) return <NoData />;

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setBrands([...brands, e.target.value]);
    else setBrands(brands.filter((brand) => brand !== e.target.value));
  };

  return (
    <Form>
      <div
        className={s.brand_form_container}
        ref={handleRect}
        style={{
          height: brandHeight > 510 ? "510px" : "",
        }}
      >
        <div className={s.title}>Brands</div>
        {data.data.map((i) => (
          <Form.Check
            onChange={onChangeHandler}
            type="checkbox"
            checked={brands.includes(i)}
            key={i}
            id={i}
            label={i}
            value={i}
          />
        ))}
      </div>
      <CustomButtonStyle style={{ padding: "10px" }}>
        <div
          onClick={() =>
            navigate(`${pathname}?brand=${brands.join(",")}&${path}`)
          }
        >
          Select
        </div>
      </CustomButtonStyle>
    </Form>
  );
}

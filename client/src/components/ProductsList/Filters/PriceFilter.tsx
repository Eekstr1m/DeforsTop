import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { InputGroup, InputNumber, RangeSlider } from "rsuite";
import "rsuite/dist/rsuite-no-reset-rtl.css";
import { usePathWithoutElem, useQuery } from "../../../customHooks/useQuery";
import { CustomButtonStyle } from "../../common/Button/CustomButton";
import s from "./Filters.module.scss";

export default function PriceFilter({
  minValue,
  maxValue,
}: {
  minValue: number;
  maxValue: number;
}) {
  const navigate = useNavigate();
  // const query = useQuery();
  const { minPrice, maxPrice } = useQuery();

  const { pathname } = useLocation();
  const path = usePathWithoutElem(["minPrice", "maxPrice"]);

  const [value, setValue] = useState<[number, number]>([minValue, maxValue]);

  useEffect(() => {
    setValue([
      minPrice === 0 ? minValue : minPrice,
      maxPrice === 0 ? maxValue : maxPrice,
    ]);
  }, [maxPrice, maxValue, minPrice, minValue]);

  return (
    <div className={s.price_wrapper}>
      <div className={s.title}>Price</div>
      <RangeSlider
        progress
        min={minValue}
        max={maxValue}
        style={{
          marginRight: "10px",
        }}
        value={value}
        onChange={(value) => {
          setValue(value);
        }}
      />
      <div className={s.price_values}>
        <InputGroup>
          <InputNumber
            min={minValue}
            max={maxValue}
            value={value[0]}
            onChange={(nextValue) => {
              const [, end] = value;
              const next = +nextValue;
              if (next < end) setValue([next, end]);
            }}
            onBlur={() =>
              value[0] < minValue ? setValue([minValue, value[1]]) : null
            }
          />
          <InputNumber
            min={0}
            max={maxValue}
            value={value[1]}
            onChange={(nextValue) => {
              const [start] = value;
              const next = +nextValue;
              setValue([start, next]);
            }}
            onBlur={() =>
              value[1] < minValue ? setValue([value[0], minValue]) : null
            }
          />
        </InputGroup>
        <CustomButtonStyle style={{ padding: "10px" }}>
          <div
            onClick={() =>
              navigate(
                `${pathname}?${path}&minPrice=${value[0]}&maxPrice=${value[1]}`
              )
            }
          >
            OK
          </div>
        </CustomButtonStyle>
      </div>
    </div>
  );
}

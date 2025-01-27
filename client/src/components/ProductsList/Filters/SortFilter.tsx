import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePathWithoutElem, useQuery } from "../../../customHooks/useQuery";
import s from "./Filters.module.scss";
import { Dropdown } from "react-bootstrap";

export default function SortFilter() {
  const { sorted } = useQuery();
  const getSortedValue = (sortedValue: string) => {
    switch (sortedValue) {
      case "toHigh":
        return "Low to high";

      case "toLow":
        return "High to low";

      case "none":
        return "Default";

      default:
        return "Default";
    }
  };

  const [selectedValue, setSelectedValue] = useState(getSortedValue(sorted));
  const path = usePathWithoutElem(["sorted"]);
  const navigate = useNavigate();

  const filterOptions = ["Default", "Low to high", "High to low"];

  const onFilterSelectHandler = (eventKey: string | null) => {
    if (!eventKey) {
      return;
    }
    setSelectedValue(eventKey);

    switch (eventKey) {
      case "Low to high":
        navigate(`?${path}&sorted=toHigh`);
        break;

      case "High to low":
        navigate(`?${path}&sorted=toLow`);
        break;

      default:
        navigate(`?${path}`);
        break;
    }
  };

  return (
    <>
      <Dropdown onSelect={(evt) => onFilterSelectHandler(evt)}>
        <Dropdown.Toggle
          // className={s.sort_dropdown}
          style={{
            backgroundColor: "var(--yellow)",
            border: "none",
            color: "var(--black)",
            fontWeight: "bold",
            padding: "10px 25px",
            borderRadius: "15px",
            fontSize: "16px",
          }}
          id="dropdown-basic"
        >
          Sorted by: {selectedValue}
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ backgroundColor: "var(--yellow)" }}>
          {filterOptions.map((item, index) => (
            <Dropdown.Item
              style={{ backgroundColor: "var(--yellow)" }}
              key={index}
              eventKey={item}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

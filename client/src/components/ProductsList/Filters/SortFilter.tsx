import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "rsuite";
import { usePathWithoutElem } from "../../../customHooks/useQuery";

export default function SortFilter() {
  const [selectedValue, setSelectedValue] = useState("Filter");
  const path = usePathWithoutElem(["sorted"]);
  const navigate = useNavigate();

  const filterOptions = ["Default", "Low to high", "High to low"];

  const onFilterSelectHandler = (eventKey: string) => {
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
      <Dropdown
        menuStyle={{ textAlign: "left", width: "100px" }}
        title={selectedValue}
      >
        {filterOptions.map((item, index) => (
          <Dropdown.Item
            key={index}
            eventKey={item}
            onSelect={(eventKey) => onFilterSelectHandler(eventKey)}
          >
            {item}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </>
  );
}

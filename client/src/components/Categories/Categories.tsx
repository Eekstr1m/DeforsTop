import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { API } from "../../API/api";

export default function Categories() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    API.getCategories()
      .then((res) => setCategories(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div
      style={{
        width: "fit-content",
        paddingRight: "10px",
        borderRight: "1px solid #ccc",
      }}
    >
      {categories.map((item, index) => (
        <CategoriesItem key={index} item={item} />
      ))}
    </div>
  );
}

function CategoriesItem({ item }: { item: string }) {
  const catItem = item.replace("-", " ");

  return (
    <Link to={`/category/${item}`}>
      <CategoryItemDiv>{catItem}</CategoryItemDiv>
    </Link>
  );
}

const CategoryItemDiv = styled.div`
  padding: 5px 0;
  &:hover {
    background-color: #fbb72c;
  }
  &:first-letter {
    text-transform: uppercase;
  }
`;

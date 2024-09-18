import queryString from "query-string";
import { useLocation } from "react-router-dom";

export function useQuery() {
  const { search } = useLocation();

  const params = Object.fromEntries(new URLSearchParams(search));

  return {
    page: +params.page || 1,
    minPrice: +params.minPrice || 0,
    maxPrice: +params.maxPrice || 0,
    sorted: params.sorted || "none",
    brand: params.brand || "",
  };
}

export function usePathWithoutElem(str = [""]) {
  str.push("page");

  const parsed = queryString.exclude(location.search, str);

  return parsed.replace("?", "");
}

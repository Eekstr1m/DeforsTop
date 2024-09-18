import { Navigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { apiGetFetcher } from "../API/api";
import Header from "../components/Header/Header";
import ProductsList from "../components/ProductsList/ProductsList";
import { useQuery } from "../customHooks/useQuery";
import { ResponseProductsSWRI } from "../interfaces/productsI";
import Preloader from "../components/common/Preloader/Preloader";
import Footer from "../components/Footer/Footer";
import NoData from "../components/common/NoData/NoData";
import { useEffect, useState } from "react";

export default function Category() {
  const { category } = useParams();
  const query = useQuery();
  const queryPage = query.page;
  const minPrice = query.minPrice;
  const maxPrice = query.maxPrice;
  const sorted = query.sorted;
  const brand = query.brand;

  const windowsize = useWindowWidth();

  const getProductsOnPageCount = () => {
    if (windowsize <= 1550 && windowsize >= 1230) {
      return 9;
    } else return 10;
  };

  const queryParams = `page=${queryPage}
  &minPrice=${minPrice}
  &maxPrice=${maxPrice}
  &sortedValue=${sorted}
  &brand=${brand}
  &count=${getProductsOnPageCount()}`;

  const { data, error, isLoading } = useSWR<ResponseProductsSWRI>(
    category
      ? `/categories/${category}?${queryParams}`
      : `/products?${queryParams}`,

    apiGetFetcher
  );

  if (error) return <Navigate to={"/error"} />;
  if (isLoading) return <Preloader />;
  if (!data) return <NoData />;

  return (
    <>
      <Header />
      {/* <Categories /> */}
      <ProductsList productsData={data.data} />
      <Footer />
    </>
  );
}

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const windowWidthHandler = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", windowWidthHandler);

    return () => {
      window.removeEventListener("resize", windowWidthHandler);
    };
  }, []);

  return windowWidth;
};

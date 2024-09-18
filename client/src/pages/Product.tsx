import { Navigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { apiGetFetcher } from "../API/api";
import Header from "../components/Header/Header";
import ProductInfo from "../components/ProductPage/ProductInfo";
import Preloader from "../components/common/Preloader/Preloader";
import {
  ResponseProductI,
  ResponseProductsArrayI,
} from "../interfaces/productsI";
import Footer from "../components/Footer/Footer";

export default function Product() {
  const { productId } = useParams();

  const { data: productData, error: productError } = useSWR<ResponseProductI>(
    `/products/${productId}`,
    apiGetFetcher
  );

  const { data: recommendedData, error: recommendedError } =
    useSWR<ResponseProductsArrayI>(
      `/products/recommended/${productId}`,
      apiGetFetcher
    );

  if (productError || recommendedError) return <Navigate to={"/error"} />;
  if (!productData || !recommendedData) return <Preloader />;

  return (
    <>
      <Header />
      <ProductInfo
        productData={productData.data}
        recommendedData={recommendedData.data}
      />
      <Footer />
    </>
  );
}

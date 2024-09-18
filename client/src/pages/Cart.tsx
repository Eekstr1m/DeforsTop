import { Navigate } from "react-router-dom";
import CartInfo from "../components/Cart/CartInfo/CartInfo";
import Header from "../components/Header/Header";
import { useAuthData } from "../provider/provider";
import Preloader from "../components/common/Preloader/Preloader";
import useSWR from "swr";
import { ResponseCartI } from "../interfaces/cart";
import { apiGetFetcher } from "../API/api";
import NoData from "../components/common/NoData/NoData";
import Footer from "../components/Footer/Footer";

export default function Cart() {
  const { authUserData } = useAuthData();

  const { data, error, isLoading } = useSWR<ResponseCartI>(
    `/cart/${authUserData.userData._id}`,
    apiGetFetcher
  );

  if (error) return <Navigate to={"/error"} />;
  if (isLoading) return <Preloader />;
  if (!data) return <NoData />;

  return (
    <>
      <Header />
      {data.status === 200 ? (
        <CartInfo data={data.data} />
      ) : (
        <NoData>Your cart is empty.</NoData>
      )}
      <Footer />
    </>
  );
}

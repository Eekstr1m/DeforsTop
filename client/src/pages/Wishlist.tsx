import { Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Preloader from "../components/common/Preloader/Preloader";
import useSWR from "swr";
import { apiGetFetcher } from "../API/api";
import Footer from "../components/Footer/Footer";
import WishlistInfo from "../components/WishlistPage/WishlistInfo";
import { useAuthData } from "../provider/provider";
import { ResponseWishlistI } from "../interfaces/wishlist";
import NoData from "../components/common/NoData/NoData";

export default function Wishlist() {
  const { authUserData } = useAuthData();

  const { data, error, isLoading } = useSWR<ResponseWishlistI>(
    `/wishlist/${authUserData.userData._id}`,
    apiGetFetcher
  );

  if (error) return <Navigate to={"/error"} />;
  if (isLoading) return <Preloader />;
  if (!data) return <NoData />;

  return (
    <>
      <Header />
      {data.status === 202 ? (
        <NoData>Your wishlist is empty.</NoData>
      ) : (
        <WishlistInfo data={data.data} />
      )}
      <Footer />
    </>
  );
}

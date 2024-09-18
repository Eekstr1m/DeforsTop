import { Navigate } from "react-router-dom";
import useSWR from "swr";
import { apiGetFetcher } from "../API/api";
import Header from "../components/Header/Header";
import { ResponseProductsArrayI } from "../interfaces/productsI";
import MainBanner from "../components/MainPage/MainBanner/MainBanner";
import LogotypesBanner from "../components/MainPage/LogotypesBanner/LogotypesBanner";
import { ResponseCompaniesLogoI } from "../interfaces/companiesLogo";
import NewArrivals from "../components/MainPage/NewArrivals/NewArrivals";
import Preloader from "../components/common/Preloader/Preloader";
import AboutBlock from "../components/MainPage/AboutBlock/AboutBlock";
import Footer from "../components/Footer/Footer";

export default function Main() {
  const { data: logoData, error: logoError } = useSWR<ResponseCompaniesLogoI>(
    `/logo`,
    apiGetFetcher
  );

  const { data: newArrivalsData, error: newArrivalsError } =
    useSWR<ResponseProductsArrayI>(`/products/newarrivals`, apiGetFetcher);

  if (logoError || newArrivalsError) return <Navigate to={"/error"} />;

  if (!logoData || !newArrivalsData) {
    return <Preloader />;
  }

  return (
    <div>
      <Header />
      <MainBanner />
      <LogotypesBanner logoData={logoData.data} />
      <NewArrivals newArrivalsData={newArrivalsData.data} />
      <AboutBlock />
      <Footer />
    </div>
  );
}

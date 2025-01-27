import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProfilePage from "../components/ProfilePage/ProfilePage";
import { useAuthData } from "../provider/provider";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const { authUserData, setAuthUserData } = useAuthData();

  if ("firstName" in authUserData) {
    return (
      <>
        <Header />
        <ProfilePage
          authUserData={authUserData}
          setAuthUserData={setAuthUserData}
        />
        <Footer />
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
}

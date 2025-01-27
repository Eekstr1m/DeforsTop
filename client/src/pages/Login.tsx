import Header from "../components/Header/Header";
import LoginForm from "../components/LoginForm/LoginForm";
import Footer from "../components/Footer/Footer";
import { useAuthData } from "../provider/provider";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { API } from "../API/api";

export default function Login() {
  const { authUserData, setAuthUserData } = useAuthData();

  useEffect(() => {
    const fetchData = async () => {
      const data = await API.getAuthMe();

      setAuthUserData(data);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if ("firstName" in authUserData) {
    return <Navigate to={"/profile"} />;
  }

  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
    </>
  );
}

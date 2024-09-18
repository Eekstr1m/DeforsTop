import Header from "../components/Header/Header";
import LoginForm from "../components/LoginForm/LoginForm";
import Footer from "../components/Footer/Footer";

export default function Login() {
  // if (authUserData.isAuth) {
  //   return <Navigate to={"/"} />;
  // }

  return (
    <>
      <Header />
      <LoginForm />
      <Footer />
    </>
  );
}

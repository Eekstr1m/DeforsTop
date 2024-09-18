import { Link } from "react-router-dom";
import { useAuthData } from "../../provider/provider";
import s from "./Header.module.scss";
import logo from "../../assets/DeforsTopLogo.png";
import Categories from "./Categories/Categories";
import WishlistButton from "../common/WishlistButton/WishlistButton";
import SearchBar from "./SearchBar/SearchBar";

export default function Header() {
  const { authUserData } = useAuthData();

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div id={s.logo}>
          <Link to={`/`}>
            <div className={s.logo_block}>
              <div className={s.logo}>
                <img src={logo} alt="Defors Top Logo" />
              </div>
              <div className={s.logo_title}>DeforsTop</div>
            </div>
          </Link>
        </div>
        <Categories />
        <SearchBar id={s.search} />
        <div id={s.icons} className={s.icons}>
          {/* Add like link */}
          <WishlistButton />
          <Link className={s.icon} to={"/cart"}>
            <i className="fa-solid fa-basket-shopping fa-lg"></i>
          </Link>
          {authUserData.authStatus === "login" ? (
            <div className={s.icon}>
              <i className="fa-solid fa-user fa-lg"></i>
            </div>
          ) : (
            <Link className={s.icon} to={"/login"}>
              <i className="fa-solid fa-user fa-lg"></i>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

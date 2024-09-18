import s from "./Footer.module.scss";
import logo from "../../assets/DeforsTopLogo.png";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={s.wrapper}>
        <div className={s.logo_block}>
          <div className={s.logo}>
            <img src={logo} alt="Defors Top Logo" />
          </div>
          <div className={s.title}>DeforsTop</div>
        </div>
        <div>
          <div className={s.block_title}>Navigation</div>
          <Link className={s.icon} to={"/category"}>
            <div>Products</div>
          </Link>
          <Link className={s.icon} to={"/wishlist"}>
            <div>Liked</div>
          </Link>
          <Link className={s.icon} to={"/cart"}>
            <div>Cart</div>
          </Link>
          <Link className={s.icon} to={"/login"}>
            <div>Log In</div>
          </Link>
        </div>
        <div>
          <div className={s.block_title}>Phone number:</div>
          <div>+380 99 99 99 999</div>
          <div>From 9:00 to 21:00</div>
        </div>
        <div>
          <div className={s.block_title}>Address:</div>
          <div>Kyiv, Ukraine, Khreschatyk Street</div>
        </div>
      </div>
    </footer>
  );
}

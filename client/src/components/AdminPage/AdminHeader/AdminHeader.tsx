import s from "./AdminHeader.module.scss";
import logo from "../../../assets/DeforsTopLogo.png";

export default function AdminHeader() {
  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div id={s.logo}>
          <div className={s.logo_block}>
            <div className={s.logo}>
              <img src={logo} alt="Defors Top Logo" />
            </div>
            <div className={s.logo_title}>DeforsTop</div>
          </div>
        </div>
      </div>
    </header>
  );
}

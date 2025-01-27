import s from "./AdminProducts.module.scss";
import c from "./../AdminPage.module.scss";
import { Outlet } from "react-router-dom";

export default function AdminProducts() {
  return (
    <div className={s.wrapper}>
      <div className={c.container}>
        <Outlet />
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import s from "./AdminSidebar.module.scss";
import { useState } from "react";

export default function AdminSidebar() {
  const [isHidden, setIsHidden] = useState(true);
  const toggleHiddenStatus = () => {
    setIsHidden((prev) => !prev);
  };

  return (
    <div className={s.sidebar_wrapper}>
      <Link className={s.sidebar_item} to={"dashboard"}>
        <div className={s.item_icon}>
          <i className="fa-regular fa-chart-bar fa-lg"></i>
        </div>
        <div className={s.item_text}>Dashboard</div>
      </Link>
      <Link className={s.sidebar_item} to={"products"}>
        <div className={s.item_icon}>
          <i id={s.icons} className="fa-solid fa-box-archive fa-lg"></i>
        </div>
        <div
          id={s.category}
          className={s.item_text}
          // fix bug with opening all dropdowns instead of selected
          onClick={toggleHiddenStatus}
        >
          Products
          <DropdownArrow isHidden={isHidden} />
        </div>
        <div id={s.dropdown} className={s.item_dropdown} hidden={isHidden}>
          <object>
            <Link to={"products/addproduct"} className={s.dropdown_item}>
              Add product
            </Link>
          </object>
          <object>
            <Link to={"products/productslist"} className={s.dropdown_item}>
              Products list
            </Link>
          </object>
          <object>
            <Link to={"products"} className={s.dropdown_item}>
              Categories
            </Link>
          </object>
          <object>
            <Link to={"products"} className={s.dropdown_item}>
              Brands
            </Link>
          </object>
        </div>
      </Link>
      <Link className={s.sidebar_item} to={"orders"}>
        <div className={s.item_icon}>
          <i className="fa-solid fa-cart-shopping fa-lg"></i>
        </div>
        <div className={s.item_text}>Orders</div>
      </Link>
    </div>
  );
}

function DropdownArrow({ isHidden }: { isHidden: boolean }) {
  return (
    <>
      {isHidden ? (
        <i className="fa-solid fa-chevron-down fa-xs"></i>
      ) : (
        <i className="fa-solid fa-chevron-up fa-xs"></i>
      )}
    </>
  );
}

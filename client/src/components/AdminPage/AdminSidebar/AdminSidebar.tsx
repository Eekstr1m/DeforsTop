import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./AdminSidebar.module.scss";

const AdminSidebar = () => {
  // State for dropdowns hidden status
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({});

  // Changing the hidden status of the dropdown
  const toggleHiddenStatus = (key: string) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className={s.sidebar}>
      {/* Dashboard link */}
      <Link className={s.sidebar_item} to={"dashboard"}>
        <div className={s.item_icon}>
          <i id={s.icons} className="fa-solid fa-tachometer-alt fa-lg"></i>
        </div>
        <div className={s.item_text}>Dashboard</div>
      </Link>
      {/* Products link */}
      <Link className={s.sidebar_item} to={"products"}>
        <div className={s.item_icon}>
          <i id={s.icons} className="fa-solid fa-box-archive fa-lg"></i>
        </div>
        <div
          id={s.category}
          className={s.item_text}
          onClick={() => toggleHiddenStatus("products")}
        >
          Products
          <DropdownArrow isHidden={!dropdowns["products"]} />
        </div>
        <div
          id={s.dropdown}
          className={s.item_dropdown}
          hidden={!dropdowns["products"]}
        >
          <object>
            <Link to={"products/productslist"} className={s.dropdown_item}>
              Products list
            </Link>
          </object>
          <object>
            <Link to={"products/addproduct"} className={s.dropdown_item}>
              Add product
            </Link>
          </object>
          <object>
            <Link to={"products/categories"} className={s.dropdown_item}>
              Categories
            </Link>
          </object>
          <object>
            <Link to={"products/"} className={s.dropdown_item}>
              Brand
            </Link>
          </object>
        </div>
      </Link>
      {/* Orders link */}
      <Link className={s.sidebar_item} to={"orders"}>
        <div className={s.item_icon}>
          <i className="fa-solid fa-cart-shopping fa-lg"></i>
        </div>
        <div className={s.item_text}>Orders</div>
      </Link>
    </div>
  );
};

export default AdminSidebar;

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
